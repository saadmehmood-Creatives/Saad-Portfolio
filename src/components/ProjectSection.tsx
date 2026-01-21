"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import CinematicCamera from "./CinematicCamera";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface ProjectAsset {
    path: string;
    type: "video" | "image";
}

interface ProjectSectionProps {
    title: string;
    slogan: string;
    assets: readonly ProjectAsset[];
    category: string;
    aspectRatio?: "9/16" | "1/1";
}

export default function ProjectSection({ title, slogan, assets, category, aspectRatio = "9/16" }: ProjectSectionProps) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.2, once: false });
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % assets.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + assets.length) % assets.length);
    };

    const currentAsset = assets[currentIndex];

    return (
        <section ref={sectionRef} className="min-h-screen w-full flex flex-col items-center justify-center relative py-12 md:py-20 overflow-hidden">
            {/* Background Section Title */}
            <div className="absolute top-12 md:top-20 left-0 w-full px-6 flex flex-col items-center md:items-start md:left-20 z-10 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-[8px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] text-accent uppercase mb-2 md:mb-4"
                >
                    {category}
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none"
                >
                    {title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 text-[8px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2 md:mt-4 italic"
                >
                    "{slogan}"
                </motion.p>
            </div>

            {/* 3D Visualizer Canvas */}
            <div className="w-full h-[50vh] md:h-[80vh] relative cursor-grab active:cursor-grabbing mt-24 md:mt-0">
                <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <CinematicCamera
                            mediaPath={currentAsset?.path}
                            isImage={currentAsset?.type === "image"}
                            isInView={isInView}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            aspectRatio={aspectRatio}
                        />
                        <ContactShadows
                            opacity={0.4}
                            scale={20}
                            blur={2.4}
                            far={4.5}
                            position={[0, -2, 0]}
                            color="#000"
                        />
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 4}
                        enablePan={false}
                    />
                </Canvas>

                {/* Overlay Navigation Hint */}
                <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-8 z-20">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all group active:scale-90"
                    >
                        <span className="text-lg md:text-xl group-hover:scale-125 transition-transform">←</span>
                    </button>
                    <div className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">
                        {currentIndex + 1} / {assets.length}
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all group active:scale-90"
                    >
                        <span className="text-lg md:text-xl group-hover:scale-125 transition-transform">→</span>
                    </button>
                </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-[120px] -z-10"></div>
        </section>
    );
}
