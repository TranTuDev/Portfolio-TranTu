import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ChevronUp } from "lucide-react";

export function GoTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progressAngle, setProgressAngle] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Calculate progress angle (0 to 360 degrees)
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 360 : 0;
            setProgressAngle(progress);
            
            // Show button after 300px of scrolling
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed z-30 p-0 bottom-[35px] right-[35px] md:bottom-[90px] md:right-[40px] w-[38px] h-[38px] bg-white text-[#b80000] text-xl text-center flex items-center justify-center cursor-pointer border-none rounded-[3px] transition-all duration-300 hover:bg-[#f4f4f4] hover:shadow-lg ${
                isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
        >
            <span
                className="absolute -top-[1px] -left-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] rounded-[3px] border-2 border-[#b80000] z-[1] transition-all duration-[50ms] pointer-events-none"
                style={{
                    maskImage: `conic-gradient(#000 ${progressAngle}deg, transparent 0)`,
                    WebkitMaskImage: `conic-gradient(#000 ${progressAngle}deg, transparent 0)`,
                }}
            ></span>
            <ChevronUp size={20} className="relative z-10 transition-all duration-300" strokeWidth={3} />
        </button>
    );
}

