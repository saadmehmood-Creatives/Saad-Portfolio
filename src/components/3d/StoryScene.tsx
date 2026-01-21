"use client";

import { useRef, useEffect } from "react";
import { Image as DreiImage } from "@react-three/drei";
import gsap from "gsap";
import { Group, MeshStandardMaterial } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function StoryScene() {
    const groupRef = useRef<Group>(null);
    const imageRef = useRef<any>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".story-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onEnter: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeave: () => { if (groupRef.current) groupRef.current.visible = false; },
                onEnterBack: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeaveBack: () => { if (groupRef.current) groupRef.current.visible = false; }
            }
        });

        // Slow parallax and zoom
        tl.fromTo(groupRef.current.position, { y: -2 }, { y: 2, ease: "none" }, 0);

        if (imageRef.current) {
            const mat = imageRef.current.material as MeshStandardMaterial;
            mat.transparent = true;

            // Phase 1: Enter
            tl.fromTo(mat, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
            tl.fromTo(imageRef.current.scale, { x: 6, y: 7.5 }, { x: 5, y: 6.25, duration: 0.3, ease: "power2.out" }, 0);

            // Phase 2: Exit
            tl.to(mat, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
            tl.to(imageRef.current.scale, { x: 7, y: 8.75, duration: 0.3, ease: "power2.in" }, 0.7);
        }

    }, []);

    return (
        <group ref={groupRef} position={[-3, 0, -2]} visible={false}>
            <DreiImage
                ref={imageRef}
                url="/assets/images/10.png"
                scale={[5, 6.25] as [number, number]}
                transparent
                rotation={[0, 0.1, 0]}
            />
        </group>
    );
}
