"use client";

import { useRef, useEffect } from "react";
import { Float, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { Group } from "three";
import { useThree } from "@react-three/fiber";

export default function IndustriesScene() {
    const groupRef = useRef<Group>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".industries-section",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            }
        });

        // Rotate the abstract background grid
        tl.to(groupRef.current.rotation, { z: 0.5, ease: "none" });

    }, []);

    return (
        <group ref={groupRef} position={[0, 0, -10]}>
            {/* Abstract background particles/grid for industries */}
            <Instances range={20}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#333" transparent opacity={0.4} />

                {Array.from({ length: 20 }).map((_, i) => (
                    <Instance
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 15,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 5
                        ]}
                        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                    />
                ))}
            </Instances>
        </group>
    );
}
