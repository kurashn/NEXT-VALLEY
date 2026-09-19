#!/usr/bin/env python3
"""協業の営業先リストを、送る順に並べたページにする。
使い方: python3 tools/sales/partners_page.py → docs/sales/prospect-partners.html"""
import csv, html, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
rows = {r['会社名']: r for r in csv.DictReader(open(f'{ROOT}/docs/sales/prospect-partners.csv', encoding='utf-8'))}
SECTIONS = [
 ('1', 'メールで送る（Gmailの下書きに入っています）', '下書きを開いて、内容を確認して送信するだけです。',
  ['合同会社ギャラクタス', '株式会社シスコム', '株式会社SNSマーケティング', '株式会社キングプロテア', 'ad-bind']),
 ('2', '応募フォームから送る：最優先', '貼る文面は partner-apply.txt。会社名だけ差し替えます。',
  ['株式会社シード', 'ゴッタライド', 'セブンデザイン', '株式会社フロンティア', '株式会社ライトアップ', '合同会社Robse', '株式会社マグネット', '株式会社コモテック']),
 ('3', '応募フォームから送る：制作会社', '貼る文面は partner-apply.txt。',
  ['株式会社クリップ', 'シシハクト株式会社', '株式会社LUK', 'DPD（Duo Partner Design）', '株式会社フィールビー', 'WEBパートナー']),
 ('4', '問い合わせフォームから送る：運用会社', 'こちらは提案メールの本文（partner-propose.txt）を貼ります。',
  ['株式会社VOYAGE', 'Kurofune（クロフネ）', '株式会社ヘリオス', '株式会社オンジン', '株式会社デジタルトレンズ', 'FFC（リスティング広告運用代行専門）', 'CACTAS株式会社']),
 ('×', '送らない・保留', '確認の結果、相性がよくない、または実態がつかめなかった会社です。',
  ['株式会社アンドストーリー', 'リバレスト', 'TONOSAMA', 'TMS Partners株式会社', '株式会社Lumii', 'まちおこし（machi-okoshi）']),
]
e = html.escape
def contact(v):
    out = []
    for part in re.split(r'\s*／\s*', v):
        part = part.strip()
        if part.startswith('http'): out.append(f'<a href="{e(part)}" target="_blank" rel="noopener">ページを開く</a>')
        elif '@' in part: out.append(e(part))
    return '　'.join(out)
used, body, no = set(), '', 0
for key, title, lead, names in SECTIONS:
    body += f'<h2><span class="sec {"x" if key=="×" else ""}">{key}</span>{e(title)}</h2><p class="sl">{e(lead)}</p>'
    for n in names:
        r = rows[n]; used.add(n); skip = key == '×'
        if not skip: no += 1
        body += f'''<article class="{'skip' if skip else ''}" data-k="{e(n)}">
  <label class="chk">{'' if skip else f'<input type="checkbox"><span>送った</span>'}</label>
  <div><h3>{'' if skip else f'<i>{no}</i>'}<a href="{e(r['サイト'])}" target="_blank" rel="noopener">{e(n)}</a></h3>
  <p class="meta">{e(r['種別'])}　｜　{e(r['所在地'])}　｜　{contact(r['連絡先・応募URL'])}</p>
  <p class="d">{e(r['募集内容・特徴'])}</p>{f"<p class='tip'>{e(r['狙い方'])}</p>" if r['狙い方'] and not skip else ''}</div></article>'''
rest = [n for n in rows if n not in used]
assert not rest, f'ページに入っていない会社: {rest}'
page = f'''<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>協業の営業先リスト</title>
<style>
:root{{--ink:#14335A;--sub:#4A5A6E;--line:#DCE0E6;--bg:#F5F3EE;--coral:#E8503A;--teal:#2C8FA8}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;line-height:1.75}}
.wrap{{max-width:900px;margin:0 auto;padding:28px 16px 80px}}h1{{font-size:22px;margin:0 0 4px}}.lead{{color:var(--sub);font-size:14px;margin:0 0 10px}}
.box{{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 18px;font-size:14px}}.box b{{display:block;margin-bottom:2px}}
h2{{font-size:16px;margin:34px 0 2px;display:flex;align-items:center;gap:10px}}.sl{{margin:0 0 12px 38px;font-size:13px;color:var(--sub)}}
.sec{{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:8px;color:#fff;font-size:14px;background:var(--coral)}}.sec.x{{background:#8894A3}}
article{{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:10px;display:grid;grid-template-columns:64px 1fr;gap:10px;align-items:start}}
article.skip{{background:transparent;opacity:.75}}article.done{{opacity:.5}}article.done h3 a{{text-decoration:line-through}}
.chk{{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;color:var(--sub);cursor:pointer;padding-top:2px}}.chk input{{width:22px;height:22px}}
h3{{margin:0;font-size:16px}}h3 i{{font-style:normal;color:var(--coral);margin-right:8px;font-size:14px}}h3 a{{color:var(--ink);text-underline-offset:4px}}
.meta{{margin:2px 0 6px;color:var(--sub);font-size:12.5px}}.meta a{{color:var(--coral);font-weight:700}}.d{{margin:0;font-size:13.5px}}.tip{{margin:6px 0 0;font-size:13px;color:var(--teal)}}
</style></head><body><div class="wrap">
<h1>協業の営業先リスト</h1>
<p class="lead">上から順に送れば大丈夫なように並べてあります。1日5〜6社が無理のないペースです。「送った」にチェックを入れると、このブラウザに記録が残ります。</p>
<div class="box"><b>使うもの</b>応募フォームに貼る文面：docs/sales/templates/partner-apply.txt<br>運用会社のフォームに貼る文面：docs/sales/templates/partner-propose.txt<br>添付する資料：デスクトップの NEXT-VALLEY_協業のご案内.pdf</div>
{body}
</div><script>
document.querySelectorAll('article[data-k]').forEach(function(a){{var c=a.querySelector('input');if(!c)return;var k='nv-partner-'+a.dataset.k;
try{{if(localStorage.getItem(k)==='1'){{c.checked=true;a.classList.add('done')}}}}catch(e){{}}
c.addEventListener('change',function(){{a.classList.toggle('done',c.checked);try{{localStorage.setItem(k,c.checked?'1':'0')}}catch(e){{}}}});}});
</script></body></html>'''
open(f'{ROOT}/docs/sales/prospect-partners.html', 'w', encoding='utf-8').write(page)
print('送る会社', no, '社 ／ 送らない・保留', len(SECTIONS[-1][3]), '社')
