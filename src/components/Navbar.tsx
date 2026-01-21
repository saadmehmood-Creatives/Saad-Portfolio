"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { name: "Craftfolio", href: "/projects" },
    { name: "My Story", href: "/my-story" },
    { name: "Testimonials", href: "/testimonials" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleConnectClick = () => {
        const WHATSAPP_NUMBER = "+923104997870";
        const WHATSAPP_MESSAGE = encodeURIComponent("Hi Saad! I just visited your portfolio and would love to connect with you regarding potential collaboration.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, "_blank");

        // Simulate auto-reply
        setTimeout(() => {
            setShowReply(true);
            setTimeout(() => setShowReply(false), 5000);
        }, 1000);

        if (isMenuOpen) setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="fixed top-2 md:top-8 left-0 w-full z-[10000] px-4 md:px-12 pointer-events-none">
                <div className="w-full flex items-center justify-between max-w-[1800px] mx-auto relative h-14 md:h-16">

                    {/* LEFT: Clickable Logo */}
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="pointer-events-auto group flex flex-col items-start translate-y-1">
                        <span className="text-base md:text-xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                            Beginning
                        </span>
                        <div className="h-[2px] w-0 group-hover:w-full bg-accent transition-all duration-300 mt-1 shadow-[0_0_10px_#FFD700]"></div>
                    </Link>

                    {/* CENTER: Pill Navigation (Desktop Only) */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`
                                flex items-center gap-1 p-1 rounded-full 
                                border border-white/10 transition-all duration-700
                                ${isScrolled ? "bg-black/80 backdrop-blur-2xl px-4 py-2" : "bg-black/30 backdrop-blur-xl px-6 py-3"}
                            `}
                        >
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            relative px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
                                            ${isActive ? "text-accent" : "text-gray-400 hover:text-white"}
                                        `}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill-active"
                                                className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* RIGHT: Connect Button (Desktop Only) & Hamburger (Mobile Only) */}
                    <div className="pointer-events-auto flex items-center gap-4">
                        <div className="hidden sm:block">
                            <button
                                onClick={handleConnectClick}
                                className="group relative flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:border-accent transition-all duration-500 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-accent/10 opacity-0 group-hover:animate-pulse"></span>
                                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_#FFD700]"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white relative z-10">Connect</span>
                            </button>
                        </div>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full z-[10001] active:scale-95 transition-transform"
                        >
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-5 h-[2px] bg-white rounded-full"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="w-5 h-[2px] bg-white rounded-full"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="w-5 h-[2px] bg-white rounded-full"
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center p-6"
                    >
                        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-full text-center"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors ${pathname === item.href ? "text-accent" : "text-white"}`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-full mt-4"
                            >
                                <button
                                    onClick={handleConnectClick}
                                    className="w-full py-6 bg-accent text-black font-black uppercase tracking-[0.4em] text-sm"
                                >
                                    Connect
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Simulated Auto-reply Notification */}
            <AnimatePresence>
                {showReply && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-12 left-1/2 z-[10001] bg-black/90 backdrop-blur-2xl border border-accent/20 px-6 md:px-8 py-4 flex items-center gap-4 shadow-2xl w-[90%] md:w-auto"
                    >
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0"></div>
                        <p className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-widest">
                            Hey! Thanks for reaching out. I’ll get back to you shortly.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
