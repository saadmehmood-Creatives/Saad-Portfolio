"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LOGOS = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    path: `/assets/images/testimonals/CLIENTS/Artboard ${i + 1}.png`,
}));

// Duplicate logos for seamless looping
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS];

export default function LogoMarquee() {
    return (
        <section className="relative w-full py-14 md:py-24 overflow-hidden border-y border-white/5">
            <div className="flex overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap gap-8 md:gap-24 items-center px-6 md:px-24"
                    animate={{
                        x: ["0%", "-33.33%"],
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {MARQUEE_LOGOS.map((logo, index) => (
                        <div
                            key={`${logo.id}-${index}`}
                            className="relative w-24 md:w-48 h-10 md:h-24 shrink-0 group transition-all duration-500"
                        >
                            <Image
                                src={logo.path}
                                alt={`Client Logo ${logo.id}`}
                                fill
                                className="object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Edge Gradient Overlay for Fade Effect */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
