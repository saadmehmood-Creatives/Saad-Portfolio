"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

export default function CameraNav() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const lensRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        // Lens rotation animation
        gsap.to(lensRef.current, {
            rotate: 720,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                setIsAnimating(false);
                gsap.set(lensRef.current, { rotate: 0 });
            }
        });

        // Scroll to top
        gsap.to(window, {
            scrollTo: 0,
            duration: 1.5,
            ease: "power3.inOut"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] pointer-events-auto"
                >
                    <button
                        onClick={scrollToTop}
                        className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl hover:border-accent transition-all duration-500 overflow-hidden shadow-2xl"
                        aria-label="Scroll to top"
                    >
                        {/* Camera Body Icon (SVG) */}
                        <div className="relative w-12 h-8 bg-gray-400/20 group-hover:bg-accent/20 rounded-md transition-colors duration-500 flex items-center justify-center">
                            {/* Flash bit */}
                            <div className="absolute -top-1 right-2 w-3 h-1 bg-gray-400 group-hover:bg-accent rounded-full"></div>

                            {/* Lens Ring */}
                            <div
                                ref={lensRef}
                                className="w-6 h-6 rounded-full border-2 border-accent/60 group-hover:border-accent flex items-center justify-center overflow-hidden"
                            >
                                {/* Lens Aperture Lines */}
                                <div className="absolute inset-0 w-full h-full opacity-30">
                                    {[0, 45, 90, 135].map((rot) => (
                                        <div
                                            key={rot}
                                            className="absolute top-1/2 left-0 w-full h-[1px] bg-accent"
                                            style={{ transform: `rotate(${rot}deg)` }}
                                        />
                                    ))}
                                </div>
                                <div className="w-2 h-2 rounded-full bg-accent/40 shadow-[0_0_5px_#FFD700]"></div>
                            </div>
                        </div>


                        {/* Glow */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    </button>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block pointer-events-none">
                        <p className="text-accent text-[10px] uppercase font-bold tracking-[0.3em] bg-black/80 px-4 py-2 border border-accent/20">
                            Capture Top
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Add scan animation to globals.css or inject here
