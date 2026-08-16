import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * お問い合わせAPI — 迷惑メール対策つき
 *
 * 判定の層（外部サービス不要）:
 *  1. ハニーポット: 隠しフィールド `website` が埋まっていたら bot
 *  2. 時間トラップ: フォーム表示から送信まで 3 秒未満なら bot（elapsedMs 未送信も bot）
 *  3. 内容ヒューリスティック: リンク3本以上 / キリル文字 / 日本語ゼロ＋リンク / 極端に長い
 *  4. レートリミット: 同一IP 10分で3通まで（インスタンス内メモリ）
 *  5. Origin チェック: 自サイト以外からの POST は捨てる
 *  6. （任意）Cloudflare Turnstile: TURNSTILE_SECRET_KEY を設定した場合のみ検証
 *
 * スパム判定時は 200 を返して黙って捨てる（bot に学習させない）。理由はサーバーログにだけ残す。
 */

const ALLOWED_HOSTS = ['nextvalley-jpn.com', 'www.nextvalley-jpn.com', 'localhost:3000', 'localhost:3001'];
const MIN_ELAPSED_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

const rate = new Map<string, number[]>();

function clientIp(req: Request) {
    return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string) {
    const now = Date.now();
    const arr = (rate.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    arr.push(now);
    rate.set(ip, arr);
    // メモリ肥大防止
    if (rate.size > 5000) rate.clear();
    return arr.length > RATE_MAX;
}

function originAllowed(req: Request) {
    const origin = req.headers.get('origin') || req.headers.get('referer') || '';
    if (!origin) return false;
    try {
        const host = new URL(origin).host;
        return ALLOWED_HOSTS.includes(host);
    } catch {
        return false;
    }
}

function spamReason(fields: { name: string; email: string; company: string; message: string; website: string; elapsedMs: number }) {
    const { name, email, company, message, website, elapsedMs } = fields;
    if (website) return 'honeypot';
    if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_ELAPSED_MS) return 'too_fast';
    const all = `${name}\n${company}\n${message}`;
    const links = (all.match(/https?:\/\/|www\./gi) || []).length;
    if (links >= 3) return 'many_links';
    if (/[Ѐ-ӿ]/.test(all)) return 'cyrillic';
    const hasJapanese = /[぀-ヿ一-鿿]/.test(all);
    if (!hasJapanese && links >= 1) return 'no_japanese_with_link';
    if (message.length > 4000 || name.length > 80) return 'too_long';
    if (/^[A-Za-z]{6,}\s*[A-Za-z]{6,}$/.test(name.trim()) && /<a\s|\[url|BB code/i.test(message)) return 'markup_spam';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'bad_email';
    return null;
}

async function verifyTurnstile(token: string | undefined, ip: string) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true; // 未設定なら検証しない
    if (!token) return false;
    try {
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: token, remoteip: ip }),
        });
        const data = (await res.json()) as { success?: boolean };
        return Boolean(data.success);
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const ip = clientIp(request);
        const body = await request.json().catch(() => ({}));
        const name = String(body.name ?? '').trim();
        const company = String(body.company ?? '').trim();
        const email = String(body.email ?? '').trim();
        const message = String(body.message ?? '').trim();
        const website = String(body.website ?? '').trim(); // ハニーポット
        const elapsedMs = Number(body.elapsedMs);
        const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : undefined;

        // 必須チェック（人間向けのエラー）
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'お名前、メールアドレス、お問い合わせ内容は必須です。' }, { status: 400 });
        }

        // スパム判定（黙って捨てる）
        const silentDrop = (reason: string) => {
            console.warn(`[contact] dropped as spam: ${reason} ip=${ip} name=${name.slice(0, 20)} email=${email}`);
            return NextResponse.json({ success: true });
        };
        if (!originAllowed(request)) return silentDrop('bad_origin');
        if (isRateLimited(ip)) return silentDrop('rate_limited');
        const reason = spamReason({ name, email, company, message, website, elapsedMs });
        if (reason) return silentDrop(reason);
        if (!(await verifyTurnstile(turnstileToken, ip))) return silentDrop('turnstile');

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || 'info@nextvalley-jpn.com',
            replyTo: email,
            subject: `【NEXT VALLEY】お問い合わせ: ${name}様`,
            text: `ウェブサイトからのお問い合わせがありました。

お名前: ${name}
会社名: ${company || '未入力'}
メールアドレス: ${email}
送信元IP: ${ip}

お問い合わせ内容:
${message}
`,
            html: `
                <h3>ウェブサイトからのお問い合わせがありました。</h3>
                <p><strong>お名前:</strong> ${esc(name)}</p>
                <p><strong>会社名:</strong> ${esc(company || '未入力')}</p>
                <p><strong>メールアドレス:</strong> ${esc(email)}</p>
                <p style="color:#888;font-size:12px">送信元IP: ${esc(ip)}</p>
                <br>
                <p><strong>お問い合わせ内容:</strong></p>
                <p>${esc(message).replace(/\n/g, '<br>')}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending error details:', error);
        return NextResponse.json(
            { error: 'メールの送信に失敗しました。時間をおいて再度お試しいただくか、LINEからご連絡ください。' },
            { status: 500 }
        );
    }
}
