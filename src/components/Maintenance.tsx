import { Wrench } from "lucide-react";

export function Maintenance() {
    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 bg-background text-foreground text-center selection:bg-primary/20">
            <div className="flex flex-col items-center space-y-6 max-w-md w-full animate-in fade-in duration-700 zoom-in-95">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center relative shadow-inner">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <Wrench className="w-10 h-10 text-primary relative z-10" />
                </div>

                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        ただいまメンテナンス中です
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        より良いサービスをご提供するため、<br className="hidden sm:block" />
                        システムのアップデートを行っております。
                    </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                <p className="text-xs text-muted-foreground/70">
                    ご不便をおかけいたしますが、<br className="sm:hidden" />
                    今しばらくお待ちください。
                </p>
            </div>
        </div>
    );
}
