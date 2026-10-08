import React, { useState, useRef } from "react";
import { Card } from "../components/card";
import startDarkIcon from '../asset/images/start-dark.svg';
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Project() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [t('project.tab_1'), t('project.tab_2'), t('project.tab_3')];
    const projectRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 320px)", () => {
            gsap.fromTo('.project-title', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.project-title',
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, { scope: projectRef });

    return (
        <section ref={projectRef} className="relative w-full overflow-hidden bg-[#F4FAFF]" id="projects">
            <div className="container mx-auto">
                <div className="relative z-10 pt-40 pb-20 text-center">
                    <h3 className="project-title opacity-0 text-4xl font-bold text-black uppercase">{t('project.title')}</h3>
                </div>

                <div className="w-full pb-16 overflow-x-hidden">
                    <div className="w-full max-w-4xl mx-auto relative pt-8">
                        {/* Single perfectly centered background line for 3 tabs */}
                        <div className="absolute bottom-[9px] left-[16.66%] w-[66.66%] h-[2px] bg-[#E6E7E8] z-0"></div>

                        <ul className="list-none p-0 m-0 flex items-end justify-between w-full relative z-10" role="tablist">
                            {tabs.map((tab, index) => (
                                <li key={index} className="flex-1 flex flex-col items-center justify-end" role="presentation">
                                    <button
                                        onClick={() => setActiveTab(index)}
                                        className={`uppercase flex flex-col justify-end items-center text-center gap-2 md:gap-4 border-none bg-transparent cursor-pointer transition-all duration-500 ease-out whitespace-nowrap text-[10px] sm:text-xs md:text-base lg:text-lg font-medium leading-tight relative origin-bottom
                                            ${activeTab === index
                                                ? 'text-[#182E4C] scale-110 [text-shadow:0px_4px_10px_rgba(24,46,76,0.15)]'
                                                : 'text-[#CECECE] scale-100'
                                            }`}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeTab === index}
                                    >
                                        <span className="max-w-[80px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal break-words">{tab}</span>
                                        <div className="bg-[#F4FAFF] px-2 md:px-4 relative z-10 flex items-center justify-center">
                                            <img
                                                src={startDarkIcon}
                                                alt="star"
                                                className={`w-[14px] h-[14px] md:w-[18px] md:h-[18px] transition-all duration-500 ${activeTab === index ? 'opacity-100' : 'opacity-20'}`}
                                            />
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="">
                    <Card activeTab={activeTab} />
                </div>
            </div>
        </section>
    )
}