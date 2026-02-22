"use client";

import { ArrowDownIcon } from "lucide-react";
import React from "react";

interface HeroSectionProps {
    children: React.ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
    return (
        <section className="relative text-left min-h-[calc(100vh-9rem)] w-full flex flex-col items-start justify-center mb-4">
            <div className="w-full space-y-4">{children}</div>
            <button
                onClick={() =>
                    window.scrollTo({
                        top: window.innerHeight / 1.5,
                        behavior: "smooth",
                    })
                }
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
                <p className="text-[10px] uppercase tracking-widest font-medium">
                    Scroll
                </p>
                <ArrowDownIcon size="14" />
            </button>
        </section>
    );
}
