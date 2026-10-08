const fs = require('fs');
let code = fs.readFileSync('app/components/card.tsx', 'utf8');

const regex = /const getWordPressCard = \([\s\S]*?<\/div>\s*<\/React.Fragment>\s*\);/;

const replacement = `const getWordPressCard = (keyName: string, title: string, titleHref: string, demoHref: string, desc: string, techStack: string[]) => (
            <React.Fragment key={keyName}>
                <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                    <div className="flex flex-col gap-6">
                        <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                            <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt={title} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXYS8F9HLmRaEvHlYFcU8a-QIVwah-B9YYqyImpyY4SOkh72mbkLefCMUj44WQWdXn9hP6hXBehOO_w7Px85CsUnL55qWqY5lD8yTt3ddIyvFNhFyivS8S84uDs5avUkC6IsGXfbqT8jUXPDTjmK8IYlXclG4gUvFi_4SBS6efoqB5NKPIGZ5nmJTl9hqBUtKNUHcy_47wPAN1lFT4JBYYMiCZwFhJskgZnQzgYgs_NCmPV4mck9qs_g" />
                            <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#ebb4f3] text-xs font-semibold rounded">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ebb4f3] animate-pulse"></span>
                                    <span>WORDPRESS · CMS</span>
                                </div>
                                <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">DEPLOYMENT: PASS</span>
                            </div>
                            <div className="relative z-10"><span className="text-xs text-[#ebb4f3] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">CUSTOM THEME</span></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: LIVE</span></div>
                            <a href={titleHref} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold uppercase text-white tracking-tight hover:text-[#b80000] transition-colors line-clamp-2" title={title}>
                                {title}
                            </a>
                            <p className="text-sm text-gray-400 line-clamp-3" title={desc}>{desc}</p>
                        </div>
                        <div className="flex flex-col gap-2"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">TECH STACK</span>
                            <div className="flex flex-wrap items-center gap-2">
                                {techStack.map((t, idx) => (
                                    <React.Fragment key={idx}>
                                        <span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">{t}</span>
                                        {idx < techStack.length - 1 && <span className="text-gray-500 text-xs">·</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2"><span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#ebb4f3]">code</span>CORE CONTRIBUTIONS</span>
                            <ul className="flex flex-col gap-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ebb4f3] text-xs font-bold mt-1">&gt;&gt;</span><span>Customized WordPress theme matching pixel-perfect designs with ACF integration.</span></li>
                                <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ebb4f3] text-xs font-bold mt-1">&gt;&gt;</span><span>Optimized page load speed and implemented SEO best practices.</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">PERFORMANCE</span><span className="text-sm text-[#ebb4f3] font-bold">95/100</span></div>
                            <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">LOAD TIME</span><span className="text-sm text-white font-bold">&lt;2S</span></div>
                            <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">RESPONSIVE</span><span className="text-sm text-[#a3c9ff] font-bold">ALL DEVICES</span></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href={demoHref} target="_blank" rel="noopener noreferrer" className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );`;

code = code.replace(regex, replacement);
fs.writeFileSync('app/components/card.tsx', code, 'utf8');

