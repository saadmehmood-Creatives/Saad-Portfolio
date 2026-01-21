"use client";

import { useRef } from "react";

export default function HeroInteractiveImage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden bg-black"
        >
            {/* Base Layer: High-end Static Portrait */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/images/heropicture.png"
                    alt="Saad Mehmood"
                    className="w-full h-full object-cover grayscale opacity-60"
                />

                {/* Visual Depth Overlays */}
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
            </div>
        </div>
    );
}
