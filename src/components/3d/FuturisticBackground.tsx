"use client";

import { useRef } from "react";
import { Group } from "three";

export default function FuturisticBackground() {
    const groupRef = useRef<Group>(null);

    return (
        <group ref={groupRef}>
            {/* Deep Matte Black Void - No Particles, No Meshes */}
            <fog attach="fog" args={['#050505', 0, 30]} />
            <color attach="background" args={['#050505']} />
        </group>
    );
}
