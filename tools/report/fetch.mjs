// 月次レポートの数字取得: node tools/report/fetch.mjs clients/<name>.config.json
// GA4 と Search Console から自動で取り、config の手入力(manual)と合わせて
// <name>.data.json を書き出し、続けて generate.mjs でHTML化する。
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const cfgPath = process.argv[2];
if (!cfgPath) {
  console.error("使い方: node tools/report/fetch.mjs clients/<name>.config.json");
  process.exit(1);
}
const here = fileURLToPath(new URL(".", import.meta.url));
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));

const auth = new google.auth.GoogleAuth({
  keyFile: here + "service-account.json",
  scopes: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
  ],
});
const ga = google.analyticsdata({ version: "v1beta", auth });
const sc = google.searchconsole({ version: "v1", auth });

const run = (body) =>
  ga.properties
    .runReport({ property: cfg.gaProperty, requestBody: body })
    .then((r) => r.data.rows || []);

/* ── 期間の組み立て ── */
const today = new Date();
const endMonth = cfg.endMonth || `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
const [ey, em] = endMonth.split("-").map(Number);
const ymList = []; // 表に出す月（startMonth〜endMonth）
{
  let [y, m] = (cfg.startMonth || `${ey}-01`).split("-").map(Number);
  while (y < ey || (y === ey && m <= em)) {
    ymList.push(`${y}${String(m).padStart(2, "0")}`);
    m++; if (m > 12) { m = 1; y++; }
  }
}
const ymLabel = (ym) => `${Number(ym.slice(4))}月`;
const ymFull = (ym) => `${ym.slice(0, 4)}年${Number(ym.slice(4))}月`;
const monthRange = (ym) => {
  const y = Number(ym.slice(0, 4)), m = Number(ym.slice(4));
  const last = new Date(y, m, 0).getDate();
  return { startDate: `${y}-${String(m).padStart(2, "0")}-01`, endDate: `${y}-${String(m).padStart(2, "0")}-${last}` };
};
const first = monthRange(ymList[0]).startDate;
const last = monthRange(ymList[ymList.length - 1]).endDate;

/* ── GA: 月別の基礎数字 ── */
const byYm = {};
for (const ym of ymList) byYm[ym] = { users: null, views: null, line: 0 };
for (const r of await run({ dateRanges: [{ startDate: first, endDate: last }], dimensions: [{ name: "yearMonth" }], metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }] })) {
  const ym = r.dimensionValues[0].value;
  if (byYm[ym]) { byYm[ym].users = Number(r.metricValues[0].value); byYm[ym].views = Number(r.metricValues[1].value); }
}
if (cfg.ctaEvent) {
  for (const r of await run({ dateRanges: [{ startDate: first, endDate: last }], dimensions: [{ name: "yearMonth" }], metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { value: cfg.ctaEvent } } } })) {
    const ym = r.dimensionValues[0].value;
    if (byYm[ym]) byYm[ym].line = Number(r.metricValues[0].value);
  }
}
/* ── LP（別プロパティ）を任意で ── */
const lpByYm = {};
if (cfg.lpProperty) {
  for (const ym of ymList) lpByYm[ym] = { users: null, views: null };
  const lpRows = await ga.properties.runReport({ property: cfg.lpProperty, requestBody: { dateRanges: [{ startDate: first, endDate: last }], dimensions: [{ name: "yearMonth" }], metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }] } }).then((r) => r.data.rows || []);
  for (const r of lpRows) {
    const ym = r.dimensionValues[0].value;
    if (lpByYm[ym]) { lpByYm[ym].users = Number(r.metricValues[0].value); lpByYm[ym].views = Number(r.metricValues[1].value); }
  }
}

/* ── 詳細パネル（直近 detailMonths か月・既定3） ── */
const detailYms = ymList.slice(-(cfg.detailMonths || 3));
const months = [];
for (const ym of detailYms) {
  const range = monthRange(ym);
  const manual = (cfg.manual || {})[`${ym.slice(0, 4)}-${ym.slice(4)}`] || {};
  const prevYm = ymList[ymList.indexOf(ym) - 1];
  const prevManual = prevYm ? (cfg.manual || {})[`${prevYm.slice(0, 4)}-${prevYm.slice(4)}`] || {} : {};

  const dev = await run({ dateRanges: [range], dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "totalUsers" }] });
  let mob = 0, pc = 0;
  for (const r of dev) {
    const v = Number(r.metricValues[0].value);
    if (r.dimensionValues[0].value === "mobile" || r.dimensionValues[0].value === "tablet") mob += v; else pc += v;
  }
  const tot = mob + pc || 1;

  const pg = await run({ dateRanges: [range], dimensions: [{ name: "pagePath" }, { name: "pageTitle" }], metrics: [{ name: "screenPageViews" }], orderBys: [{ desc: true, metric: { metricName: "screenPageViews" } }], limit: 8 });
  /* ページ名: タイトルから「複数ページで共通する末尾（サイト名など）」を繰り返し剥がす */
  const SEP = /\s*[|｜]\s*/;
  let titles = pg.map((r) => (r.dimensionValues[1].value || r.dimensionValues[0].value).split(SEP));
  for (let pass = 0; pass < 3; pass++) {
    const lastCount = {};
    for (const t of titles) if (t.length > 1) lastCount[t[t.length - 1]] = (lastCount[t[t.length - 1]] || 0) + 1;
    const common = Object.keys(lastCount).filter((k) => lastCount[k] >= 2);
    if (!common.length) break;
    titles = titles.map((t) => (t.length > 1 && common.includes(t[t.length - 1]) ? t.slice(0, -1) : t));
  }
  const topPages = pg.slice(0, 5).map((r, i) => ({
    title: (cfg.pageNames || {})[r.dimensionValues[0].value] || titles[i].join("｜") || r.dimensionValues[0].value,
    views: Number(r.metricValues[0].value),
  }));

  let nowQueries = [], almostQueries = [];
  try {
    const q = await sc.searchanalytics.query({ siteUrl: cfg.scSite, requestBody: { startDate: range.startDate, endDate: range.endDate, dimensions: ["query"], rowLimit: 100 } });
    const rows = q.data.rows || [];
    nowQueries = rows.filter((r) => r.clicks > 0).sort((a, b) => b.clicks - a.clicks).slice(0, 6)
      .map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions }));
    almostQueries = rows.filter((r) => r.clicks === 0 && r.position >= 8 && r.position <= 30).sort((a, b) => b.impressions - a.impressions).slice(0, 6)
      .map((r) => ({ query: r.keys[0], impressions: r.impressions, position: r.position }));
  } catch (e) {
    console.error("Search Console 取得できず:", e.message);
  }

  /* 階段: auto2段 + manualSteps */
  const g = byYm[ym], gp = prevYm ? byYm[prevYm] : null;
  const funnel = [
    { label: "HPに来た", unit: "人", value: g.users, prev: gp ? gp.users : null },
    ...(cfg.ctaEvent ? [{ label: cfg.ctaLabel || "LINEボタンを押した", unit: "件", value: g.line, prev: gp ? gp.line : null }] : []),
    ...(cfg.manualSteps || []).filter((s) => !s.hideInFunnel).map((s) => ({ label: s.label, unit: s.unit || "件", value: manual[s.key] ?? null, prev: prevManual[s.key] ?? null })),
  ];

  /* 改善ポイント: 手動指定が無ければ、通過率が一番低い段（値のある範囲）を選ぶ */
  let focus = manual.focus;
  if (focus == null) {
    let worst = null;
    for (let i = 1; i < funnel.length; i++) {
      const a = funnel[i - 1].value, b = funnel[i].value;
      if (a == null || b == null || a === 0) continue;
      const rate = b / a;
      if (worst == null || rate < worst.rate) worst = { i, rate };
    }
    focus = worst ? worst.i : undefined;
  }

  months.push({
    label: ymFull(ym),
    hitokoto: manual.hitokoto || `${ymFull(ym)}は、HPに来た人が${gp?.users ?? "—"}人→${g.users ?? "—"}人でした。（この一言は送る前に書き換えてください）`,
    funnel,
    focus,
    focusText: manual.focusText || "",
    device: { mobile: Math.round((mob / tot) * 100), desktop: Math.round((pc / tot) * 100) },
    topPages,
    nowQueries,
    almostQueries,
    recommends: manual.recommends || [],
  });
}

/* ── いつもの表 ── */
const t = cfg.targets || {};
const mrow = (key) => ymList.map((ym) => ((cfg.manual || {})[`${ym.slice(0, 4)}-${ym.slice(4)}`] || {})[key] ?? null);
const table = {
  months: ymList.map(ymLabel),
  rows: [
    { label: "HPに来た人数", target: t.users ?? null, values: ymList.map((ym) => byYm[ym].users) },
    { label: "HPが見られた回数", target: t.views ?? null, values: ymList.map((ym) => byYm[ym].views) },
    ...(cfg.lpProperty ? [
      { label: "LPに来た人数", target: t.lpUsers ?? null, values: ymList.map((ym) => lpByYm[ym].users) },
      { label: "LPが見られた回数", target: t.lpViews ?? null, values: ymList.map((ym) => lpByYm[ym].views) },
    ] : []),
    ...(cfg.ctaEvent ? [{ label: `${cfg.ctaLabel || "LINEボタンを押した"}数`, target: t.line ?? null, values: ymList.map((ym) => byYm[ym].line) }] : []),
    ...(cfg.manualSteps || []).map((s) => ({ label: s.tableLabel || s.label, target: t[s.key] ?? null, values: mrow(s.key) })),
  ],
};

const data = { client: cfg.client, generatedAt: new Date().toISOString().slice(0, 10), table, months };
const outJson = cfgPath.replace(/\.config\.json$/, ".data.json");
writeFileSync(outJson, JSON.stringify(data, null, 2));
console.log("データ:", outJson);
execFileSync("node", [here + "generate.mjs", outJson, cfgPath.replace(/\.config\.json$/, ".html")], { stdio: "inherit" });
