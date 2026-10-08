import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Terminal } from 'lucide-react';
import templateImg from '../asset/images/templates.jpg';
import capitalandImg from '../asset/images/capitaland.jpg';
import vingroupImg from '../asset/images/vingroup.webp';
import tanHoangMinhImg from '../asset/images/tan-hoang-minh.jpg';
import icmsImg from '../asset/images/ICMS.webp';
import fwmsImg from '../asset/images/FWMS.svg';
import vaecoImg from '../asset/images/VAECO.jpg';
import cmsImg from '../asset/images/cms.jpg';

export function Card({ activeTab = 0 }: { activeTab?: number }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const itemsPerPage = 3;

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, [activeTab, currentPage]);

    const getProjects = () => {
        const getErpCard = (keyName: string, title: string, demoHref: string, desc: string, techStack: string[], imgSrc: any, status: string, coreContributions: string[]) => (
            <React.Fragment key={keyName}>
                <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                    <div className="flex flex-col gap-6">
                        <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                            <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt={title} src={imgSrc?.src || imgSrc || ''} />
                            <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#a3c9ff] text-xs font-semibold rounded">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#a3c9ff] animate-pulse"></span>
                                    <span>ERP & CMS · INTERNAL</span>
                                </div>
                                <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">ACCESS: RESTRICTED</span>
                            </div>
                            <div className="relative z-10"><span className="text-xs text-[#a3c9ff] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">SYSTEM INTEGRATION</span></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: {status}</span></div>
                            <h3 className="text-2xl font-bold uppercase text-white tracking-tight">{title}</h3>
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
                        <div className="flex flex-col gap-2 mt-2"><span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#a3c9ff]">code</span>CORE CONTRIBUTIONS</span>
                            <ul className="flex flex-col gap-2 text-sm text-gray-300">
                                {coreContributions.map((contribution, idx) => (
                                    <li key={idx} className="flex items-start gap-2 bg-[#0e0e0e]/50 p-2 rounded"><span className="text-[#a3c9ff] text-xs font-bold mt-1">&gt;&gt;</span><span>{contribution}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">ROLE</span><span className="text-sm text-[#a3c9ff] font-bold">DEVELOPER</span></div>
                            <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">TYPE</span><span className="text-sm text-white font-bold">ENTERPRISE</span></div>
                            <div className="bg-[#1f1f1f] p-2 flex flex-col rounded"><span className="text-[10px] text-gray-500 uppercase">ENVIRONMENT</span><span className="text-sm text-[#ffb4a8] font-bold">INTERNAL</span></div>
                        </div>
                        <div className="flex items-center gap-4">
                            {demoHref ? (
                                <a href={demoHref} target="_blank" rel="noopener noreferrer" className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                            ) : (
                                <div className="flex-1 py-2 bg-[#333] text-gray-400 text-center text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 rounded cursor-not-allowed"><span>NOT AVAILABLE</span></div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );


        const getWordPressCard = (keyName: string, title: string, titleHref: string, demoHref: string, desc: string, techStack: string[], imgSrc: any) => (
            <React.Fragment key={keyName}>
                <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl">
                    <div className="flex flex-col gap-6">
                        <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                            <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt={title} src={imgSrc?.src || imgSrc || ''} />
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
        );

        const wp1 = (key: string) => getWordPressCard(key, 'CapitaOne loyaly membership programme', 'https://www.capitaland.com/vn/vi.html?viewmode=mapview', 'https://capitaone.com.vn/', 'A loyalty membership programme by CapitaLand, a major real estate company.', ['WordPress', 'PHP', 'ACF'], capitalandImg);
        const wp2 = (key: string) => getWordPressCard(key, 'Quỹ vì tương lai xanh', 'https://vingroup.net/', 'https://foundationforgreenfuture.com/', 'Dự án tương lai xanh của tập đoàn Vingroup.', ['WordPress', 'PHP', 'ACF'], vingroupImg);
        const wp3 = (key: string) => getWordPressCard(key, 'D\'. Diamant Bleu - A Diamond Crafted From The Sky', 'https://tanhoangminh.com.vn/', 'https://ddiamantbleu.vn/', 'Dự án bất động sản cao cấp của tập đoàn Tân Hoàng Minh.', ['WordPress', 'PHP', 'ACF'], tanHoangMinhImg);
        const wp4 = (key: string) => getWordPressCard(key, 'ICMS Cyber Solution - インシデント対応サービス', 'https://icmscyber.com/', 'https://forensics.icmscyber.com/', 'インシデントの実態を解明し、再発を防ぐ。デジタルフォレンジック・インシデント対応サービス～現地での解析調査から、セキュリティ提案・対策支援まで～不正アクセス・マルウェア感染・退職者のデータ持ち出し・メール不正利用など、あらゆるサイバーインシデントに対応。', ['WordPress', 'PHP', 'ACF'], icmsImg);

        const getTemplateCard = (keyName: string, title: string, techStack: string[], href: string, imgSrc: any) => (<React.Fragment key={keyName}>
            <div className="relative bg-[#2a2a2a] p-8 flex flex-col justify-between gap-8 shadow-xl group rounded-xl hover:bg-[#333] transition-colors block">
                <div className="flex flex-col gap-6">
                    <div className="relative w-full h-56 bg-[#0e0e0e] overflow-hidden shadow-inner flex flex-col justify-between p-4 rounded-lg">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]" alt={title} src={imgSrc?.src || imgSrc || ''} />
                        <div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 bg-[#0e0e0e]/90 px-3 py-1 text-[#ebb4f3] text-xs font-semibold rounded"><span className="w-1.5 h-1.5 rounded-full bg-[#ebb4f3] animate-pulse"></span><span>TEMPLATE A V1.0.0</span></div>
                            <span className="text-xs text-gray-300 font-mono bg-[#0e0e0e]/80 px-2 py-1 rounded">DEPLOYMENT: PASS</span>
                        </div>
                        <div className="relative z-10"><span className="text-xs text-[#ebb4f3] bg-[#0e0e0e]/80 px-2 py-1 font-mono rounded">RESPONSIVE UI</span></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-[#ffb4a8]"><span className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8]"></span><span>STATUS: LIVE</span></div>
                        <a href="https://preview.themeforest.net/item/vince-multipurpose-ecommerce-html5-template/full_screen_preview/57202368" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold uppercase text-white tracking-tight hover:text-[#ebb4f3] transition-colors">{title}</a>
                        <p className="text-sm text-gray-400">A modern, high-performance portfolio template with advanced animations, optimized for developers and designers.</p>
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
                        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-hover-animate white flex-1 py-2 bg-[#b80000] text-white text-center text-xs uppercase font-bold tracking-wider hover:text-[#b80000] flex items-center justify-center gap-2 rounded"><span>LIVE DEMO</span><ArrowUpRight className="w-[16px] h-[16px] shrink-0" /></a>
                        {/* <div className="px-4 py-2 bg-[#1f1f1f] text-white text-xs uppercase tracking-wider hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2 border border-white/10 rounded"><span>GITHUB</span><Terminal className="w-[16px] h-[16px] shrink-0" /></div> */}
                    </div>
                </div>
            </div>
        </React.Fragment>);

        const t1 = (key: string) => getTemplateCard(key, 'VENETA // PORTFOLIO TEMPLATE', ['Next.js', 'Tailwind CSS', 'GSAP'], 'https://veneta.vercel.app/', templateImg);

        const fwmsProject = (key: string) => getErpCard(
            key,
            'FWMS - Hệ thống giảm lãng phí thức ăn cho nhà hàng khách sạn tích hợp AI',
            'https://system-waste-less-ai-1.onrender.com/',
            'Dự án khóa luận tốt nghiệp gồm 5 người có tích hợp AI.',
            ['React', 'Tailwind', 'Node.js', 'Gemini AI API', 'PostgreSQL', 'REST API'],
            fwmsImg,
            'LIVE',
            [
                'Phát triển giao diện hệ thống bằng React và Tailwind CSS.',
                'Tích hợp Google Gemini AI API để phân tích và đưa ra giải pháp giảm lãng phí thức ăn.',
                'Thiết kế và tối ưu hóa cơ sở dữ liệu với PostgreSQL.',
                'Làm việc nhóm 5 người quản lý mã nguồn qua Git.'
            ]
        );

        const erpProject1 = (key: string) => getErpCard(
            key,
            'ERP – EXTERNAL OPERATIONS MANAGEMENT',
            '',
            'Company bidding project · Confidential',
            ['React', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL', 'REST API', 'Docker'],
            vaecoImg,
            'BIDDING',
            [
                'Developed responsive ERP interfaces for external operations management using React and Tailwind CSS.',
                'Integrated RESTful APIs with Spring Boot backend and PostgreSQL.',
                'Implemented business workflows, form validation, and data management features.',
                'Collaborated with team members through a Git-based development workflow.'
            ]
        );
        const erpProject2 = (key: string) => getErpCard(
            key,
            'INTERNAL CMS – CONTENT MANAGEMENT SYSTEM',
            '',
            'Internal company project · Confidential · In Development',
            ['Next.js', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL', 'REST API', 'Docker'],
            cmsImg,
            'DEVELOPMENT',
            [
                'Developed CMS interfaces and content management workflows using Next.js and Tailwind CSS.',
                'Integrated RESTful APIs with Spring Boot backend.',
                'Implemented data management features and reusable UI components.',
                'Worked with PostgreSQL and Docker in the development environment.'
            ]
        );

        if (activeTab === 0) {
            // Tab 0 is "Templates"
            return [t1('tp1')];
        } else if (activeTab === 1) {
            // Tab 1 is "Wordpress"
            return [wp1('wp1'), wp2('wp2'), wp3('wp3'), wp4('wp4')];
        } else if (activeTab === 2) {
            // Tab 2 is "ERP & CRM"
            return [fwmsProject('fwms'), erpProject1('erp1'), erpProject2('erp2')];
        }
        return [];
    };

    const projects = getProjects();
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className='w-full flex flex-col gap-8'>
            <div className='flex items-center justify-between pt-4'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-primary font-mono'>[DOSSIER SUB-LEVEL]</span>
                    <span className='text-2xl text-on-surface uppercase tracking-tight font-bold'>ACTIVE PROTOCOL SATELLITES</span>
                </div>
                <span className='text-sm text-on-surface-variant font-mono hidden md:inline'>
                    INDEX {`0${currentPage}`} // {`0${totalPages || 1}`}
                </span>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {currentProjects}
            </div>

            {totalPages > 0 && (
                <div className='flex justify-center items-center gap-2 mt-16 pb-20'>
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${currentPage === 1 ? 'bg-[#E6E7E8] text-[#A5A5A5] opacity-50 cursor-default pointer-events-none' : 'bg-[#E6E7E8] text-[#A5A5A5] cursor-pointer hover:bg-[#182E4C] hover:text-[#E6E7E8]'}`}
                        type='button'
                        aria-label='Previous'
                    >
                        <ChevronLeft className='w-5 h-5' />
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const page = idx + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${currentPage === page ? 'bg-[#182E4C] text-[#E6E7E8] cursor-pointer' : 'bg-[#E6E7E8] text-[#A5A5A5] cursor-pointer hover:bg-[#182E4C] hover:text-[#E6E7E8]'}`}
                                type='button'
                                aria-label={`Page ${page}`}
                            >
                                <span className='text-[15px] font-medium font-mono'>{page}</span>
                            </button>
                        );
                    })}

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${currentPage === totalPages ? 'bg-[#E6E7E8] text-[#A5A5A5] opacity-50 cursor-default pointer-events-none' : 'bg-[#E6E7E8] text-[#A5A5A5] cursor-pointer hover:bg-[#182E4C] hover:text-[#E6E7E8]'}`}
                        type='button'
                        aria-label='Next'
                    >
                        <ChevronRight className='w-5 h-5' />
                    </button>
                </div>
            )}
        </div>
    );
}
