import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, useGSAP);
}

import banner1 from '../asset/images/banner-1.jpg';
import banner2 from '../asset/images/banner-2.jpg';
import banner3 from '../asset/images/banner-3.jpg';
import trantu1 from '../asset/images/trantu-1.jpg';
import nextIcon from '../asset/images/next.svg';
import downloadIcon from '../asset/images/download.svg';
import { Typewriter } from './typewriter';

export function Banner() {
    const { t } = useTranslation();
    const bannerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 320px)", () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".banner-elem",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.2 }
            )
                .fromTo(
                    ".banner-img",
                    { scale: 0.95, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    ".banner-badge",
                    { scale: 0, opacity: 0, rotation: -15 },
                    { scale: 1, opacity: 1, rotation: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.5)" },
                    "-=0.4"
                )
                // Hiệu ứng lơ lửng (Floating/Bouncing) chạy liên tục vô tận sau khi xuất hiện xong
                .to(".banner-badge", {
                    y: -12,
                    duration: 1.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    stagger: 0.3 // Badge 2 lơ lửng trễ hơn badge 1 một chút tạo cảm giác tự nhiên
                });

            // Parallax background
            gsap.utils.toArray('.banner-bg').forEach((bg: any) => {
                gsap.to(bg, {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#home",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh: true,
                    }
                });
            });
        });
    }, { scope: bannerRef });

    const slides = [
        {
            id: 1,
            bg: banner1,
            subtitle: t('banner.slide_1_subtitle'),
            desc: t('banner.slide_1_desc')
        },
        {
            id: 2,
            bg: banner2,
            subtitle: t('banner.slide_2_subtitle'),
            desc: t('banner.slide_2_desc')
        },
        {
            id: 3,
            bg: banner3,
            subtitle: t('banner.slide_3_subtitle'),
            desc: t('banner.slide_3_desc')
        },
    ];

    return (
        <section ref={bannerRef} className="w-full h-screen sticky top-0 z-0" id="home">
            <Swiper
                direction={'horizontal'}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: '.sw-dot-default',
                    clickable: true
                }}
                navigation={{
                    prevEl: '.sw-btn-prev',
                    nextEl: '.sw-btn-next'
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 w-full h-full z-0">
                            <img src={slide.bg} alt={`Banner ${slide.id}`} className="banner-bg w-full h-[130%] -top-[15%] relative object-cover" />
                            <div className="absolute bottom-0 left-0 w-full h-1/2 z-[2] pointer-events-none bg-gradient-to-b from-transparent to-[#182e4c]"></div>
                        </div>

                        {/* Content Container */}
                        <div className="container relative z-10 mx-auto px-4 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                            <div className="flex flex-col gap-6 text-left pt-20 lg:pt-0">
                                <h2 className="banner-elem text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tight uppercase text-white">{t('banner.im')} <Typewriter /></h2>
                                <h3 className="banner-elem text-xl md:text-2xl font-semibold text-[#F6FF00]">{slide.subtitle}</h3>
                                <p className="banner-elem text-base md:text-lg text-white">
                                    {slide.desc}
                                </p>
                                <div className="banner-elem flex flex-wrap items-center gap-4 mt-4">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            gsap.to(window, { duration: 1, scrollTo: "#contact", ease: "power3.inOut" });
                                        }}
                                        className="btn-hover-animate cursor-pointer primary px-6 py-3 bg-[#b80000] text-white hover:text-[#31073c] font-bold flex items-center gap-3 group"
                                    >
                                        {t('banner.contact_us')}
                                        <span className="w-5 h-5 flex items-center justify-center"><img src={nextIcon} alt="Next" className="w-full h-full group-hover:brightness-0" /></span>
                                    </button>
                                    <a
                                        href="/CV_Tran-Minh-Tu.pdf"
                                        download="CV_Tran-Minh-Tu.pdf"
                                        className="btn-hover-animate cursor-pointer secondary px-6 py-3 border border-white text-white hover:text-[#131313] font-bold flex items-center gap-3 group inline-flex"
                                    >
                                        {t('banner.download_cv')}
                                        <span className="w-5 h-5 flex items-center justify-center"><img src={downloadIcon} alt="Download" className="w-full h-full group-hover:brightness-0" /></span>
                                    </a>
                                </div>
                            </div>
                            <div className="hidden lg:flex justify-end items-center">
                                <div className="relative">
                                    {/* Main Image */}
                                    <div className="banner-img relative w-[360px] xl:w-[400px] h-[500px] rounded-[30px] overflow-hidden border-[5px] border-black shadow-[0_0_40px_rgba(184,0,0,0.3)]">
                                        <img src={trantu1} alt="Tran Tu" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Badge 1: 1+ Years Exp */}
                                    <div className="banner-badge absolute -left-8 md:-left-12 bottom-16 bg-white border-[5px] border-black rounded-xl px-4 py-3 text-center text-black font-bold z-10 flex flex-col items-center justify-center shadow-xl" style={{ fontFamily: "'Play', sans-serif" }}>
                                        <span className="text-2xl leading-none mb-1">1+</span>
                                        <span className="text-sm leading-tight">{t('banner.years_exp')}</span>
                                    </div>

                                    {/* Badge 2: 10+ Project */}
                                    <div className="banner-badge absolute -right-8 md:-right-12 top-20 bg-white border-[5px] border-black rounded-xl px-4 py-3 text-center text-black font-bold z-10 flex flex-col items-center justify-center shadow-xl" style={{ fontFamily: "'Play', sans-serif" }}>
                                        <span className="text-2xl leading-none mb-1">10+</span>
                                        <span className="text-sm leading-tight">{t('banner.project')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination Container */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                <div className="slider-pagination">
                    <button className="sw-btn-prev">PREV</button>
                    <div className="sw-dot-default"></div>
                    <button className="sw-btn-next">NEXT</button>
                </div>
            </div>
        </section>
    );
}