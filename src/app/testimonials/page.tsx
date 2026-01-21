"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasWrapper from "@/components/CanvasWrapper";
import Background3D from "@/components/Experience";
import LogoMarquee from "@/components/LogoMarquee";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
    { name: "Arsalan Ahmed", role: "Creative Director, Synergy Advertising", content: "Saad has a clear understanding of brand storytelling and content direction. His ability to deliver quality visuals under tight deadlines is impressive." },
    { name: "Julian Thorne", role: "Creative Director, Aura Media", content: "Saad's ability to capture the essence of a brand is unparalleled. His work on 'Khanabadosh' is a testament to his cinematic range." },
    { name: "Zainab Malik", role: "Head of Marketing, Indus Brands", content: "Working with Saad felt seamless. From planning to execution, he handled everything professionally and delivered results that aligned perfectly with our brand goals." },
    { name: "David Chen", role: "founder, Vertex Tech", content: "The commercial assets Saad produced for us saw a 40% increase in engagement. He understands the digital landscape perfectly." },
    { name: "Omer Sheikh", role: "MD, Visionary Productions", content: "Saad brings creative clarity to every project. His leadership and attention to detail helped us elevate our content quality significantly." },
    { name: "Sophia Martinez", role: "Documentary Lead, Global Lens", content: "A true visual artisan. Saad's technical mastery is matched only by his creative intuition. A pleasure to collaborate with." },
    { name: "Farooq Aziz", role: "Portfolio Manager, Crescent Group", content: "A reliable and highly creative professional. Saad understands the Pakistani market while maintaining international quality standards." },
    { name: "Isabella Vane", role: "Editor, Luxury Lifestyle Mag", content: "Saad delivers more than just video; he delivers an experience. His work is consistently premium and powerful." },
    { name: "Nida Siddiqui", role: "Creative Lead, Spark Digital", content: "His experience with both local and international clients clearly reflects in the way he manages projects and teams." },
];

export default function TestimonialsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 100,
                        rotateX: -15,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 1.2,
                        delay: i * 0.1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="relative w-full bg-[#050505] min-h-screen overflow-hidden">
            <CanvasWrapper>
                <Background3D />
            </CanvasWrapper>


            {/* Header */}
            <section className="pt-32 md:pt-48 pb-12 md:pb-20 text-center relative z-10 px-6">
                <h2 className="text-[10px] md:text-xs font-bold tracking-[0.5em] md:tracking-[0.8em] text-accent uppercase mb-6">Voices of Impact</h2>
                <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                    Testimonials
                </h1>
                <div className="w-16 md:w-24 h-[1px] bg-accent mx-auto shadow-[0_0_10px_#FFD700]"></div>
            </section>

            {/* Logo Marquee */}
            <div className="relative z-10 mb-20 md:mb-32">
                <LogoMarquee />
            </div>

            {/* Grid */}
            <section className="relative z-10 pb-64 px-6 md:px-12">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="testimonial-card perspective-1000">
                                <div className="p-8 sm:p-10 md:p-16 bg-black/40 backdrop-blur-xl border border-white/5 hover:border-accent group transition-all duration-700 relative overflow-hidden h-full flex flex-col justify-between rounded-2xl md:rounded-[20px]">
                                    {/* Quote Mark */}
                                    <div className="absolute top-8 right-8 text-[4rem] md:text-[6rem] font-black text-white/[0.03] group-hover:text-accent/[0.05] transition-colors -z-10 text-right leading-none">“</div>

                                    <div>
                                        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/20 border border-accent flex items-center justify-center font-black text-accent text-lg md:text-xl relative overflow-hidden group-hover:bg-accent group-hover:text-black transition-all duration-500">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">{t.name}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1 pr-4">{t.role}</p>
                                            </div>
                                        </div>

                                        <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed tracking-tight mb-8 md:mb-12 italic">
                                            "{t.content}"
                                        </p>
                                    </div>

                                    {/* Industrial Accent */}
                                    <div className="h-[2px] w-12 bg-accent/30 group-hover:w-full transition-all duration-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
