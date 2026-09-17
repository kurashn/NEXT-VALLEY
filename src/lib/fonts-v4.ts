// v4デザイン（fv-v4.png系の参考画像）で使う書体
import { Noto_Sans_JP, Zen_Kurenaido } from "next/font/google";

/** 見出し用の極太ゴシック */
export const heavy = Noto_Sans_JP({ subsets: ["latin"], weight: ["900"], display: "swap" });
/** 手書き風の添え文 */
export const hand = Zen_Kurenaido({ subsets: ["latin"], weight: ["400"], display: "swap" });

export const V4 = {
    navy: "#14335A",
    teal: "#2C8FA8",
    coral: "#FD7368",
    coralDeep: "#E8503A",
    cream: "#FBF4EA",
    mist: "#EAF4F6",
    sub: "#4A5A6E",
    faint: "#6E8199",
} as const;
