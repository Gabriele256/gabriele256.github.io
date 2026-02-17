import React from "react";

interface HeroSectionProps {
    children: React.ReactNode;
}

export default function HeroSection({children} : HeroSectionProps) {
    return (
        <section className="text-left min-h-[calc(100vh-9rem)] w-full space-y-4 flex flex-col items-start justify-center">
            {children}
        </section>
    );
}
