"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";

export default function Loader() {
    const { setLoading } = useLoading();
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setLoading(false);
            },
        });

        // Initial state
        gsap.set(containerRef.current, { autoAlpha: 1 });

        // Animation: Scale up logo and fade out
        tl.to(logoRef.current, {
            scale: 1.2,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        })
            .to(
                logoRef.current,
                {
                    opacity: 0,
                    scale: 1.5,
                    duration: 0.8,
                    ease: "power2.in",
                },
                "+=0.5" // Wait 0.5s
            )
            .to(
                containerRef.current,
                {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    pointerEvents: "none",
                },
                "-=0.2"
            );

        return () => {
            tl.kill();
        };
    }, [setLoading]);

    // Don't render internal DOM if strictly not needed, but for fade out we need it mounted initially
    // We can use CSS pointer-events: none to pass through after animation

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
        >
            <div className="relative w-24 h-24 md:w-48 md:h-48">
                <img
                    ref={logoRef}
                    src="/assets/images/white_logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain opacity-0 scale-50"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>
            <div className="absolute bottom-12 md:bottom-20 text-white/40 text-[8px] md:text-xs font-bold tracking-[0.6em] uppercase animate-pulse">
                Initiating...
            </div>
        </div>
    );
}
