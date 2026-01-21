"use client";

import { useRef, useEffect, useState } from "react";
import { Image as DreiImage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Group, MeshStandardMaterial } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectSpotlightScene() {
    const groupRef = useRef<Group>(null);
    const imageRef = useRef<any>(null);
    const [hovered, setHover] = useState(false);

    useEffect(() => {
        if (!groupRef.current) return;

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".achievements-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onEnter: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeave: () => { if (groupRef.current) groupRef.current.visible = false; },
                onEnterBack: () => { if (groupRef.current) groupRef.current.visible = true; },
                onLeaveBack: () => { if (groupRef.current) groupRef.current.visible = false; }
            }
        });

        // Parallax/Rotation Entrance
        tl.fromTo(groupRef.current.position, { y: -2, z: -5 }, { y: 0, z: -2, ease: "none" }, 0);

        if (imageRef.current) {
            const mat = imageRef.current.material as MeshStandardMaterial;
            mat.transparent = true;

            // Phase 1: Enter
            tl.fromTo(mat, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
            tl.fromTo(imageRef.current.scale, { x: 6.9, y: 4.025 }, { x: 6, y: 3.5, duration: 0.3, ease: "power2.out" }, 0);

            // Phase 2: Exit
            tl.to(mat, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
            tl.to(imageRef.current.scale, { x: 9, y: 5.25, duration: 0.3, ease: "power2.in" }, 0.7);
        }

    }, []);

    useFrame((state) => {
        if (groupRef.current && groupRef.current.visible) {
            // Subtle sway
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -2]} visible={false}>
            {/* Main Project Visual */}
            <DreiImage
                ref={imageRef}
                url="/assets/images/1.png"
                scale={[6, 3.5] as [number, number]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                color={hovered ? "#ffffff" : "#cccccc"}
                transparent
            />
        </group>
    );
}
