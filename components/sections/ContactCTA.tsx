"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "../motion/MotionReveal";

/** ---- Particle helpers ---- */
type Particle = {
    id: string;
    x: number; // start x (px) relative to footer container
    y: number; // start y (px)
    dx: number;
    dy: number;
    s: number; // size
    d: number; // duration
    delay: number;
};

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function makeBurst(count = 26): Particle[] {
    const now = Date.now();
    return Array.from({ length: count }).map((_, i) => {
        const angle = rand(0, Math.PI * 2);
        const radius = rand(70, 190);
        return {
            id: `${now}-${i}-${Math.random().toString(16).slice(2)}`,
            // spawn around the top border area (looks good behind the watermark text)
            x: rand(40, 260),
            y: rand(8, 42),
            dx: Math.cos(angle) * radius,
            dy: Math.sin(angle) * radius * 0.7,
            s: rand(3, 7),
            d: rand(0.55, 1.05),
            delay: rand(0, 0.06),
        };
    });
}

export const ContactCTA = () => {
    const [footerHover, setFooterHover] = useState(false);
    const [burstKey, setBurstKey] = useState(0);
    const reduceMotion = useReducedMotion();

    const particles = useMemo(() => {
        if (!footerHover || reduceMotion) return [];
        // burstKey is a trigger for regeneration
        void burstKey;
        return makeBurst(30);
    }, [footerHover, burstKey, reduceMotion]);

    return (
        <section className="w-full px-6 py-40 md:px-20 bg-black text-white overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-[120px] opacity-30" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-12">
                <MotionReveal variant="fadeUp" className="max-w-4xl">
                    <h2 className="text-5xl font-medium leading-tight md:text-8xl">
                        Let&apos;s make something <br />
                        <span className="italic block mt-4">great → together</span>
                    </h2>
                </MotionReveal>

                <div className="flex flex-col items-center gap-12 mt-12 md:flex-row">
                    <MotionReveal variant="fadeIn" delay={0.4}>
                        <a
                            href="mailto:contact@giantsoftech.com"
                            className="text-2xl md:text-4xl font-semibold border-b border-zinc-700 hover:border-white transition-all pb-2"
                        >
                            contact@giantsoftech.com
                        </a>
                    </MotionReveal>

                    <MotionReveal variant="fadeUp" delay={0.6}>
                        <a
                            href="/#contact"
                            className="flex h-16 items-center justify-center rounded-full bg-white px-10 text-xl font-bold text-black transition-all hover:scale-105 active:scale-95"
                        >
                            Start a Project
                        </a>
                    </MotionReveal>
                </div>
            </div>

            {/* Footer / Watermark area + particle burst on hover */}
            <div
                className="mt-40 border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center relative z-10 overflow-hidden"
                onMouseEnter={() => {
                    setFooterHover(true);
                    setBurstKey((k) => k + 1); // regenerate burst each hover entry
                }}
                onMouseLeave={() => setFooterHover(false)}
            >
                {/* subtle animated highlight on the border when hovered */}
                <motion.div
                    className="absolute left-0 top-0 h-px w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(239,68,68,0) 0%, rgba(239,68,68,0.75) 50%, rgba(239,68,68,0) 100%)",
                    }}
                    initial={{ opacity: 0, x: "-25%" }}
                    animate={footerHover && !reduceMotion ? { opacity: 1, x: "25%" } : { opacity: 0, x: "-25%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                />

                {/* PARTICLES LAYER (behind text, above background) */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <AnimatePresence>
                        {footerHover &&
                            !reduceMotion &&
                            particles.map((p) => (
                                <motion.span
                                    key={p.id}
                                    className="absolute rounded-full"
                                    style={{
                                        left: p.x,
                                        top: p.y,
                                        width: p.s,
                                        height: p.s,
                                        background:
                                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(239,68,68,0.9) 55%, rgba(239,68,68,0.0) 72%)",
                                        boxShadow: "0 0 14px rgba(239,68,68,0.35)",
                                    }}
                                    initial={{ opacity: 0, scale: 0.7, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0.7, 1, 0.95],
                                        x: [0, p.dx],
                                        y: [0, p.dy],
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: p.d,
                                        delay: p.delay,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                    </AnimatePresence>
                </div>

                {/* Watermark text */}
                <div className="relative z-10 text-[12vw] font-black uppercase tracking-tighter opacity-10 pointer-events-none select-none">
                    GiantsOfTech
                </div>
            </div>
        </section>
    );
};