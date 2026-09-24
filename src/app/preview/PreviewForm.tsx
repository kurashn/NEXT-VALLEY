"use client";
// 無料プレビューの申し込みフォーム（パソコンからLINEに進みにくい方向け。LINEの申し込みはそのまま残す）
// 送信先は /api/contact（kind: "preview" で件名を分ける）。送信できたら GA に preview_form_submit を送る。
import React, { useState } from "react";
import { CircleCheck } from "lucide-react";

const NAVY = "#0F2540";
const CORAL = "#B8452F"; // 白文字を載せても読める濃さ（coral-deep）
const SUB = "#3B4457";

declare global {
    interface Window { gtag?: (...args: unknown[]) => void }
}

export function PreviewForm() {
    const [startedAt] = useState(() => Date.now());
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError("");
        const f = new FormData(e.currentTarget);
        const lines = [
            "【無料プレビューのお申し込み】",
            `業種と地域: ${f.get("area") || ""}`,
            `今のホームページ・Instagram: ${f.get("url") || "なし"}`,
            "",
            `ご希望・載せたいこと:`,
            `${f.get("message") || "（未入力）"}`,
        ];
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    kind: "preview",
                    name: f.get("name"),
                    company: f.get("company"),
                    email: f.get("email"),
                    message: lines.join("\n"),
                    website: f.get("website") || "",
                    elapsedMs: Date.now() - startedAt,
                }),
            });
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                throw new Error(d.error || "送信できませんでした。");
            }
            window.gtag?.("event", "preview_form_submit", { event_category: "cta", page_path: location.pathname });
            setDone(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "送信できませんでした。時間をおいて、もう一度お試しください。");
        } finally {
            setSending(false);
        }
    };

    if (done) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center" role="status">
                <CircleCheck className="mx-auto h-12 w-12" strokeWidth={1.6} style={{ color: "#2C8FA8" }} aria-hidden />
                <p className="mt-4 text-[19px] font-bold" style={{ color: NAVY }}>お申し込みを受け付けました</p>
                <p className="mt-3 text-left text-[15px] leading-[1.9] md:text-center" style={{ color: SUB }}>
                    ご入力いただいたメールアドレスに、2営業日以内にご連絡します。<br className="hidden md:block" />
                    内容を確認して、足りないことがあれば、そのときにお伺いします。
                </p>
            </div>
        );
    }

    const input = "mt-1.5 w-full rounded-lg border bg-white px-4 py-3 text-[16px] outline-none transition-colors focus:border-[#2C8FA8]";
    const label = "block text-left text-[14px] font-bold";
    const req = <span className="ml-1.5 rounded px-1.5 py-0.5 text-[11px] font-bold text-white" style={{ backgroundColor: CORAL }}>必須</span>;
    const opt = <span className="ml-1.5 text-[12px] font-normal" style={{ color: SUB }}>任意</span>;

    return (
        <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 text-left md:p-8" style={{ color: NAVY }}>
            <div className="grid gap-5 md:grid-cols-2">
                <label className={label}>お名前{req}<input name="name" required autoComplete="name" className={input} style={{ borderColor: "rgba(15,37,64,0.2)" }} /></label>
                <label className={label}>会社・お店・教室の名前{req}<input name="company" required autoComplete="organization" className={input} style={{ borderColor: "rgba(15,37,64,0.2)" }} /></label>
                <label className={label}>メールアドレス{req}<input name="email" type="email" required autoComplete="email" className={input} style={{ borderColor: "rgba(15,37,64,0.2)" }} /></label>
                <label className={label}>業種と地域{req}<input name="area" required placeholder="例：熊谷市のピアノ教室" className={input} style={{ borderColor: "rgba(15,37,64,0.2)" }} /></label>
            </div>
            <label className={`${label} mt-5`}>今のホームページやInstagramのURL{opt}<input name="url" inputMode="url" placeholder="なければ空欄で大丈夫です" className={input} style={{ borderColor: "rgba(15,37,64,0.2)" }} /></label>
            <label className={`${label} mt-5`}>ご希望や、載せたいこと{opt}<textarea name="message" rows={4} placeholder="例：体験レッスンの申し込みを増やしたい。料金とスケジュールを載せたい。" className={input} style={{ borderColor: "rgba(15,37,64,0.2)" }} /></label>
            {/* 迷惑メール対策（人には見えない） */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
            {error && <p className="mt-4 text-[14px] font-bold" style={{ color: CORAL }} role="alert">{error}</p>}
            <button type="submit" disabled={sending} className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center rounded-full px-8 text-[17px] font-bold text-white transition-opacity disabled:opacity-60 md:w-auto" style={{ backgroundColor: NAVY }}>
                {sending ? "送信しています…" : "フォームで申し込む"}
            </button>
            <p className="mt-3 text-[13px]" style={{ color: SUB }}>お申し込みだけで契約・請求は発生しません。ご連絡はメールでお送りします。</p>
        </form>
    );
}
