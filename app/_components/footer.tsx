import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Assicurati di avere react-icons

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 mt-20 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Sinistra: Copyright */}
                <div className="text-gray-400 text-sm">
                    © {currentYear} Gabriele Rossi. All rights reserved.
                </div>

                {/* Centro: Tech Stack */}
                <div className="text-gray-500 text-xs hidden md:block">
                    Built with <span className="text-white">Next.js</span> &{" "}
                    <span className="text-cyan-400">Tailwind</span>
                </div>

                {/* Destra: Socials */}
                <div className="flex gap-6">
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                    >
                        <FaTwitter size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
