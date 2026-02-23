import Link from "next/link";
import { Star, GitFork, ArrowUpRight, Code2 } from "lucide-react";
import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";

interface GithubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    topics?: string[];
}

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    "C++": "#f34b7d",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Dockerfile: "#384d54",
};

async function getRepos(): Promise<GithubRepo[]> {
    const res = await fetch(process.env.URL || "", {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function GithubProjects() {
    const repos = await getRepos();
    const myRepos = repos.filter((repo) => !repo.fork);

    const totalStars = myRepos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = myRepos.reduce((s, r) => s + r.forks_count, 0);
    const languages = [
        ...new Set(myRepos.map((r) => r.language).filter(Boolean)),
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
                <span className="flex items-center gap-2">
                    <Code2 size={16} className="text-purple-400" />
                    <strong className="text-white">
                        {myRepos.length}
                    </strong>{" "}
                    repositories
                </span>
                <span className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" />
                    <strong className="text-white">{totalStars}</strong> stars
                </span>
                <span className="flex items-center gap-2">
                    <GitFork size={16} className="text-blue-400" />
                    <strong className="text-white">{totalForks}</strong> forks
                </span>
                <span className="flex items-center gap-2 ml-auto">
                    {languages.slice(0, 5).map((lang) => (
                        <span
                            key={lang}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-xs"
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor:
                                        LANGUAGE_COLORS[lang!] || "#6b7280",
                                }}
                            />
                            {lang}
                        </span>
                    ))}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {myRepos.map((repo) => (
                    <GlassSurface
                        key={repo.id}
                        height={""}
                        width={""}
                        childrenClassName="w-full p-6 group flex flex-col"
                    >
                        <div className="w-full flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate pr-2">
                                {repo.name}
                            </h3>
                            <Link
                                href={repo.html_url}
                                target="_blank"
                                className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all shrink-0"
                            >
                                <ArrowUpRight
                                    size={16}
                                    className="text-white/70"
                                />
                            </Link>
                        </div>

                        <p className="text-white/50 text-sm mb-4 grow line-clamp-2 leading-relaxed">
                            {repo.description || "No description available."}
                        </p>

                        {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {repo.topics.slice(0, 3).map((topic) => (
                                    <span
                                        key={topic}
                                        className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-3 mt-auto">
                            <div className="flex gap-3">
                                {repo.language && (
                                    <span className="flex items-center gap-1.5">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    LANGUAGE_COLORS[
                                                    repo.language
                                                    ] || "#6b7280",
                                            }}
                                        />
                                        {repo.language}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1">
                                    <Star size={12} /> {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GitFork size={12} /> {repo.forks_count}
                                </span>
                            </div>
                        </div>
                    </GlassSurface>
                ))}
            </div>
        </div>
    );
}
