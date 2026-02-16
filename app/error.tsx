"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import GlassElement from "@/app/_components/GlassSurface/GlassSurface";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <GlassElement
                width={"100%"}
                height={"100%"}
                borderRadius={50}
                className="z-1 max-w-2xl"
            >
                <div className="rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="flex justify-center">
                            <div className="relative">
                                <GlassElement
                                    width={"100%"}
                                    height={"100%"}
                                    borderRadius={999}
                                >
                                    <AlertTriangle
                                        size={48}
                                        className="text-white animate-pulse m-4"
                                        strokeWidth={2}
                                    />
                                </GlassElement>
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent animate-fade-in">
                                Oops!
                            </h1>

                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                                Something went wrong
                            </h2>

                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
                                An unexpected error occurred. <br />
                                Don&apos;t worry, it happens to the best of us!
                            </p>

                            {error.digest && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 backdrop-blur-sm">
                                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                                        Error ID: {error.digest.slice(0, 8)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-around sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => reset()}
                                className="
                                    group relative flex items-center justify-center gap-3 
                                    px-8 py-4 rounded-xl
                                    bg-linear-to-r from-blue-600 to-blue-700
                                    text-white font-semibold text-lg
                                    shadow-lg shadow-blue-500/25
                                    hover:shadow-xl hover:shadow-blue-500/40
                                    hover:scale-105
                                    active:scale-100
                                    transition-all duration-300
                                    overflow-hidden
                                "
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                                <RefreshCcw
                                    size={20}
                                    className="relative group-hover:rotate-180 transition-transform duration-500"
                                />
                                <span className="relative">Retry</span>
                            </button>

                            <Link
                                href="/"
                                className="
                                    group relative flex items-center justify-center gap-3
                                    px-8 py-4 rounded-xl
                                    bg-white/60 dark:bg-slate-800/60
                                    backdrop-blur-sm
                                    text-slate-800 dark:text-slate-200 font-semibold text-lg
                                    border border-slate-300/50 dark:border-slate-700/50
                                    shadow-lg
                                    hover:bg-white/80 dark:hover:bg-slate-800/80
                                    hover:border-slate-400/50 dark:hover:border-slate-600/50
                                    hover:scale-105
                                    active:scale-100
                                    transition-all duration-300
                                    overflow-hidden
                                "
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-200/30 dark:via-slate-700/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                                <Home
                                    size={20}
                                    className="relative group-hover:scale-110 transition-transform duration-300"
                                />
                                <span className="relative">Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </GlassElement>
        </div>
    );
}
