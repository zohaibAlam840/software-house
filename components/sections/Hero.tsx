"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotMatrix } from "../ui/DotMatrix";

const stats = [
    { n: "50+", label: "Projects Delivered" },
    { n: "9+", label: "Years Experience" },
    { n: "100%", label: "On-Time Delivery" },
];

const reelImages = ["/reel-collage.png", "/reel-collage-2.png", "/pro/d1.jpeg"];

export const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setCurrent((p) => (p + 1) % reelImages.length), 3200);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative w-full bg-white h-[100svh] overflow-hidden flex flex-col">
            {/* Interactive dot matrix */}
            <DotMatrix dotColor="124, 58, 237" spacing={26} baseOpacity={0.11} maxRadius={3} />

            {/* Soft white vignette so dots don't crowd the text */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 75% 65% at 40% 55%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.95) 100%)",
                }}
            />

            <div className="relative z-10 flex items-center h-full w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

                    {/* ── LEFT ────────────────────────────────────────── */}
                    <div className="flex flex-col">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-medium text-violet-700 mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                            Currently taking new projects
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.1 }}
                            className="text-[clamp(2.8rem,5.5vw,5.2rem)] font-medium leading-[0.93] tracking-tight text-zinc-900"
                        >
                            We build{" "}
                            <span className="font-serif font-normal italic">digital</span>
                            <br />
                            <span className="text-violet-600">experiences</span>
                            <br />
                            that{" "}
                            <span className="font-serif font-normal italic">scale.</span>
                        </motion.h1>

                        {/* Sub-copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.22 }}
                            className="mt-7 max-w-[420px] text-base text-zinc-500 leading-relaxed"
                        >
                            A collective of designers, engineers, and strategists building
                            software that leads your industry — from branding to full-stack
                            digital products.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.34 }}
                            className="mt-10 flex flex-wrap items-center gap-4"
                        >
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white hover:bg-violet-600 transition-colors duration-200"
                            >
                                Start a project <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="/work"
                                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 border-b border-zinc-300 pb-0.5 hover:text-violet-600 hover:border-violet-400 transition-colors duration-200"
                            >
                                View our work
                            </a>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.55 }}
                            className="mt-14 flex items-center gap-10 flex-wrap"
                        >
                            {stats.map(({ n, label }) => (
                                <div key={label}>
                                    <div className="text-2xl font-semibold text-zinc-900">{n}</div>
                                    <div className="mt-0.5 text-[11px] uppercase tracking-wider text-zinc-400">{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT — floating card composition ───────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="relative hidden lg:flex items-center justify-center"
                        style={{ height: 480 }}
                    >
                        {/* Main rotating image card */}
                        <div className="relative w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] bg-zinc-100 flex-shrink-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, scale: 1.06 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.9, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={reelImages[current]}
                                        alt="Project showcase"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="300px"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20 text-white text-xs font-medium tracking-wide">
                                GiantsOfTech Studio
                            </div>
                        </div>

                        {/* Floating card — top right: launches */}
                        <motion.div
                            initial={{ opacity: 0, y: -14, x: 10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.65 }}
                            className="absolute top-4 right-0 translate-x-8 bg-white rounded-2xl shadow-xl border border-zinc-100 px-4 py-3.5 flex items-center gap-3"
                        >
                            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-base flex-shrink-0">
                                🚀
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-zinc-900 leading-tight">50+ Launches</div>
                                <div className="text-[11px] text-zinc-400 mt-0.5">Products shipped</div>
                            </div>
                        </motion.div>

                        {/* Floating card — bottom left: clients */}
                        <motion.div
                            initial={{ opacity: 0, y: 14, x: -10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="absolute bottom-4 -left-8 bg-white rounded-2xl shadow-xl border border-zinc-100 px-4 py-3.5"
                        >
                            <div className="flex -space-x-2 mb-2">
                                {[1, 2, 3, 4].map((n) => (
                                    <div
                                        key={n}
                                        className="relative w-7 h-7 rounded-full ring-2 ring-white overflow-hidden bg-zinc-200 flex-shrink-0"
                                    >
                                        <Image
                                            src={`/hero-avatar-${n}.png`}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="28px"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-[11px] text-zinc-500">
                                Trusted by{" "}
                                <span className="font-semibold text-zinc-800">50+ clients</span>
                            </div>
                        </motion.div>

                        {/* "Available" pill */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.95 }}
                            className="absolute bottom-16 right-0 translate-x-4 flex items-center gap-1.5 bg-white border border-zinc-100 rounded-full px-3.5 py-2 text-[11px] font-medium text-zinc-700 shadow-md"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Available now
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
