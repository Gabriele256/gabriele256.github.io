declare module '*.css';

interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
}