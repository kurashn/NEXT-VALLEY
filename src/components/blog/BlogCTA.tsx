import { MessageCircle } from "lucide-react";

export const BlogCTA = () => {
    return (
        <div className="my-16 rounded-2xl bg-[#eef2f6] p-8 text-center md:p-12">
            <p className="mb-3 text-[12px] font-bold tracking-[0.3em] text-coral-deep">FREE CHECK</p>
            <h3 className="mb-4 text-2xl font-bold text-navy md:text-3xl">
                「うちの場合は、どこから？」を無料でお<span className="nowrap">答えします</span>
            </h3>
            <p className="mx-auto mb-8 max-w-2xl leading-[1.9] text-ink-sub">
                NEXT VALLEYは、AI活用のプロチームです。マーケティングもHP・LP制作も、課題に合わせて必要な打ち手だけを提案します。
                <br className="hidden md:block" />
                サイトのURLやお悩みをLINEで送るだけで、改善の打ち手と概算お見積もりをお返しします。
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                    href="https://lin.ee/N4QXdJL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#05a247] px-8 text-[19px] font-bold text-white shadow-[0_12px_28px_rgba(5,162,71,0.3)] transition-all hover:-translate-y-0.5 sm:w-auto"
                >
                    <MessageCircle className="h-5 w-5" aria-hidden />
                    LINEで無料診断を受ける
                </a>
                <a
                    href="/shindan"
                    className="inline-flex h-14 w-full items-center justify-center rounded-full border border-line bg-white px-8 text-[15px] font-bold text-ink transition-colors hover:border-coral hover:text-coral-deep sm:w-auto"
                >
                    3分セルフ診断を試す
                </a>
            </div>
            <p className="mt-4 text-xs text-ink-sub">※ 診断・提案・見積もりは無料。しつこい営業は一切ありません</p>
        </div>
    );
};
