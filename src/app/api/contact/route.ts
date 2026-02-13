import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, email, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'お名前、メールアドレス、お問い合わせ内容は必須です。' },
                { status: 400 }
            );
        }

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content for the admin (NEXT VALLEY)
        const mailOptionsAdmin = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || 'info@nextvalley-jpn.com',
            subject: `【NEXT VALLEY】お問い合わせ: ${name}様`,
            text: `
ウェブサイトからのお問い合わせがありました。

お名前: ${name}
会社名: ${company || '未入力'}
メールアドレス: ${email}

お問い合わせ内容:
${message}
            `,
            html: `
                <h3>ウェブサイトからのお問い合わせがありました。</h3>
                <p><strong>お名前:</strong> ${name}</p>
                <p><strong>会社名:</strong> ${company || '未入力'}</p>
                <p><strong>メールアドレス:</strong> ${email}</p>
                <br>
                <p><strong>お問い合わせ内容:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Email content for the user (Auto-reply)
        const mailOptionsUser = {
            from: process.env.SMTP_USER,
            to: email,
            subject: '【NEXT VALLEY】お問い合わせありがとうございます',
            text: `
${name} 様

この度は、NEXT VALLEYへお問い合わせいただき、誠にありがとうございます。
以下の内容で受け付けいたしました。

担当者より内容を確認の上、通常2営業日以内にご返信させていただきます。
今しばらくお待ちくださいますようお願い申し上げます。

--------------------------------------------------
■ お問い合わせ内容
お名前: ${name}
会社名: ${company || '未入力'}
メールアドレス: ${email}
詳細:
${message}
--------------------------------------------------

※このメールは自動送信されています。
お心当たりのない場合は、お手数ですが本メールを削除してください。

NEXT VALLEY
代表: 倉林 駿
Web: https://nextvalley-jpn.com
Email: info@nextvalley-jpn.com
            `,
        };

        // Send emails
        await transporter.sendMail(mailOptionsAdmin);
        // await transporter.sendMail(mailOptionsUser); // Optional: Uncomment to enable auto-reply

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending error details:', error);
        return NextResponse.json(
            { error: 'メールの送信に失敗しました。', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
