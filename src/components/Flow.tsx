// Server Component — ご依頼の流れ（新しく作る／今のHPを改善する の2通り）

import React from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "ご依頼の流れ",
    newLabel: "新しく作る・作り直す",
    newSteps: [
        { title: "無料プレビューを申し込む", body: "この時点では費用も契約もありません。" },
        { title: "ヒアリング", body: "教室のこと、載せたいこと、体験申込までの流れをうかがいます。" },
        { title: "デザイン案・料金・条件の確認", body: "トップページのデザイン案と、料金・契約条件をご確認いただきます。" },
        { title: "納得いただけたら正式契約", body: "ご契約日から月額が始まります。断っていただいても構いません。" },
        { title: "本制作・ご確認・公開", body: "内容を詰めながら作り、ご確認のうえ公開します。" },
        { title: "更新・管理", body: "公開後の修正と管理をお任せいただけます。必要なときは追加の支援もご相談ください。" },
    ],
    newCta: "無料でデザイン案を見てみる",
    fixLabel: "今のホームページを改善する",
    fixSteps: [
        { title: "URLとお悩みを送る", body: "LINEに今のサイトのURLと、気になっていることを送ってください。" },
        { title: "現状と直す順番を確認", body: "ホームページ・検索・Googleマップ・問い合わせ導線を拝見します。" },
        { title: "対応範囲とお見積もり", body: "必要な範囲だけをお見積もりします。作り直しをおすすめするとは限りません。" },
        { title: "ご了承のうえ改善", body: "合意いただいた範囲から着手します。" },
    ],
    fixCta: "今のサイトの改善点を知りたい",
    note: "制作にかかる期間は、内容と素材のご準備によって変わります。急ぎのご事情があれば、ご相談ください。",
};

const en: typeof ja = {
    heading: "How it works",
    newLabel: "Build a new site",
    newSteps: [
        { title: "Ask for the free preview", body: "No cost and no contract at this point." },
        { title: "We ask about your school", body: "What you teach, what to feature, and how people book a trial." },
        { title: "See the design, price and terms", body: "You review the homepage design along with the price and the contract terms." },
        { title: "Sign only if it fits", body: "Billing starts on the contract date. Saying no is fine." },
        { title: "Build, review, launch", body: "We build it out, you check it, then it goes live." },
        { title: "Updates and management", body: "We keep it updated. Extra support can be arranged when you need it." },
    ],
    newCta: "See a free design proposal",
    fixLabel: "Improve your current site",
    fixSteps: [
        { title: "Send your URL and concerns", body: "Message us on LINE with the address of your site." },
        { title: "We check the current state", body: "Your site, search visibility, Google Maps and the path to an enquiry." },
        { title: "Scope and quote", body: "We quote for what's needed. A rebuild is not always the answer." },
        { title: "We start once you agree", body: "Work begins on the agreed scope." },
    ],
    fixCta: "Get a free site check",
    note: "How long a build takes depends on the content and how quickly photos and text are ready. Tell us if you're in a hurry.",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function Flow({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Flow" jp={t.heading} />
                </FadeIn>

                <div className="grid gap-5 lg:grid-cols-2">
                    {/* 新しく作る */}
                    <FadeIn>
                        <div className="flex h-full flex-col rounded-2xl bg-navy-deep p-7 text-white md:p-9">
                            <p className="mb-6 inline-flex w-fit rounded-full bg-coral px-4 py-1.5 text-[12.5px] font-bold text-white">
                                {t.newLabel}
                            </p>
                            <ol className="mb-7 grid gap-4">
                                {t.newSteps.map((s, i) => (
                                    <li key={s.title} className="flex gap-4">
                                        <span
                                            className="w-7 shrink-0 text-[18px] font-bold leading-tight text-coral"
                                            style={{ fontFamily: serif }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span>
                                            <span className="block text-[15px] font-bold leading-snug">{s.title}</span>
                                            <span className="mt-1 block text-[13px] leading-[1.9] text-navy-sub">{s.body}</span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                            <a
                                href={withLang(lang, "/preview")}
                                className="group mt-auto inline-flex h-13 min-h-12 w-fit items-center gap-2 rounded-full bg-coral px-7 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-95"
                            >
                                {t.newCta}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                        </div>
                    </FadeIn>

                    {/* 今のHPを改善する */}
                    <FadeIn delay={0.08}>
                        <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 md:p-9">
                            <p className="mb-6 inline-flex w-fit rounded-full border border-line px-4 py-1.5 text-[12.5px] font-bold text-ink-sub">
                                {t.fixLabel}
                            </p>
                            <ol className="mb-7 grid gap-4">
                                {t.fixSteps.map((s, i) => (
                                    <li key={s.title} className="flex gap-4">
                                        <span
                                            className="w-7 shrink-0 text-[18px] font-bold leading-tight text-coral-deep"
                                            style={{ fontFamily: serif }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span>
                                            <span className="block text-[15px] font-bold leading-snug text-ink">{s.title}</span>
                                            <span className="mt-1 block text-[13px] leading-[1.9] text-ink-sub">{s.body}</span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                            <a
                                href={withLang(lang, "/shindan")}
                                className="group mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-line px-7 text-[15px] font-bold text-ink transition-colors hover:border-coral hover:text-coral-deep"
                            >
                                {t.fixCta}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn>
                    <p className="mt-6 max-w-[46em] text-[13.5px] leading-[2] text-ink-sub">{t.note}</p>
                </FadeIn>
            </div>
        </section>
    );
}
