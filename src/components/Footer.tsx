"use client";

import React from "react";

export default function Footer() {
    return (
        <footer className="footer-section py-20 md:py-32 w-full relative z-10 bg-black text-white border-t border-accent/20">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <p className="text-accent uppercase tracking-[0.3em] text-[8px] md:text-xs mb-6 md:mb-8 font-bold">Initiate Collaboration</p>
                <a href="mailto:saadmehmood4375@gmail.com" className="text-xl sm:text-4xl md:text-8xl font-black uppercase hover:text-gray-500 transition-colors duration-500 pointer-events-auto block mb-12 md:mb-16 tracking-tighter break-all md:break-normal leading-none">
                    saadmehmood4375@gmail.com
                </a>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-white uppercase tracking-widest text-[9px] md:text-xs pointer-events-auto font-bold mb-16 md:mb-24">
                    <a href="https://www.linkedin.com/in/saad-mehmood-9b1952254" className="hover:text-accent transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/mr_saad_mehmood_" className="hover:text-accent transition-colors">Instagram</a>
                    <p className="text-gray-600 tracking-normal">+92 342 2786675</p>
                </div>
                <p className="text-gray-800 text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-medium leading-loose">
                    © 2026 Saad Mehmood — Creative Content Producer. <br className="md:hidden" /> Made in Pakistan.
                </p>
            </div>
        </footer>
    );
}
