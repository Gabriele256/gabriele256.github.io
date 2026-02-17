import GithubProjects from "@/app/_components/GithubProjects/GithubProjects";
import HeroSection from "@/app/_components/sections/HeroSection";

export default function Page() {
    return (
        <div className="w-full min-h-screen p-4 flex flex-col items-center gap-12">
            <HeroSection>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                    My personal Projects
                </h1>
            </HeroSection>
            <GithubProjects></GithubProjects>
        </div>
    );
}
