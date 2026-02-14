import { ReactNode, useId } from "react";
import styles from "./glassElement.module.css";

interface GlassWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function GlassElement({
    children,
    className = "",
}: GlassWrapperProps) {
    const uniqueId = useId();
    const filterId = `glass-filter-${uniqueId.replace(/:/g, "")}`;
    return (
        <div className={`relative`}>
            {" "}
            <div
                className={`${styles.glassContainer} ${className}`}
                style={
                    {
                        "--glass-filter-ref": `url(#${filterId})`,
                    } as React.CSSProperties
                }
            >
                {children}{" "}
            </div>{" "}
            <svg style={{ display: "none" }}>
                {" "}
                <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
                    {" "}
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.001 0.001"
                        numOctaves="1"
                        seed="5"
                        result="noise"
                    />{" "}
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="100"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />{" "}
                </filter>{" "}
            </svg>{" "}
        </div>
    );
}
