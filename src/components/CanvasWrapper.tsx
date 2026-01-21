"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function CanvasWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                className="pointer-events-none"
            // pointer-events-none on canvas wrapper to let html scroll. 
            // If we need 3D interactions, we should use pointer-events-auto on visual elements, or View tracking.
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
