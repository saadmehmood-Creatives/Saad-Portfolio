"use client";

import { useRef, useEffect } from "react";
import { Image as DreiImage, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function CinematicImage({ url, position, section, start = "top bottom", end = "bottom top" }: { url: string, position: [number, number, number], section: string, start?: string, end?: string }) {
    const meshRef = useRef<any>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: start,
                end: end,
                scrub: 1,
                onEnter: () => { meshRef.current.visible = true; },
                onLeave: () => { meshRef.current.visible = false; },
                onEnterBack: () => { meshRef.current.visible = true; },
                onLeaveBack: () => { meshRef.current.visible = false; }
            }
        });

        const mat = meshRef.current.material as THREE.MeshStandardMaterial;
        mat.transparent = true;

        // Cinematic Rule: 
        // Entrance: Fade in + Scale (1.2 -> 1)
        // Exit: Scale (1 -> 1.5) + Fade Out

        // Phase 1: Enter
        tl.fromTo(mat, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
        tl.fromTo(meshRef.current.scale, { x: 7.2, y: 4.8 }, { x: 6, y: 4, duration: 0.3, ease: "power2.out" }, 0);

        // Phase 2: Exit
        tl.to(mat, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
        tl.to(meshRef.current.scale, { x: 9, y: 6, duration: 0.3, ease: "power2.in" }, 0.7);

    }, [section, start, end]);

    return (
        <DreiImage
            ref={meshRef}
            url={url}
            position={position}
            scale={[6, 4] as [number, number]}
            transparent
            visible={false}
        />
    );
}

export default function ProjectPageScene() {
    return (
        <group>
            {/* Ambient Lighting for the scene */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />

            {/* Khanabadosh Images Sequenced via different ScrollTriggers or segments of the section */}

            {/* Hero Image */}
            <CinematicImage
                url="/assets/images/9.png"
                position={[3, 0, -2]}
                section=".project-khanabadosh-section"
                start="top 30%"
                end="20% top"
            />

            {/* Detail 1 */}
            <CinematicImage
                url="/assets/images/11.png"
                position={[-3, -2, -3]}
                section=".project-khanabadosh-section"
                start="10% bottom"
                end="40% top"
            />

            {/* Detail 2 */}
            <CinematicImage
                url="/assets/images/12.png"
                position={[4, -1, -4]}
                section=".project-khanabadosh-section"
                start="30% bottom"
                end="60% top"
            />

            {/* Detail 3 */}
            <CinematicImage
                url="/assets/images/13.png"
                position={[-4, 1, -5]}
                section=".project-khanabadosh-section"
                start="50% bottom"
                end="80% top"
            />

            {/* Detail 4 */}
            <CinematicImage
                url="/assets/images/14.png"
                position={[2, -1, -2]}
                section=".project-khanabadosh-section"
                start="70% bottom"
                end="bottom top"
            />
        </group>
    );
}
