"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setShowBanner(true);
        } else if (consent === "granted") {
            updateGtagConsent();
        }
    }, []);

    const updateGtagConsent = () => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
            });
        }
    };

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "granted");
        updateGtagConsent();
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie_consent", "denied");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
            <div className="max-w-4xl mx-auto bg-main-background border border-black/10 dark:border-white/10 p-6 rounded-primary shadow-custom flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-secondary-text text-sm leading-relaxed">
                    <strong className="text-main-text text-base block mb-1">Rispettiamo la tua privacy</strong>
                    Utilizziamo cookie tecnici per il funzionamento del sito e, previo tuo consenso, cookie analitici (Google Analytics) per capire come viene utilizzato il portale.
                </div>
                <div className="flex gap-3 shrink-0 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-4 py-2 rounded-secondary text-sm font-semibold border border-neutral hover:bg-neutral-background transition-colors"
                    >
                        Rifiuta
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-4 py-2 rounded-secondary text-sm font-semibold bg-base-red text-white hover:brightness-110 transition-colors shadow-glow-hover"
                    >
                        Accetta
                    </button>
                </div>
            </div>
        </div>
    );
}