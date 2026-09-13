#!/usr/bin/env python3
"""ブログのカバー画像（1200x630・紺地・シェブロン・ヒラギノW6）を作る。
使い方: python3 tools/blog/cover.py <slug> "1行目" "2行目"
   例: python3 tools/blog/cover.py my-post "教室の料金ページ、" "隠さない書き方"
1行あたり全角9〜10文字まで。出力: public/images/blog/<slug>.png
"""
import sys
from PIL import Image, ImageDraw, ImageFont

ROOT = __file__.rsplit('/tools/', 1)[0]
BASE = f'{ROOT}/public/images/blog/referral-partner.png'  # 左上のCOLUMN・左下のロゴを流用
FONT = '/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc'

def build_background():
    base = Image.open(BASE).convert('RGB')
    navy = base.getpixel((30, 30)); W, H = base.size
    bg = base.copy(); d = ImageDraw.Draw(bg)
    d.rectangle((590, 0, W, H), fill=navy)
    d.rectangle((60, 190, 590, 420), fill=navy)
    S = 2; layer = Image.new('RGB', (W * S, H * S), navy); ld = ImageDraw.Draw(layer)
    blue, coral = (27, 60, 85), (113, 64, 65)
    for k in range(12):
        x_tip = 919 + 56 * k
        ld.line([((x_tip - 315) * S, 0), (x_tip * S, 315 * S), ((x_tip - 315) * S, 630 * S)],
                fill=blue if k % 2 == 0 else coral, width=3 * S, joint='curve')
    layer = layer.resize((W, H), Image.LANCZOS)
    bg.paste(layer.crop((590, 0, W, H)), (590, 0))
    return bg

def make(slug, lines):
    im = build_background(); d = ImageDraw.Draw(im)
    font = ImageFont.truetype(FONT, 60); y = 222
    for ln in lines:
        d.text((80, y), ln, font=font, fill=(255, 255, 255)); y += 80
    out = f'{ROOT}/public/images/blog/{slug}.png'; im.save(out); return out

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    print(make(sys.argv[1], sys.argv[2:]))
