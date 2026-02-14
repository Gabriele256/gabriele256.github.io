import Link from "next/link";
import GlassElement from "./glassElement/glassElement";

export default function Header() {
    return (
        <header className="text-white sticky top-4 left-0 z-10">
            <GlassElement className="w-[calc(100%-2em)] h-12 m-4 mt-0 z-100 flex items-center justify-center">
                <nav className="flex items-center justify-center gap-8 text-xl">
                    <Link
                        href="/"
                        className="hover-border-animated cursor-pointer z-2"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="hover-border-animated cursor-pointer z-2"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className="hover-border-animated cursor-pointer z-2"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/contacts"
                        className="hover-border-animated cursor-pointer z-2"
                    >
                        Contacts
                    </Link>
                </nav>
            </GlassElement>
        </header>
    );
}
