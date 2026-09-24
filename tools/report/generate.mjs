// 月次レポート生成: node tools/report/generate.mjs <data.json> [出力.html]
// データ(JSON)から、月タブ切替つきの自己完結HTML（スマホ/PC/印刷対応）を作る。
import { readFileSync, writeFileSync } from "node:fs";

const dataPath = process.argv[2] || new URL("./sample-data.json", import.meta.url).pathname;
const outPath = process.argv[3] || dataPath.replace(/\.json$/, ".html");
const d = JSON.parse(readFileSync(dataPath, "utf8"));

/* 連絡手段の言い回し（config の channel: "line"（既定）| "mail"） */
const ch = d.channel === "mail"
  ? { flow: "HP → メール → 無料体験 → 入会", send: "メールでご連絡ください", legend: "お問い合わせから下は、先生からお知らせいただいた数字です。", foot: "お問い合わせ・体験・入会の数字は先生からのご報告" }
  : { flow: "HP → LINE → 無料体験 → 入会", send: "LINEでご連絡ください", legend: "友だち追加から下は、LINEの管理画面などから手で集計している数字です。", foot: "LINEの数字は管理画面から" };
/* 業種に合わせた言い回し（config の channelText で上書き。未指定なら上の既定） */
if (d.channelText) Object.assign(ch, d.channelText);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (v) => (v === null || v === undefined || v === "" ? "—" : Number(v).toLocaleString("ja-JP"));
const diff = (v, p) => {
  if (v == null || p == null) return "";
  if (v > p) return `<span class="up">▲ 先月 ${num(p)}</span>`;
  if (v < p) return `<span class="down">▼ 先月 ${num(p)}</span>`;
  return `<span class="flat">→ 先月と同じ</span>`;
};
const hit = (v, t) => (t == null || v == null ? "" : v >= t ? " ok" : "");
const rate = (a, b) => (a == null || !b ? null : Math.round((a / b) * 100));

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
        <p class="step-diff">${f.note ? `<span class="step-note">${esc(f.note)}</span>` : diff(f.value, f.prev)}</p>
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
      <li class="rec"><details>
        <summary>
          <span class="rec-head"><span class="rec-title"><span class="rec-no">${marks[i] || i + 1}</span>${esc(r.title)}</span>
          <span class="rec-plan${(r.plan || "").includes("集客サポート") ? " support" : (r.plan || "").includes("お知らせください") ? " ask" : ""}">${esc(r.plan)}</span></span>
          <span class="rec-toggle" aria-hidden="true"></span>
        </summary>
        <p class="rec-why">${esc(r.why)}</p>
      </details></li>`
    )
    .join("");
  const tips = m.selfTips || [];
  const tipsHtml = tips.length
    ? `
    <section>
      <h2>今月の発信ネタ — お時間があれば</h2>
      <p class="tips-note">やらなくても大丈夫です。もしInstagramやブログを書く余裕があれば、こんな内容が効きます。</p>
      <ul class="tips">${tips.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>`
    : "";
  const isDone = (x) => (x.r.plan || "").includes("対応済み");
  const inPlan = m.recommends.map((r, i) => ({ r, i })).filter((x) => (x.r.plan || "").includes("範囲内"));
  const isAsk = (x) => (x.r.plan || "").includes("お知らせください");
  const outPlan = m.recommends.map((r, i) => ({ r, i })).filter((x) => !(x.r.plan || "").includes("範囲内") && !isDone(x) && !isAsk(x));
  const supportRecs = outPlan.filter((x) => (x.r.plan || "").includes("集客サポート"));
  const recCta = [
    inPlan.length
      ? `${inPlan.map((x) => marks[x.i] || x.i + 1).join("")}は${inPlan.every((x) => (x.r.plan || "").includes("保守")) ? "保守" : "集客サポート"}の範囲内ですので、今月中にこちらで対応します（ご都合が悪い場合はお知らせください）。`
      : "",
    outPlan.length
      ? `${outPlan.map((x) => marks[x.i] || x.i + 1).join("")}をご希望の場合は、${ch.send ? ch.send + "。" : ""}ご案内します。`
      : "",
  ].filter(Boolean).join(" ");

  return `
  <div class="panel" data-panel="${idx}" ${idx === d.months.length - 1 ? "" : "hidden"}>
    <section>
      <h2>${esc(m.label.replace(/^\d+年/, ""))}のひとこと</h2>
      <p class="hitokoto">${esc(m.hitokoto)}</p>
    </section>

    <section>
      <h2>集客の流れ — ${ch.flow}</h2>
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

    ${m.recommends.length ? `<section class="rec-section">
      <div class="rec-top"><h2>今月の推奨 — 次にやると効くこと</h2><button type="button" class="rec-all">すべて開く</button></div>
      <p class="rec-hint">項目をタップすると、理由が開きます。</p>
      <ul class="recs">${recs}</ul>
      <p class="rec-cta">${recCta}</p>
      ${d.planLink ? `<p class="rec-plan-link">${supportRecs.length ? supportRecs.map((x) => marks[x.i] || x.i + 1).join("") + "のような改善を" : "こうした改善を"}、毎月まとめてお任せいただける<span style="white-space:nowrap">「集客サポート」</span>も始めました。<a href="${esc(d.planLink)}">集客サポートの詳細を見る →</a></p>` : ""}
    </section>
    ${tipsHtml}` : ""}
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
  header{background:#fff;color:var(--navy);border:1px solid var(--line);border-radius:16px;padding:24px 24px 20px;margin-bottom:12px}
  header .brand{display:flex;align-items:center;gap:10px;font-weight:bold;letter-spacing:.12em;font-size:13px}
  header .brand .mark{width:18px;height:18px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABkCAYAAACfIP5qAAABqklEQVR4nO3ZsQ3CQBAFUYNcAAUimYSMjkigNSpwAUigS0gIATG7fya3ZenJPt/e5nbaPybDdJzXzfbfD2HviQJMFGCiABMFmCjARAEmCjBRgIkCTBRgogATBZgowOYPr78e5/XwpWexL70py/m+u3x4D/vB50sY6JoiDHShFwb69yUM9JdYGOg+RRjo5lEY6I5eGOiYRRjo7EsY6EBSGOiUWBjo6F4Y6HmKMNBDLmGgJ4/CAFFGwgBRRsIAUUbCAFFGizA8lFE8DBFlSoehokTDkFFiYegokTAVUOJgqqBEwVRCiYGphhIBUxGlPUxVlNYwlVHawlRHaQnTAaUdTBeUVjCdUNrAdENpAdMRpTxMV5TSMJ1RysJ0RykJk4BSDiYFpRRMEkoZmDSUEjCJKHiYVBQ0TDIKFiYdBQkjChBGFCCMKEAYUYAwogBhRAHCiAKEEQUIIwoQRhQgjChAGFGAMKIAYUQBwogChBEFCCMKEEYUIIwoQBhRgDCiAGFEAcKIAoQRBQgjChBGFCCMKEAYUYAwogBhRAHCiAKEEQUIIwoQRpQJ0wvmCZZZ5Z8A+zR0AAAAAElFTkSuQmCC) center/contain no-repeat}
  h1{font-size:clamp(1.25rem,4vw,1.75rem);margin:10px 0 2px;line-height:1.5}
  header .period{color:var(--navy-sub);font-size:13px;margin:0}
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
  .step-note{font-size:11.5px;color:var(--navy-sub);line-height:1.5;display:block}
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
  .rec{background:rgba(255,255,255,.06);border-radius:12px;padding:0}
  .rec summary{list-style:none;cursor:pointer;display:flex;align-items:flex-start;gap:10px;padding:12px 14px;min-height:44px}
  .rec summary::-webkit-details-marker{display:none}
  .rec-head{flex:1;min-width:0}
  .rec-title{display:block;margin:0;color:#fff;font-weight:bold;font-size:15px;line-height:1.7}
  .rec-toggle{flex:0 0 auto;width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.35);position:relative;margin-top:2px}
  .rec-toggle::before,.rec-toggle::after{content:"";position:absolute;left:50%;top:50%;width:10px;height:2px;background:#fff;transform:translate(-50%,-50%)}
  .rec-toggle::after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .2s}
  details[open] .rec-toggle::after{transform:translate(-50%,-50%) rotate(0deg)}
  .rec details > .rec-why{padding:0 14px 12px;margin:0}
  .rec-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:4px}
  .rec-top h2{margin-bottom:0}
  .rec-all{flex:0 0 auto;min-height:44px;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;border-radius:9999px;padding:0 14px;font-size:13px;font-weight:bold;cursor:pointer}
  .rec-hint{margin:6px 0 10px;color:#c8d3dc;font-size:12px}
  .rec-no{color:var(--coral);margin-right:6px}
  .rec-why{margin:2px 0 0;color:#c8d3dc;font-size:13px}
  .rec-plan{margin:6px 0 0;display:inline-block;background:var(--coral);color:#fff;font-size:11px;font-weight:bold;border-radius:4px;padding:1px 8px}
  .rec-plan.support{background:#2C8FA8}
  .rec-plan.ask{background:transparent;border:1px solid #c8d3dc;color:#c8d3dc}
  .tips-note{font-size:12px;color:#777;margin:0 0 8px}
  .tips{margin:0;padding-left:1.3em;font-size:14px;line-height:2}
  .rec-cta{margin:14px 0 0;color:#fff;font-size:13px;border-top:1px solid rgba(255,255,255,.2);padding-top:12px}
  .rec-plan-link{margin:10px 0 0;color:#c8d3dc;font-size:13px}
  .rec-plan-link a{display:inline-flex;align-items:center;min-height:44px;color:#fff;font-weight:bold;text-decoration:underline;text-underline-offset:4px;margin-left:4px}
  footer{color:var(--navy-sub);font-size:11px;text-align:center}
  @media print{
    body{background:#fff}.sheet{padding:0;max-width:none}
    .tabs{display:none}
    .panel[hidden]{display:none}
    section,header{border-radius:0;margin-bottom:10px;border:none;padding:12px 0}
    header{padding:0 0 4px;border:none}
    .scroll{overflow:visible}
    .rec-section{background:#fff;border:2px solid var(--navy)}
    .rec-section h2,.rec-title,.rec-cta,.rec-plan-link,.rec-plan-link a{color:var(--navy)}
    .rec-all,.rec-hint,.rec-toggle{display:none}
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
    <h2>月ごとの数字 — 全期間のうごき</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>説明</th><th class="target">目標値</th>${monthsHead}</tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <p class="legend">${ch.legend}今月の列で<span style="color:var(--ok);font-weight:bold">緑の数字</span>は目標達成。スマホでは表を横にスクロールできます。</p>
  </section>

  <footer>集計: Googleアナリティクス・Google Search Console${ch.foot ? "／" + ch.foot : ""}。NEXT VALLEY（www.nextvalley-jpn.com）</footer>
</div>
<script>
  (function(){
    var tabs=document.querySelectorAll('.tab'),panels=document.querySelectorAll('.panel');
    document.querySelectorAll('.rec-all').forEach(function(btn){btn.addEventListener('click',function(){
      var list=btn.closest('.rec-section').querySelectorAll('details');
      var open=Array.prototype.some.call(list,function(d){return !d.open});
      list.forEach(function(d){d.open=open});btn.textContent=open?'すべて閉じる':'すべて開く';
    })});
    window.addEventListener('beforeprint',function(){document.querySelectorAll('.rec details').forEach(function(d){d.open=true})});
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
