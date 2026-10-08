import React, { useRef } from "react";
import { Blog } from "../components/blog";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Experience() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 320px)", () => {
            // Animate Title
            gsap.fromTo('.experience-title', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.experience-title',
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // Animate line drawing
            gsap.fromTo(lineRef.current, 
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    transformOrigin: "top center",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        end: "bottom 90%",
                        scrub: true,
                        invalidateOnRefresh: true,
                    }
                }
            );

            // Animate each blog card
            const cards = gsap.utils.toArray('.blog-card-wrapper') as HTMLElement[];
            const dots = gsap.utils.toArray('.blog-dot') as HTMLElement[];

            cards.forEach((card, i) => {
                const isLeft = i % 2 === 0;
                
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%", // Khi card vừa vào viewport 85%
                        toggleActions: "play none none reverse", // Chạy khi cuộn xuống, reverse khi cuộn lên
                    }
                });

                tl.fromTo(card, 
                    { opacity: 0, x: isLeft ? -50 : 50, y: 30 },
                    { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }
                );

                if (dots[i]) {
                    tl.fromTo(dots[i], 
                        { scale: 0 },
                        { scale: 1, duration: 0.4, ease: "back.out(1.7)" },
                        "-=0.5" // Chạy cùng lúc card gần xong
                    );
                }
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-black text-white py-20" id="experience">
            <div className="container mx-auto px-4 text-center mb-16 relative z-10">
                <h3 className="experience-title opacity-0 text-4xl font-bold text-white uppercase">{t('experience.title')}</h3>
            </div>

            <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-10">
                {/* Line Background (Dark Red) */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-red-950 -translate-x-1/2 z-0"></div>
                
                {/* Animated Line (Bright Red) */}
                <div 
                    ref={lineRef}
                    className="absolute top-0 left-1/2 w-[2px] bg-red-600 -translate-x-1/2 z-0 h-full origin-top" 
                ></div>

                {/* 4 Blogs */}
                {[0, 1, 2, 3].map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={index} className={`relative flex items-center justify-between w-full mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                            
                            {/* Blog Content */}
                            <div className="blog-card-wrapper w-[45%] z-10 opacity-0">
                                <Blog index={index} />
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-black border-2 border-red-950 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                                <div className="blog-dot w-3 h-3 bg-red-600 rounded-full scale-0"></div>
                            </div>

                            {/* Empty Space for the other side */}
                            <div className="w-[45%]"></div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
