"use client";

import React from "react";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
    return (
        <div className={className} style={{ transitionDelay: `${delay}s` }}>
            {children}
        </div>
    );
}
