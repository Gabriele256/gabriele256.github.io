import { Terminal } from "lucide-react";
import {
    RiTailwindCssFill,
    RiReactjsFill,
    RiCss3Fill,
    RiHtml5Fill,
    RiNextjsLine,
    RiJavaFill,
} from "react-icons/ri";
import {
    SiTypescript,
    SiJavascript,
    SiElectron,
    SiPostgresql,
    SiMysql,
    SiWebstorm,
    SiDatagrip,
    SiKalilinux,
} from "react-icons/si";
import { TbBrandCpp, TbBrandCSharp, TbJson } from "react-icons/tb";
import { AiOutlineDotNet } from "react-icons/ai";
import {
    FaNode,
    FaDocker,
    FaFigma,
    FaUbuntu,
    FaGitAlt,
    FaGithub,
    FaPython,
} from "react-icons/fa";
import { FaDebian } from "react-icons/fa6";
import { BiLogoVisualStudio } from "react-icons/bi";

export const TECH_STACK: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Tailwind",
    "Node.js",
    "Next.js",
    "React",
    "Postgresql",
    "MySql",
    "Java",
    "Python",
    "C#",
    ".NET",
    "C++",
];
export const SOFTWARES_TOOLS: string[] = [
    "Visual Studio",
    "Visual Studio Code",
    "WebStorm",
    "DataGrip",
    "Docker",
    "Figma",
    "Ubuntu",
    "Debian",
    "Kali Linux",
    "Git",
    "Github",
    "Terminal",
];
const icon_size:string = "2rem";

export const TECH_STACK_ICONS: Record<string, React.ReactNode> = {
    HTML: <RiHtml5Fill size={icon_size} color="#dd4b25" />,
    CSS: <RiCss3Fill size={icon_size} color="#254bdd" />,
    JavaScript: <SiJavascript size={icon_size} color="#f7df1e" />,
    TypeScript: <SiTypescript size={icon_size} color="#3178c6" />,
    Tailwind: <RiTailwindCssFill size={icon_size} color="#00b3d1" />,
    "Node.js": <FaNode size={icon_size} color="#7ec727" />,
    "Next.js": <RiNextjsLine size={icon_size} color="#fff" />,
    React: <RiReactjsFill size={icon_size} color="#5bc5dd" />,
    Postgresql: <SiPostgresql size={icon_size} color="#31648c" />,
    MySql: <SiMysql size={icon_size} color="#005e86" />,
    Java: <RiJavaFill size={icon_size} color="#ea2d2e" />,
    Python: <FaPython size={icon_size} color="#f7cb3f" />,
    "C#": <TbBrandCSharp size={icon_size} color="#9c75d5" />,
    ".NET": <AiOutlineDotNet size={icon_size} color="#9c75d5" />,
    "C++": <TbBrandCpp size={icon_size} color="#6295cb" />,
};

export const SOFTWARES_TOOLS_ICONS: Record<string, React.ReactNode> = {
    "Visual Studio": <BiLogoVisualStudio size={icon_size} color="#ab75e9" />,
    "Visual Studio Code": <BiLogoVisualStudio size={icon_size} color="#25aff3" />,
    WebStorm: <SiWebstorm size={icon_size} color="#02c6d1" />,
    DataGrip: <SiDatagrip size={icon_size} color="#b64af0" />,
    Docker: <FaDocker size={icon_size} color="#2391e6" />,
    Figma: <FaFigma size={icon_size} color="#7682f7" />,
    Ubuntu: <FaUbuntu size={icon_size} color="#d74614" />,
    Debian: <FaDebian size={icon_size} color="#a3002e" />,
    "Kali Linux": <SiKalilinux size={icon_size} color="#2673f7" />,
    Git: <FaGitAlt size={icon_size} color="#e84d31" />,
    Github: <FaGithub size={icon_size} />,
    Terminal: <Terminal size={icon_size} color="#3f3f3f" />,
};

export const TECH_STACK_DOCS: Record<string, string> = {
    HTML: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    CSS: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    TypeScript: "https://www.typescriptlang.org/docs/",
    Tailwind: "https://tailwindcss.com/docs",
    "Node.js": "https://nodejs.org/en/docs/",
    "Next.js": "https://nextjs.org/docs",
    React: "https://react.dev/",
    Postgresql: "https://www.postgresql.org/docs/",
    MySql: "https://dev.mysql.com/doc/",
    Java: "https://docs.oracle.com/en/java/",
    Python: "https://docs.python.org/3/",
    "C#": "https://learn.microsoft.com/en-us/dotnet/csharp/",
    ".NET": "https://learn.microsoft.com/en-us/dotnet/",
    "C++": "https://en.cppreference.com/w/",
};

export const SOFTWARES_TOOLS_DOCS: Record<string, string> = {
    "Visual Studio": "https://learn.microsoft.com/en-us/visualstudio/",
    "Visual Studio Code": "https://code.visualstudio.com/docs",
    WebStorm: "https://www.jetbrains.com/webstorm/documentation/",
    DataGrip: "https://www.jetbrains.com/datagrip/documentation/",
    Docker: "https://docs.docker.com/",
    Figma: "https://help.figma.com/hc/en-us",
    Ubuntu: "https://help.ubuntu.com/",
    Debian: "https://www.debian.org/doc/",
    "Kali Linux": "https://www.kali.org/docs/",
    Git: "https://git-scm.com/doc",
    Github: "https://docs.github.com/en",
    Terminal: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line", // O link alla doc specifica della tua shell (Bash/Zsh/Powershell)
};