"use client";

import { useRef, useEffect } from "react";
import { Image as DreiImage } from "@react-three/drei";
import gsap from "gsap";
import { Group, MeshStandardMaterial } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VisionaryIdentityScene() {
    const groupRef = useRef<Group>(null);
    const imageRef = useRef<any>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".summary-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onEnter: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeave: () => { if (groupRef.current) groupRef.current.visible = false; },
                onEnterBack: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeaveBack: () => { if (groupRef.current) groupRef.current.visible = false; }
            }
        });

        // Parallax movement
        tl.fromTo(groupRef.current.position, { x: 3, y: -2 }, { x: 2, y: 2, ease: "none" }, 0);

        if (imageRef.current) {
            const mat = imageRef.current.material as MeshStandardMaterial;
            mat.transparent = true;

            // Phase 1: Enter (0% -> 30%)
            tl.fromTo(mat, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
            tl.fromTo(imageRef.current.scale, { x: 4.6, y: 5.75 }, { x: 4, y: 5, duration: 0.3, ease: "power2.out" }, 0);

            // Phase 2: Exit (70% -> 100%)
            tl.to(mat, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
            tl.to(imageRef.current.scale, { x: 6, y: 7.5, duration: 0.3, ease: "power2.in" }, 0.7);
        }

    }, []);

    return (
        <group ref={groupRef} position={[2, 0, 0]} visible={false}>
            <DreiImage
                ref={imageRef}
                url="/assets/images/2.png"
                scale={[4, 5] as [number, number]}
                transparent
                rotation={[0, 0.2, 0]}
            />
        </group>
    );
}
