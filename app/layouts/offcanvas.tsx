import { useState, useEffect } from "react";
import { X } from "lucide-react";
import logo from "../asset/icons/logo.svg";
import offcanvasImg from "../asset/images/offcanvas.png";
import { useTranslation } from 'react-i18next';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}
const previewData = {
    'preview-home': {
        title: 'CRYPTO LIFE // PROTOCOL',
        desc: 'High-stakes decentralized design systems, speculative interface architectures, and high-frequency tactile execution.'
    },
    'preview-about': {
        title: 'THE ARCHITECT // BIO',
        desc: 'Independent creative engineer bridging cryptographic algorithms, post-punk aesthetics, and WebGL engines.'
    },
    'preview-skills': {
        title: 'TECH STACK // MATRIX',
        desc: 'Solidity, Rust, GLSL Shaders, Next.js, WASM, Tailwind CSS, Ultra-fast Trading UIs.'
    },
    'preview-projects': {
        title: 'FEATURED LABS // WORK',
        desc: 'Autonomous market maker dashboards, NFT collections, and cross-chain portfolio portals.'
    },
    'preview-experience': {
        title: 'CHRONOLOGY // TRACK',
        desc: 'Former Lead Experience Architect at Neon DAO, Protocol Interface Designer, Global Hackathon Winner 2023-2025.'
    },
    'preview-interests': {
        title: 'CULTURE // AUDIO & NFTs',
        desc: 'Modular synthesizers, dark electro acoustics, generative art curation, cryptographic philosophy.'
    },
    'preview-contact': {
        title: 'DISPATCH // ENCRYPTED',
        desc: 'PGP fingerprint available on request. Available for advisory, avant-garde design systems, and design sprints.'
    }
} as const;

type PreviewKey = keyof typeof previewData;

export function Offcanvas({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { t } = useTranslation();
    const [previewKey, setPreviewKey] = useState<PreviewKey>('preview-interests');
    const [btcPrice, setBtcPrice] = useState(67834.27);

    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            const base = 67840;
            const variation = (Math.random() * 12 - 6);
            setBtcPrice(base + variation);
        }, 3500);
        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    const currentPreview = previewData[previewKey];
    console.log("offcanvasImg path:", offcanvasImg);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#131313] text-[#e2e2e2] flex flex-col animate-slide-down" style={{ fontFamily: "'Play', sans-serif" }}>

            <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full opacity-60 pointer-events-none bg-gradient-to-br from-[#b80000] via-[#ebb4f3] to-transparent" style={{ filter: 'blur(120px)' }}></div>
            <div className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] rounded-full opacity-50 pointer-events-none bg-gradient-to-bl from-[#a3c9ff] via-[#165c9e] to-transparent" style={{ filter: 'blur(140px)' }}></div>
            <div className="absolute -bottom-24 left-1/3 w-[28rem] h-[28rem] rounded-full opacity-40 pointer-events-none bg-gradient-to-tr from-[#64386d] via-[#b80000] to-transparent" style={{ filter: 'blur(130px)' }}></div>
            <div className="container">
                <div className=" mx-auto  py-6  ">

                    <header className="w-full pb-8 flex  items-center justify-between gap-6 relative z-20">
                        <div className="flex items-center gap-5">
                            <span><img src={logo} alt="Logo" className="w-[30px] h-[30px] object-contain brightness-0 invert" /></span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#1b1b1b]/80 backdrop-blur-md shadow-md">
                                <span className="w-2 h-2 rounded-full bg-[#b80000] animate-pulse"></span>
                                <span className="text-xs text-[#e6bdb7]">BTC/USD</span>
                                <span className="text-sm font-bold">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                <span className="text-xs text-[#a3c9ff] font-semibold">+4.82%</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 justify-between lg:justify-end">
                            <button onClick={onClose} className="group relative px-4 py-2 bg-[#2a2a2a] hover:bg-[#e2e2e2] transition-colors duration-200 cursor-pointer flex items-center gap-2 shadow-lg">
                                <span className="text-xs group-hover:text-[#131313] uppercase tracking-widest font-bold">{t('common.close')}</span>
                                <X size={16} className="text-[#ffb4a8] group-hover:text-[#131313] transition-transform duration-200 group-hover:rotate-90" />
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto  items-center">
                        {/* Navigation */}
                        <nav className="lg:col-span-7 flex flex-col gap-1 z-20">
                            {Object.keys(previewData).map((key, index) => {
                                const pKey = key as PreviewKey;
                                const originalTitle = pKey.replace('preview-', '').toLowerCase();
                                const translatedTitle = t(`nav.${originalTitle}`, pKey.replace('preview-', '').toUpperCase());
                                const num = `0${index + 1}`.slice(-2);
                                return (
                                    <a
                                        key={pKey}
                                        href={`#${originalTitle}`}
                                        onMouseEnter={() => setPreviewKey(pKey)}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClose();
                                            setTimeout(() => {
                                                const target = originalTitle === 'home' ? 0 : `#${originalTitle}`;
                                                gsap.to(window, { duration: 1, scrollTo: target, ease: "power3.inOut" });
                                            }, 400);
                                        }}
                                        className="group relative flex items-baseline justify-between p-3.5 -mx-3 transition-all duration-300 hover:bg-[#1b1b1b]/60"
                                    >
                                        <div className="flex items-baseline gap-4 md:gap-7">
                                            <span className="text-sm text-[#e6bdb7]/60 group-hover:text-[#ffb4a8] transition-colors tracking-widest font-semibold">{num} //</span>
                                            <span className="text-[40px] md:text-[60px] uppercase group-hover:text-[#ffdad4] tracking-tight transition-transform duration-300 group-hover:translate-x-2 font-bold">{translatedTitle}</span>
                                        </div>
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Preview Panel */}
                        <aside className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
                            <div className="w-full min-w-[300px] max-w-[400px] bg-[#0e0e0e] p-5 relative shadow-2xl transition-all duration-500">
                                <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#b80000]"></span>
                                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#a3c9ff]"></span>
                                <div className="relative  overflow-hidden group">
                                    <img alt="Preview" className="transition-transform duration-700 ease-out group-hover:scale-105" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={offcanvasImg} />
                                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/70 to-transparent flex flex-col justify-end">
                                        <h3 className="text-xl font-bold tracking-tight">{currentPreview.title}</h3>
                                        <p className="text-sm text-[#e6bdb7] mt-1 line-clamp-2">{currentPreview.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>



                </div>
            </div>

        </div>
    );
}
