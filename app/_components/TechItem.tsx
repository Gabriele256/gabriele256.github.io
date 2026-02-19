import Link from "next/link";

export default function TechItem({
    icon,
    name,
    href,
}: {
    icon: React.ReactNode;
    name: string;
    href: string;
}) {
    return (
        <Link
            className="flex flex-col items-center gap-3 w-full p-2 rounded-lg 
            bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20
            transition-all duration-300 group 
            transform-gpu backface-hidden translate-z-0 "
            href={href || "#"}
            target={href ? "_blank" : undefined}
            title={name}
        >
            <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 lg:saturate-0 md:saturate-100 group-hover:saturate-100 transition-all duration-300">
                {icon || <div className="w-8 h-8 bg-white/10 rounded-full" />}
            </div>
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {name}
            </span>
        </Link>
    );
}
