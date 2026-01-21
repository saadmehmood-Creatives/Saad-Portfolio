"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const UPPER_LABELS = ["STORY", "FRAME", "LIGHT", "MOTION", "DEPTH", "CINEMA", "VISION"];
const LOWER_LABELS = ["EDIT", "CUT", "COLOR", "SOUND", "TIMELINE", "FLOW", "IMPACT"];

function Dial({ labels, radius, rotationSpeed, position, isReverse = false }: {
    labels: string[],
    radius: number,
    rotationSpeed: number,
    position: [number, number, number],
    isReverse?: boolean
}) {
    const groupRef = useRef<THREE.Group>(null);
    const lastScrollY = useRef(0);
    const velocity = useRef(0);
    const idleRotation = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Calculate scroll velocity
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY.current;
        velocity.current = THREE.MathUtils.lerp(velocity.current, diff, 0.1);
        lastScrollY.current = currentScrollY;

        // Continuous subtle idle rotation (very slow)
        idleRotation.current += delta * 0.05;

        // Rotate based on progress + velocity + idle
        const direction = isReverse ? -1 : 1;
        const scrollRotation = (currentScrollY * 0.002) * direction;
        const velocityRotation = (velocity.current * 0.01) * direction;
        const idleComponent = idleRotation.current * direction;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            scrollRotation + velocityRotation + idleComponent,
            0.05
        );
    });

    return (
        <group position={position} rotation={[0.2, 0, 0]}>
            <group ref={groupRef}>
                {/* Dial Body (Ring) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius, 0.04, 16, 100]} />
                    <meshStandardMaterial
                        color="#050505"
                        roughness={0.4}
                        metalness={0.9}
                        envMapIntensity={1}
                    />
                </mesh>

                {/* Tick Marks */}
                {Array.from({ length: 48 }).map((_, i) => {
                    const angle = (i / 48) * Math.PI * 2;
                    const x = Math.cos(angle) * (radius - 0.1);
                    const z = Math.sin(angle) * (radius - 0.1);
                    return (
                        <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
                            <boxGeometry args={[0.08, 0.01, 0.01]} />
                            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
                        </mesh>
                    );
                })}

                {/* Labels around the dial */}
                {labels.map((label, i) => {
                    const angle = (i / labels.length) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    return (
                        <Text
                            key={label}
                            position={[x, 0, z]}
                            rotation={[0, -angle + Math.PI / 2, 0]}
                            fontSize={0.25}
                            color="#FFD700"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.005}
                            outlineColor="#000000"
                            fillOpacity={0.9}
                        >
                            {label}
                            <meshStandardMaterial
                                color="#FFD700"
                                emissive="#FFD700"
                                emissiveIntensity={0.6}
                                toneMapped={false}
                            />
                        </Text>
                    );
                })}
            </group>
        </group>
    );
}

export default function CameraDialSystem() {
    return (
        <group position={[0, 0, -8]}>
            {/* Upper Dial - Clockwise */}
            <Dial
                labels={UPPER_LABELS}
                radius={4.5}
                rotationSpeed={0.01}
                position={[0, 1.5, 0]}
            />

            {/* Lower Dial - Counter-Clockwise */}
            <Dial
                labels={LOWER_LABELS}
                radius={5.5}
                rotationSpeed={0.01}
                position={[0, -1.5, -1]}
                isReverse={true}
            />

            {/* Subtle center core or lens element if needed */}
            <mesh position={[0, 0, -0.5]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} transparent opacity={0.1} />
            </mesh>
        </group>
    );
}
