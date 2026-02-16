"use client";
import React, { useEffect, useRef, useState, useId } from "react";

/**
 * Props per il componente GlassSurface
 * 
 * @interface GlassSurfaceProps
 */
export interface GlassSurfaceProps {
    /** Contenuto da renderizzare all'interno della superficie glass */
    children?: React.ReactNode;
    
    /** Larghezza del componente in pixel o come stringa CSS (es: "100%") @default 200 */
    width?: number | string;
    
    /** Altezza del componente in pixel o come stringa CSS @default 80 */
    height?: number | string;
    
    /** Raggio dei bordi arrotondati in pixel @default 20 */
    borderRadius?: number;
    
    /** Spessore del bordo luminoso (0-1) @default 0.07 */
    borderWidth?: number;
    
    /** Luminosità del vetro (0-100) @default 50 */
    brightness?: number;
    
    /** Opacità del vetro (0-1) @default 0.93 */
    opacity?: number;
    
    /** Quantità di blur sul vetro in pixel @default 11 */
    blur?: number;
    
    /** Intensità del displacement/distorsione @default 0 */
    displace?: number;
    
    /** Opacità dello sfondo (0-1) @default 0 */
    backgroundOpacity?: number;
    
    /** Saturazione dei colori (0-n, dove 1 è normale) @default 1 */
    saturation?: number;
    
    /** Scala di base per la distorsione (-200 a 200) @default -180 */
    distortionScale?: number;
    
    /** Offset per il canale rosso nella distorsione @default 0 */
    redOffset?: number;
    
    /** Offset per il canale verde nella distorsione @default 10 */
    greenOffset?: number;
    
    /** Offset per il canale blu nella distorsione @default 20 */
    blueOffset?: number;
    
    /** Canale colore per distorsione asse X @default "R" */
    xChannel?: "R" | "G" | "B";
    
    /** Canale colore per distorsione asse Y @default "G" */
    yChannel?: "R" | "G" | "B";
    
    /** Modalità di blending per i gradienti @default "difference" */
    mixBlendMode?:
        | "normal"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "color-burn"
        | "hard-light"
        | "soft-light"
        | "difference"
        | "exclusion"
        | "hue"
        | "saturation"
        | "color"
        | "luminosity"
        | "plus-darker"
        | "plus-lighter";
    
    /** Classi CSS aggiuntive da applicare al contenitore */
    className?: string;
    
    /** Stili CSS inline personalizzati */
    style?: React.CSSProperties;
}

/**
 * Hook personalizzato per rilevare la preferenza dark mode del sistema
 * 
 * @returns {boolean} true se il sistema è in dark mode, false altrimenti
 * 
 * @example
 * const isDark = useDarkMode();
 * // Usa isDark per adattare gli stili
 */
const useDarkMode = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Guard per SSR
        if (typeof window === "undefined") return;

        // Controlla la preferenza iniziale
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mediaQuery.matches);

        // Ascolta i cambiamenti della preferenza
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mediaQuery.addEventListener("change", handler);
        
        // Cleanup
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return isDark;
};

/**
 * Componente GlassSurface
 * 
 * Crea una superficie con effetto vetro sofisticato utilizzando filtri SVG avanzati.
 * Supporta distorsione cromatica, blur, gradients e si adatta automaticamente a dark/light mode.
 * 
 * @component
 * @example
 * ```tsx
 * <GlassSurface
 *   width={300}
 *   height={200}
 *   borderRadius={20}
 *   blur={11}
 *   distortionScale={-180}
 * >
 *   <h1>Contenuto</h1>
 * </GlassSurface>
 * ```
 */
const GlassSurface: React.FC<GlassSurfaceProps> = ({
    children,
    width = 200,
    height = 80,
    borderRadius = 20,
    borderWidth = 0.07,
    brightness = 50,
    opacity = 0.93,
    blur = 11,
    displace = 0,
    backgroundOpacity = 0,
    saturation = 1,
    distortionScale = -180,
    redOffset = 0,
    greenOffset = 10,
    blueOffset = 20,
    xChannel = "R",
    yChannel = "G",
    mixBlendMode = "difference",
    className = "",
    style = {},
}) => {
    // Genera ID univoci per evitare conflitti tra istanze multiple
    const uniqueId = useId().replace(/:/g, "-");
    const filterId = `glass-filter-${uniqueId}`;
    const redGradId = `red-grad-${uniqueId}`;
    const blueGradId = `blue-grad-${uniqueId}`;

    // State per tracciare supporto SVG filters
    const [svgSupported, setSvgSupported] = useState<boolean>(false);

    // Refs per manipolare gli elementi SVG
    const containerRef = useRef<HTMLDivElement>(null);
    const feImageRef = useRef<SVGFEImageElement>(null);
    const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
    const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
    const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
    const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

    // Rileva dark mode
    const isDarkMode = useDarkMode();

    /**
     * Genera una displacement map SVG dinamica basata sulle dimensioni del contenitore
     * 
     * La displacement map è usata per creare l'effetto di distorsione cromatica sul vetro.
     * Include gradienti rossi e blu che vengono blendati per creare il bordo luminoso.
     * 
     * @returns {string} Data URI con l'SVG della displacement map
     */
    const generateDisplacementMap = () => {
        // Ottiene le dimensioni effettive del contenitore
        const rect = containerRef.current?.getBoundingClientRect();
        const actualWidth = rect?.width || 400;
        const actualHeight = rect?.height || 200;
        
        // Calcola la dimensione del bordo luminoso
        const edgeSize =
            Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

        // Genera SVG con gradienti e rettangoli per l'effetto glass
        const svgContent = `
        <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#0000"/>
                    <stop offset="100%" stop-color="red"/>
                </linearGradient>
                <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0000"/>
                    <stop offset="100%" stop-color="blue"/>
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
            <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
            <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
            <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
        </svg>
    `;

        // Ritorna come data URI
        return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    };

    /**
     * Aggiorna la displacement map applicandola all'elemento feImage
     */
    const updateDisplacementMap = () => {
        feImageRef.current?.setAttribute("href", generateDisplacementMap());
    };

    /**
     * Effect: Aggiorna i parametri dei filtri SVG quando cambiano le props
     */
    useEffect(() => {
        updateDisplacementMap();
        
        // Configura i canali RGB con i rispettivi offset
        [
            { ref: redChannelRef, offset: redOffset },
            { ref: greenChannelRef, offset: greenOffset },
            { ref: blueChannelRef, offset: blueOffset },
        ].forEach(({ ref, offset }) => {
            if (ref.current) {
                // Imposta la scala di distorsione per ogni canale
                ref.current.setAttribute(
                    "scale",
                    (distortionScale + offset).toString(),
                );
                // Configura quale canale colore usare per X e Y
                ref.current.setAttribute("xChannelSelector", xChannel);
                ref.current.setAttribute("yChannelSelector", yChannel);
            }
        });

        // Configura il blur gaussiano sulla distorsione
        gaussianBlurRef.current?.setAttribute(
            "stdDeviation",
            displace.toString(),
        );
    }, [
        width,
        height,
        borderRadius,
        borderWidth,
        brightness,
        opacity,
        blur,
        displace,
        distortionScale,
        redOffset,
        greenOffset,
        blueOffset,
        xChannel,
        yChannel,
        mixBlendMode,
    ]);

    /**
     * Effect: Controlla il supporto per i filtri SVG all'avvio
     */
    useEffect(() => {
        setSvgSupported(supportsSVGFilters());
    }, []);

    /**
     * Effect: Osserva i resize del contenitore per rigenerare la displacement map
     */
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            // Timeout per permettere al browser di completare il resize
            setTimeout(updateDisplacementMap, 0);
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    /**
     * Effect duplicato: Altro ResizeObserver (considerare di rimuoverlo?)
     */
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            setTimeout(updateDisplacementMap, 0);
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    /**
     * Effect: Aggiorna la displacement map quando width/height cambiano
     */
    useEffect(() => {
        setTimeout(updateDisplacementMap, 0);
    }, [width, height]);

    /**
     * Verifica se il browser supporta i filtri SVG avanzati
     * 
     * Controlla specificamente il supporto per backdrop-filter con filtri SVG.
     * Safari/WebKit hanno comportamenti speciali che richiedono gestione particolare.
     * 
     * @returns {boolean} true se il browser supporta i filtri SVG, false altrimenti
     */
    const supportsSVGFilters = () => {
        // Guard per SSR
        if (typeof window === "undefined" || typeof document === "undefined") {
            return false;
        }

        // Rileva Safari/WebKit
        const isWebkit =
            /Safari/.test(navigator.userAgent) &&
            !/Chrome/.test(navigator.userAgent);

        // Safari non supporta completamente backdrop-filter con SVG
        if (isWebkit) return false;

        // Test generale per backdrop-filter
        const div = document.createElement("div");
        div.style.cssText = "backdrop-filter: url(#test);";

        return div.style.backdropFilter !== "";
    };

    /**
     * Verifica se il browser supporta backdrop-filter CSS
     * 
     * @returns {boolean} true se backdrop-filter è supportato, false altrimenti
     */
    const supportsBackdropFilter = () => {
        if (typeof window === "undefined") return false;
        return CSS.supports("backdrop-filter", "blur(10px)");
    };

    /**
     * Calcola gli stili CSS del contenitore in base al supporto browser e dark mode
     * 
     * Implementa graceful degradation:
     * 1. SVG filters supportati → Effetto completo con distorsione cromatica
     * 2. Solo backdrop-filter → Effetto glass semplificato
     * 3. Nessun supporto → Fallback con background semitrasparente e bordi
     * 
     * @returns {React.CSSProperties} Oggetto con gli stili CSS da applicare
     */
    const getContainerStyles = (): React.CSSProperties => {
        // Stili base comuni a tutti i casi
        const baseStyles: React.CSSProperties = {
            ...style,
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
            borderRadius: `${borderRadius}px`,
            "--glass-frost": backgroundOpacity,
            "--glass-saturation": saturation,
        } as React.CSSProperties;

        const backdropFilterSupported = supportsBackdropFilter();

        // CASO 1: SVG Filters supportati - Effetto completo
        if (svgSupported) {
            return {
                ...baseStyles,
                background: isDarkMode
                    ? `hsl(0 0% 0% / ${backgroundOpacity})`
                    : `hsl(0 0% 100% / ${backgroundOpacity})`,
                backdropFilter: `url(#${filterId}) saturate(${saturation})`,
                boxShadow: isDarkMode
                    ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
                        0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
                        0px 4px 16px rgba(17, 17, 26, 0.05),
                        0px 8px 24px rgba(17, 17, 26, 0.05),
                        0px 16px 56px rgba(17, 17, 26, 0.05),
                        0px 4px 16px rgba(17, 17, 26, 0.05) inset,
                        0px 8px 24px rgba(17, 17, 26, 0.05) inset,
                        0px 16px 56px rgba(17, 17, 26, 0.05) inset`
                    : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
                        0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
                        0px 4px 16px rgba(17, 17, 26, 0.05),
                        0px 8px 24px rgba(17, 17, 26, 0.05),
                        0px 16px 56px rgba(17, 17, 26, 0.05),
                        0px 4px 16px rgba(17, 17, 26, 0.05) inset,
                        0px 8px 24px rgba(17, 17, 26, 0.05) inset,
                        0px 16px 56px rgba(17, 17, 26, 0.05) inset`,
            };
        } 
        // CASO 2 e 3: Fallback per browser senza SVG filters
        else {
            // Dark Mode
            if (isDarkMode) {
                // CASO 2a: Dark mode senza backdrop-filter
                if (!backdropFilterSupported) {
                    return {
                        ...baseStyles,
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
                    };
                } 
                // CASO 2b: Dark mode con backdrop-filter
                else {
                    return {
                        ...baseStyles,
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter:
                            "blur(12px) saturate(1.8) brightness(1.2)",
                        WebkitBackdropFilter:
                            "blur(12px) saturate(1.8) brightness(1.2)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
                    };
                }
            } 
            // Light Mode
            else {
                // CASO 3a: Light mode senza backdrop-filter
                if (!backdropFilterSupported) {
                    return {
                        ...baseStyles,
                        background: "rgba(255, 255, 255, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`,
                    };
                } 
                // CASO 3b: Light mode con backdrop-filter
                else {
                    return {
                        ...baseStyles,
                        background: "rgba(255, 255, 255, 0.25)",
                        backdropFilter:
                            "blur(12px) saturate(1.8) brightness(1.1)",
                        WebkitBackdropFilter:
                            "blur(12px) saturate(1.8) brightness(1.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`,
                    };
                }
            }
        }
    };

    // Classi CSS base per il contenitore glass
    const glassSurfaceClasses =
        "relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out";

    // Stili focus accessibili che si adattano a dark/light mode
    const focusVisibleClasses = isDarkMode
        ? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
        : "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2";

    return (
        <div
            ref={containerRef}
            className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
            style={getContainerStyles()}
            suppressHydrationWarning
        >
            {/* 
                SVG con filtri avanzati per l'effetto glass
                Nascosto ma applicato tramite backdrop-filter CSS
            */}
            <svg
                className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Filtro principale che implementa la distorsione cromatica */}
                    <filter
                        id={filterId}
                        colorInterpolationFilters="sRGB"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                    >
                        {/* Immagine sorgente per la displacement map */}
                        <feImage
                            ref={feImageRef}
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                            result="map"
                        />

                        {/* Canale ROSSO: Displacement + Isolamento */}
                        <feDisplacementMap
                            ref={redChannelRef}
                            in="SourceGraphic"
                            in2="map"
                            id="redchannel"
                            result="dispRed"
                        />
                        <feColorMatrix
                            in="dispRed"
                            type="matrix"
                            values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                            result="red"
                        />

                        {/* Canale VERDE: Displacement + Isolamento */}
                        <feDisplacementMap
                            ref={greenChannelRef}
                            in="SourceGraphic"
                            in2="map"
                            id="greenchannel"
                            result="dispGreen"
                        />
                        <feColorMatrix
                            in="dispGreen"
                            type="matrix"
                            values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                            result="green"
                        />

                        {/* Canale BLU: Displacement + Isolamento */}
                        <feDisplacementMap
                            ref={blueChannelRef}
                            in="SourceGraphic"
                            in2="map"
                            id="bluechannel"
                            result="dispBlue"
                        />
                        <feColorMatrix
                            in="dispBlue"
                            type="matrix"
                            values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                            result="blue"
                        />

                        {/* Combina i canali RGB con screen blend */}
                        <feBlend
                            in="red"
                            in2="green"
                            mode="screen"
                            result="rg"
                        />
                        <feBlend
                            in="rg"
                            in2="blue"
                            mode="screen"
                            result="output"
                        />
                        
                        {/* Blur gaussiano finale per ammorbidire la distorsione */}
                        <feGaussianBlur
                            ref={gaussianBlurRef}
                            in="output"
                            stdDeviation="0.7"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Contenitore del contenuto con padding e z-index elevato */}
            <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GlassSurface;