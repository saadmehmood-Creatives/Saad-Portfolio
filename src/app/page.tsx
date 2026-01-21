"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/components/Experience";
import HeroInteractiveImage from "@/components/HeroInteractiveImage";
import PersonaNarration from "@/components/PersonaNarration";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Story line animations
    gsap.utils.toArray<HTMLElement>(".story-line").forEach((line) => {
      gsap.to(line, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        duration: 1,
        ease: "power3.out",
      });
    });

    // Testimonial cards animation
    gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          z: -50,
          rotateX: -10
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });
  }, []);

  return (
    <main className="relative w-full">
      <CanvasWrapper>
        <Experience />
      </CanvasWrapper>

      {/* Hero Section */}
      <section className="hero-section min-h-screen w-full relative z-10 overflow-hidden flex items-center justify-center">

        {/* BACKGROUND: Full-Width Portrait (Static) */}
        <HeroInteractiveImage />

        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          {/* Text Content - Center on mobile, left on desktop */}
          <div className="text-center md:text-left max-w-7xl mx-auto md:mx-0">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h1 className="font-black tracking-tighter leading-[0.8] text-white uppercase mb-8 md:mb-10 lg:mb-12 
               text-[clamp(4rem,9vw,9rem)]">
                Saad<br />
                Mehmood
              </h1>



              <div className="flex flex-col items-center md:items-start gap-6 md:gap-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 md:w-12 bg-accent shadow-[0_0_10px_#FFD700] hidden md:block"></div>
                  <p className="text-xs md:text-xl tracking-[0.2em] md:tracking-[0.3em] font-black text-accent uppercase italic text-shadow-sm leading-snug">
                    Creative Content Producer/ <br className="hidden md:block" />
                    Head of Content
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[8px] md:text-sm tracking-[0.4em] md:tracking-[0.6em] text-gray-200 uppercase font-black drop-shadow-lg">
                    Visionary Artifacts
                  </p>
                  <p className="text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-gray-300 uppercase font-bold drop-shadow-md">
                    Karachi, Sindh, Pakistan ✦
                  </p>
                </div>

                <div className="pt-6 md:pt-8 sm:hidden">
                  <button className="px-8 py-4 border border-accent/20 bg-accent/5 hover:bg-accent hover:text-black transition-all duration-500 uppercase text-[9px] font-black tracking-[0.4em] text-accent">
                    Explore Persona
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Summary (Interactive Persona) */}
      <section className="summary-section min-h-screen w-full flex items-center justify-center relative z-10 pointer-events-none py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="pointer-events-auto bg-black/50 backdrop-blur-3xl p-8 sm:p-10 md:p-20 border border-white/5 shadow-2xl rounded-3xl">
            <PersonaNarration />
          </div>
        </div>
      </section>

      {/* Industries & Expertise */}
      <section className="industries-section min-h-screen w-full flex items-center justify-center relative z-10 pointer-events-none py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-24 px-4">
            <h2 className="text-[var(--text-4xl)] md:text-[var(--text-5xl)] font-black text-white uppercase tracking-tighter leading-none">
              Industries
            </h2>
            <p className="text-accent text-[8px] md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase mt-2 md:mt-4 font-bold">Domain Expertise</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto px-4">
            {[
              { name: 'Fashion', icon: '✦' },
              { name: 'Real Estate', icon: '✦' },
              { name: 'Healthcare', icon: '✦' },
              { name: 'Food & Beverage', icon: '✦' },
              { name: 'E-commerce', icon: '✦' },
              { name: 'Medical', icon: '✦' },
              { name: 'B2B & DTC Brands', icon: '✦' },
              { name: 'Social Media Brands', icon: '✦' }
            ].map((item, i) => (
              <div key={i} className="group p-6 md:p-10 border border-white/5 bg-[#0a0a0a] backdrop-blur-sm pointer-events-auto hover:border-accent hover:bg-black transition-all duration-300 flex flex-col items-center justify-center gap-3 md:gap-4 text-center">
                <span className="text-accent text-base md:text-xl">{item.icon}</span>
                <span className="font-bold tracking-[0.2em] md:tracking-widest uppercase text-[9px] md:text-sm text-gray-400 group-hover:text-white">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="experience-section py-32 w-full relative z-10 pointer-events-none px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-24 justify-center md:justify-start">
            <div className="h-[2px] w-12 md:w-24 bg-accent hidden sm:block"></div>
            <h2 className="text-[var(--text-3xl)] md:text-[var(--text-4xl)] lg:text-8xl font-black text-white uppercase tracking-tighter">Experience</h2>
          </div>

          <div className="space-y-0 bg-black/40 backdrop-blur-md border border-white/5">
            {[
              {
                role: "Director of Operations & Pre/Post-Production",
                company: "Galaxy Rags",
                year: "Jan 2024 - Present",
                desc: "Spearheading high-level content strategy and overseeing all pre and post-production workflows for international and local brands."
              },
              {
                role: "Lead Content Producer",
                company: "Brandock (Creative Tech & Marketing Agency)",
                year: "June 2023 - Jan 2024",
                desc: "Directed the creative vision for fashion-forward content, bridging the gap between digital marketing and high-end cinematography."
              },
              {
                role: "Creative Content Specialist",
                company: "Astela Healthcare",
                year: "Jan 2023 - June 2023",
                desc: "Developed visual health narratives and educational content, focusing on clarity and professional impact."
              },
              {
                role: "International Freelance Producer",
                company: "Global Clients",
                year: "July 2021 - Jan 2023",
                desc: "Managed end-to-end production for diverse international clients, delivering documentaries and commercial assets."
              },
              {
                role: "Video Lead",
                company: "Al Mehraj Marketing",
                year: "Oct 2021 - May 2023",
                desc: "Oversaw video marketing campaigns and social media content production for real estate and retail sectors."
              }
            ].map((job, i) => (
              <div key={i} className="relative pointer-events-auto group border-b border-white/10 hover:border-accent hover:bg-black/60 transition-all duration-300 p-6 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-4 md:right-12 text-[5rem] md:text-[8rem] font-black text-white/[0.02] -z-10 group-hover:text-accent/[0.05] transition-colors">{i + 1}</div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                  <h3 className="text-lg md:text-4xl font-black text-white group-hover:text-accent transition-colors uppercase leading-tight md:leading-none">{job.role}</h3>
                  <span className="text-[8px] md:text-xs font-bold border border-white/20 rounded-none px-3 md:px-4 py-1 text-gray-500 uppercase tracking-widest self-start md:self-auto">{job.year}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 relative z-10">
                  <h4 className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-widest">{job.company}</h4>
                  <p className="text-gray-500 max-w-lg text-xs md:text-base leading-relaxed group-hover:text-white transition-colors">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Future */}
      <section className="education-section min-h-screen w-full flex items-center justify-center relative z-10 pointer-events-none py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-[var(--text-3xl)] md:text-[var(--text-4xl)] font-black text-white uppercase tracking-tighter mb-8 md:mb-12">Academic<br />Roots</h2>
              <div className="space-y-8 md:space-y-12">
                <div className="pointer-events-auto p-6 md:p-8 border-l border-accent bg-[#0a0a0a]">
                  <p className="text-[8px] md:text-[10px] text-accent font-black uppercase tracking-[0.3em] mb-2">Intermediate (2023 - 2025)</p>
                  <h4 className="text-xl md:text-2xl font-black text-white uppercase mb-2">AL ISMAIL College</h4>
                  <p className="text-gray-500 uppercase text-[10px] md:text-xs tracking-widest">Pre-Engineering / Computer Science</p>
                </div>
                <div className="pointer-events-auto p-6 md:p-8 border-l border-white/10">
                  <p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Secondary Education</p>
                  <h4 className="text-xl md:text-2xl font-black text-white uppercase">Speciss School</h4>
                  <p className="text-gray-500 uppercase text-[10px] md:text-xs tracking-widest">Matriculation</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-accent uppercase mb-6 md:mb-8">Next Stop</h3>
              <p className="text-2xl md:text-5xl font-black text-white uppercase leading-tight mb-6 md:mb-8 tracking-tighter">
                Indus Valley University / <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">IVS Karachi</span>
              </p>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                Currently pursuing higher secondary education with a focused eye on Communication & Design. The journey continues toward institutional mastery of visual media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Tech */}
      <section className="tools-section min-h-screen w-full flex items-center justify-center relative z-10 pointer-events-none py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[var(--text-3xl)] md:text-[var(--text-5xl)] lg:text-8xl font-black text-white uppercase tracking-tighter">The Arsenal</h2>
            <p className="text-accent text-[8px] md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold mt-2 md:mt-4">Tools of the Trade</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Category 1 */}
            <div className="pointer-events-auto p-8 md:p-10 border border-white/5 bg-black/60 backdrop-blur-md hover:border-accent transition-colors">
              <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-6 md:mb-8 border-b border-accent/20 pb-4">Production & Cinema</h4>
              <ul className="space-y-3 md:space-y-4 text-white font-bold uppercase tracking-tight text-xs md:text-sm">
                <li>Professional Cinematography</li>
                <li>Lighting Design</li>
                <li>Set Operations</li>
                <li>Field Documentation</li>
                <li>Art Directory</li>
              </ul>
            </div>
            {/* Category 2 */}
            <div className="pointer-events-auto p-8 md:p-10 border border-white/5 bg-black/60 backdrop-blur-md hover:border-accent transition-colors">
              <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-6 md:mb-8 border-b border-accent/20 pb-4">Post & Design</h4>
              <ul className="space-y-3 md:space-y-4 text-white font-bold uppercase tracking-tight text-xs md:text-sm">
                <li>Adobe Premiere Pro</li>
                <li>After Effects</li>
                <li>Photoshop / Illustrator</li>
              </ul>
            </div>
            {/* Category 3 */}
            <div className="pointer-events-auto p-8 md:p-10 border border-white/5 bg-black/60 backdrop-blur-md hover:border-accent transition-colors">
              <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-6 md:mb-8 border-b border-accent/20 pb-4">Strategy & Ads</h4>
              <ul className="space-y-3 md:space-y-4 text-white font-bold uppercase tracking-tight text-xs md:text-sm">
                <li>Meta Ad Policy</li>
                <li>Content Funneling</li>
                <li>Social Media Strategy</li>
                <li>AI Content Workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section min-h-screen w-full flex items-center justify-center relative z-10 pointer-events-none py-32">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-[5rem] md:text-[10rem] lg:text-[15rem] font-black text-white opacity-[0.03] uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 leading-none">Milestones</h2>
          <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md p-8 md:p-20 border border-white/5 relative z-10">
            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-accent uppercase mb-12 md:mb-16">Key Achievements</h3>
            <div className="space-y-8 md:space-y-12">
              <div className="pointer-events-auto group">
                <p className="text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest mb-2">01 — International Outreach</p>
                <h4 className="text-xl md:text-5xl font-black text-white group-hover:text-accent transition-colors uppercase leading-tight">Collaborated with 15+ Global Brands</h4>
              </div>
              <div className="pointer-events-auto group">
                <p className="text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest mb-2">02 — Scale</p>
                <h4 className="text-xl md:text-5xl font-black text-white group-hover:text-accent transition-colors uppercase leading-tight">Produced 500+ Digital Campaign Assets</h4>
              </div>
              <div className="pointer-events-auto group">
                <p className="text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest mb-2">03 — Impact</p>
                <h4 className="text-xl md:text-5xl font-black text-white group-hover:text-accent transition-colors uppercase leading-tight">Led Content Strategy for $1K+ Ad Spend</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section min-h-[50vh] w-full flex items-center justify-center relative z-10 pointer-events-none py-32 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] text-accent uppercase text-center mb-12 md:mb-16">Global Certifications</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              "Meta Certified Digital Marketer",
              "Advanced Cinema Post-Production",
              "Visual Narrative Leadership",
              "Production Management Flow"
            ].map((cert, i) => (
              <div key={i} className="pointer-events-auto px-6 md:px-8 py-3 md:py-4 border border-white/10 hover:border-accent group transition-all duration-300">
                <p className="text-white font-black uppercase tracking-widest text-[10px] md:text-sm group-hover:text-accent text-center">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Placeholder for scroll space */}
      {/* <div className="h-screen w-full"></div>  No extra scroll space needed after footer */}
    </main>
  );
}
