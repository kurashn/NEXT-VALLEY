import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const BlogCTA = () => {
    return (
        <div className="my-16 bg-[#eef2f6] rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#002335] mb-4">
                教室の「集客」と「業務」にお悩みですか？
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                NEXT VALLEYは、個人・小規模教室専門のデジタルパートナーです。<br className="hidden md:block" />
                「生徒が集まらない」「事務作業に追われている」...そんな悩みを、<br className="hidden md:block" />
                ホームページ制作とAI活用で解決します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-[#e26c5c] hover:bg-[#d05a4b] text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        まずは無料相談する
                    </Button>
                </Link>
                <p className="text-xs text-slate-500 mt-2 sm:mt-0">
                    ※ 無理な営業は一切いたしません
                </p>
            </div>
        </div>
    );
};
