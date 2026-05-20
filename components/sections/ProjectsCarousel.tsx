"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "./ProjectsGrid";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 640px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return isMobile;
}

export function ProjectsCarousel() {
    const [active, setActive] = useState(2);
    const isMobile = useIsMobile();

    return (
        <section id="work" className="w-full bg-[#0e0e0e] py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">

            {/* Header row */}
            <div className="max-w-[1400px] mx-auto flex items-end justify-between mb-12">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600 mb-3">[ Selected work ]</p>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        Some of our{" "}
                        <span className="font-serif italic font-normal text-zinc-400">projects.</span>
                    </h2>
                </div>
                <a
                    href="/work"
                    className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-zinc-400 border-b border-zinc-700 pb-0.5 hover:text-white hover:border-white transition-colors"
                >
                    View all work →
                </a>
            </div>

            {/* Columns */}
            <div className="max-w-[1400px] mx-auto">
                <div
                    className="flex gap-2 overflow-x-auto"
                    style={{ scrollbarWidth: "none" }}
                >
                    {projects.map((project, index) => {
                        const isActive = active === index;

                        return (
                            <motion.div
                                key={project.title}
                                onMouseEnter={() => setActive(index)}
                                onTouchStart={() => setActive(index)}
                                animate={{ flex: isActive ? "3 0 0%" : "1 0 0%" }}
                                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                                className="relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0"
                                style={{ minHeight: "clamp(320px, 55vw, 520px)", minWidth: 72 }}
                            >
                                {/* Dark base */}
                                <div className="absolute inset-0 bg-zinc-900" />

                                {/* Image — always present, opacity changes */}
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{ opacity: isActive ? 1 : 0.18 }}
                                    transition={{ duration: 0.45 }}
                                >
                                    <Image
                                        src={project.images[0]}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 30vw"
                                    />
                                </motion.div>

                                {/* Gradient overlay — stronger on active */}
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        background: isActive
                                            ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)"
                                            : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                                    }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Active top accent line */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[3px] bg-violet-500 origin-left"
                                    animate={{ scaleX: isActive ? 1 : 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />

                                {/* Number — top area */}
                                <div className="absolute top-6 left-6">
                                    <motion.span
                                        animate={{
                                            fontSize: isActive
                                                ? (isMobile ? "2.8rem" : "5rem")
                                                : (isMobile ? "2rem" : "3.5rem"),
                                            color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
                                        }}
                                        transition={{ duration: 0.35 }}
                                        className="font-light leading-none block"
                                        style={{ fontVariantNumeric: "tabular-nums" }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </motion.span>
                                </div>

                                {/* Bottom content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">

                                    {/* Tags — only on active */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.25, delay: 0.1 }}
                                                className="flex flex-wrap gap-1.5"
                                            >
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white/80 uppercase tracking-wider"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Title row */}
                                    <div className="flex items-end justify-between gap-3">
                                        <div className="min-w-0">
                                            <motion.h3
                                                animate={{ fontSize: isActive ? "1.2rem" : "0.9rem" }}
                                                transition={{ duration: 0.3 }}
                                                className="font-semibold text-white leading-tight truncate"
                                            >
                                                {project.title}
                                            </motion.h3>

                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="text-xs text-zinc-400 mt-1 leading-snug overflow-hidden"
                                                    >
                                                        {project.category}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Arrow link */}
                                        <motion.a
                                            href={project.link !== "#" ? project.link : "/work"}
                                            target={project.link !== "#" ? "_blank" : undefined}
                                            rel="noopener noreferrer"
                                            animate={{
                                                scale: isActive ? 1 : 0.8,
                                                opacity: isActive ? 1 : 0.4,
                                            }}
                                            transition={{ duration: 0.25 }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-shrink-0 w-9 h-9 rounded-full bg-white flex items-center justify-center text-black text-sm font-bold hover:bg-violet-400 hover:text-white transition-colors"
                                        >
                                            ↗
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile scroll hint */}
                <p className="mt-4 text-center text-[11px] text-zinc-600 md:hidden">
                    Swipe to explore →
                </p>
            </div>

            <style>{`div::-webkit-scrollbar{display:none}`}</style>
        </section>
    );
}
