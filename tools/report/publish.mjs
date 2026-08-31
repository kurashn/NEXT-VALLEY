// レポートを配信リポジトリへ反映: node tools/report/publish.mjs clients/<name>.config.json
// config の token を使い ../nextvalley-reports/r/<token>/index.html へコピーして push（Vercelが自動デプロイ）
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const cfgPath = process.argv[2];
const here = fileURLToPath(new URL(".", import.meta.url));
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
if (!cfg.token) {
  cfg.token = crypto.randomBytes(16).toString("hex");
  writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  console.log("トークンを新規発行しました");
}
const html = cfgPath.replace(/\.config\.json$/, ".html");
if (!existsSync(html)) { console.error("先に fetch.mjs を実行してください:", html); process.exit(1); }
const repo = fileURLToPath(new URL("../../../nextvalley-reports/", import.meta.url));
const dir = repo + "r/" + cfg.token;
mkdirSync(dir, { recursive: true });
copyFileSync(html, dir + "/index.html");
execSync(`git add -A && git -c user.name=shun -c user.email=ks19980207@gmail.com commit -q -m "update report" || true`, { cwd: repo, shell: "/bin/zsh" });
execSync(`export T=$(gh auth token --user kurashn) && git -c credential.helper= -c credential.helper='!f(){ echo "username=x-access-token"; echo "password=$T"; };f' push -q origin main`, { cwd: repo, shell: "/bin/zsh" });
console.log("反映しました → /r/" + cfg.token + "/");
