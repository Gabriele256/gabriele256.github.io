import Link from "next/link";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
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
}

async function getRepos(): Promise<GithubRepo[]> {
    const res = await fetch(process.env.GITHUB_URL!, {
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {myRepos.map((repo) => (
                <GlassSurface
                    key={repo.id}
                    height={""}
                    width={""}
                    childrenClassName="w-full p-6 group"
                >
                    <div className="w-full h-full flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {repo.name}
                        </h3>
                        <Link
                            href={repo.html_url}
                            target="_blank"
                            className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all"
                        >
                            <ArrowUpRight size={18} className="text-white/70" />
                        </Link>
                    </div>

                    <p className="text-white/60 text-sm mb-6 grow line-clamp-3">
                        {repo.description || "No description avaiable."}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4 mt-auto">
                        <div className="flex gap-4">
                            {repo.language && (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                    {repo.language}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <span className="flex items-center gap-1">
                                <Star size={14} /> {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                                <GitFork size={14} /> {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </GlassSurface>
            ))}
        </div>
    );
}
