"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasWrapper from "@/components/CanvasWrapper";
import Background3D from "@/components/Experience";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MyStoryPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = gsap.utils.toArray<HTMLElement>(".story-line");

            lines.forEach((line) => {
                gsap.to(line, {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: line,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play reverse play reverse",
                    },
                    duration: 1.5,
                    ease: "power3.out"
                });
            });

            // Image Zoom
            gsap.to(".story-image", {
                scale: 1.2,
                scrollTrigger: {
                    trigger: ".story-image-container",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="relative w-full bg-[#050505] min-h-screen overflow-hidden">
            <CanvasWrapper>
                <Background3D />
            </CanvasWrapper>

            {/* Content Overlay */}
            <div className="relative z-10 pt-32 pb-64">
                <div className="container mx-auto px-6 max-w-5xl">

                    {/* Header Anchor */}
                    <div className="mb-16 md:mb-32">
                        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.6em] text-accent uppercase mb-4">The Narrative</h2>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                            My Story
                        </h1>
                    </div>

                    {/* Emotional Anchor Image */}
                    <div className="story-image-container w-full h-[40vh] md:h-[70vh] mb-16 md:mb-32 relative overflow-hidden border border-white/5 opacity-80">
                        <img
                            src="/assets/images/16.jpg"
                            alt="Saad Mehmood Story"
                            className="story-image w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                    </div>

                    {/* Story Content */}
                    <div className="space-y-16 md:space-y-24 max-w-4xl px-4 md:px-0">
                        <div className="story-line opacity-0 translate-y-12">
                            <p className="text-lg md:text-4xl text-white font-light leading-relaxed tracking-tight">
                                I believe that every creative person has a story that’s what makes them creative. But stories can also be made up, because after all, every story is built on a bit of fiction. Still, the lives of creative professionals are often built on those very fictions.
                            </p>
                        </div>

                        <div className="story-line opacity-0 translate-y-12">
                            <p className="text-lg md:text-4xl text-white font-light leading-relaxed tracking-tight">
                                Like, when four friends, at the age of twelve, started a YouTube channel just to copy their favorite creators. None of them realized at the time how much they were actually learning in the process. But as every story eventually comes to an end, so did their YouTube channel. Yet, that ending became a new beginning the start of a small but passionate and determined content creator.
                                From there, he never stopped. He began with graphic design, then moved into video editing, media development.
                            </p>
                        </div>

                        <div className="story-line opacity-0 translate-y-12">
                            <p className="text-lg md:text-4xl text-white font-light leading-relaxed tracking-tight">
                                Documentaries and eventually got the chance to work with the very creators he once copied. Now, he wants to go even further
                                to work in a highly professional environment, in an organization where creativity can truly thrive and be pushed to its limits.
                            </p>
                        </div>

                        <div className="story-line opacity-0 translate-y-12">
                            <p className="text-lg md:text-4xl text-white font-light leading-relaxed tracking-tight">
                                I now understand how to build teams, how to get the best out of them, and how to grow together. I know when it’s time to work
                                hard and when to work smart. I understand how my leadership and consistent learning attitude can uplift any company or
                                creative firm I become part of.
                            </p>
                        </div>

                        <div className="story-line opacity-0 translate-y-12 border-l-4 border-accent pl-8 md:pl-12">
                            <h3 className="text-3xl md:text-6xl font-black text-white uppercase italic leading-none mb-8">
                                "Crafting stories that <span className="text-accent">move, inspire, and endure.</span>."
                            </h3>
                            <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed">
                                He guides brands through the complexities of modern content production, ensuring every frame serves a purpose and every narrative resonates with its intended audience.
                            </p>
                        </div>

                        <div className="story-line opacity-0 translate-y-12">
                            <p className="text-lg md:text-3xl text-gray-400 font-light leading-relaxed tracking-tight">
                                Based in Karachi, Pakistan, Saad continues to evolve his craft, blending traditional cinematography with cutting-edge digital post-production to create timeless visual experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
