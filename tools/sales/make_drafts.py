#!/usr/bin/env python3
"""営業メールをGmailの下書きに自動作成する。

使い方:
  python3 tools/sales/make_drafts.py docs/sales/prospect-round4.csv            # プレビューのみ（tools/sales/out/ に保存）
  python3 tools/sales/make_drafts.py docs/sales/prospect-round4.csv --drafts   # Gmail下書きフォルダに作成
  複数のCSVをまとめて渡せる。優先度（S/A/B）順に並べ、Gmailの一覧で上に来るよう日付をずらす。
CSVの「連絡手段」列にメールアドレスがある行だけが対象。「接触状況」が「未」以外の行は飛ばす。\n「提案」列で hp（ホームページ提案・既定）／marketing（マーケ提案・「指摘」列の1行が必要）を切り替える。
"""
import csv, json, os, re, sys, imaplib, time, stat

# ── 安全装置 ──────────────────────────────────────────────
# このスクリプトは Gmail の「下書き」フォルダにメールを置くだけで、送信する機能を持たない。
# smtplib（送信ライブラリ）は意図的に読み込まない。送信は必ず人がGmailで行う。
def find_drafts_folder(imap):
    """言語設定に関係なく、\\Drafts 属性が付いたフォルダ（Gmailの下書き）を探す"""
    import re as _re
    typ, data = imap.list()
    for d in data:
        line = d.decode("utf-8", "replace")
        if "\\Drafts" in line:
            m = _re.search(r' "?/"? (.+)$', line)
            name = m.group(1).strip() if m else None
            if name: return name if name.startswith('"') else f'"{name}"'
    raise RuntimeError("下書きフォルダが見つかりません（IMAPでの表示が無効の可能性）")
assert "smtplib" not in sys.modules, "送信ライブラリが読み込まれています。このツールは送信禁止です"
# ──────────────────────────────────────────────────────────
from email.message import EmailMessage
from email.header import Header
from email.utils import formataddr, formatdate, make_msgid

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
cfg = json.load(open(os.path.join(ROOT, "tools/sales/config.json")))
def load_template(key):
    path = cfg["templates"].get(key) or cfg["templates"][cfg["default_template"]]
    tpl = open(os.path.join(ROOT, path), encoding="utf-8").read()
    subject_line, body = tpl.split("\n", 1)
    return subject_line.replace("件名:", "").strip(), body.lstrip("\n")

def load_env():
    p = os.path.join(ROOT, "tools/sales/.env")
    if not os.path.exists(p): return {}
    os.chmod(p, stat.S_IRUSR | stat.S_IWUSR)  # 自分以外は読めないようにする（600）
    return dict(l.strip().split("=", 1) for l in open(p) if "=" in l and not l.startswith("#"))

def clean_name(raw):
    return re.sub(r"（.*?）|\(.*?\)", "", raw).strip()

def build(row):
    name = clean_name(row["事業者名"])
    m = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", row["連絡手段"])
    if not m: return None
    kind = (row.get("提案") or cfg["default_template"]).strip() or cfg["default_template"]
    subject, body_tpl = load_template(kind)
    point = (row.get("指摘") or "").strip()
    if kind == "marketing" and not point:
        print(f"  ⚠ {name}: マーケ提案には「指摘」列が必要です。スキップ"); return None
    body = body_tpl.replace("{name}", name).replace("{point}", point)
    subject = subject.replace("{name}", name)
    msg = EmailMessage()
    msg["From"] = formataddr((str(Header(cfg["from_name"], "utf-8")), cfg["from_email"]))
    msg["To"] = m.group(0)
    msg["Subject"] = subject
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid()
    msg.set_content(body, charset="utf-8")
    for rel in cfg.get("attachments", {}).get(kind, []):
        ap = os.path.join(ROOT, rel)
        if os.path.exists(ap):
            with open(ap, "rb") as fh:
                msg.add_attachment(fh.read(), maintype="application", subtype="pdf", filename=os.path.basename(ap))
    return name, m.group(0), body, msg, subject, kind

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    csv_paths = [a for a in sys.argv[1:] if not a.startswith("--")]
    to_drafts = "--drafts" in sys.argv
    rows = []
    for csv_path in csv_paths:
        rows += list(csv.DictReader(open(csv_path, encoding="utf-8")))
    # 優先度（S > A > B）の順に並べる。Gmailの下書きは新しい順に表示されるので、
    # 優先度が高いものほど新しい日付を付けて、一覧の上に来るようにする。
    rank = {"S": 0, "A": 1, "B": 2}
    rows.sort(key=lambda r: rank.get((r.get("優先度") or "B").strip()[:1], 3))
    targets = []
    for r in rows:
        if r.get("接触状況", "未").strip() not in ("未", ""): continue
        b = build(r)
        if b: targets.append(b)
    for idx, (name, to, body, msg, subject, kind) in enumerate(targets):
        del msg["Date"]
        msg["Date"] = formatdate(time.time() - idx * 60, localtime=True)
    if not targets:
        print("対象なし"); return
    out = os.path.join(ROOT, "tools/sales/out"); os.makedirs(out, exist_ok=True)
    for name, to, body, msg, subject, kind in targets:
        with open(os.path.join(out, f"{name}.txt"), "w", encoding="utf-8") as f:
            f.write(f"To: {to}\n件名: {subject}\n\n{body}")
    print(f"プレビュー {len(targets)}件 → tools/sales/out/")
    for name, to, body, msg, subject, kind in targets: print(f"  ・[{kind}] {name} <{to}>")
    if not to_drafts:
        print("\n下書きに入れるには --drafts を付けて再実行"); return
    pw = load_env().get("GMAIL_APP_PASSWORD", "").replace(" ", "")
    if not pw:
        print("\n⚠ tools/sales/.env に GMAIL_APP_PASSWORD を記入してください（.env.example 参照）"); sys.exit(1)
    imap = imaplib.IMAP4_SSL(cfg["imap_host"])
    imap.login(cfg.get("login_email", cfg["from_email"]), pw)
    DRAFTS_FOLDER = find_drafts_folder(imap)
    imap.select(DRAFTS_FOLDER)
    ok = 0
    for name, to, body, msg, subject, kind in targets:
        # 同じ宛先の古い下書きがあれば置き換える（重複防止）
        typ0, old = imap.search(None, "TO", f'"{to}"')
        ids = old[0].split() if typ0 == "OK" else []
        for i in ids: imap.store(i, "+FLAGS", "\\Deleted")
        if ids: imap.expunge(); print(f"  ↺ 古い下書き{len(ids)}件を置き換え: {name}")
        typ, _ = imap.append(DRAFTS_FOLDER, "", imaplib.Time2Internaldate(time.time()), msg.as_bytes())
        if typ == "OK": ok += 1
        print(f"  {'✓' if typ=='OK' else '✗'} 下書き: {name}")
    imap.logout()
    print(f"\nGmailの下書きフォルダに {ok}/{len(targets)} 件作成しました（送信はしていません）。Gmailを開いて内容を確認し、1通ずつ送信してください。")

if __name__ == "__main__":
    main()
