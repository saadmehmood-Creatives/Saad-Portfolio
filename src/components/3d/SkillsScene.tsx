"use client";

import { useRef, useMemo } from "react";
import { Text, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

const SKILLS = [
    "React", "Next.js", "Three.js", "GSAP", "Tailwind",
    "TypeScript", "Node.js", "Framer Motion", "Cinema 4D",
    "After Effects", "Premire Pro", "Blender", "Unreal Engine"
];

export default function SkillsScene() {
    const groupRef = useRef<Group>(null);

    // Generate spherical positions
    const skillsWithPos = useMemo(() => {
        return SKILLS.map((skill, i) => {
            const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
            const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
            return {
                text: skill,
                pos: new Vector3(
                    4 * Math.cos(theta) * Math.sin(phi),
                    4 * Math.sin(theta) * Math.sin(phi),
                    4 * Math.cos(phi)
                )
            };
        });
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, -2, -8]}>
            {skillsWithPos.map((item, i) => (
                <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Text
                        position={item.pos}
                        color="white"
                        fontSize={0.3}
                        anchorX="center"
                        anchorY="middle"
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    >
                        {item.text}
                    </Text>
                </Float>
            ))}
        </group>
    );
}
