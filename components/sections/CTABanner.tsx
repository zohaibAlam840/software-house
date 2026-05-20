"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridDots } from "../ui/GridDots";

export function CTABanner() {
    return (
        <section className="w-full bg-white px-6 md:px-12 lg:px-16 py-12 relative z-10">
            <div className="mx-auto w-full max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full rounded-3xl overflow-hidden bg-zinc-950 px-5 sm:px-8 md:px-16 py-12 md:py-16 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10"
                >
                    {/* Dot grid bg */}
                    <GridDots color="rgb(255,255,255)" size={22} dotSize={1} fade />

                    {/* Violet glow blob */}
                    <div
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-violet-600/20 blur-[80px] pointer-events-none"
                    />

                    {/* Text */}
                    <div className="relative z-10 flex flex-col gap-3 max-w-xl text-center md:text-left items-center md:items-start">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">[ Ready? ]</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                            Your next idea{" "}
                            <span className="font-serif italic font-normal text-violet-400">starts here.</span>
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            From strategy to launch — we turn your vision into a product that leads your industry.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
                        >
                            Start a project →
                        </a>
                        <a
                            href="/work"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                        >
                            See our work
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
