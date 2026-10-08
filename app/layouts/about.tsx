import React, { useRef } from "react";
import { Accordion } from "../components/accodion";
import { Slide } from "../components/slide";
import aboutBgMb from '../asset/images/about-bg-mb.jpg';
import aboutBgPc from '../asset/images/about-bg-pc.jpg';
import startDarkIcon from '../asset/images/start-dark.svg';
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function About() {
    const { t } = useTranslation();
    const aboutRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 320px)", () => {
            // Animate About Title
            gsap.fromTo('.about-title', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.about-title',
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // Stagger Grid Items
            gsap.fromTo('.about-grid-item',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.about-grid-container',
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, { scope: aboutRef });

    return (
        <section ref={aboutRef} className="relative w-full overflow-clip " id="about">
            {/* Background Images */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="sticky top-0 w-full h-screen">
                    <img src={aboutBgMb} alt="About Background Mobile" className="w-full h-full object-fill block sm:hidden" />
                    <img src={aboutBgPc} alt="About Background PC" className="w-full h-full object-cover xl:object-fill hidden sm:block" />
                </div>
            </div>

            <div className="relative z-10 container xl:pt-80 pt-40 text-center">
                <h3 className="about-title text-4xl font-bold text-white uppercase mb-8 opacity-0">{t('about.title')}</h3>
            </div>

            <div className="relative z-10 container  ">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
                    <div className="md:col-span-7 min-w-0 md:sticky md:top-0 md:h-screen flex flex-col justify-start pt-4 md:pt-32">

                        <div className="about-grid-container grid grid-cols-[1fr_auto_1fr] gap-x-6 gap-y-10 mb-12">
                            {/* Row 1 */}
                            <div className="about-grid-item text-right flex flex-col justify-start mt-1 opacity-0">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 mb-1">{t('about.education')}</p>
                                <h3 className="text-xl md:text-2xl font-light text-white">{t('about.education_val')}</h3>
                            </div>

                            <div className="about-grid-item flex flex-col items-center gap-2 opacity-0">
                                <img src={startDarkIcon} alt="start" className="w-[18px] h-[18px]" loading="lazy" />
                                <i className="block w-[2px] h-[60px] bg-gradient-to-b from-[#B4D3FF] to-transparent"></i>
                            </div>

                            <div className="about-grid-item text-left flex flex-col justify-start mt-1 opacity-0">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 mb-1">{t('about.role')}</p>
                                <h3 className="text-xl md:text-2xl font-light text-white">{t('about.role_val')}</h3>
                            </div>

                            {/* Row 2 */}
                            <div className="about-grid-item text-right flex flex-col justify-start mt-1 opacity-0">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 mb-1">{t('about.location')}</p>
                                <h3 className="text-xl md:text-2xl font-light text-white">{t('about.location_val')}</h3>
                            </div>

                            <div className="about-grid-item flex flex-col items-center gap-2 opacity-0">
                                <img src={startDarkIcon} alt="start" className="w-[18px] h-[18px]" loading="lazy" />
                                <i className="block w-[2px] h-[60px] bg-gradient-to-b from-[#B4D3FF] to-transparent"></i>
                            </div>

                            <div className="about-grid-item text-left flex flex-col justify-start mt-1 opacity-0">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 mb-1">{t('about.focus')}</p>
                                <h3 className="text-xl md:text-2xl font-light text-white">{t('about.focus_val')}</h3>
                            </div>
                        </div>
                        <div className="about-grid-item opacity-0">
                            <Accordion />
                        </div>
                    </div>
                    <div className="md:col-span-5 min-w-0">
                        <Slide />
                    </div>
                </div>
            </div>



        </section>
    )
}