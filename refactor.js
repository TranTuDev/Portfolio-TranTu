const fs = require('fs');

const content = fs.readFileSync('app/components/card.tsx', 'utf8');

const project1 = content.split('/* COMPANION PROJECT 01: KRYPTO STUDIOS // NFT INFRASTRUCTURE */')[1].split('/* COMPANION PROJECT 02: AETHER SCAN // MEMPOOL OBSERVER */')[0].trim();
const project2 = content.split('/* COMPANION PROJECT 02: AETHER SCAN // MEMPOOL OBSERVER */')[1].split('/* COMPANION PROJECT 03: VAULT SECURE // LIQUIDITY POOL */')[0].trim();
const project3 = content.split('/* COMPANION PROJECT 03: VAULT SECURE // LIQUIDITY POOL */')[1].split('</div>\n        </div>')[0].trim();

const newContent = `import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Card() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Duplicating the 3 static projects to show 6 projects and test pagination
    const projects = [
        ...[1, 2].flatMap(iteration => [
            <React.Fragment key={\`proj-1-\${iteration}\`}>
                {/* COMPANION PROJECT 01: KRYPTO STUDIOS // NFT INFRASTRUCTURE */}
                ${project1}
            </React.Fragment>,
            <React.Fragment key={\`proj-2-\${iteration}\`}>
                {/* COMPANION PROJECT 02: AETHER SCAN // MEMPOOL OBSERVER */}
                ${project2}
            </React.Fragment>,
            <React.Fragment key={\`proj-3-\${iteration}\`}>
                {/* COMPANION PROJECT 03: VAULT SECURE // LIQUIDITY POOL */}
                ${project3}
            </React.Fragment>
        ])
    ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects}
            </div>

            {/* Pagination */}
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

fs.writeFileSync('app/components/card.tsx', newContent);
console.log("Refactored card.tsx");

