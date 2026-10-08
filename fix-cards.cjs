const fs = require('fs');

const p1Krypto = `
        const p1 = (key: string) => (<React.Fragment key={key}>
            <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                <div className="flex flex-col gap-6">
                    <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt="Krypto Studios" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXYS8F9HLmRaEvHlYFcU8a-QIVwah-B9YYqyImpyY4SOkh72mbkLefCMUj44WQWdXn9hP6hXBehOO_w7Px85CsUnL55qWqY5lD8yTt3ddIyvFNhFyivS8S84uDs5avUkC6IsGXfbqT8jUXPDTjmK8IYlXclG4gUvFi_4SBS6efoqB5NKPIGZ5nmJTl9hqBUtKNUHcy_47wPAN1lFT4JBYYMiCZwFhJskgZnQzgYgs_NCmPV4mck9qs_g" />
                        <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#ebb4f3] text-xs font-semibold rounded"><span className="w-1.5 h-1.5 rounded-full bg-[#ebb4f3] animate-pulse"></span><span>INFRASTRUCTURE · V1.8.2</span></div>
                            <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">DEPLOYMENT: PASS</span>
                        </div>
                        <div className="relative z-10"><span className="text-xs text-[#ebb4f3] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">GAS OPTIMIZED CONTRACTS</span></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: OPERATIONAL</span></div>
                        <h3 className="text-2xl font-bold uppercase text-white tracking-tight">KRYPTO STUDIOS // NFT INFRASTRUCTURE</h3>
                        <p className="text-sm text-gray-400">Scalable smart-minting pipeline and decentralized metadata distribution engine capable of sub-second provenance verification.</p>
                    </div>
                    <div className="flex flex-col gap-2"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">TECH STACK</span><div className="flex flex-wrap items-center gap-2"><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">HTML</span><span className="text-gray-500 text-xs">·</span><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">CSS</span><span className="text-gray-500 text-xs">·</span><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">JavaScript</span></div></div>
                    <div className="flex flex-col gap-2 mt-2"><span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#ebb4f3]">code</span>CORE CONTRIBUTIONS</span>
                        <ul className="flex flex-col gap-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ebb4f3] text-xs font-bold mt-1">&gt;&gt;</span><span>Architected gas-efficient ERC-721A batch minting contracts saving 74% aggregate network gas.</span></li>
                            <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ebb4f3] text-xs font-bold mt-1">&gt;&gt;</span><span>Implemented asynchronous media transcoding workers via Spring Boot queuing with Redis backpressure.</span></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">MINTS/HR</span><span className="text-sm text-[#ebb4f3] font-bold">120K</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">LATENCY</span><span className="text-sm text-white font-bold">&lt;18MS</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">SECURITY</span><span className="text-sm text-[#a3c9ff] font-bold">MULTI-SIG</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded" href="#"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                        <a className="px-4 py-2 bg-[#1f1f1f] text-white text-xs uppercase tracking-wider hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2 border border-white/10 rounded" href="#"><span>GITHUB</span><Terminal className="w-[16px] h-[16px] shrink-0" /></a>
                    </div>
                </div>
            </div>
        </React.Fragment>);
`;

const getTemplateCard = (keyName, title, techStack, href) => {
    return `
        const ${keyName} = (key: string) => (<React.Fragment key={key}>
            <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                <div className="flex flex-col gap-6">
                    <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt="${title}" src={(templateImg as any)?.src || templateImg} />
                        <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#ebb4f3] text-xs font-semibold rounded"><span className="w-1.5 h-1.5 rounded-full bg-[#ebb4f3] animate-pulse"></span><span>TEMPLATE · V1.0.0</span></div>
                            <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">DEPLOYMENT: PASS</span>
                        </div>
                        <div className="relative z-10"><span className="text-xs text-[#ebb4f3] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">RESPONSIVE UI</span></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: LIVE</span></div>
                        <h3 className="text-2xl font-bold uppercase text-white tracking-tight">${title}</h3>
                        <p className="text-sm text-gray-400">A modern, high-performance portfolio template with advanced animations, optimized for developers and designers.</p>
                    </div>
                    <div className="flex flex-col gap-2"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">TECH STACK</span>
                        <div className="flex flex-wrap items-center gap-2">
                            ${techStack.map(t => `<span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">${t}</span>`).join('<span className="text-gray-500 text-xs">·</span>')}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2"><span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#ebb4f3]">code</span>CORE CONTRIBUTIONS</span>
                        <ul className="flex flex-col gap-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ebb4f3] text-xs font-bold mt-1">&gt;&gt;</span><span>Architected a fully responsive UI matching pixel-perfect designs.</span></li>
                            <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ebb4f3] text-xs font-bold mt-1">&gt;&gt;</span><span>Implemented smooth animations and optimized interactions.</span></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">PERFORMANCE</span><span className="text-sm text-[#ebb4f3] font-bold">100/100</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">LATENCY</span><span className="text-sm text-white font-bold">&lt;10MS</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">RESPONSIVE</span><span className="text-sm text-[#a3c9ff] font-bold">ALL DEVICES</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded" href="${href}" target="_blank" rel="noopener noreferrer"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                        <a className="px-4 py-2 bg-[#1f1f1f] text-white text-xs uppercase tracking-wider hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2 border border-white/10 rounded" href="#"><span>GITHUB</span><Terminal className="w-[16px] h-[16px] shrink-0" /></a>
                    </div>
                </div>
            </div>
        </React.Fragment>);
`;
}

let content = fs.readFileSync('d:/porfolio-v2/app/components/card.tsx', 'utf8');

const startRegex = /const getProjects = \(\) => \{/;
const endRegex = /const projects = getProjects\(\);/;

const matchStart = content.search(startRegex);
const matchEnd = content.search(endRegex);

if (matchStart !== -1 && matchEnd !== -1) {
    const p2_p3_code = `
        const p2 = (key: string) => (<React.Fragment key={key}>
            {/* COMPANION PROJECT 02: AETHER SCAN // MEMPOOL OBSERVER */}
            <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                <div className="flex flex-col gap-6">
                    <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt="Aether Scan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXYS8F9HLmRaEvHlYFcU8a-QIVwah-B9YYqyImpyY4SOkh72mbkLefCMUj44WQWdXn9hP6hXBehOO_w7Px85CsUnL55qWqY5lD8yTt3ddIyvFNhFyivS8S84uDs5avUkC6IsGXfbqT8jUXPDTjmK8IYlXclG4gUvFi_4SBS6efoqB5NKPIGZ5nmJTl9hqBUtKNUHcy_47wPAN1lFT4JBYYMiCZwFhJskgZnQzgYgs_NCmPV4mck9qs_g" />
                        <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#a3c9ff] text-xs font-semibold rounded"><span className="w-1.5 h-1.5 rounded-full bg-[#a3c9ff] animate-pulse"></span><span>OBSERVER · V3.1.0</span></div>
                            <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">RPC: DUAL-PULSE</span>
                        </div>
                        <div className="relative z-10"><span className="text-xs text-[#a3c9ff] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">0x MEV ARBITRAGE SCAN</span></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: STREAMING</span></div>
                        <h3 className="text-2xl font-bold uppercase text-white tracking-tight">AETHER SCAN // MEMPOOL OBSERVER</h3>
                        <p className="text-sm text-gray-400">Ultra-low latency public and dark-pool mempool scanner identifying pending toxic flow, frontrunning, and sandwich attacks.</p>
                    </div>
                    <div className="flex flex-col gap-2"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">TECH STACK</span><div className="flex flex-wrap items-center gap-2"><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">React</span><span className="text-gray-500 text-xs">·</span><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">Spring Boot</span><span className="text-gray-500 text-xs">·</span><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">PostgreSQL</span></div></div>
                    <div className="flex flex-col gap-2 mt-2"><span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#a3c9ff]">speed</span>CORE CONTRIBUTIONS</span>
                        <ul className="flex flex-col gap-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#a3c9ff] text-xs font-bold mt-1">&gt;&gt;</span><span>Developed multi-node peer-to-peer mempool packet sniffer with direct Geth RPC hooks.</span></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">PROCESSING</span><span className="text-sm text-[#a3c9ff] font-bold">3.2M TX/D</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">DETECTION</span><span className="text-sm text-[#ffb4a8] font-bold">&lt;8MS</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">NETWORK</span><span className="text-sm text-white font-bold">ETH + L2S</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded" href="#"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                        <a className="px-4 py-2 bg-[#1f1f1f] text-white text-xs uppercase tracking-wider hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2 border border-white/10 rounded" href="#"><span>GITHUB</span><Terminal className="w-[16px] h-[16px] shrink-0" /></a>
                    </div>
                </div>
            </div>
        </React.Fragment>);

        const p3 = (key: string) => (<React.Fragment key={key}>
            <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                <div className="flex flex-col gap-6">
                    <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt="Vault Secure" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH6c0lxDIPGlhP2zfqtt-0_DrUFZy3vGIxgJ-KLPRLVIXV2W2v-U0p9YGli3-rOS0c29RDp-aGwDNt8DyyHSrurUUyw3h4pnQCA5poCqCc2qo0R092JsuT1taYK8UooDFEWhRexyrdeTZogNvMfU6Z6J9czaoNx2wr9uKeaWNHtmzOPK0BPfjPeba3pI1a66FzkmMM4YIsDyr3TWj5RlityNvL5BQzt6AzjYIMqjWrKsr-Fu4CoWA0Xg" />
                        <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#ffb4a8] text-xs font-semibold rounded"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8] animate-pulse"></span><span>INFRASTRUCTURE · V1.8.2</span></div>
                            <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">DEPLOYMENT: PASS</span>
                        </div>
                        <div className="relative z-10"><span className="text-xs text-[#ffb4a8] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">GAS OPTIMIZED CONTRACTS</span></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: OPERATIONAL</span></div>
                        <h3 className="text-2xl font-bold uppercase text-white tracking-tight">VAULT SECURE // LIQUIDITY POOL</h3>
                        <p className="text-sm text-gray-400">Scalable smart-minting pipeline and decentralized metadata distribution engine capable of sub-second provenance verification.</p>
                    </div>
                    <div className="flex flex-col gap-2"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">TECH STACK</span><div className="flex flex-wrap items-center gap-2"><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">React</span><span className="text-gray-500 text-xs">·</span><span className="px-3 py-1 bg-[#1f1f1f] text-gray-300 text-xs rounded">Spring Boot</span></div></div>
                    <div className="flex flex-col gap-2 mt-2"><span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#ffb4a8]">code</span>CORE CONTRIBUTIONS</span>
                        <ul className="flex flex-col gap-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#ffb4a8] text-xs font-bold mt-1">&gt;&gt;</span><span>Architected gas-efficient ERC-721A batch minting contracts saving 74% aggregate network gas.</span></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">MINTS/HR</span><span className="text-sm text-[#ffb4a8] font-bold">120K</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">LATENCY</span><span className="text-sm text-white font-bold">&lt;18MS</span></div>
                        <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">SECURITY</span><span className="text-sm text-[#a3c9ff] font-bold">MULTI-SIG</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded" href="#"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                        <a className="px-4 py-2 bg-[#1f1f1f] text-white text-xs uppercase tracking-wider hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2 border border-white/10 rounded" href="#"><span>GITHUB</span><Terminal className="w-[16px] h-[16px] shrink-0" /></a>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    `;

    const t1 = getTemplateCard('t1', 'VENETA // PORTFOLIO TEMPLATE', ['Next.js', 'Tailwind CSS', 'GSAP'], 'https://veneta.vercel.app/');
    const t2 = getTemplateCard('t2', 'WORDPRESS // BLOG TEMPLATE', ['WordPress', 'PHP', 'Tailwind CSS'], '#');
    const t3 = getTemplateCard('t3', 'ERP // ADMIN DASHBOARD', ['React', 'Redux', 'Material UI'], '#');

    const switchLogic = `
        if (activeTab === 0) {
            return [p1('a1'), p2('a2'), p3('a3'), t1('a4'), t2('a5'), t3('a6')];
        } else if (activeTab === 1) {
            return [p1('w1'), p2('w2'), p3('w3')];
        } else if (activeTab === 2) {
            return [t1('tp1'), t2('tp2'), t3('tp3')];
        }
        return [];
    };
    `;

    const newFunctionBody = `const getProjects = () => {\n${p1Krypto}\n${p2_p3_code}\n${t1}\n${t2}\n${t3}\n${switchLogic}\n    const projects = getProjects();`;

    const newContent = content.substring(0, matchStart) + newFunctionBody + content.substring(matchEnd + 'const projects = getProjects();'.length);
    
    fs.writeFileSync('d:/porfolio-v2/app/components/card.tsx', newContent);
    console.log("Rewrite successful.");
} else {
    console.log("Could not find regex matches.");
}
