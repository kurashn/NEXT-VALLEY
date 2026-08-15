// Server Component — 記事末尾の著者プロフィール（E-E-A-T: 誰が書いたかを明示）

import Image from "next/image";
import shun from "@/images/shun-new.webp";

export const AuthorBox = () => {
    return (
        <aside
            aria-label="この記事を書いた人"
            className="mt-14 flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-start md:p-8"
        >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24">
                <Image src={shun} alt="NEXT VALLEY 代表 倉林 駿" fill className="object-cover" sizes="96px" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[0.25em] text-coral-deep">AUTHOR</p>
                <p className="mt-1 text-lg font-bold text-navy">
                    倉林 駿 <span className="ml-2 text-sm font-normal text-ink-sub">NEXT VALLEY 代表</span>
                </p>
                <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                    2021年にNEXT VALLEYを開始。スクールから企業サイトまで50社以上のホームページ制作・集客支援を行い、
                    自社の制作・マーケティングの現場でAIを日常的に活用しています。「作って終わり」にしない、
                    数字で判断できるWeb運用を提案するのが仕事です。記事は実際の相談・制作で見てきたことをもとに書いています。
                </p>
                <p className="mt-3 text-sm">
                    <a href="/company" className="font-bold text-coral-deep underline underline-offset-4">
                        事業情報を見る
                    </a>
                </p>
            </div>
        </aside>
    );
};
