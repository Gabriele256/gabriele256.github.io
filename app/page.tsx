import Image from "next/image";
import HeroSection from "./_components/HeroSection/HeroSection";

export default function Home() {
    const imgUrl =
        "https://images.unsplash.com/photo-1770860354865-415bd1e5af6d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <div className="grow p-4">
            <HeroSection>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/40">
                    I&apos;m Gabriele
                    <br />
                    Digital Creator From Italy.
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                    I&apos;m a self-taught full-stack developer that blend
                    aesthetics and functionality. My goal is to make the web a
                    cleaner, and more beautiful place.
                </p>
            </HeroSection>
            <main className="max-w-6xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
                    <div className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 1"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-linear-to-t from-black/60 to-transparent w-full">
                            <h3 className="text-white font-bold">
                                Main Feature
                            </h3>
                        </div>
                    </div>

                    <div className="relative md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 2"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="relative md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 3"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                    </div>

                    <div className="relative md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 4"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="relative md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 5"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="relative md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 6"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                    </div>
                </div>
            </main>
            <main className="max-w-6xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
                    <div className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 1"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-linear-to-t from-black/60 to-transparent w-full">
                            <h3 className="text-white font-bold">
                                Main Feature
                            </h3>
                        </div>
                    </div>

                    <div className="relative md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 2"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="relative md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 3"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                    </div>

                    <div className="relative md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 4"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="relative md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 5"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="relative md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group">
                        <Image
                            src={imgUrl}
                            alt="Bento Item 6"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
