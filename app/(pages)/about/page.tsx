import React from "react";
import Link from "next/link";
import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";
import { Coffee, Terminal, Zap } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
    SOFTWARES_TOOLS,
    SOFTWARES_TOOLS_DOCS,
    SOFTWARES_TOOLS_ICONS,
    TECH_STACK,
    TECH_STACK_DOCS,
    TECH_STACK_ICONS,
} from "@/app/_constants/about";

export default function Page() {
    return (
        <div className="w-full min-h-screen p-4 flex flex-col items-center gap-12 z-0">
            <section className="text-left min-h-[calc(100vh-9rem)] w-full space-y-4 flex flex-col items-start justify-center">
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                    I&apos;m Gabriele
                    <br />
                    Digital Creator From Italy.
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                    I&apos;m a self-taught full-stack developer that blend
                    aesthetics and functionality. My goal is to make the web a
                    cleaner, and more beautiful place.
                </p>
            </section>

            <section className="text-left w-full flex flex-row gap-6">
                <GlassSurface
                    width={"100%"}
                    height={""}
                    className="p-8"
                    childrenClassName="flex flex-col items-start justify-start w-full h-full"
                >
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                        Tech Stack
                    </h1>
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {TECH_STACK.map((item) => (
                            <TechItem
                                key={item}
                                icon={TECH_STACK_ICONS[item]}
                                name={item}
                                href={TECH_STACK_DOCS[item]}
                            />
                        ))}
                    </div>
                </GlassSurface>
                <GlassSurface
                    width={"100%"}
                    height={""}
                    className="p-8"
                    childrenClassName="flex flex-col items-start justify-start w-full h-full"
                >
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                        Softwares and tools
                    </h1>
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {SOFTWARES_TOOLS.map((item) => (
                            <TechItem
                                key={item}
                                icon={SOFTWARES_TOOLS_ICONS[item]}
                                name={item}
                                href={SOFTWARES_TOOLS_DOCS[item]}
                            />
                        ))}
                    </div>
                </GlassSurface>
            </section>
        </div>
    );
}

function TechItem({
    icon,
    name,
    href,
}: {
    icon: React.ReactNode;
    name: string;
    href: string;
}) {
    return (
        <Link 
            className="flex flex-col items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors group duration-300" 
            href={href}
        >
            <div className="saturate-50 group-hover:saturate-100 transition-colors duration-300">
                {icon}
            </div>
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {name}
            </span>
        </Link>
    );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white transition-all hover:scale-110"
        >
            {icon}
        </a>
    );
}
