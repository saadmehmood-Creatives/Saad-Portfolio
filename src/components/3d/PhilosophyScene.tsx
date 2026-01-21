"use client";

import { useRef } from "react";
import { Icosahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

export default function PhilosophyScene() {
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron args={[1.5, 0]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        speed={2}
                        distort={0.4}
                        radius={1}
                        wireframe
                    />
                </Icosahedron>
            </Float>
        </group>
    );
}
