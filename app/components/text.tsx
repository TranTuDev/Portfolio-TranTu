import "../asset/scss/marquee.scss";

export function Text({ rotate = '0deg', reverse = false }: { rotate?: string, reverse?: boolean }) {
    return (
        <div
            className="text-strip"
            style={{
                transform: `rotate(${rotate})`,
            }}
        >
            <div
                className="text-strip__marquee"
                style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="text-strip__item">
                        <h2 className="h2 uppercase text-[#b80000] m-0 whitespace-nowrap">Design Build</h2>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <h2 className="h2 uppercase text-white m-0 whitespace-nowrap">construction</h2>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b80000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <h2 className="h2 uppercase text-[#b80000] m-0 whitespace-nowrap">architect</h2>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <h2 className="h2 uppercase text-white m-0 whitespace-nowrap">Design build</h2>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b80000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    )
}
