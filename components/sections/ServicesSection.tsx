"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionReveal } from "../motion/MotionReveal";

const services = [
    {
        index: "01.",
        title: "Branding",
        description: "Brand Strategy / Visual Identity / Copywriting / Creative Direction",
    },
    {
        index: "02.",
        title: "Communications",
        description: "Advertising / Print / Social Media / Photography & Film / Art Direction / Retail / Assets Production",
    },
    {
        index: "03.",
        title: "Digital",
        description: "Web Design / Augmented Reality / Digital Experiences / Installations",
    },
];

export const ServicesSection = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const reelImages = [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1551651639-927b595f815c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=800"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % reelImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [reelImages.length]);

    return (
        <section id="services" className="w-full px-6 py-24 md:px-12 lg:px-16 bg-white overflow-hidden">
            <div className="mx-auto max-w-[1400px]">
                <MotionReveal variant="fadeUp" className="mb-20">
                    <h2 className="mb-8 text-[10px] uppercase tracking-[0.24em] text-zinc-400">[ SERVICES ]</h2>
                    <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-tight text-zinc-900">
                        We build <span className="font-normal">→ </span>
                        <span className="font-serif italic font-normal text-zinc-800">expressive brands</span>
                    </p>
                </MotionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* LEFT: Services List */}
                    <div className="flex flex-col gap-14">
                        {services.map((service) => (
                            <MotionReveal key={service.index} variant="fadeUp" delay={0.1 * services.indexOf(service)}>
                                <div className="group flex flex-col gap-4">
                                    <h3 className="text-2xl font-semibold text-zinc-900">
                                        {service.index} — {service.title}
                                    </h3>
                                    <p className="max-w-md text-base leading-relaxed text-zinc-400 group-hover:text-zinc-600 transition-colors">
                                        {service.description}
                                    </p>
                                </div>
                            </MotionReveal>
                        ))}
                    </div>

                    {/* RIGHT: Image Reel */}
                    <MotionReveal variant="fadeIn" delay={0.4} className="relative w-full">
                        <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImage}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={reelImages[currentImage]}
                                        alt="Services Reel"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Circular Play Reel Button */}
                            <button
                                type="button"
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform group"
                            >
                                <span className="text-xs font-bold uppercase tracking-widest text-black -rotate-12 group-hover:rotate-0 transition-transform">
                                    Play Reel
                                </span>
                            </button>
                        </div>
                    </MotionReveal>
                </div>
            </div>
        </section>
    );
};
