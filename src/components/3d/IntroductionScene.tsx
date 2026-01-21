"use client";

import { useRef, useEffect } from "react";
import { Image as DreiImage } from "@react-three/drei";
import gsap from "gsap";
import { Group, MeshStandardMaterial } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntroductionScene() {
    const groupRef = useRef<Group>(null);
    const img1Ref = useRef<any>(null);
    const img2Ref = useRef<any>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Global Cinematic Logic:
        // Entrance: Fade in + Scale (1.2 -> 1)
        // Exit: Scale (1 -> 1.5) + Fade Out

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".experience-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onEnter: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeave: () => { if (groupRef.current) groupRef.current.visible = false; },
                onEnterBack: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeaveBack: () => { if (groupRef.current) groupRef.current.visible = false; }
            }
        });

        // Parallax movement of the whole group
        tl.fromTo(groupRef.current.position, { y: -3 }, { y: 3, ease: "none" }, 0);

        // Standardized image behaviors for img1 (The Book Image)
        if (img1Ref.current) {
            const mat = img1Ref.current.material as MeshStandardMaterial;
            mat.transparent = true;

            // Phase 1: Enter (0% -> 30% of scroll)
            tl.fromTo(mat, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
            tl.fromTo(img1Ref.current.scale, { x: 3.45, y: 4.6 }, { x: 3, y: 4, duration: 0.3, ease: "power2.out" }, 0);

            // Phase 2: Exit (70% -> 100% of scroll)
            tl.to(mat, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
            tl.to(img1Ref.current.scale, { x: 4, y: 5.3, duration: 0.3, ease: "power2.in" }, 0.7);
        }

        // Standardized image behaviors for img2
        if (img2Ref.current) {
            const mat = img2Ref.current.material as MeshStandardMaterial;
            mat.transparent = true;

            // Phase 1: Enter
            tl.fromTo(mat, { opacity: 0 }, { opacity: 0.8, duration: 0.3, ease: "power2.out" }, 0);
            tl.fromTo(img2Ref.current.scale, { x: 2.3, y: 3.45 }, { x: 2, y: 3, duration: 0.3, ease: "power2.out" }, 0);

            // Phase 2: Exit
            tl.to(mat, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
            tl.to(img2Ref.current.scale, { x: 3, y: 4.5, duration: 0.3, ease: "power2.in" }, 0.7);
        }

    }, []);

    return (
        <group ref={groupRef} visible={false}>
            {/* Plane 1: Book Image - Reduced Scale for supportive feel */}
            <DreiImage
                ref={img1Ref}
                url="/assets/images/3.png"
                scale={[3, 4] as [number, number]}
                position={[-4, 0, -2]}
                transparent
                rotation={[0, 0.2, 0]}
            />
            {/* Plane 2: Depth layer */}
            <DreiImage
                ref={img2Ref}
                url="/assets/images/4.png"
                scale={[2, 3] as [number, number]}
                position={[4, 1.5, -5]}
                transparent
                rotation={[0, -0.3, 0]}
            />
        </group>
    );
}
