// ブランドキャラクター「ネクバレ君」（2026-10-04〜）
// 元画像：リポジトリ直下の「ネイビー パーカーの柴犬マスコット.png」「柴犬マスコットのポーズステッカー集.png」から切り出し（src/images/mascot/）
// 飾りとして置くときは alt を空にする（読み上げで邪魔にならないように）。紹介するときだけ alt に名前を入れる
import Image from "next/image";
import main from "@/images/mascot/nekubare-main.png";
import stand from "@/images/mascot/nekubare-stand.png";
import wave from "@/images/mascot/nekubare-wave.png";
import laptop from "@/images/mascot/nekubare-laptop.png";
import laptopSmile from "@/images/mascot/nekubare-laptop-smile.png";
import cheer from "@/images/mascot/nekubare-cheer.png";
import thumbsup from "@/images/mascot/nekubare-thumbsup.png";
import teach from "@/images/mascot/nekubare-teach.png";
import clipboard from "@/images/mascot/nekubare-clipboard.png";
import search from "@/images/mascot/nekubare-search.png";
import think from "@/images/mascot/nekubare-think.png";
import run from "@/images/mascot/nekubare-run.png";
import sleep from "@/images/mascot/nekubare-sleep.png";
import peek from "@/images/mascot/nekubare-peek.png";
import point from "@/images/mascot/nekubare-point.png";

const POSES = { main, stand, wave, laptop, laptopSmile, cheer, thumbsup, teach, clipboard, search, think, run, sleep, peek, point } as const;
export type MascotPose = keyof typeof POSES;

export function Mascot({ pose, className = "", alt = "", sizes = "160px", priority = false }: { pose: MascotPose; className?: string; alt?: string; sizes?: string; priority?: boolean }) {
    return <Image src={POSES[pose]} alt={alt} aria-hidden={alt ? undefined : true} sizes={sizes} priority={priority} className={`pointer-events-none select-none h-auto ${className}`} />;
}
