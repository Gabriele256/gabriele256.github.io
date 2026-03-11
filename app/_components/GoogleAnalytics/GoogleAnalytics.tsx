"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && typeof window !== "undefined" && window.gtag) {
            window.gtag("config", gaId, {
                page_path: pathname + searchParams.toString(),
            });
        }
    }, [pathname, searchParams, gaId]);

    return (
        <>
            <Script id="google-consent" strategy="beforeInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied',
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'wait_for_update': 500
                    });
                `}
            </Script>

            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}');
                `}
            </Script>
        </>
    );
}