"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasWrapper from "@/components/CanvasWrapper";
import Background3D from "@/components/Experience";
import ProjectSection from "@/components/ProjectSection";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ASSET LISTS - RECONCILED FROM DIRECTORY LISTING
const EDITING_ASSETS = [
    "1030.mp4", "1126 (1).mp4", "6 mins mp4.mp4", "Ad 2.mp4", "Behind every perfume…  there’s a story that stays hidden until you experience it.Today, I take y.mp4",
    "CPC reel 2 (1).mp4", "Do share with your friends and comment the next topic ☺️💘.mp4", "MAHEEN 4.mp4", "Mcdonalds mp4.mp4", "OFFICE .mp4",
    "Office_.mp4", "VID 1(1).mp4", "VID 1.mp4", "VID 2(1).mp4", "VID 2.mp4", "VID 3(1).mp4", "VID 3.mp4", "VID 4.mp4", "VID 5.mp4", "VID 7.mp4",
    "VID 9.mp4", "WhatsApp Video 2026-01-12 at 12.26.45 AM.mp4", "YT(1).mp4", "amazon adds.mp4", "birth Necklace .mp4", "birth Necklace 2.mp4",
    "copy_054B43A7-AD29-4525-888F-CAFC0B0AB52D.MOV", "cpc eel 2 test (13) .mp4", "cpc reel 1 (2).mp4", "luxe box (1).mp4", "luxe box.mp4",
    "maheen 3.mp4", "me kaha secure hun .mp4", "yt 3 zero to seven figures.mp4"
].map(name => ({ path: `/assets/videos/${encodeURIComponent("Video Editing & Production")}/${encodeURIComponent(name)}`, type: "video" } as const));

const PODCAST_ASSETS = [
    "Bohot fark hota Hy bhaee bohot fark hota Hy.mp4",
    "Command attention with every step. Bold, fresh, and unforgettable – Zenith is for the man who co.mp4",
    "Dark. Bold. Unstoppable.Will to Power isn’t just a fragrance — it’s a declaration. Built for the.mp4",
    "Do share if you want somebody to learn this.mp4",
    "Dr Asma Vid 4 R2.mp4",
    "Dr Asra Vid 3.mp4",
    "Dr Frooq vid 1.mp4",
    "Dr Frooq vid 2.mp4",
    "Dr, Asma Vid 1.mp4",
    "If this video has appeared in your feed or someone has shared it with you.mp4",
    "PC Q8.mp4",
    "Step into your light and own your glow. Soft, radiant, and effortlessly graceful.Celestial is fo.mp4",
    "That_s how Creative Media works#creatives #socialmedia #mediadevelopers #saadmehmood.mp4",
    "The scent you didn’t know you needed – Perfume’s live at Zilver.pk#NowTrending #ViralLaunch #Ins.mp4",
    "Unstoppable, fresh, and undeniably powerful — Voyager is for the man who plays hard, wins harder.mp4",
    "get.mp4",
    "ᴄᴛᴏᴍᴍᴀɴᴅ ʏᴏᴜʀ ᴅᴀʏ ᴡɪᴛʜ ᴇɴᴇʀɢʏ ɪɴ ᴇᴠᴇʀʏ ꜱᴘʀᴀʏ. ꜰʀᴇꜱʜ, ᴘᴏᴡᴇʀꜰᴜʟ, ᴀɴᴅ ᴜɴᴀᴘᴏʟᴏɢᴇᴛɪᴄᴀʟʟʏ ʙᴏʟᴅ – ᴀᴅʀᴇɴᴀ.mp4",
    "🌊 ꜱᴇᴀʀᴇɴɪᴛʏ – ʏᴏᴜʀ ᴘᴀᴛʜ ᴛᴏ ᴘᴇᴀᴄᴇꜰᴜʟ ᴘᴏᴡᴇʀ. ꜱᴛᴀʏ ᴄᴀʟᴍ, ꜱᴛᴀʏ ᴄʜᴀʀɢᴇᴅ – ᴛʜɪꜱ ᴏᴄᴇᴀɴɪᴄ ᴍᴀꜱᴛᴇʀᴘɪᴇᴄᴇ ᴄ.mp4"
].map(name => ({ path: `/assets/videos/${encodeURIComponent("Podcasting & Hosting")}/${encodeURIComponent(name)}`, type: "video" } as const));

const AI_ASSETS = [
    "AI Partner.mp4", "Beet root 10.mp4", "Beet root 7 2.mp4", "Beet root 7.mp4", "Beet root 8.mp4", "Beet root 9.mp4",
    "Creative 4 R2 (WITH CAPTIONS).mp4", "Gummes 3.mp4", "Gummies vid 2 R2.mp4", "gummies 7.mp4", "ventex 1.mp4", "vetra vid one.mp4"
].map(name => ({ path: `/assets/videos/${encodeURIComponent("AI Production Content")}/${encodeURIComponent(name)}`, type: "video" } as const));

const SOCIAL_ASSETS = [
    "#amazon #amazonfba #amazonseller #amazonsellers #brandock (1).heic",
    "#amazon #amazonfba #amazonseller #amazonsellers #brandock (2).heic",
    "#amazon #amazonfba #amazonseller #amazonsellers #brandock (3).heic",
    "#amazon #amazonfba #amazonseller #amazonsellers #brandock (4).heic",
    "#amazon #amazonfba #amazonseller #amazonsellers #brandock (5).heic",
    "#amazon #amazonfba #amazonseller #amazonsellers #brandock.heic",
    "Artboard 1(1).png", "Artboard 1(2).png", "Artboard 1(3).png", "Artboard 1.png",
    "Artboard 2(1).png", "Artboard 2(2).png", "Artboard 2(3).png", "Artboard 2.png",
    "Artboard 3(1).png", "Artboard 3.png", "Artboard 4(1).png", "Artboard 4(2).png", "Artboard 4.png",
    "Artboard 5(1).png", "Artboard 5.png", "Artboard 6(1).png", "Artboard 6.png",
    "Every major step today is a step towards tomorrow_s big dreams.png", "Gemini_Generated_Image_7ruhka7ruhka7ruh.png",
    "POST 10.png", "POST 6.png", "POST 9.png", "Post 15.png", "Post 20.png", "Post 8.png", "Post 9(1).png",
    "Red and White Video Centric Coming Soon Instagram Post_20250326_061049_0000.png",
    "Red and White Video Centric Coming Soon Instagram Post_20250326_061501_0000.png",
    "Red and White Video Centric Coming Soon Instagram Post_20250326_061802_0000.png",
    "aron-yigin-sNY6B9NsPP8-unsplash.png", "fd097ba2ef9a37579f301d9aed2b0d6d.png", "post 14.png", "post 4.png"
].map(name => ({ path: `/assets/videos/${encodeURIComponent("Social Media Content")}/${encodeURIComponent(name)}`, type: "image" } as const));

export default function ProjectsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main ref={containerRef} className="relative w-full bg-[#050505] min-h-screen overflow-x-hidden">
            <CanvasWrapper>
                <Background3D />
            </CanvasWrapper>

            {/* Cinematic Page Header */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h1 className="text-5xl sm:text-7xl md:text-[12rem] font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
                        Premiere
                    </h1>
                    <p className="text-accent text-xs md:text-sm tracking-[1em] uppercase mt-8 font-black italic opacity-80">
                        The Cinematic Showcase
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 w-[1px] h-20 bg-gradient-to-t from-accent to-transparent"
                />
            </section>

            {/* SECTION 1: Video Editing */}
            <ProjectSection
                category="Part 01"
                title="Visual Narrative"
                slogan="Crafting stories, one frame at a time."
                assets={EDITING_ASSETS}
            />

            {/* SECTION 2: Podcasting */}
            <ProjectSection
                category="Part 02"
                title="Voice & Vision"
                slogan="The art of conversation, captured."
                assets={PODCAST_ASSETS}
            />

            {/* SECTION 3: AI Production */}
            <ProjectSection
                category="Part 03"
                title="Synthetic Realism"
                slogan="Pushing the boundaries of intelligence."
                assets={AI_ASSETS}
            />

            {/* SECTION 4: Social Media */}
            <ProjectSection
                category="Part 04"
                title="Digital Impact"
                slogan="Content that moves the needle."
                assets={SOCIAL_ASSETS}
                aspectRatio="1/1"
            />

            {/* SECTION 5: Collaborators
            <ProjectSection
                category="Part 05"
                title="Collaborations"
                slogan="Building the future with the best."
                assets={[]} // Ready for future assets
            /> */}

            {/* Final Contact Push */}
            <section className="py-32 md:py-64 relative z-10 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 -skew-y-3"></div>
                <div className="container mx-auto text-center relative">
                    <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-12">Next Premiere?</h2>
                    <a href="mailto:saadmehmood4375@gmail.com" className="inline-block px-12 py-5 bg-accent text-black font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform text-xs rounded-none shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                        Start Collaboration
                    </a>
                </div>
            </section>
        </main>
    );
}
