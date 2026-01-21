"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PERSONA_TEXT = [
    { id: 1, text: "Hey there! I’m Saad Mehmood." },
    { id: 2, text: "Head of Content & Creative Content Producer." },
    { id: 3, text: '"Turning visions into cinematic reality."' },
    { id: 4, text: "As a Creative Content Producer based in Karachi, I specialize in crafting high-impact visual narratives—from cinematic documentaries to compelling commercials." },
    { id: 5, text: "My approach blends technical precision with creative intuition to deliver content that doesn't just look good but feels intentional." },
    { id: 6, text: "With a deep background in visual storytelling and project leadership, I guide brands through the complexities of modern content production, ensuring every frame serves a purpose." }
];

export default function PersonaNarration() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const synth = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            synth.current = window.speechSynthesis;
        }
        return () => {
            if (synth.current) synth.current.cancel();
        };
    }, []);

    const toggleNarration = () => {
        if (isPlaying) {
            synth.current?.cancel();
            setIsPlaying(false);
            setActiveIndex(null);
            return;
        }

        const fullText = PERSONA_TEXT.map(p => p.text).join(" ");
        const utterance = new SpeechSynthesisUtterance(fullText);
        utteranceRef.current = utterance;

        // Try to find a professional sounding male voice or default
        const voices = synth.current?.getVoices() || [];
        const preferredVoice = voices.find(v =>
            v.name.includes("Male") ||
            v.name.includes("Daniel") ||
            v.name.includes("Guy") ||
            v.name.includes("Arthur")
        ) || voices.find(v => v.name.includes("Google US English")) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 0.9; // Slightly slower for cinematic feel
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
            setIsPlaying(false);
            setActiveIndex(null);
        };

        // Simple line-by-line highlighting logic based on character progress
        // Note: boundary event accuracy varies by browser, so we use a more robust segment approach
        // for this demo we'll trigger segments based on the full text length
        let currentSegmentIndex = 0;
        utterance.onboundary = (event) => {
            if (event.name === 'sentence' || event.name === 'word') {
                const charIndex = event.charIndex;
                let accumulatedLength = 0;
                for (let i = 0; i < PERSONA_TEXT.length; i++) {
                    accumulatedLength += PERSONA_TEXT[i].text.length + 1; // +1 for the space
                    if (charIndex < accumulatedLength) {
                        setActiveIndex(i);
                        break;
                    }
                }
            }
        };

        synth.current?.speak(utterance);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 md:gap-20">
            {/* LEFT: Microphone */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center shrink-0">

                {/* Microphone */}
                <motion.div
                    className="relative z-20 cursor-pointer group"
                    onClick={toggleNarration}
                    animate={isPlaying ? {
                        rotate: [0, -1, 1, 0],
                        scale: [1, 1.02, 1]
                    } : {
                        y: [0, -10, 0]
                    }}
                    transition={isPlaying ? {
                        repeat: Infinity,
                        duration: 0.5
                    } : {
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                    }}
                >
                    {/* Glowing pulse when playing */}
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-x-0 top-0 mx-auto w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10"
                            />
                        )}
                    </AnimatePresence>

                    {/* Broadcast Microphone SVG */}
                    <svg viewBox="0 0 120 240" className="w-[100px] h-[200px] md:w-[120px] md:h-[240px] drop-shadow-[0_0_15px_rgba(255,215,0,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.4)] transition-all duration-500 scale-90 md:scale-100">
                        {/* Stand */}
                        <rect x="55" y="160" width="10" height="60" fill="#1a1a1a" />
                        <rect x="30" y="220" width="60" height="10" rx="5" fill="#111" />

                        {/* Mic Body */}
                        <rect x="35" y="40" width="50" height="120" rx="25" fill="#080808" stroke="#FFD700" strokeWidth="2" opacity="0.8" />

                        {/* Mesh */}
                        <defs>
                            <pattern id="micMesh" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="#333" />
                            </pattern>
                        </defs>
                        <rect x="40" y="45" width="40" height="60" rx="20" fill="url(#micMesh)" />

                        {/* Banner for "Mehmood" branding or similar */}
                        <rect x="30" y="110" width="60" height="25" fill="#111" stroke="#FFD700" strokeWidth="1" />
                        <text x="60" y="127" textAnchor="middle" fontSize="10" fill="#FFD700" fontWeight="black" className="uppercase tracking-widest">ON AIR</text>

                        {/* Light Indicator */}
                        <circle cx="60" cy="145" r="4" fill={isPlaying ? "#f00" : "#333"} className="shadow-lg" />
                    </svg>

                    {/* Instruction tooltip */}
                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                            >
                                <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-black bg-black/80 px-4 py-2 border border-accent/20 rounded-full">
                                    Hear Introduction
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="flex-1 pointer-events-auto text-center lg:text-left">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-[8px] md:text-[10px] font-bold tracking-[0.5em] text-accent uppercase mb-3 md:mb-4">
                        The Persona
                    </h2>
                    <div className="text-lg sm:text-2l md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                        {PERSONA_TEXT.slice(0, 2).map((p, i) => (
                            <span
                                key={p.id}
                                className={`transition-all duration-500 inline-block md:mr-2 ${activeIndex === i ? 'text-accent drop-shadow-[0_0_8px_#FFD700]' : ''}`}
                            >
                                {i === 0 ? (
                                    <>Hey there! I’m <span className="text-accent">Saad Mehmood</span>.</>
                                ) : p.text}
                                {i === 0 && <br className="md:block" />}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="text-2xl sm:text-4xl md:text-6xl font-black mb-8 md:mb-12 uppercase leading-[1.1] tracking-tight text-white italic">
                    <span className={`transition-all duration-500 ${activeIndex === 2 ? 'text-accent drop-shadow-[0_0_12px_#FFD700]' : ''}`}>
                        "Turning visions into <span className="text-accent">cinematic</span> reality."
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
                    <p className={`text-sm md:text-xl font-light leading-relaxed transition-all duration-500 ${activeIndex === 3 ? 'text-white' : 'text-gray-400'}`}>
                        {PERSONA_TEXT[3].text}
                    </p>
                    <div className="space-y-4 md:space-y-6 md:border-l-2 md:border-white/10 md:pl-8">
                        <p className={`text-sm md:text-xl font-light leading-relaxed transition-all duration-500 ${activeIndex === 4 ? 'text-white' : 'text-gray-500'}`}>
                            {PERSONA_TEXT[4].text}
                        </p>
                        <p className={`text-sm md:text-xl font-light leading-relaxed transition-all duration-500 ${activeIndex === 5 ? 'text-white' : 'text-gray-500'}`}>
                            {PERSONA_TEXT[5].text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
