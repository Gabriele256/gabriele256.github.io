import Link from "next/link";
import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";

export default function Header() {
    return (
        <header className="text-white sticky top-4 left-0 z-25 m-4">
            <GlassSurface
                width={"100%"}
                height={55}
                borderRadius={30}
                className=" z-100 flex items-center justify-center"
            >
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
                        About Me
                    </Link>
                    <Link
                        href="/projects"
                        className="hover-border-animated cursor-pointer z-2"
                    >
                        My Projects
                    </Link>
                    <Link
                        href="/contacts"
                        className="hover-border-animated cursor-pointer z-2"
                    >
                        Contact Me
                    </Link>
                </nav>
            </GlassSurface>
        </header>
    );
}