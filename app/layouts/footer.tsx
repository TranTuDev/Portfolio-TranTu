import React, { useRef } from 'react';
import logo from '../asset/icons/logo.svg';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Footer() {
    const { t } = useTranslation();
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => { // Bật trên Desktop/Tablet để tránh lỗi ở mobile nếu ngắn
            gsap.fromTo(contentRef.current,
                { yPercent: -50 },
                {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true
                    }
                }
            );
        });
    }, { scope: footerRef });

    return (
        <section ref={footerRef} className="bg-black relative z-0 overflow-hidden">
            <div ref={contentRef} className="py-16 container mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    <img src={logo} alt="logo" className="mb-4 w-12 h-12 md:w-16 md:h-16 object-contain invert brightness-0" />
                    <p style={{
                        fontSize: 'clamp(3rem, 10vw, 9rem)',
                        fontWeight: '900',
                        WebkitTextStroke: '2px white',
                        color: 'transparent',
                        letterSpacing: '0.05em',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                        userSelect: 'none',
                    }}>TRAN MINH TU</p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white text-sm" dangerouslySetInnerHTML={{ __html: t('footer.copyright').replace('TranTuDev', '<span class="text-red">TranTuDev</span>') }}></p>

                    <ul className="flex flex-wrap gap-4 items-center justify-center">
                        <li className="text-white text-sm cursor-pointer hover:text-gray-300">{t('footer.sitemap')}</li>
                        <span className="text-white">-</span>
                        <li className="text-white text-sm cursor-pointer hover:text-gray-300">{t('footer.privacy')}</li>
                        <span className="text-white" >-</span>
                        <li className="text-white text-sm cursor-pointer hover:text-gray-300">{t('footer.terms')}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}