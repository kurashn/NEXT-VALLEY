// 月次レポート生成: node tools/report/generate.mjs <data.json> [出力.html]
// データ(JSON)から、スマホ/PC/印刷対応の1枚HTMLを作る。外部読み込みなしの自己完結ファイル。
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

const monthsHead = d.months.map((m, i) => `<th class="${i === d.months.length - 1 ? "now" : ""}">${esc(m)}</th>`).join("");
const tableRows = d.rows
  .map((r) => {
    const cells = r.values
      .map((v, i) => `<td class="${i === r.values.length - 1 ? "now" + hit(v, r.target) : ""}">${num(v)}</td>`)
      .join("");
    return `<tr><th scope="row">${esc(r.label)}${r.auto ? "" : ' <span class="hand" title="手入力">✍</span>'}</th><td class="target">${r.target == null ? "—" : num(r.target)}</td>${cells}</tr>`;
  })
  .join("");

const funnel = d.funnel
  .map(
    (f, i) => `
  <div class="step">
    <p class="step-label">${i > 0 ? '<span class="step-arrow" aria-hidden>→</span>' : ""}${esc(f.label)}</p>
    <p class="step-value">${num(f.value)}<span class="step-unit">${f.label.includes("来た") ? "人" : "件"}</span></p>
    <p class="step-diff">${diff(f.value, f.prev)}</p>
  </div>`
  )
  .join("");

const pages = d.topPages
  .map((p, i) => {
    const max = d.topPages[0].views || 1;
    return `<li><span class="rank">${i + 1}</span><span class="pt">${esc(p.title)}</span><span class="bar" style="width:${Math.round((p.views / max) * 100)}%"></span><span class="pv">${num(p.views)}回</span></li>`;
  })
  .join("");

const queries = d.almostQueries
  .map(
    (q) => `<tr><td class="q">${esc(q.query)}</td><td>${num(q.impressions)}回</td><td>${q.position.toFixed(0)}位くらい</td></tr>`
  )
  .join("");

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(d.client)}様 月次レポート ${esc(d.period)}</title>
<style>
  :root{--navy:#041627;--navy-sub:#5a7184;--coral:#e26c5c;--coral-deep:#b8452f;--cream:#f3f1ec;--line:#e5e5e5;--ink:#1f1a14;--ok:#0a7a44;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--cream);color:var(--ink);font-family:"Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP",system-ui,sans-serif;line-height:1.9;font-feature-settings:"palt" 1;-webkit-text-size-adjust:100%}
  .sheet{max-width:960px;margin:0 auto;padding:16px 16px 48px}
  header{background:var(--navy);color:#fff;border-radius:16px;padding:24px 24px 20px;margin-bottom:16px}
  header .brand{display:flex;align-items:center;gap:10px;font-weight:bold;letter-spacing:.12em;font-size:13px;color:#fff}
  header .brand .mark{width:18px;height:18px;background:var(--coral);clip-path:polygon(0 0,100% 0,0 100%)}
  h1{font-size:clamp(1.25rem,4vw,1.75rem);margin:10px 0 2px;line-height:1.5}
  header .period{color:#c8d3dc;font-size:14px;margin:0}
  section{background:#fff;border-radius:16px;padding:20px;margin-bottom:16px;border:1px solid var(--line)}
  h2{font-size:16px;margin:0 0 12px;color:var(--navy);border-left:4px solid var(--coral);padding-left:10px;line-height:1.6}
  .hitokoto{font-size:15px;background:#fdf6f0;border-radius:12px;padding:14px 16px;margin:0}
  .funnel{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .step{background:var(--cream);border-radius:12px;padding:10px 12px;min-width:0}
  .step-label{margin:0;font-size:12px;font-weight:bold;color:var(--navy-sub)}
  .step-arrow{color:var(--coral);margin-right:4px}
  .step-value{margin:0;font-size:28px;font-weight:bold;color:var(--navy);font-variant-numeric:tabular-nums}
  .step-unit{font-size:12px;font-weight:normal;color:var(--navy-sub);margin-left:2px}
  .step-diff{margin:0;font-size:11px}
  .up{color:var(--ok);font-weight:bold}.down{color:var(--coral-deep);font-weight:bold}.flat{color:var(--navy-sub)}
  .scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
  table{border-collapse:collapse;width:100%;font-size:13px;white-space:nowrap}
  thead th{background:var(--navy);color:#fff;padding:8px 10px;font-size:12px;position:sticky;top:0}
  thead th.target{background:var(--coral-deep)}
  thead th.now{background:#eef4f9;color:var(--navy)}
  tbody th{text-align:left;padding:8px 10px;background:var(--cream);font-size:12px;position:sticky;left:0;white-space:normal;min-width:11em;line-height:1.5}
  tbody td{padding:8px 10px;text-align:right;border-bottom:1px solid var(--line);font-variant-numeric:tabular-nums}
  td.target{color:var(--coral-deep);font-weight:bold;background:#fdf3f0}
  td.now,th.now{background:#eef4f9;font-weight:bold}
  td.now.ok{color:var(--ok)}
  .hand{font-size:10px;color:var(--navy-sub)}
  .legend{font-size:11px;color:var(--navy-sub);margin:8px 0 0}
  .device{display:flex;border-radius:9999px;overflow:hidden;height:34px;font-size:13px;font-weight:bold;color:#fff}
  .device .m{background:var(--coral);display:flex;align-items:center;padding-left:12px}
  .device .p{background:var(--navy);display:flex;align-items:center;justify-content:flex-end;padding-right:12px}
  ol.pages{list-style:none;margin:0;padding:0}
  ol.pages li{display:grid;grid-template-columns:24px minmax(8em,1fr) minmax(40px,120px) auto;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px}
  .rank{width:22px;height:22px;border-radius:50%;background:var(--cream);color:var(--navy);font-weight:bold;font-size:11px;display:flex;align-items:center;justify-content:center}
  .pt{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .bar{height:8px;border-radius:4px;background:var(--coral);opacity:.85;justify-self:start}
  .pv{font-variant-numeric:tabular-nums;color:var(--navy-sub);white-space:nowrap}
  table.qt{white-space:normal}
  table.qt td{text-align:left;font-size:13px}
  table.qt td.q{font-weight:bold}
  .next{background:var(--navy);color:#fff;border-radius:12px;padding:14px 16px;font-size:15px;font-weight:bold;margin:0;line-height:1.8}
  .next .tag{display:inline-block;background:var(--coral);border-radius:4px;font-size:11px;padding:1px 8px;margin-right:8px;vertical-align:2px}
  footer{color:var(--navy-sub);font-size:11px;text-align:center}
  @media(max-width:640px){.funnel{grid-template-columns:repeat(2,1fr)}.step-value{font-size:24px}}
  @media print{
    body{background:#fff}.sheet{padding:0;max-width:none}
    section,header{border-radius:0;margin-bottom:10px;border:none;padding:12px 0}
    header{background:#fff;color:var(--navy);padding:0 0 4px}
    header .period{color:var(--navy-sub)}
    .scroll{overflow:visible}
    .next{background:#fff;color:var(--navy);border:2px solid var(--navy)}
  }
</style>
</head>
<body>
<div class="sheet">
  <header>
    <p class="brand"><span class="mark"></span>NEXT VALLEY 月次レポート</p>
    <h1>${esc(d.client)}様</h1>
    <p class="period">${esc(d.period)}分（作成日 ${esc(d.generatedAt)}）</p>
  </header>

  <section>
    <h2>今月のひとこと</h2>
    <p class="hitokoto">${esc(d.hitokoto)}</p>
  </section>

  <section>
    <h2>今月の階段 — お客様がどこまで進んだか</h2>
    <div class="funnel">${funnel}</div>
  </section>

  <section>
    <h2>いつもの表 — 月ごとのうごき</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>説明</th><th class="target">目標値</th>${monthsHead}</tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <p class="legend">✍ は手で数えている項目。今月の列で<span style="color:var(--ok);font-weight:bold">緑の数字</span>は目標達成です。スマホでは表を横にスクロールできます。</p>
  </section>

  <section>
    <h2>見ている端末</h2>
    <div class="device" role="img" aria-label="スマホ${d.device.mobile}% パソコン${d.device.desktop}%">
      <div class="m" style="width:${d.device.mobile}%">スマホ ${d.device.mobile}%</div>
      <div class="p" style="width:${d.device.desktop}%">PC ${d.device.desktop}%</div>
    </div>
    <p class="legend">写真や文章は、スマホでどう見えるかを基準に用意するのがおすすめです。</p>
  </section>

  <section>
    <h2>よく見られたページ トップ5</h2>
    <ol class="pages">${pages}</ol>
  </section>

  <section>
    <h2>もう少しで見つかる検索の言葉</h2>
    <div class="scroll">
      <table class="qt">
        <thead><tr><th>検索の言葉</th><th>表示された回数</th><th>今の順位</th></tr></thead>
        <tbody>${queries}</tbody>
      </table>
    </div>
    <p class="legend">検索結果に出てはいるものの、まだ押されにくい位置にある言葉です。ここを来月の改善のタネにします。</p>
  </section>

  ${d.mapNote ? `<section><h2>Googleマップ</h2><p class="hitokoto">${esc(d.mapNote)}</p></section>` : ""}

  <section>
    <h2>来月やること</h2>
    <p class="next"><span class="tag">NEXT</span>${esc(d.nextAction)}</p>
  </section>

  <footer>集計: Googleアナリティクス・Google Search Console／LINEの数字は管理画面から。NEXT VALLEY（www.nextvalley-jpn.com）</footer>
</div>
</body>
</html>`;

writeFileSync(outPath, html);
console.log("書き出し:", outPath);
