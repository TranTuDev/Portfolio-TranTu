import { Header } from "../layouts/header";
import { Banner } from "../layouts/banner";
import { About } from "../layouts/about";
import { Skills } from "../layouts/skills";
import { Project } from "../layouts/project";
import { TextBranch } from "../layouts/text-branch";
import { Experience } from "../layouts/experience";
import { Interests } from "../layouts/interests";
import { Contact } from "../layouts/contact";
import { TextFooter } from "../layouts/text-footer";
import { Footer } from "../layouts/footer";
import { GoTop } from "../components/go-top";
import { Preloader } from "../components/preloader";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function HomePage() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
        };
    }, []);

    return (
        <div>
            <Preloader />
            <Header />
            <Banner />
            <main>
                <About />
                <Skills />
                <Project />
                <TextBranch />
                <Experience />
                <Interests />
                <Contact />
                <TextFooter />
            </main>
            <Footer />
            <GoTop />
        </div>
    );
}
