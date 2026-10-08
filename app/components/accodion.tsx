import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    isLast: boolean;
    onClick: () => void;
}

function AccordionItem({ title, content, isOpen, isLast, onClick }: AccordionItemProps) {
    return (
        <div className={`bg-[#FFFFFF] ${!isLast ? 'border-b border-[#E8E8E6]' : ''} `}>
            <button
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-[#f9f9f9] cursor-pointer"
                onClick={onClick}
            >
                <span className="font-heading font-bold text-xl text-[#382C25] pr-4">{title}</span>
                {isOpen ? (
                    <Minus className="w-5 h-5 text-black flex-shrink-0" />
                ) : (
                    <Plus className="w-5 h-5 text-black flex-shrink-0" />
                )}
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 font-sans text-base text-[#382C25] leading-relaxed ">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Accordion() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqData = t('about.accordion', { returnObjects: true }) as Array<{ title: string; content: string }>;

    return (
        <div className="w-full rounded-xl overflow-hidden border border-[#E8E8E6] shadow-sm ">
            {faqData && faqData.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    isLast={index === faqData.length - 1}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}

                />
            ))}
        </div>
    );
}