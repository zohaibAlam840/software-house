"use client";

import React from "react";
import { motion } from "framer-motion";

export function CTABanner() {
    return (
        <section className="w-full bg-white px-6 md:px-12 lg:px-16 py-12 md:py-24 relative z-10">
            <div className="mx-auto w-full max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full rounded-3xl overflow-hidden bg-[#fdf2f4] border border-[#fce4e8] px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center shadow-sm"
                >
                    {/* Decorative Background Element */}
                    <div className="absolute left-0 bottom-0 md:-left-12 md:-bottom-12 opacity-[0.03] pointer-events-none select-none">
                        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="0.5">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17" />
                            <path d="M2 12L12 17L22 12" />
                            <path d="M12 22V12" />
                            <path d="M2 7V17" />
                            <path d="M22 7V17" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6">
                        <h2 className="text-3xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-zinc-900">
                            Your Next Idea Starts Here
                        </h2>

                        <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl px-4">
                            Turn your ideas into powerful, market-ready products through a streamlined process from strategy to delivery—built to stand out and lead your industry.
                        </p>

                        <a
                            href="#contact"
                            className="mt-4 px-8 py-3.5 bg-[#d32630] text-white font-medium rounded-lg hover:bg-[#b01f28] transition-colors focus:ring-4 focus:ring-red-200 shadow-md shadow-red-500/20"
                        >
                            Contact Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
