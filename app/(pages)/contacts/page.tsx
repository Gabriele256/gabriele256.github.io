import HeroSection from "@/app/_components/sections/HeroSection";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Page() {
    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center"
        >
            <HeroSection scroll={false}>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40 animate-fade-in-up animate-delay-1">
                    Contacts
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-3">
                    <Link
                        href="mailto:gabrielerossi256@gmail.com"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                            bg-white/5 border border-white/10
                            hover:bg-white/10 hover:border-white/20
                            text-white font-semibold
                            transition-all duration-300 hover:scale-105"
                    >
                        <MdOutlineEmail />
                        Email: gabrielerossi256@gmail.com
                        <ArrowUpRightIcon size="1.1em" />
                    </Link>
                    <Link
                        href="https://github.com/Gabriele256"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                            bg-white/5 border border-white/10
                            hover:bg-white/10 hover:border-white/20
                            text-white font-semibold
                            transition-all duration-300 hover:scale-105"
                    >
                        <FaGithub />
                        GitHub: Gabriele256
                        <ArrowUpRightIcon size="1.1em" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/gabriele-rossi-7320533b2/"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                            bg-white/5 border border-white/10
                            hover:bg-white/10 hover:border-white/20
                            text-white font-semibold
                            transition-all duration-300 hover:scale-105"
                    >
                        <FaLinkedin />
                        LinkedIn: Gabriele Rossi
                        <ArrowUpRightIcon size="1.1em" />
                    </Link>
                </div>
            </HeroSection>
        </div>
    );
}
