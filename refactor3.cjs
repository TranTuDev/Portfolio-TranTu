const fs = require('fs');
const content = fs.readFileSync('app/components/card.tsx', 'utf8');

const p1Start = content.indexOf('{/* COMPANION PROJECT 01');
const p2Start = content.indexOf('{/* COMPANION PROJECT 02');
const p3Start = content.indexOf('{/* COMPANION PROJECT 03');
const p3End = content.lastIndexOf('</div>\n            </div>\n        </div>');

const project1 = content.substring(p1Start, p2Start).trim();
const project2 = content.substring(p2Start, p3Start).trim();
const project3 = content.substring(p3Start, p3End).trim();

const newContent = `import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        const p1 = (key: string) => (
            <React.Fragment key={key}>
                ${project1}
            </React.Fragment>
        );
        const p2 = (key: string) => (
            <React.Fragment key={key}>
                ${project2}
            </React.Fragment>
        );
        const p3 = (key: string) => (
            <React.Fragment key={key}>
                ${project3}
            </React.Fragment>
        );

        if (activeTab === 0) {
            return [p1('t0-1')];
        } else if (activeTab === 1) {
            return [p1('t1-1'), p2('t1-2'), p3('t1-3'), p1('t1-4')];
        } else {
            return [p1('t2-1'), p2('t2-2'), p3('t2-3')];
        }
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
        <div className="w-full flex flex-col gap-8">
            <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-primary font-mono">[DOSSIER SUB-LEVEL]</span>
                    <span className="text-2xl text-on-surface uppercase tracking-tight font-bold">ACTIVE PROTOCOL SATELLITES</span>
                </div>
                <span className="text-sm text-on-surface-variant font-mono hidden md:inline">
                    INDEX {\`0\${currentPage}\`} // {\`0\${totalPages}\`}
                </span>
            </div>

            <div className={\`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-out transform \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                {currentProjects}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16 pb-20">
                    <button 
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={\`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 \${
                            currentPage === 1 
                                ? 'bg-[#E6E7E8] text-[#A5A5A5] opacity-50 cursor-default pointer-events-none' 
                                : 'bg-[#E6E7E8] text-[#A5A5A5] cursor-pointer hover:bg-[#182E4C] hover:text-[#E6E7E8]'
                        }\`}
                        type="button" 
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const page = idx + 1;
                        return (
                            <button 
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={\`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 \${
                                    currentPage === page
                                        ? 'bg-[#182E4C] text-[#E6E7E8] cursor-pointer'
                                        : 'bg-[#E6E7E8] text-[#A5A5A5] cursor-pointer hover:bg-[#182E4C] hover:text-[#E6E7E8]'
                                }\`}
                                type="button" 
                                aria-label={\`Page \${page}\`}
                            >
                                <span className="text-[15px] font-medium font-mono">{page}</span>
                            </button>
                        );
                    })}
                    
                    <button 
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={\`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 \${
                            currentPage === totalPages 
                                ? 'bg-[#E6E7E8] text-[#A5A5A5] opacity-50 cursor-default pointer-events-none' 
                                : 'bg-[#E6E7E8] text-[#A5A5A5] cursor-pointer hover:bg-[#182E4C] hover:text-[#E6E7E8]'
                        }\`}
                        type="button" 
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
`;

fs.writeFileSync('app/components/card.tsx', newContent, 'utf8');
console.log('Refactored correctly');

