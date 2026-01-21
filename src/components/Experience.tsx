"use client";

import { usePathname } from "next/navigation";
import { Environment } from "@react-three/drei";
import FuturisticBackground from "@/components/3d/FuturisticBackground";
import CameraDialSystem from "@/components/3d/CameraDialSystem";
import HeroScene from "@/components/3d/HeroScene";

export default function Experience() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <>
            <Environment preset="city" />
            {/* Ambient setup - darker for cinematic feel */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#FFD700" />

            {/* The Unified Background - Always at the back */}
            <FuturisticBackground />

            {/* Cinematic Camera Dial Background (New Centerpiece) */}
            <CameraDialSystem />

            {/* Route-specific cinematic elements */}
            {isHome && <HeroScene />}
        </>
    );
}
