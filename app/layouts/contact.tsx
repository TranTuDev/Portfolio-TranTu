import React, { useRef } from 'react';
import addressIcon from '../asset/images/Adress.svg';
import phoneIcon from '../asset/images/Phone.svg';
import emailIcon from '../asset/images/Email.svg';
import { Form } from '../components/form';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export function Contact() {
    const { t } = useTranslation();
    const contactRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 320px)", () => {
            // Animate Title and Subtitle
            gsap.fromTo('.contact-title-group', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.contact-title-group',
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // Infinite marquee
            if (marqueeRef.current) {
                gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    repeat: -1,
                    duration: 15,
                    ease: "linear"
                });
            }
        });
    }, { scope: contactRef });

    return (
        <section ref={contactRef} className="relative w-full overflow-hidden bg-white z-10" id="contact">
            {/* Background Marquee */}
            <div className="absolute top-40 left-0 w-[200%] flex whitespace-nowrap opacity-[0.03] z-0 pointer-events-none select-none">
                <h2 ref={marqueeRef} className="text-[120px] md:text-[200px] font-black uppercase leading-none">
                    LET'S WORK TOGETHER — LET'S WORK TOGETHER — LET'S WORK TOGETHER — LET'S WORK TOGETHER — 
                </h2>
            </div>

            <div className="relative z-10 container pt-40 pb-20 text-center">
                <h3 className="contact-title-group opacity-0 text-4xl font-bold text-black uppercase">{t('contact.title')}</h3>
                <p className="contact-title-group opacity-0 text-6xl font-bold bg-[image:var(--color-gradient-custom)] bg-clip-text text-transparent mt-4">{t('contact.subtitle')}</p>
            </div>

            <div className="relative z-10 container pt-20 pb-20 flex flex-col md:flex-row items-stretch justify-center gap-8">
                <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full md:w-1/3 min-h-[250px] bg-white">
                    <img src={addressIcon} alt="Address" className="w-16 h-16 mb-4" />
                    <h3 className="h3 uppercase mb-2">{t('contact.address')}</h3>
                    <p className="text-gray-600 text-center">{t('contact.address_val')}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full md:w-1/3 min-h-[250px] bg-white">
                    <img src={phoneIcon} alt="Phone" className="w-16 h-16 mb-4" />
                    <h3 className="h3 uppercase mb-2">{t('contact.phone')}</h3>
                    <p className="text-gray-600 text-center">+84 354 916 004</p>
                </div>
                <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full md:w-1/3 min-h-[250px] bg-white">
                    <img src={emailIcon} alt="Email" className="w-16 h-16 mb-4" />
                    <h3 className="h3 uppercase mb-2">{t('contact.mail')}</h3>
                    <p className="text-gray-600 text-center">tranminhtu.13092004@gmail.com</p>
                </div>
            </div>

            <div className="relative z-10 w-full pb-20">
                <Form />
            </div>
        </section>
    )
}