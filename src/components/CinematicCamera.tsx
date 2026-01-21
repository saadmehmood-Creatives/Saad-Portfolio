"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, SpotLight, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface CinematicCameraProps {
    mediaPath?: string;
    isImage?: boolean;
    isInView?: boolean;
    onNext?: () => void;
    onPrev?: () => void;
    aspectRatio?: "9/16" | "1/1";
}

export default function CinematicCamera({
    mediaPath,
    isImage,
    isInView,
    onNext,
    onPrev,
    aspectRatio = "9/16"
}: CinematicCameraProps) {
    const group = useRef<THREE.Group>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [showDebug, setShowDebug] = useState(false);

    // Mobile-aware animation state for screen dimensions
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const targetDim = aspectRatio === "1/1"
        ? (isMobile ? { w: 1.8, h: 1.8 } : { w: 2.2, h: 2.2 })
        : (isMobile ? { w: 1.2, h: 2.13 } : { w: 1.5, h: 2.66 });
    const currentDim = useRef({ w: 1.2, h: 2.13 });

    // Handle media loading
    useEffect(() => {
        let active = true;
        if (!mediaPath) return;

        // Force image-only if aspect ratio is 1/1 (Section 4 rule)
        const isVideoFile = aspectRatio === "1/1" ? false : /\.(mp4|webm|mov)$/i.test(decodeURIComponent(mediaPath));
        const effectiveIsImage = isImage || (aspectRatio === "1/1") || !isVideoFile;

        if (effectiveIsImage) {
            setIsVideoReady(false);
            const loader = new THREE.TextureLoader();
            loader.load(mediaPath, (tex) => {
                if (active) {
                    tex.colorSpace = THREE.SRGBColorSpace;

                    // "Contain" logic: preserve aspect ratio within the square/portrait frame
                    if (tex.image) {
                        const imgAspect = tex.image.width / tex.image.height;
                        if (aspectRatio === "1/1") {
                            // Square framing logic: Fit the image inside exactly
                            if (imgAspect > 1) { // Landscape image in square
                                tex.repeat.set(1, 1 / imgAspect);
                                tex.offset.set(0, (1 - 1 / imgAspect) / 2);
                            } else { // Portrait image in square
                                tex.repeat.set(imgAspect, 1);
                                tex.offset.set((1 - imgAspect) / 2, 0);
                            }
                            tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
                        }
                    }

                    setTexture(tex);
                    setIsVideoReady(true);
                }
            });
            return () => { active = false; };
        } else {
            // Video logic (only for non-1/1 sections)
            console.log("🎬 DEBUG: Initializing Video Rendering Pipeline for:", mediaPath);
            setIsVideoReady(false);

            const video = document.createElement("video");
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "auto";
            video.crossOrigin = "anonymous";

            // Technical Visibility
            video.style.position = "fixed";
            video.style.top = "0";
            video.style.left = "0";
            video.style.width = "1px";
            video.style.height = "1px";
            video.style.opacity = "0";
            video.style.pointerEvents = "none";
            document.body.appendChild(video);

            video.src = mediaPath;
            videoRef.current = video;

            const handleReady = () => {
                if (!active) return;
                if (video.readyState >= 2) {
                    setIsVideoReady(true);
                    const vTexture = new THREE.VideoTexture(video);
                    vTexture.minFilter = THREE.LinearFilter;
                    vTexture.magFilter = THREE.LinearFilter;
                    vTexture.format = THREE.RGBAFormat;
                    vTexture.colorSpace = THREE.SRGBColorSpace;
                    setTexture(vTexture);
                    video.play().catch(() => { });
                }
            };

            video.addEventListener('canplay', handleReady);
            video.addEventListener('playing', handleReady);
            video.load();

            return () => {
                active = false;
                video.removeEventListener('canplay', handleReady);
                video.removeEventListener('playing', handleReady);
                video.pause();
                video.src = "";
                if (document.body.contains(video)) document.body.removeChild(video);
                videoRef.current = null;
                setTexture(null);
            };
        }
    }, [mediaPath, isImage, aspectRatio]);

    // Force playback on visibility/interaction
    useEffect(() => {
        const video = videoRef.current;
        if (video && aspectRatio !== "1/1") {
            if (isInView) video.play().catch(() => { });
            else video.pause();
        }

        const forcePlay = () => {
            if (isInView && video && video.paused && aspectRatio !== "1/1") {
                video.play().catch(() => { });
            }
        };
        window.addEventListener('click', forcePlay);
        window.addEventListener('touchstart', forcePlay);
        return () => {
            window.removeEventListener('click', forcePlay);
            window.removeEventListener('touchstart', forcePlay);
        };
    }, [isInView, aspectRatio]);

    useFrame((state) => {
        if (!group.current) return;

        // Smoothly interpolate dimensions
        currentDim.current.w = THREE.MathUtils.lerp(currentDim.current.w, targetDim.w, 0.1);
        currentDim.current.h = THREE.MathUtils.lerp(currentDim.current.h, targetDim.h, 0.1);

        if (texture instanceof THREE.VideoTexture && videoRef.current) {
            if (videoRef.current.readyState >= 2 && !videoRef.current.paused) {
                texture.needsUpdate = true;
            }
        }

        // Float animation
        const t = state.clock.getElapsedTime();
        group.current.position.y = Math.sin(t * 0.5) * 0.1;

        // Subtle mouse follow
        const { x, y } = state.mouse;
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.2, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.1);
    });

    return (
        <group ref={group}>
            {/* Diagnostic Toggle */}
            <Html position={[0, 1.8, 0]} center>
                <div
                    onClick={() => setShowDebug(!showDebug)}
                    className="px-3 py-1 bg-black/90 text-[8px] text-accent/60 cursor-pointer border border-accent/20 rounded-full hover:bg-accent hover:text-black transition-all font-black"
                >
                    Shorts Mode: {showDebug ? "ACTIVE" : "OFF"}
                </div>
            </Html>

            {/* Diagnostic Overlay */}
            {showDebug && videoRef.current && aspectRatio !== "1/1" && (
                <Html position={[0, 0, 0]} center>
                    <div className="fixed top-20 right-20 w-48 bg-black/95 p-3 border border-accent z-[99999]">
                        <p className="text-[10px] text-accent font-black mb-2 flex justify-between uppercase">
                            <span>RAW Signal</span>
                            <span>{videoRef.current.readyState >= 2 ? "READY" : "LOADING"}</span>
                        </p>
                        <video src={videoRef.current.src} muted autoPlay loop playsInline className="w-full h-auto border border-white/10" />
                    </div>
                </Html>
            )}

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Camera Hardware Mesh */}
                <group>
                    <mesh castShadow>
                        <boxGeometry args={[1.1, 0.7, 1.3]} />
                        <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.3, 0.35, 0.4, 32]} />
                        <meshStandardMaterial color="#0a0a0a" metalness={1} />
                    </mesh>
                </group>

                {/* Dynamic Projection Beam */}
                <mesh position={[0, 0, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[currentDim.current.w * 0.7, 0.15, 2.8, 32, 1, true]} />
                    <meshBasicMaterial
                        color="#FFD700"
                        transparent
                        opacity={0.06}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* Final Projection Surface (Smooth Resize) */}
                <mesh position={[0, 0, 3.8]} visible={isVideoReady}>
                    <planeGeometry args={[currentDim.current.w, currentDim.current.h]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        opacity={1.0}
                        blending={THREE.AdditiveBlending}
                    />
                    <pointLight intensity={3} color="#FFD700" distance={6} />
                </mesh>

                {/* Loading/Fallback Slate */}
                {!isVideoReady && (
                    <mesh position={[0, 0, 3.8]}>
                        <planeGeometry args={[currentDim.current.w, currentDim.current.h]} />
                        <meshBasicMaterial color="#111" transparent opacity={0.7} wireframe />
                    </mesh>
                )}

                {/* Navigation UI */}
                <group position={[0, isMobile ? -1.5 : -1.8, 0]}>
                    <Text position={[isMobile ? -0.5 : -0.7, 0, 0]} fontSize={isMobile ? 0.08 : 0.12} color="#FFD700" onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
                        onPointerOver={() => { if (!isMobile) document.body.style.cursor = 'pointer' }}
                        onPointerOut={() => { if (!isMobile) document.body.style.cursor = 'auto' }}
                    >
                        PREV
                    </Text>
                    <Text position={[isMobile ? 0.5 : 0.7, 0, 0]} fontSize={isMobile ? 0.08 : 0.12} color="#FFD700" onClick={(e) => { e.stopPropagation(); onNext?.(); }}
                        onPointerOver={() => { if (!isMobile) document.body.style.cursor = 'pointer' }}
                        onPointerOut={() => { if (!isMobile) document.body.style.cursor = 'auto' }}
                    >
                        NEXT
                    </Text>
                </group>
            </Float>

            <SpotLight position={[0, 0, 1]} distance={15} angle={0.45} attenuation={5} anglePower={4} color="#FFD700" intensity={1.5} />
        </group>
    );
}
