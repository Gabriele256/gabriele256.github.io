import MetallicPaint from "@/app/_components/MetallicPaint/MetallicPaint";

export default function Loading() {
    return (
        <div className="z-999 w-screen h-screen absolute top-0 left-0 bg-neutral-900 flex items-center justify-center overflow-hidden">
            <div className="w-32 h-32">
                <MetallicPaint
                    imageSrc="/logo.svg"
                    // Pattern
                    seed={42}
                    scale={4}
                    patternSharpness={1}
                    noiseScale={0.5}
                    // Animation
                    speed={0.3}
                    liquid={0.75}
                    mouseAnimation={false}
                    // Visual
                    brightness={1.8}
                    contrast={0.6}
                    refraction={0.02}
                    blur={0.01}
                    chromaticSpread={2.5}
                    fresnel={1.2}
                    angle={45}
                    waveAmplitude={1.5}
                    distortion={1.2}
                    contour={0.3}
                    // Colors
                    lightColor="#ffffff"
                    darkColor="#000000"
                    tintColor="#feb3ff"
                />
            </div>
        </div>
    );
}
