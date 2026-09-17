// 文を読点「、」で区切り、それぞれを折り返さない塊にする（スマホでの改行落ち対策）
import React from "react";

export function chunks(text: string): React.ReactNode {
    const parts = text.split(/(?<=、)/);
    if (parts.length <= 1) return text;
    return parts.map((p, i) => (
        <span key={i} className="nowrap">
            {p}
        </span>
    ));
}
