"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";
import { Group, MeshStandardMaterial } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroScene() {
    const groupRef = useRef<Group>(null);
    const imageRef = useRef<any>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (!groupRef.current) return;

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                onEnter: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeave: () => { if (groupRef.current) groupRef.current.visible = false; },
                onEnterBack: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeaveBack: () => { if (groupRef.current) groupRef.current.visible = false; }
            }
        });

        if (imageRef.current) {
            const mat = imageRef.current.material as MeshStandardMaterial;
            mat.transparent = true;

            tl.to(groupRef.current.position, { y: 2, ease: "none" }, 0);

            // Phase 2: Exit
            tl.to(mat, { opacity: 0, ease: "power2.in" }, 0.5);
            tl.to(imageRef.current.scale, { x: 10.5, y: 6, ease: "power2.in" }, 0.5);
        }

    }, []);

    useFrame((state) => {
        if (groupRef.current && groupRef.current.visible) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;

            // Interaction: Morph scale slightly based on hover
            const targetScale = hovered ? 1.05 : 1;
            imageRef.current.scale.x = THREE.MathUtils.lerp(imageRef.current.scale.x, 7 * targetScale, 0.1);
            imageRef.current.scale.y = THREE.MathUtils.lerp(imageRef.current.scale.y, 4 * targetScale, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Image moved to HeroInteractiveImage.tsx for DOM-based cinematic masking */}
        </group>
    );
}
