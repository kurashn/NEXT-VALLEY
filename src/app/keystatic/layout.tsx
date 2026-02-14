import { notFound } from 'next/navigation';
import KeystaticApp from './admin';

export default function Layout() {
    // Disable Keystatic admin in production (Local Mode)
    if (process.env.NODE_ENV === 'production') {
        notFound();
    }

    return (
        <html>
            <head />
            <body>
                <KeystaticApp />
            </body>
        </html>
    );
}
