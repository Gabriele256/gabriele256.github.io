"use client";

// Adatta il percorso di importazione in base alla tua struttura cartelle
import MetallicPaint from "@/app/_components/MetallicPaint/MetallicPaint";
// OPPURE se è in _components:
// import MetallicPaint from "@/app/_components/MetallicPaint/MetallicPaint";

export default function TestPage() {
    return (
        <div className="w-screen h-screen bg-neutral-900 flex items-center justify-center overflow-hidden">
            {/* Container relativo per dare dimensioni al canvas */}
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                <MetallicPaint
                    imageSrc="/logo.svg" // Percorso diretto al file in public/
                    // Pattern
                    seed={42}
                    scale={4}
                    patternSharpness={1}
                    noiseScale={0.5}
                    // Animation
                    speed={0.3}
                    liquid={0.75}
                    mouseAnimation={true} // Attiviamo il mouse per testare l'interazione
                    // Visual
                    brightness={1.8} // Leggermente abbassato per contrasto
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
                    tintColor="#feb3ff" // Un tocco magenta/rosa
                />
            </div>

            {/* Overlay informativo opzionale */}
            <div className="absolute bottom-10 left-10 text-white font-mono text-sm bg-black/50 p-4 rounded">
                <p>Muovi il mouse per deformare.</p>
            </div>
        </div>
    );
}
