"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCTA() {
    const [visible, setVisible] = useState(false);
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (closed) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-6 right-6 z-50 flex items-end gap-2"
                >
                    <div className="relative group">
                        <a href="https://lin.ee/N4QXdJL" target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className="bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-full h-14 w-14 md:w-auto md:px-6 shadow-2xl shadow-[#06C755]/40 cursor-pointer"
                            >
                                <span className="hidden md:inline">無料プレビューをもらう</span>
                                <MessageCircle className="md:hidden w-6 h-6" />
                            </Button>
                        </a>

                        {/* Close button */}
                        <button
                            onClick={() => setClosed(true)}
                            className="absolute -top-2 -right-2 bg-slate-500 text-white rounded-full p-1 hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
