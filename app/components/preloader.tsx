import { useEffect, useRef } from "react";
import gsap from "gsap";

const greetings = [
    { text: "Hello", color: "#FFFFFF" },
    { text: "Xin chào", color: "#F6FF00" },
    { text: "Bonjour", color: "#a3c9ff" },
    { text: "こんにちは", color: "#ffb4a8" },
    { text: "TRAN TU", color: "#b80000" } // Final brand name
];

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const progressTextRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !progressTextRef.current || !progressBarRef.current) return;

        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "";
                if (containerRef.current) {
                    containerRef.current.style.display = "none";
                }
            }
        });

        const totalDuration = greetings.length * 0.25;

        // Progress Counter and Bar (0 to 100%)
        tl.to({ val: 0 }, {
            val: 100,
            duration: totalDuration + 0.2, // Chạy khớp thời gian với chữ
            ease: "power2.inOut",
            onUpdate: function() {
                if (progressTextRef.current) {
                    progressTextRef.current.innerText = Math.round(this.targets()[0].val) + "%";
                }
                if (progressBarRef.current) {
                    progressBarRef.current.style.width = this.targets()[0].val + "%";
                }
            }
        }, 0); // Start at 0

        // Lặp qua các từ
        greetings.forEach((greeting, index) => {
            tl.set(textRef.current, { 
                innerHTML: greeting.text, 
                color: greeting.color 
            }, index === 0 ? 0.2 : index * 0.25 + 0.2); 
        });

        // Đợi ở chữ cuối cùng, sau đó trượt
        tl.to(containerRef.current, {
            yPercent: 100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.6
        });

        return () => {
            tl.kill();
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-[9999] bg-[#0e0e0e] flex flex-col items-center justify-between"
            style={{ fontFamily: "'Play', sans-serif" }}
        >
            <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="flex items-center gap-5">
                    <span className="w-3 h-3 rounded-full bg-white animate-pulse"></span>
                    <h1 
                        ref={textRef} 
                        className="text-4xl md:text-6xl font-bold uppercase tracking-widest"
                    >
                        {/* Nội dung được GSAP ghi đè */}
                    </h1>
                </div>
            </div>

            {/* Loading Bar Section */}
            <div className="w-full px-6 md:px-12 pb-12 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[#e6bdb7] text-sm md:text-base font-bold tracking-widest">
                    <span>INITIALIZING PROTOCOL...</span>
                    <span ref={progressTextRef}>0%</span>
                </div>
                <div className="w-full h-[2px] bg-[#2a2a2a] relative overflow-hidden rounded-full">
                    <div 
                        ref={progressBarRef}
                        className="absolute top-0 left-0 h-full bg-[#b80000] w-0 transition-none"
                    ></div>
                </div>
            </div>
        </div>
    );
}

