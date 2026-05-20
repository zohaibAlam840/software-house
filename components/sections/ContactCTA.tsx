"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Particle = { id: string; x: number; y: number; dx: number; dy: number; s: number; d: number; delay: number };

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

function makeBurst(count = 30): Particle[] {
    const now = Date.now();
    return Array.from({ length: count }).map((_, i) => {
        const angle = rand(0, Math.PI * 2);
        const radius = rand(60, 180);
        return { id: `${now}-${i}`, x: rand(40, 260), y: rand(8, 40), dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius * 0.65, s: rand(3, 7), d: rand(0.5, 1.0), delay: rand(0, 0.06) };
    });
}

export const ContactCTA = () => {
    const [hovered, setHovered] = useState(false);
    const [burstKey, setBurstKey] = useState(0);
    const noMotion = useReducedMotion();
    const particles = useMemo(() => { void burstKey; return (!hovered || noMotion) ? [] : makeBurst(30); }, [hovered, burstKey, noMotion]);

    return (
        <section className="w-full bg-zinc-950 px-6 md:px-12 lg:px-16 py-32 md:py-44 relative overflow-hidden">
            {/* Background gradient */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center gap-14 max-w-5xl mx-auto">
                {/* Main headline */}
                <div className="flex flex-col items-center gap-4">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-zinc-600"
                    >
                        [ Let&apos;s work together ]
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(3rem,7vw,7rem)] font-medium tracking-tight text-white leading-[0.92]"
                    >
                        Let&apos;s make something
                        <br />
                        <span className="font-serif italic font-normal text-violet-400">great together.</span>
                    </motion.h2>
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <a
                        href="mailto:contact@giantsoftech.com"
                        className="group inline-flex items-center gap-3 rounded-full border border-zinc-700 px-8 py-4 text-base font-medium text-white hover:border-violet-500 hover:text-violet-400 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        contact@giantsoftech.com
                    </a>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-base font-medium text-white hover:bg-violet-500 transition-colors"
                    >
                        Start a project →
                    </a>
                </motion.div>

                {/* Social proof strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center gap-8 flex-wrap justify-center"
                >
                    {[
                        { n: "50+", label: "Projects" },
                        { n: "9+", label: "Years" },
                        { n: "100%", label: "On-time" },
                        { n: "3", label: "Continents" },
                    ].map(({ n, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-semibold text-white">{n}</span>
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Watermark + particle burst on hover */}
            <div
                className="relative z-10 mt-32 border-t border-zinc-900 pt-10 overflow-hidden"
                onMouseEnter={() => { setHovered(true); setBurstKey(k => k + 1); }}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Sliding border highlight */}
                <motion.div
                    className="absolute left-0 top-0 h-px w-full"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.7) 50%, transparent 100%)" }}
                    initial={{ opacity: 0, x: "-30%" }}
                    animate={hovered && !noMotion ? { opacity: 1, x: "30%" } : { opacity: 0, x: "-30%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                />

                {/* Particles */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <AnimatePresence>
                        {particles.map(p => (
                            <motion.span
                                key={p.id}
                                className="absolute rounded-full"
                                style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(139,92,246,0.8) 60%, transparent 75%)" }}
                                initial={{ opacity: 0, scale: 0.7, x: 0, y: 0 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.7, 1, 0.9], x: [0, p.dx], y: [0, p.dy] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: p.d, delay: p.delay, ease: "easeOut" }}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <div className="relative z-10 text-[12vw] font-black uppercase tracking-tighter opacity-[0.04] pointer-events-none select-none text-white">
                    GiantsOfTech
                </div>
            </div>
        </section>
    );
};
