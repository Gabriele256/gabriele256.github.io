import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Header from "./_components/header";
import Footer from "./_components/footer";
import ColorBends from "./_components/Backgrounds/ColorBlends";
import SmoothScroll from "./_components/SmoothScroll";

export const metadata: Metadata = {
    title: "Gabriele Rossi",
    description: "Gabriele's personal portfolio",
    icons: {
        icon: "/icon.svg",
    },
};

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${nunito.className} m-0 p-0`}
                suppressHydrationWarning
            >
                <SmoothScroll>
                    <main className="w-full h-full flex flex-col min-h-screen relative">
                        <ColorBends
                            colors={["#201B2B", "#261b37", "#1A1921"]}
                            rotation={0}
                            speed={0.2}
                            scale={0.8}
                            frequency={1.1}
                            warpStrength={1}
                            mouseInfluence={0}
                            parallax={1}
                            noise={0}
                            autoRotate={1}
                            transparent={false}
                            className="z-0 absolute top-0 left-0"
                        />
                        <Header />
                        <main className="grow flex items-center justify-center z-1">
                            {children}
                        </main>
                        <Footer />
                    </main>
                </SmoothScroll>
            </body>
        </html>
    );
}
