// 月次レポート生成: node tools/report/generate.mjs <data.json> [出力.html]
// データ(JSON)から、月タブ切替つきの自己完結HTML（スマホ/PC/印刷対応）を作る。
import { readFileSync, writeFileSync } from "node:fs";

const dataPath = process.argv[2] || new URL("./sample-data.json", import.meta.url).pathname;
const outPath = process.argv[3] || dataPath.replace(/\.json$/, ".html");
const d = JSON.parse(readFileSync(dataPath, "utf8"));

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (v) => (v === null || v === undefined || v === "" ? "—" : Number(v).toLocaleString("ja-JP"));
const diff = (v, p) => {
  if (v == null || p == null) return "";
  if (v > p) return `<span class="up">▲ 先月 ${num(p)}</span>`;
  if (v < p) return `<span class="down">▼ 先月 ${num(p)}</span>`;
  return `<span class="flat">→ 先月と同じ</span>`;
};
const hit = (v, t) => (t == null || v == null ? "" : v >= t ? " ok" : "");
const rate = (a, b) => (b ? Math.round((a / b) * 100) : null);

/* ── いつもの表（全期間・共通） ── */
const monthsHead = d.table.months.map((m, i) => `<th class="${i === d.table.months.length - 1 ? "now" : ""}">${esc(m)}</th>`).join("");
const tableRows = d.table.rows
  .map((r) => {
    const cells = r.values.map((v, i) => `<td class="${i === r.values.length - 1 ? "now" + hit(v, r.target) : ""}">${num(v)}</td>`).join("");
    return `<tr><th scope="row">${esc(r.label)}</th><td class="target">${r.target == null ? "—" : num(r.target)}</td>${cells}</tr>`;
  })
  .join("");

/* ── 月ごとのパネル ── */
const panel = (m, idx) => {
  const funnel = m.funnel
    .map((f, i) => {
      const isFocus = i === m.focus;
      const conv = i > 0 ? rate(f.value, m.funnel[i - 1].value) : null;
      return `
      <div class="step${isFocus ? " focus" : ""}">
        ${isFocus ? '<p class="focus-badge">いま ここを改善</p>' : ""}
        <p class="step-label">${esc(f.label)}</p>
        <p class="step-value">${num(f.value)}<span class="step-unit">${esc(f.unit)}</span></p>
        <p class="step-diff">${diff(f.value, f.prev)}</p>
        ${i < m.funnel.length - 1 ? `<div class="step-next" aria-hidden>↓ <span>${rate(m.funnel[i + 1].value, f.value) ?? "—"}%が次へ</span></div>` : ""}
      </div>`;
    })
    .join("");

  const pages = m.topPages
    .map((p, i) => {
      const max = m.topPages[0].views || 1;
      return `<li><span class="rank">${i + 1}</span><span class="pt">${esc(p.title)}</span><span class="bar" style="width:${Math.round((p.views / max) * 100)}%"></span><span class="pv">${num(p.views)}回</span></li>`;
    })
    .join("");

  const nowQ = m.nowQueries
    .map((q) => `<tr><td class="q">${esc(q.query)}</td><td>${num(q.clicks)}回</td><td>${num(q.impressions)}回</td></tr>`)
    .join("");

  const almostQ = m.almostQueries
    .map((q) => `<tr><td class="q">${esc(q.query)}</td><td>${num(q.impressions)}回</td><td>${q.position.toFixed(0)}位くらい</td></tr>`)
    .join("");

  const marks = ["①", "②", "③", "④", "⑤"];
  const recs = m.recommends
    .map(
      (r, i) => `
      <li class="rec">
        <p class="rec-title"><span class="rec-no">${marks[i] || i + 1}</span>${esc(r.title)}</p>
        <p class="rec-why">${esc(r.why)}</p>
        <p class="rec-plan">${esc(r.plan)}</p>
      </li>`
    )
    .join("");
  const recCta = m.recommends.length
    ? `実施をご希望の場合は、LINEで${m.recommends.map((r, i) => `「${marks[i] || i + 1} ${esc(r.title)}」`).join("、")}のように、番号または内容をそのままお送りください。こちらで進めます。`
    : "";

  return `
  <div class="panel" data-panel="${idx}" ${idx === d.months.length - 1 ? "" : "hidden"}>
    <section>
      <h2>今月のひとこと</h2>
      <p class="hitokoto">${esc(m.hitokoto)}</p>
    </section>

    <section>
      <h2>集客の流れ — HP → LINE → 無料体験 → 入会</h2>
      <div class="funnel">${funnel}</div>
      ${m.focusText ? `<p class="focus-note"><span class="focus-mark" aria-hidden>◎</span>${esc(m.focusText)}</p>` : ""}
    </section>

    <div class="grid2">
      <section>
        <h2>見ている端末</h2>
        <div class="device" role="img" aria-label="スマホ${m.device.mobile}% パソコン${m.device.desktop}%">
          <div class="m" style="width:${m.device.mobile}%">スマホ ${m.device.mobile}%</div>
          <div class="p" style="width:${m.device.desktop}%">PC ${m.device.desktop}%</div>
        </div>
        <p class="legend">写真や文章は、スマホでどう見えるかを基準に用意するのがおすすめです。</p>
      </section>

      <section>
        <h2>よく見られたページ トップ5</h2>
        <ol class="pages">${pages}</ol>
      </section>
    </div>

    <div class="grid2">
      <section>
        <h2>いま見つかっている検索の言葉</h2>
        <div class="scroll">
          <table class="qt">
            <thead><tr><th>検索の言葉</th><th>来た回数</th><th>表示回数</th></tr></thead>
            <tbody>${nowQ}</tbody>
          </table>
        </div>
        <p class="legend">この言葉で検索した人が、実際にサイトへ来ています。</p>
      </section>

      <section>
        <h2>もう少しで見つかる検索の言葉</h2>
        <div class="scroll">
          <table class="qt">
            <thead><tr><th>検索の言葉</th><th>表示回数</th><th>今の順位</th></tr></thead>
            <tbody>${almostQ}</tbody>
          </table>
        </div>
        <p class="legend">表示はされているのに、まだ押されにくい位置にある言葉。改善のタネです。</p>
      </section>
    </div>

    <section class="rec-section">
      <h2>今月の推奨 — 次にやると効くこと</h2>
      <ul class="recs">${recs}</ul>
      ${recCta ? `<p class="rec-cta">${recCta}</p>` : ""}
    </section>
  </div>`;
};

const tabs = d.months
  .map((m, i) => `<button class="tab${i === d.months.length - 1 ? " active" : ""}" data-tab="${i}">${esc(m.label)}</button>`)
  .join("");

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(d.client)}様 月次レポート</title>
<style>
  :root{--navy:#041627;--navy-sub:#5a7184;--coral:#e26c5c;--coral-deep:#b8452f;--cream:#f3f1ec;--line:#e5e5e5;--ink:#1f1a14;--ok:#0a7a44;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--cream);color:var(--ink);font-family:"Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP",system-ui,sans-serif;line-height:1.9;font-feature-settings:"palt" 1;-webkit-text-size-adjust:100%}
  .sheet{max-width:1040px;margin:0 auto;padding:16px 16px 48px}
  header{background:var(--navy);color:#fff;border-radius:16px;padding:24px 24px 20px;margin-bottom:12px}
  header .brand{display:flex;align-items:center;gap:10px;font-weight:bold;letter-spacing:.12em;font-size:13px}
  header .brand .mark{width:18px;height:18px;background:linear-gradient(to bottom right,var(--coral) 50%,#fff 50%);border-radius:2px}
  h1{font-size:clamp(1.25rem,4vw,1.75rem);margin:10px 0 2px;line-height:1.5}
  header .period{color:#c8d3dc;font-size:13px;margin:0}
  .tabs{position:sticky;top:0;z-index:10;display:flex;gap:6px;background:var(--cream);padding:10px 0;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .tab{flex:0 0 auto;border:1px solid var(--line);background:#fff;color:var(--navy-sub);border-radius:9999px;padding:10px 18px;font-size:14px;font-weight:bold;cursor:pointer;min-height:44px}
  .tab.active{background:var(--navy);border-color:var(--navy);color:#fff}
  section{background:#fff;border-radius:16px;padding:20px;margin-bottom:14px;border:1px solid var(--line)}
  h2{font-size:16px;margin:0 0 12px;color:var(--navy);border-left:4px solid var(--coral);padding-left:10px;line-height:1.6}
  .hitokoto{font-size:15px;background:#fdf6f0;border-radius:12px;padding:14px 16px;margin:0}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  @media(max-width:820px){.grid2{grid-template-columns:1fr}}
  .funnel{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
  @media(max-width:960px){.funnel{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:560px){.funnel{grid-template-columns:repeat(2,1fr)}}
  .step{position:relative;background:var(--cream);border:2px solid transparent;border-radius:12px;padding:12px 12px 8px;min-width:0}
  .step.focus{border-color:var(--coral);background:#fdf3f0}
  .focus-badge{position:absolute;top:-11px;left:8px;margin:0;background:var(--coral-deep);color:#fff;font-size:10px;font-weight:bold;border-radius:4px;padding:1px 8px;letter-spacing:.05em}
  .step-label{margin:0;font-size:12px;font-weight:bold;color:var(--navy-sub);line-height:1.5}
  .step-value{margin:0;font-size:26px;font-weight:bold;color:var(--navy);font-variant-numeric:tabular-nums}
  .step-unit{font-size:12px;font-weight:normal;color:var(--navy-sub);margin-left:2px}
  .step-diff{margin:0;font-size:11px;min-height:1.6em}
  .step-next{font-size:10px;color:var(--navy-sub);border-top:1px dashed var(--line);margin-top:6px;padding-top:4px}
  .step-next span{font-weight:bold;color:var(--navy)}
  .focus-note{margin:12px 0 0;font-size:14px;background:#fdf3f0;border:1px solid var(--coral);border-radius:12px;padding:12px 14px}
  .focus-mark{color:var(--coral-deep);font-weight:bold;margin-right:6px}
  .up{color:var(--ok);font-weight:bold}.down{color:var(--coral-deep);font-weight:bold}.flat{color:var(--navy-sub)}
  .scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
  table{border-collapse:collapse;width:100%;font-size:13px;white-space:nowrap}
  thead th{background:var(--navy);color:#fff;padding:8px 10px;font-size:12px}
  thead th.target{background:var(--coral-deep)}
  thead th.now{background:#eef4f9;color:var(--navy)}
  tbody th{text-align:left;padding:8px 10px;background:var(--cream);font-size:12px;position:sticky;left:0;white-space:normal;min-width:11em;line-height:1.5}
  tbody td{padding:8px 10px;text-align:right;border-bottom:1px solid var(--line);font-variant-numeric:tabular-nums}
  td.target{color:var(--coral-deep);font-weight:bold;background:#fdf3f0}
  td.now,th.now{background:#eef4f9;font-weight:bold}
  td.now.ok{color:var(--ok)}
  .legend{font-size:11px;color:var(--navy-sub);margin:8px 0 0}
  .device{display:flex;border-radius:9999px;overflow:hidden;height:34px;font-size:13px;font-weight:bold;color:#fff}
  .device .m{background:var(--coral);display:flex;align-items:center;padding-left:12px}
  .device .p{background:var(--navy);display:flex;align-items:center;justify-content:flex-end;padding-right:12px;min-width:5.5em}
  ol.pages{list-style:none;margin:0;padding:0}
  ol.pages li{display:grid;grid-template-columns:24px minmax(8em,1fr) minmax(40px,110px) auto;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px}
  .rank{width:22px;height:22px;border-radius:50%;background:var(--cream);color:var(--navy);font-weight:bold;font-size:11px;display:flex;align-items:center;justify-content:center}
  .pt{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .bar{height:8px;border-radius:4px;background:var(--coral);opacity:.85;justify-self:start}
  .pv{font-variant-numeric:tabular-nums;color:var(--navy-sub);white-space:nowrap}
  table.qt{white-space:normal}
  table.qt td{text-align:left;font-size:13px}
  table.qt td.q{font-weight:bold}
  .rec-section{background:var(--navy);border:none}
  .rec-section h2{color:#fff;border-left-color:var(--coral)}
  ul.recs{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .rec{background:rgba(255,255,255,.06);border-radius:12px;padding:12px 14px}
  .rec-title{margin:0;color:#fff;font-weight:bold;font-size:15px;line-height:1.7}
  .rec-no{color:var(--coral);margin-right:6px}
  .rec-why{margin:2px 0 0;color:#c8d3dc;font-size:13px}
  .rec-plan{margin:6px 0 0;display:inline-block;background:var(--coral);color:#fff;font-size:11px;font-weight:bold;border-radius:4px;padding:1px 8px}
  .rec-cta{margin:14px 0 0;color:#fff;font-size:13px;border-top:1px solid rgba(255,255,255,.2);padding-top:12px}
  footer{color:var(--navy-sub);font-size:11px;text-align:center}
  @media print{
    body{background:#fff}.sheet{padding:0;max-width:none}
    .tabs{display:none}
    .panel[hidden]{display:none}
    section,header{border-radius:0;margin-bottom:10px;border:none;padding:12px 0}
    header{background:#fff;color:var(--navy);padding:0 0 4px}
    header .period{color:var(--navy-sub)}
    .scroll{overflow:visible}
    .rec-section{background:#fff;border:2px solid var(--navy)}
    .rec-section h2,.rec-title,.rec-cta{color:var(--navy)}
    .rec{background:var(--cream)}
    .rec-why{color:var(--navy-sub)}
  }
</style>
</head>
<body>
<div class="sheet">
  <header>
    <p class="brand"><span class="mark"></span>NEXT VALLEY 月次レポート</p>
    <h1>${esc(d.client)}様</h1>
    <p class="period">最終更新 ${esc(d.generatedAt)}／上のタブで月を切り替えられます</p>
  </header>

  <nav class="tabs" aria-label="月の切り替え">${tabs}</nav>

  ${d.months.map(panel).join("")}

  <section>
    <h2>いつもの表 — 全期間のうごき</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>説明</th><th class="target">目標値</th>${monthsHead}</tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <p class="legend">友だち追加から下は、LINEの管理画面などから手で集計している数字です。今月の列で<span style="color:var(--ok);font-weight:bold">緑の数字</span>は目標達成。スマホでは表を横にスクロールできます。</p>
  </section>

  <footer>集計: Googleアナリティクス・Google Search Console／LINEの数字は管理画面から。NEXT VALLEY（www.nextvalley-jpn.com）</footer>
</div>
<script>
  (function(){
    var tabs=document.querySelectorAll('.tab'),panels=document.querySelectorAll('.panel');
    tabs.forEach(function(t){t.addEventListener('click',function(){
      tabs.forEach(function(x){x.classList.remove('active')});t.classList.add('active');
      panels.forEach(function(p){p.hidden=p.getAttribute('data-panel')!==t.getAttribute('data-tab')});
    })});
  })();
</script>
</body>
</html>`;

writeFileSync(outPath, html);
console.log("書き出し:", outPath);
