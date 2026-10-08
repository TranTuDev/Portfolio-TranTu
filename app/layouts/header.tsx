import { Search, Calendar, List, X } from "lucide-react";
import logo from "../asset/icons/logo.svg";
import menu from "../asset/icons/menu.svg";
import { useState, useEffect } from "react";
import { Offcanvas } from "./offcanvas";
import { useTranslation } from "react-i18next";

export function Header() {
    const { i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            const darkThreshold = window.innerHeight - 90;

            setIsScrolled(y > 60);
            setIsDark(y > darkThreshold);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll); // to update on resize if needed

        // Init
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <>
            <section className={`fixed top-0 left-0 w-full z-40 transition-all duration-300  ${isDark ? 'bg-[#182e4c]/30 backdrop-blur-[24px] border-white/20 shadow-lg' : 'bg-transparent border-transparent'} text-white`}>
                <div className="container">
                    <div className="flex justify-between items-center p-2">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-[30px] h-[30px] object-contain brightness-0 invert" />
                            <h3 className="text-h3 text-white">TranTuDev</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <select 
                                    className="bg-transparent outline-none cursor-pointer px-3 py-1.5 border border-black rounded text-black font-semibold"
                                    value={i18n.language}
                                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                                >
                                    <option value="en" className="bg-white text-black text-body">English</option>
                                    <option value="vi" className="bg-white text-black text-body">Tiếng Việt</option>
                                </select>
                            </div>
                            <div className="btn-hover-animate white p-4 text-body cursor-pointer bg-[#b80000] flex items-center justify-center group border border-transparent transition-colors" onClick={() => setIsMenuOpen(true)}>
                                <img src={menu} alt="Menu" className="w-[30px] h-[30px] object-contain brightness-0 invert relative z-10 group-hover:brightness-0 group-hover:invert-0 transition-all duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Offcanvas Menu Component */}
            <Offcanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    )
}