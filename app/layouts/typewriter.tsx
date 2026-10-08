import { useState, useEffect } from 'react';

const words = ["TRANTU", "TRANMINHTU"];
const TYPING_SPEED = 150;
const DELETING_SPEED = 100;
const DELAY_BETWEEN_WORDS = 2000;

export function Typewriter() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeoutId: NodeJS.Timeout;

        if (isDeleting) {
            timeoutId = setTimeout(() => {
                setText(currentWord.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            }, DELETING_SPEED);
        } else {
            timeoutId = setTimeout(() => {
                setText(currentWord.substring(0, text.length + 1));
                if (text.length === currentWord.length) {
                    timeoutId = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN_WORDS);
                }
            }, TYPING_SPEED);
        }

        return () => clearTimeout(timeoutId);
    }, [text, isDeleting, wordIndex]);

    return (
        <span className="inline-flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b80000] to-[#ebb4f3]">
                {text}
            </span>
            <span className="inline-block w-[4px] h-[0.9em] bg-white ml-1 animate-pulse"></span>
        </span>
    );
}

