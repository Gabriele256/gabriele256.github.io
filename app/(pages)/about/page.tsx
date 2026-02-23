import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";
import {
    SOFTWARES_TOOLS,
    SOFTWARES_TOOLS_DOCS,
    SOFTWARES_TOOLS_ICONS,
    TECH_STACK,
    TECH_STACK_DOCS,
    TECH_STACK_ICONS,
    HOBBIES,
    STATS,
    TIMELINE,
    SOCIALS,
} from "@/app/_constants/about";
import HeroSection from "@/app/_components/sections/HeroSection";
import GetInTouch from "@/app/_components/CTA/GetInTouch";
import ScrollReveal from "@/app/_components/ScrollReveal";
import SocialButton from "@/app/_components/SocialButton";
import TechItem from "@/app/_components/TechItem";

export default function Page() {
    return (
        <div
            className="w-full min-h-screen p-4 flex flex-col items-center gap-6"
            style={{ contentVisibility: "auto" }}
        >
            <HeroSection>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 animate-fade-in-up">
                    Hi, I&apos;m Gabriele
                    <br />
                    Computer Science Student.
                </h1>
                <p className="text-lg text-white/70 leading-relaxed animate-fade-in-up animate-delay-1">
                    I&apos;m currently studying and learning full-stack
                    development by myself and at school.
                </p>
            </HeroSection>

            <ScrollReveal className="w-[90vw] md:w-[75vw] max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                    ABOUT ME
                </h2>
                <GlassSurface
                    width={"100%"}
                    height={""}
                    className="p-8"
                    simple
                    childrenClassName="flex flex-col gap-8 w-full h-full"
                >
                    <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                        I&apos;m a student from Italy passionate about
                        technology and design. I enjoy building websites that
                        look good and work well.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="shimmer-bg rounded-xl border border-white/10 p-5 flex flex-col items-center gap-1"
                            >
                                <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-br from-purple-400 to-pink-400">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-white/50 font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassSurface>
            </ScrollReveal>

            <ScrollReveal className="w-[90vw] md:w-[75vw] max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex items-center gap-4">
                    MY JOURNEY
                </h2>
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-purple-500/60 via-purple-500/30 to-transparent" />

                    <div className="flex flex-col gap-10">
                        {/* timeline mapping */}
                        {TIMELINE.map((item, index) => (
                            <ScrollReveal
                                key={item.title}
                                delay={index * 0.1}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8
                                    ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500 timeline-dot z-10 mt-6 md:mt-0" />

                                <div className="hidden md:block md:w-1/2" />

                                <div className="md:w-1/2 ml-10 md:ml-0">
                                    <GlassSurface
                                        width={"100%"}
                                        height={""}
                                        className="p-6"
                                        simple
                                        childrenClassName="flex flex-col gap-2 w-full h-full"
                                    >
                                        <span className="text-xs font-bold tracking-widest uppercase text-purple-400/80">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </GlassSurface>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal className="mt-8 text-left w-[90vw] md:w-[75vw] max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                    MY SKILLS
                </h2>
                <GlassSurface
                    width={"100%"}
                    height={""}
                    className="p-8"
                    simple
                    childrenClassName="flex flex-col gap-8 items-start justify-start w-full h-full"
                >
                    <div className="w-full">
                        <h3 className="w-full text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex flex-row items-center justify-start gap-4">
                            Tech Stack
                        </h3>
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 w-full">
                            {/* tecnologies mapping */}
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
                        <h3 className="w-full text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex flex-row items-center justify-start gap-4">
                            Softwares and tools
                        </h3>
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 w-full">
                            {/* softwares and tools mapping */}
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
            </ScrollReveal>

            <ScrollReveal className="text-left w-[90vw] md:w-[75vw] max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 flex items-center gap-4">
                    BEYOND CODING
                </h2>

                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* hobbies mapping */}
                        {HOBBIES.map((hobby) => (
                            <GlassSurface
                                key={hobby.name}
                                width={"100%"}
                                height={""}
                                className="p-6"
                                simple
                                childrenClassName="flex flex-col gap-3 w-full h-full"
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                        backgroundColor: `${hobby.color}20`,
                                        color: hobby.color,
                                    }}
                                >
                                    {hobby.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white">
                                    {hobby.name}
                                </h3>
                                <p className="text-sm text-white/50 leading-relaxed">
                                    {hobby.description}
                                </p>
                            </GlassSurface>
                        ))}
                    </div>

                    <GlassSurface
                        width={"100%"}
                        height={""}
                        className="p-6"
                        simple
                        childrenClassName="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full h-full"
                    >
                        <span className="text-white/40 text-sm font-medium">
                            Find me on
                        </span>
                        <div className="flex flex-row gap-3">
                            {/* social mapping */}
                            {SOCIALS.map((s) => (
                                <SocialButton
                                    key={s.name}
                                    icon={s.icon}
                                    name={s.name}
                                    href={s.url}
                                />
                            ))}
                        </div>
                    </GlassSurface>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <GetInTouch />
            </ScrollReveal>
        </div>
    );
}
