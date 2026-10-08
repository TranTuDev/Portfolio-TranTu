"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../asset/scss/horizontal-slider.scss";
import imgSlide1 from "../asset/images/product_slide_1.jpg";
import imgSlide2 from "../asset/images/product_slide_2.jpg";
import imgSlide3 from "../asset/images/product_slide_3.jpg";
import imgSlide4 from "../asset/images/product_slide_4.jpg";
import imgSlide5 from "../asset/images/product_slide_5.jpg";
import iconStart from "../asset/images/start-dark.svg";
import { useTranslation } from "react-i18next";

// Đăng ký plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Interests() {
    const { t } = useTranslation();
    const trackRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            // Animate Title
            gsap.fromTo('.interests-title', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.interests-title',
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            const wrapper = wrapperRef.current;
            const track = trackRef.current;
            if (!wrapper || !track) return;

            // Chiều rộng cuộn ngang = Chiều rộng thực tế của thẻ wrap - Chiều rộng của màn hình
            const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

            const tween = gsap.to(wrapper, {
                x: () => -getScrollAmount(),
                ease: "none",
                scrollTrigger: {
                    trigger: track,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    scrub: 1, // Làm mượt scroll
                    invalidateOnRefresh: true, // Tính lại kích thước khi resize
                }
            });

            // Animate content inside each slide using containerAnimation
            const slides = gsap.utils.toArray('.horizontal-slider__slide');
            slides.forEach((slide: any) => {
                const img = slide.querySelector('.horizontal-slider__image img');
                const content = slide.querySelector('.horizontal-slider__content');

                // Parallax cho ảnh
                if (img) {
                    gsap.fromTo(img, 
                        { x: -50 },
                        { 
                            x: 50, 
                            ease: "none",
                            scrollTrigger: {
                                trigger: slide,
                                containerAnimation: tween,
                                start: "left right",
                                end: "right left",
                                scrub: true,
                            }
                        }
                    );
                }

                // Text bay lên khi vào khung hình
                if (content) {
                    gsap.fromTo(content,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1, 
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: slide,
                                containerAnimation: tween,
                                start: "left center", // Khi bên trái slide tới giữa màn hình
                                toggleActions: "play none none reverse",
                            }
                        }
                    );
                }
            });

            return () => {
                tween.kill();
            };
        });
    }, { scope: trackRef });

    return (
        <section className="horizontal-slider overflow-hidden" id="interests" ref={trackRef}>
            <div className="container mx-auto px-4 text-center mb-5 pt-5 relative z-10">
                <h3 className="interests-title opacity-0 text-4xl font-bold text-black uppercase">{t('interests.title')}</h3>
            </div>
            <div className="horizontal-slider__track overflow-hidden">
                <div className="horizontal-slider__wrapper flex" ref={wrapperRef}>

                    {/* SLIDE 1 */}
                    <div className="horizontal-slider__slide horizontal-slider__slide--full">
                        <div className="horizontal-slider__image">
                            <img src={imgSlide1} alt="slide 1" loading="lazy" />
                        </div>
                        <div className="horizontal-slider__content">

                            <h2 className="horizontal-slider__heading h2">{t('interests.tech')}</h2>
                            <div className="note mg-left-70 style-1 flex items-center gap-4">
                                <span className="start__decos">
                                    <img src={iconStart} alt="start" loading="lazy" />
                                    <i className="start__lines style-2"></i>
                                </span>
                                <p className="note__text sub-3 style-2">{t('interests.tech_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 2 */}
                    <div className="horizontal-slider__slide horizontal-slider__slide--box">
                        <div className="horizontal-slider__image pd-20">
                            <img src={imgSlide2} alt="slide 2" loading="lazy" />
                        </div>
                        <div className="horizontal-slider__content">

                            <h2 className="horizontal-slider__heading h2">{t('interests.badminton')}
                            </h2>
                            <div className="note mg-left-70 style-2 flex items-center gap-4">
                                <span className="start__decos">
                                    <img src={iconStart} alt="start" loading="lazy" />
                                    <i className="start__lines style-2"></i>
                                </span>
                                <p className="note__text sub-3 style-2">{t('interests.badminton_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 3 */}
                    <div className="horizontal-slider__slide horizontal-slider__slide--wide mg-100-bt">
                        <div className="horizontal-slider__image">
                            <img src={imgSlide3} alt="slide 3" loading="lazy" />
                        </div>
                        <div className="horizontal-slider__content">
                            <div className="horizontal-slider__content-left">

                                <h2 className="horizontal-slider__heading h2"> {t('interests.learning')} </h2>
                            </div>
                            <div className="horizontal-slider__content-right flex items-center gap-4">
                                <span className="start__decos">
                                    <img src={iconStart} alt="start" loading="lazy" />
                                    <i className="start__lines style-3"></i>
                                </span>
                                <p className="note__text sub-3 style-2">{t('interests.learning_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 4 */}
                    <div className="horizontal-slider__slide horizontal-slider__slide--reverse-box">
                        <div className="horizontal-slider__image pd-20">
                            <img src={imgSlide4} alt="slide 4" loading="lazy" />
                        </div>
                        <div className="horizontal-slider__content">

                            <h2 className="horizontal-slider__heading h2">{t('interests.music')}</h2>
                            <div className="note flex items-center gap-4">
                                <span className="start__decos ">
                                    <img src={iconStart} alt="start" loading="lazy" />
                                    <i className="start__lines style-2"></i>
                                </span>
                                <p className="note__text sub-3 style-2">{t('interests.music_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 5 */}
                    <div className="horizontal-slider__slide horizontal-slider__slide--reverse-full">
                        <div className="horizontal-slider__image">
                            <img src={imgSlide5} alt="slide 5" loading="lazy" />
                        </div>
                        <div className="horizontal-slider__content">
                            <h2 className="horizontal-slider__heading h2">{t('interests.trading')} </h2>
                            <div className="note mg-left-70 flex items-center gap-4">
                                <span className="start__decos">
                                    <img src={iconStart} alt="start" loading="lazy" />
                                    <i className="start__lines style-2"></i>
                                </span>
                                <p className="note__text sub-3 style-2">{t('interests.trading_desc')}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
