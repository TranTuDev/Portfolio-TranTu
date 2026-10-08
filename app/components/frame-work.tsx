import React from "react";
import { Brand } from "./brand";

// Import FE images
import fe1 from '../asset/images/FE-1.jpg';
import fe2 from '../asset/images/FE-2.jpg';
import fe3 from '../asset/images/FE-3.jpg';
import fe4 from '../asset/images/FE-4.jpg';
import fe5 from '../asset/images/FE-5.png';
import fe6 from '../asset/images/FE-6.jpg';
import fe7 from '../asset/images/FE-7.jpg';
import fe8 from '../asset/images/FE-8.jpg';

// Import BE images
import be1 from '../asset/images/BE-1.jpg';
import be2 from '../asset/images/BE-2.jpg';

// Import DB images
import db1 from '../asset/images/DB-1.jpg';
import db2 from '../asset/images/DB-2.jpg';
import db3 from '../asset/images/DB-3.png';

// Import T&D images
import td1 from '../asset/images/T&D-1.jpg';
import td2 from '../asset/images/T&D-2.jpg';
import td3 from '../asset/images/T&D-3.jpg';
import td4 from '../asset/images/T&D-4.jpg';
import td5 from '../asset/images/T&D-5.jpg';
import td6 from '../asset/images/T&D-6.webp';

// Import W&P images
import wp1 from '../asset/images/W&P-1.jpg';
import wp2 from '../asset/images/W&P-2.jpg';
import wp3 from '../asset/images/W&P-3.jpg';

const feImages = [fe1, fe2, fe3, fe4, fe5, fe6, fe7, fe8];
const beImages = [be1, be2, fe4, be1, be2, fe4, be1, be2, fe4, be1, be2, fe4];
const dbImages = [db1, db2, db3, db1, db2, db3, db1, db2, db3];
const tdImages = [td1, td2, td3, td4, td5, td6, td1, td2, td3, td4, td5, td6];
const wpImages = [wp1, wp2, wp3, wp1, wp2, wp3, wp1, wp2, wp3, wp1, wp2, wp3];

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            "HTML", "CSS", "Bootstrap", "React",
            "Responsive Design", "GSAP", "Swiper",
            "REST API Integration", "JavaScript"
        ],
        logos: feImages
    },
    {
        title: "Backend",
        skills: [
            "Java", "Spring Boot", "REST API Integration"
        ],
        logos: beImages
    },
    {
        title: "Database",
        skills: [
            "MongoDB", "DBeaver", "PostgreSQL"
        ],
        logos: dbImages
    },
    {
        title: "Tools & DevOps",
        skills: [
            "GitLab", "GitHub", "Docker", "Postman", "Vercel", "Figma", "Sourcetree", "SonarQube"
        ],
        logos: tdImages
    },
    {
        title: "WordPress & PHP",
        skills: [
            "PHP", "WordPress",  "ACF", "Template Development"
        ],
        logos: wpImages
    }
];

export function FrameWork() {
    return (
        <div className="w-full flex flex-col gap-12 lg:gap-24">
            {skillCategories.map((category, index) => (
                <div key={index} className="flex flex-col gap-3 w-full">
                    {/* Text & Pills wrapper (6 cols) */}
                    <div className="container mx-auto">
                        <div className={`w-full lg:w-1/2 flex flex-col ${index % 2 !== 0 ? 'lg:ml-auto lg:items-end text-right' : 'lg:items-start text-left'}`}>
                            <h3 className="text-xl md:text-2xl font-bold text-black font-heading mb-3">
                                {category.title}
                            </h3>
                            <div className={`flex flex-wrap gap-2 md:gap-3 mb-2 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                                {category.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="bg-[#B4D3FF] text-white px-5 py-2 md:px-6 md:py-2 rounded-full font-sans font-semibold text-sm md:text-base shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Marquee (12 cols) */}
                    <Brand images={category.logos} reverse={index % 2 !== 0} />
                </div>
            ))}
        </div>
    );
}