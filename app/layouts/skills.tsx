import React, { useRef } from "react";
import { FrameWork } from "../components/frame-work";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Skills() {
    const { t } = useTranslation();
    const skillsRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 320px)", () => {
            gsap.fromTo('.skills-title', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.skills-title',
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, { scope: skillsRef });

    return (
        <section ref={skillsRef} className="relative w-full overflow-hidden bg-white" id="skills">
            <div className="relative z-10 container pt-40 pb-20 text-center">
                <h3 className="skills-title opacity-0 text-4xl font-bold text-black uppercase ">{t('skills.title')}</h3>
            </div>

            <div className="relative z-10 w-full pb-20">
                <FrameWork />
            </div>
        </section>
    )
}