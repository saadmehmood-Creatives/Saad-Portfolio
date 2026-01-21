"use client";

import { useRef, useEffect } from "react";
import { Center, Text, Float } from "@react-three/drei";
import gsap from "gsap";
import { Group } from "three";
import { useThree } from "@react-three/fiber";

export default function EducationScene() {
    const groupRef = useRef<Group>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        // Scroll animation meant to bring cards forward
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".education-section",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            }
        });

        tl.fromTo(groupRef.current.position, { z: -5 }, { z: 0, ease: "none" });

    }, []);

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            {/* Abstract representations of cards or diplomas using Text/Shapes */}
            {/* 1. Speciss School */}
            {/* <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group position={[-3, 1, 0]}>
                    <Text
                        fontSize={0.4}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={3}
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    >
                        Speciss School
                    </Text>
                </group>
            </Float> */}

            {/* 2. GIBCE
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4} position={[3, 0, -2]}>
                <group>
                    <Text
                        fontSize={0.4}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={3}
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    >
                        GIBCE Institute
                    </Text>
                </group>
            </Float>

            {/* 3. AL ISMAIL */}
            {/* <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.6} position={[0, -2, 1]}>
                <group>
                    <Text
                        fontSize={0.4}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={3}
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    >
                        AL ISMAIL College
                    </Text>
                </group>
            </Float> */}
        </group>
    );
}
