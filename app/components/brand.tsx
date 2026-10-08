import React from 'react';

interface BrandProps {
    images?: string[];
    reverse?: boolean;
}

export function Brand({ images, reverse = false }: BrandProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="w-full overflow-hidden py-6 mt-4">
            <div className={`flex w-max items-center ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                {/* First Set */}
                <div className="flex justify-around items-center px-4 min-w-[100vw] lg:min-w-[50vw]">
                    {images.map((img, index) => (
                        <div key={`first-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
                            <img 
                                src={img} 
                                alt={`Framework Logo ${index + 1}`} 
                                className="h-28 md:h-36 lg:h-40 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" 
                            />
                        </div>
                    ))}
                </div>
                
                {/* Second Set (Duplicate for seamless loop) */}
                <div className="flex justify-around items-center px-4 min-w-[100vw] lg:min-w-[50vw]">
                    {images.map((img, index) => (
                        <div key={`second-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
                            <img 
                                src={img} 
                                alt={`Framework Logo ${index + 1}`} 
                                className="h-28 md:h-36 lg:h-40 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}