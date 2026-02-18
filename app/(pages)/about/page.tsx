import React from "react";
import Link from "next/link";
import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";
import { CoffeeIcon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
    SOFTWARES_TOOLS,
    SOFTWARES_TOOLS_DOCS,
    SOFTWARES_TOOLS_ICONS,
    TECH_STACK,
    TECH_STACK_DOCS,
    TECH_STACK_ICONS,
} from "@/app/_constants/about";
import HeroSection from "@/app/_components/sections/HeroSection";

export default function Page() {
    return (
        <div
            className="w-full min-h-screen p-4 flex flex-col items-center gap-6"
            style={{ contentVisibility: "auto" }}
        >
            <HeroSection>
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
            </HeroSection>

            <section className="mt-8 text-left w-[75vw]">
                <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">MY SKILLS</h1>
                <GlassSurface
                    width={"100%"}
                    height={""}
                    className="p-8"
                    simple
                    childrenClassName="flex flex-col gap-8 items-start justify-start w-full h-full"
                >
                    <div className="w-full">
                        <h1 className="w-full text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex flex-row items-center justify-start gap-4">
                            Tech Stack
                        </h1>
                        <div className="grid grid-cols-8 gap-4 w-full">
                            {TECH_STACK.map((item) => (
                                <TechItem
                                    key={item}
                                    icon={TECH_STACK_ICONS[item]}
                                    name={item}
                                    href={TECH_STACK_DOCS[item]}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="w-full text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex flex-row items-center justify-start gap-4">
                            Softwares and tools
                        </h1>
                        <div className="grid grid-cols-8 gap-4 w-full">
                            {SOFTWARES_TOOLS.map((item) => (
                                <TechItem
                                    key={item}
                                    icon={SOFTWARES_TOOLS_ICONS[item]}
                                    name={item}
                                    href={SOFTWARES_TOOLS_DOCS[item]}
                                />
                            ))}
                        </div>
                    </div>
                </GlassSurface>
            </section>

            <section className="text-left w-[75vw] flex flex-row gap-6">
                <GlassSurface
                    width={"100%"}
                    height={""}
                    className="p-8"
                    simple
                    childrenClassName="flex flex-col items-start justify-start gap-4 w-full h-full"
                >
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex flex-row items-center justify-center gap-4">
                        Beyond coding
                        <CoffeeIcon size={"1em"} color="#ffaf00" />
                    </h1>
                    <div className="w-fit flex flex-row gap-4">
                        <SocialButton
                            icon={<FaGithub />}
                            name="Github"
                            href="https://github.com/Gabriele256/"
                        />
                        <SocialButton
                            icon={<FaLinkedin />}
                            name="LinkedIn"
                            href="https://www.linkedin.com/in/gabriele-rossi-7320533b2/"
                        />
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
            className="flex flex-col items-center gap-3 w-full p-2 rounded-lg 
            bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20
            transition-all duration-300 group 
            transform-gpu backface-hidden translate-z-0 "
            href={href}
            target="_blank"
            title={name}
        >
            <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 saturate-0 group-hover:saturate-100 transition-all duration-300">
                {icon}
            </div>
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {name}
            </span>
        </Link>
    );
}

function SocialButton({
    icon,
    name,
    href,
}: {
    icon: React.ReactNode;
    name?: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            target="_blank"
            title={name}
            className="w-50 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white transition-all hover:scale-105 flex flex-row items-center justify-center gap-4"
        >
            {icon} {name}
        </Link>
    );
}
