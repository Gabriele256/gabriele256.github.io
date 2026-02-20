import Link from "next/link";
import GlassSurface from "./_components/GlassSurface/GlassSurface";
import HeroSection from "./_components/sections/HeroSection";
import GithubProjects from "./_components/GithubProjects/GithubProjects";
import { ArrowRightIcon } from "lucide-react";
import GetInTouch from "./_components/CTA/GetInTouch";
import { FEATURED_TECH, SERVICES } from "./_constants/main";
import ScrollReveal from "./_components/ScrollReveal";
import { SOFTWARES_TOOLS_DOCS, TECH_STACK_DOCS } from "./_constants/about";

export default function Home() {
    return (
        <div className="w-full min-h-screen p-4 flex flex-col items-center gap-6">
            <HeroSection>
                <p className="text-sm font-semibold tracking-widest uppercase text-purple-400/80 animate-fade-in-up">
                    Aspiring Full Stack Developer &bull; Italy
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 animate-fade-in-up animate-delay-1">
                    I&apos;m Gabriele
                    <br />
                    I&apos;m Learning to Build
                    <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-size-[200%_auto] animate-[gradient-slide_4s_ease-in-out_infinite]">
                        Digital Experiences.
                    </span>
                </h1>
                <p className="text-lg text-white/60 leading-relaxed max-w-xl animate-fade-in-up animate-delay-2">
                    I&apos;m a passionate student diving deep into web
                    development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-3">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                            bg-linear-to-r from-purple-600 to-pink-600
                            hover:from-purple-500 hover:to-pink-500
                            text-white font-semibold
                            transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        See My Projects
                        <ArrowRightIcon size="1.1em" />
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                            bg-white/5 border border-white/10
                            hover:bg-white/10 hover:border-white/20
                            text-white font-semibold
                            transition-all duration-300 hover:scale-105"
                    >
                        About Me
                    </Link>
                </div>
            </HeroSection>

            <ScrollReveal className="w-[90vw] md:w-[75vw] max-w-6xl">
                <div className="flex flex-row items-center justify-center gap-6 md:gap-10 flex-wrap py-4">
                    {FEATURED_TECH.map((tech) => (
                        <Link
                            key={tech.name}
                            target={"_blank"}
                            className="flex items-center gap-2 lg:opacity-40 md:opacity-100 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
                            href={
                                TECH_STACK_DOCS[tech.name] ||
                                SOFTWARES_TOOLS_DOCS[tech.name]
                            }
                        >
                            <span className="lg:saturate-0 md:saturate-100 group-hover:saturate-100 transition-all duration-300">
                                {tech.icon}
                            </span>
                            <span className="text-sm text-white/60 group-hover:text-white font-medium transition-colors hidden md:inline">
                                {tech.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </ScrollReveal>

            <ScrollReveal className="w-[90vw] md:w-[75vw] max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                    WHAT I&apos;M LEARNING
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SERVICES.map((service) => (
                        <GlassSurface
                            key={service.title}
                            width={"100%"}
                            height={""}
                            className="p-7"
                            simple
                            childrenClassName="flex flex-col gap-4 w-full h-full"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: `${service.color}15`,
                                    color: service.color,
                                }}
                            >
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                {service.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </GlassSurface>
                    ))}
                </div>
            </ScrollReveal>

            <ScrollReveal className="w-[90vw] md:w-[75vw] max-w-6xl">
                <div className="flex items-end justify-between mb-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                        MY PROJECTS
                    </h2>
                    <Link
                        href="/projects"
                        className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1"
                    >
                        View all <ArrowRightIcon size="0.9em" />
                    </Link>
                </div>
                <GithubProjects />
            </ScrollReveal>

            <ScrollReveal>
                <GetInTouch />
            </ScrollReveal>
        </div>
    );
}
