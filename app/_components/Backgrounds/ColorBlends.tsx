"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Props per il componente ColorBends
 *
 * @interface ColorBendsProps
 */
type ColorBendsProps = {
    /** Classi CSS aggiuntive per il contenitore */
    className?: string;

    /** Stili inline personalizzati per il contenitore */
    style?: React.CSSProperties;

    /** Rotazione iniziale in gradi @default 45 */
    rotation?: number;

    /** Velocità dell'animazione (moltiplicatore tempo) @default 0.2 */
    speed?: number;

    /** Array di colori hex (es: ["#ff0000", "#00ff00"]) - max 8 colori @default [] */
    colors?: string[];

    /** Se true, lo sfondo è trasparente @default true */
    transparent?: boolean;

    /** Velocità di auto-rotazione in gradi/secondo @default 0 */
    autoRotate?: number;

    /** Scala della visualizzazione (>1 zoom out, <1 zoom in) @default 1 */
    scale?: number;

    /** Frequenza delle onde nel pattern @default 1 */
    frequency?: number;

    /** Intensità della distorsione/warp (0-2+) @default 1 */
    warpStrength?: number;

    /** Sensibilità all'influenza del mouse (0-2+) @default 1 */
    mouseInfluence?: number;

    /** Intensità effetto parallasse con mouse @default 0.5 */
    parallax?: number;

    /** Quantità di noise/grain da aggiungere (0-1) @default 0.1 */
    noise?: number;
};

/** Numero massimo di colori supportati dal shader */
const MAX_COLORS = 8 as const;

/**
 * Fragment Shader GLSL
 *
 * Crea pattern ondulatori colorati con distorsione cromatica.
 * Supporta fino a 8 colori personalizzati o genera automaticamente RGB.
 * Include effetti: mouse interaction, parallasse, noise, warp.
 */
const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;          // Dimensioni canvas
uniform float uTime;           // Tempo elapsed
uniform float uSpeed;          // Moltiplicatore velocità
uniform vec2 uRot;             // Vettore rotazione (cos, sin)
uniform int uColorCount;       // Numero colori forniti
uniform vec3 uColors[MAX_COLORS]; // Array colori RGB
uniform int uTransparent;      // 1 = trasparente, 0 = opaco
uniform float uScale;          // Scala pattern
uniform float uFrequency;      // Frequenza onde
uniform float uWarpStrength;   // Intensità distorsione
uniform vec2 uPointer;         // Posizione mouse in NDC [-1,1]
uniform float uMouseInfluence; // Sensibilità mouse
uniform float uParallax;       // Intensità parallasse
uniform float uNoise;          // Quantità noise
varying vec2 vUv;              // UV coordinates dal vertex shader

void main() {
    // Calcola tempo con velocità applicata
    float t = uTime * uSpeed;

    // Converti UV da [0,1] a [-1,1] (coordinate centrate)
    vec2 p = vUv * 2.0 - 1.0;

    // Applica effetto parallasse basato su posizione mouse
    p += uPointer * uParallax * 0.1;

    // Applica rotazione usando matrice 2D
    vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);

    // Correggi aspect ratio
    vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);

    // Applica scala
    q /= max(uScale, 0.0001);

    // Proiezione polare inversa per effetto radiale
    q /= 0.5 + 0.2 * dot(q, q);

    // Offset animato nel tempo
    q += 0.2 * cos(t) - 7.56;

    // Calcola direzione verso il mouse e applica influenza
    vec2 toward = (uPointer - rp);
    q += toward * uMouseInfluence * 0.2;

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
        vec2 s = q;
        vec3 sumCol = vec3(0.0);
        float cover = 0.0;
        
        for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            
            s -= 0.01;
            
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3); // Risposta non-lineare
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // Amplificazione >1
            
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            
            float m = mix(m0, m1, kMix);
            
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));
            
            sumCol += uColors[i] * w;
            cover = max(cover, w);
        }

        col = clamp(sumCol, 0.0, 1.0);
        a = uTransparent > 0 ? cover : 1.0;
    } 
    else {
        vec2 s = q;
        
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
        }
        
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    if (uNoise > 0.0001) {
        float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`;

/**
 * Vertex Shader GLSL
 *
 * Shader minimo che passa le coordinate UV al fragment shader.
 * Usa un piano fullscreen in coordinate normalizzate.
 */
const vert = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

/**
 * ColorBends Component
 *
 * Componente React che renderizza pattern animati ondulatori usando WebGL/Three.js.
 * Crea effetti visivi fluidi con distorsione cromatica, interazione mouse e animazioni.
 *
 * Features:
 * - Fino a 8 colori personalizzabili o generazione RGB automatica
 * - Rotazione e auto-rotazione configurabili
 * - Interazione mouse con parallasse e influenza
 * - Effetti warp e distorsione
 * - Supporto trasparenza
 * - Noise/grain regolabile
 * - Responsive e performante
 *
 * @component
 * @example
 * ```tsx
 * // Pattern con colori custom
 * <ColorBends
 *   colors={["#ff0000", "#00ff00", "#0000ff"]}
 *   speed={0.5}
 *   warpStrength={1.5}
 *   mouseInfluence={1}
 * />
 *
 * // Pattern RGB automatico (nero invece di bianco)
 * <ColorBends
 *   transparent={false}
 *   speed={0.3}
 * />
 * ```
 */
export default function ColorBends({
    className,
    style,
    rotation = 45,
    speed = 0.2,
    colors = [],
    transparent = true,
    autoRotate = 0,
    scale = 1,
    frequency = 1,
    warpStrength = 1,
    mouseInfluence = 1,
    parallax = 0.5,
    noise = 0.1,
}: ColorBendsProps) {
    // Refs per mantenere istanze Three.js
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const rafRef = useRef<number | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    // Refs per parametri di animazione
    const rotationRef = useRef<number>(rotation);
    const autoRotateRef = useRef<number>(autoRotate);

    // Refs per smooth mouse tracking
    const pointerTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
    const pointerCurrentRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
    const pointerSmoothRef = useRef<number>(8); // Velocità lerp

    /**
     * Effect: Setup Three.js scene e animation loop
     *
     * Crea:
     * - Scene con camera ortografica
     * - Plane mesh fullscreen con shader custom
     * - WebGL renderer con alpha
     * - Animation loop con clock
     * - Resize observer per responsiveness
     */
    useEffect(() => {
        const container = containerRef.current!;
        const scene = new THREE.Scene();

        // Camera ortografica per rendering 2D fullscreen
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Plane geometry che copre lo schermo [-1,1] in NDC
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Inizializza array colori vuoto
        const uColorsArray = Array.from(
            { length: MAX_COLORS },
            () => new THREE.Vector3(0, 0, 0),
        );

        // Crea shader material con uniforms
        const material = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: {
                uCanvas: { value: new THREE.Vector2(1, 1) },
                uTime: { value: 0 },
                uSpeed: { value: speed },
                uRot: { value: new THREE.Vector2(1, 0) },
                uColorCount: { value: 0 },
                uColors: { value: uColorsArray },
                uTransparent: { value: transparent ? 1 : 0 },
                uScale: { value: scale },
                uFrequency: { value: frequency },
                uWarpStrength: { value: warpStrength },
                uPointer: { value: new THREE.Vector2(0, 0) },
                uMouseInfluence: { value: mouseInfluence },
                uParallax: { value: parallax },
                uNoise: { value: noise },
            },
            premultipliedAlpha: true,
            transparent: true,
        });
        materialRef.current = material;

        // Crea mesh e aggiungila alla scene
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Setup renderer WebGL
        const renderer = new THREE.WebGLRenderer({
            antialias: false, // Disabilitato per performance
            powerPreference: "high-performance",
            alpha: true,
        });
        rendererRef.current = renderer;

        // Imposta color space per colori corretti
        (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;

        // Pixel ratio ottimizzato (max 2x)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        // Background trasparente o nero
        renderer.setClearColor(0x000000, transparent ? 0 : 1);

        // Styling canvas
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";

        container.appendChild(renderer.domElement);

        // Clock per delta time
        const clock = new THREE.Clock();

        /**
         * Handler resize: aggiorna dimensioni canvas e uniform
         */
        const handleResize = () => {
            const w = container.clientWidth || 1;
            const h = container.clientHeight || 1;
            renderer.setSize(w, h, false);
            (material.uniforms.uCanvas.value as THREE.Vector2).set(w, h);
        };

        handleResize();

        // Setup resize observer (fallback a window resize per browser vecchi)
        if ("ResizeObserver" in window) {
            const ro = new ResizeObserver(handleResize);
            ro.observe(container);
            resizeObserverRef.current = ro;
        } else {
            (window as Window).addEventListener("resize", handleResize);
        }

        /**
         * Animation loop
         *
         * Aggiorna ogni frame:
         * - Tempo uniform
         * - Rotazione (statica + auto)
         * - Posizione mouse (con smooth lerp)
         * - Rendering scene
         */
        const loop = () => {
            const dt = clock.getDelta();
            const elapsed = clock.elapsedTime;

            // Aggiorna tempo
            material.uniforms.uTime.value = elapsed;

            // Calcola rotazione combinata (statica + auto-rotate)
            const deg =
                (rotationRef.current % 360) + autoRotateRef.current * elapsed;
            const rad = (deg * Math.PI) / 180;
            const c = Math.cos(rad);
            const s = Math.sin(rad);
            (material.uniforms.uRot.value as THREE.Vector2).set(c, s);

            // Smooth lerp per posizione mouse
            const cur = pointerCurrentRef.current;
            const tgt = pointerTargetRef.current;
            const amt = Math.min(1, dt * pointerSmoothRef.current);
            cur.lerp(tgt, amt);
            (material.uniforms.uPointer.value as THREE.Vector2).copy(cur);

            // Render
            renderer.render(scene, camera);

            // Next frame
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        // Cleanup
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            if (resizeObserverRef.current)
                resizeObserverRef.current.disconnect();
            else (window as Window).removeEventListener("resize", handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (
                renderer.domElement &&
                renderer.domElement.parentElement === container
            ) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    /**
     * Effect: Aggiorna uniforms quando cambiano le props
     *
     * Sincronizza tutte le props con gli shader uniforms.
     * Converte colori hex in Vector3 RGB normalizzati.
     */
    useEffect(() => {
        const material = materialRef.current;
        const renderer = rendererRef.current;
        if (!material) return;

        // Aggiorna refs per animation loop
        rotationRef.current = rotation;
        autoRotateRef.current = autoRotate;

        // Aggiorna uniforms numerici
        material.uniforms.uSpeed.value = speed;
        material.uniforms.uScale.value = scale;
        material.uniforms.uFrequency.value = frequency;
        material.uniforms.uWarpStrength.value = warpStrength;
        material.uniforms.uMouseInfluence.value = mouseInfluence;
        material.uniforms.uParallax.value = parallax;
        material.uniforms.uNoise.value = noise;

        /**
         * Converte colore hex in Vector3 RGB normalizzato
         * Supporta formati: #rgb, #rrggbb
         *
         * @param hex - Stringa colore hex (es: "#ff0000")
         * @returns Vector3 con componenti RGB in range [0,1]
         */
        const toVec3 = (hex: string) => {
            const h = hex.replace("#", "").trim();
            const v =
                h.length === 3
                    ? [
                          parseInt(h[0] + h[0], 16),
                          parseInt(h[1] + h[1], 16),
                          parseInt(h[2] + h[2], 16),
                      ]
                    : [
                          parseInt(h.slice(0, 2), 16),
                          parseInt(h.slice(2, 4), 16),
                          parseInt(h.slice(4, 6), 16),
                      ];
            return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
        };

        // Converte e limita array colori a MAX_COLORS
        const arr = (colors || [])
            .filter(Boolean)
            .slice(0, MAX_COLORS)
            .map(toVec3);

        // Aggiorna uniform array colori
        for (let i = 0; i < MAX_COLORS; i++) {
            const vec = (material.uniforms.uColors.value as THREE.Vector3[])[i];
            if (i < arr.length) vec.copy(arr[i]);
            else vec.set(0, 0, 0); // Reset colori non usati
        }
        material.uniforms.uColorCount.value = arr.length;

        // Aggiorna trasparenza
        material.uniforms.uTransparent.value = transparent ? 1 : 0;
        if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);
    }, [
        rotation,
        autoRotate,
        speed,
        scale,
        frequency,
        warpStrength,
        mouseInfluence,
        parallax,
        noise,
        colors,
        transparent,
    ]);

    /**
     * Effect: Setup mouse tracking
     *
     * Traccia il movimento del mouse/touch sul canvas e aggiorna
     * pointerTargetRef in coordinate NDC [-1, 1].
     */
    useEffect(() => {
        const material = materialRef.current;
        const container = containerRef.current;
        if (!material || !container) return;

        /**
         * Handler movimento pointer
         * Converte coordinate client in NDC [-1, 1]
         */
        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            // X: left=-1, right=1
            const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
            // Y: top=1, bottom=-1 (inverti Y per match con coordinate shader)
            const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
            pointerTargetRef.current.set(x, y);
        };

        container.addEventListener("pointermove", handlePointerMove);

        // Cleanup
        return () => {
            container.removeEventListener("pointermove", handlePointerMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full overflow-hidden ${className}`}
            style={style}
        />
    );
}
