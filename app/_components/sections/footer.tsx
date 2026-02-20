import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                    © {currentYear} Gabriele Rossi. All rights reserved.
                </div>

                <div className="text-gray-500 text-xs hidden md:block">
                    <p className="inline">Built with </p>
                    <Link
                        href={"https://nextjs.org/"}
                        target={"_blank"}
                        className="text-white"
                    >
                        Next.js
                    </Link>
                    <p className="inline"> & </p>
                    <Link
                        href={"https://tailwindcss.com/"}
                        target={"_blank"}
                        className="text-cyan-400"
                    >
                        Tailwind
                    </Link>
                </div>

                <div className="flex gap-6">
                    <Link
                        href={"https://github.com/Gabriele256/"}
                        target={"_blank"}
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                    >
                        <FaGithub size={20} />
                    </Link>
                    <Link
                        href={
                            "https://www.linkedin.com/in/gabriele-rossi-7320533b2/"
                        }
                        target={"_blank"}
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                    >
                        <FaLinkedin size={20} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
