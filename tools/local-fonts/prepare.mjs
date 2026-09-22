// ローカルのビルド用：Google Fonts のCSSとフォントファイルを、少しずつ（同時6本）ダウンロードして手元に置く。
// Next.js は本来ビルドのたびに約370ファイルを一斉に取りに行くが、この回線ではその多くが時間切れになるため。
// 使い方: node tools/local-fonts/prepare.mjs  → .local-fonts/mock.js ができる
//        npm run build:local（Turbopack はローカルのフォントを読めないので webpack でビルドする）
// 本番（Vercel）はこの仕組みを使わず、これまでどおり Google から取得する。
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, ".local-fonts");
const FILES = path.join(OUT, "files");
fs.mkdirSync(FILES, { recursive: true });

// Next.js が使うものと同じ（Chrome扱いにして woff2 をもらう）
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36";

const CSS_URLS = [
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap",
  "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Zen+Kurenaido:wght@400&display=swap",
  "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
  "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap",
];

async function fetchWithRetry(url, tries = 6, timeoutMs = 30000) {
  let last;
  for (let i = 0; i < tries; i++) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
      clearTimeout(t);
      if (r.ok) return Buffer.from(await r.arrayBuffer());
      last = new Error("HTTP " + r.status);
    } catch (e) { clearTimeout(t); last = e; }
    await new Promise((res) => setTimeout(res, 800 * (i + 1)));
  }
  throw last;
}

async function pool(items, limit, fn) {
  const results = new Array(items.length); let i = 0;
  await Promise.all(Array.from({ length: limit }, async () => { while (i < items.length) { const k = i++; results[k] = await fn(items[k], k); } }));
  return results;
}

const mock = {};
let total = 0, reused = 0;
for (const cssUrl of CSS_URLS) {
  const css = (await fetchWithRetry(cssUrl)).toString("utf8");
  const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
  const map = {};
  await pool(urls, 6, async (u) => {
    const ext = (/\.(woff2?|ttf|otf|eot)(\?|$)/.exec(u) || [, "woff2"])[1];
    const file = path.join(FILES, crypto.createHash("sha1").update(u).digest("hex") + "." + ext);
    if (fs.existsSync(file) && fs.statSync(file).size > 0) { reused++; }
    else { fs.writeFileSync(file, await fetchWithRetry(u)); }
    map[u] = file; total++;
    if (total % 25 === 0) process.stdout.write(`  ${total} files\n`);
  });
  mock[cssUrl] = css.replace(/url\((https:[^)]+)\)/g, (m, u) => `url(${map[u]})`);
  console.log(`✓ ${decodeURIComponent(cssUrl.split("family=")[1].split("&")[0])}: ${urls.length} files`);
}
fs.writeFileSync(path.join(OUT, "mock.js"), "module.exports = " + JSON.stringify(mock) + ";\n");
console.log(`done: ${total} files (${reused} reused) → ${path.join(OUT, "mock.js")}`);
