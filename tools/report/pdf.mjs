// PDF書き出し: node tools/report/pdf.mjs clients/<name>.html [出力.pdf]
// 印刷スタイル（タブ非表示・最新月のみ）でA4縦のPDFにする。LINEで送るのはこのPDFが確実。
import { pathToFileURL, fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(fileURLToPath(new URL("../../package.json", import.meta.url)));
const { chromium } = require("playwright");
const src = process.argv[2];
const out = process.argv[3] || src.replace(/\.html$/, ".pdf");
const b = await chromium.launch();
const p = await b.newPage();
await p.goto(pathToFileURL(src).href);
await p.emulateMedia({ media: "print" });
await p.pdf({ path: out, format: "A4", printBackground: true, margin: { top: "10mm", bottom: "10mm", left: "8mm", right: "8mm" } });
await b.close();
console.log("PDF:", out);
