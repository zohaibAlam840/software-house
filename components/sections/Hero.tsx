"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionReveal } from "../motion/MotionReveal";

import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const reelImages = [
        "/pro/l1.png",
        "/pro/r1.png",
        "/pro/s1.png"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % reelImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [reelImages.length]);

    return (
        <section className="relative w-full bg-white h-[100svh]">
            <div className="mx-auto h-full w-full max-w-[1280px] px-6 py-6 md:py-12 md:px-12 lg:px-16 overflow-y-auto md:overflow-hidden">
                {/* 12-col layout */}
                <div className="grid h-full grid-cols-12 items-center gap-x-10 gap-y-8 md:gap-y-14 mt-10 md:mt-0">
                    {/* LEFT: big headline */}
                    <div className="col-span-12 md:col-span-6">
                        <MotionReveal variant="fadeUp" delay={0.15}>
                            <h1 className="text-black leading-[0.95] md:leading-[0.92] tracking-tight">
                                <span className="block text-[clamp(2.5rem,8vw,5.2rem)] font-medium">
                                    We seek <span className="font-normal">→</span>
                                </span>

                                <span className="mt-2 md:mt-3 block text-[clamp(2.8rem,9vw,5.8rem)] font-medium text-violet-600">
                                    <TypeAnimation
                                        sequence={[
                                            'unique', 2500,
                                            'bold', 2500,
                                            'creative', 2500,
                                            'visionary', 2500,
                                        ]}
                                        wrapper="span"
                                        speed={40}
                                        deletionSpeed={50}
                                        repeat={Infinity}
                                        className="inline-block"
                                    />
                                </span>

                                <span className="mt-2 md:mt-3 block font-serif italic font-normal text-[clamp(2.5rem,8vw,5.2rem)]">
                                    perspectives
                                </span>
                            </h1>
                        </MotionReveal>

                        {/* Bottom row under headline: CTA + helper text + avatars */}
                        <MotionReveal variant="fadeUp" delay={0.35}>
                            <div className="mt-16 flex flex-col gap-3">
                                <a
                                    href="/contact"
                                    className="group inline-flex w-fit items-center gap-2 border-b border-black pb-1 text-base font-medium text-black"
                                >
                                    Let&apos;s talk
                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>

                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-zinc-400">
                                        You&apos;ll be talking with our creative talents.
                                    </p>

                                    <div className="flex -space-x-2">
                                        {/* Real avatar assets */}
                                        {["/hero-avatar-1.png", "/hero-avatar-2.png", "/hero-avatar-3.png", "/hero-avatar-4.png"].map((src, i) => (
                                            <div key={i} className="relative h-7 w-7 ring-2 ring-white rounded-full overflow-hidden">
                                                <Image
                                                    src={src}
                                                    alt={`Creative Talent ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MotionReveal>
                    </div>

                    {/* MIDDLE TOP: bracket label */}
                    <div className="col-span-12 md:col-span-3 md:self-start md:pt-12">
                        <MotionReveal variant="fadeUp" delay={0.25}>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                                [across branding, communications and digital.]
                            </p>
                        </MotionReveal>

                        {/* MIDDLE BOTTOM: paragraph */}
                        <MotionReveal variant="fadeUp" delay={0.45}>
                            <p className="mt-8 md:mt-16 max-w-[260px] text-sm leading-relaxed text-zinc-600">
                                We collaborate as a collective of individuals bringing their
                                whole self to a project and, together, create work that none of
                                us would be able to do on our own.
                            </p>
                        </MotionReveal>
                    </div>

                    {/* RIGHT: collage card */}
                    <div className="col-span-12 md:col-span-3 md:justify-self-end mt-4 mb-10 md:mb-0 md:mt-0">
                        <MotionReveal
                            variant="fadeIn"
                            delay={0.55}
                            className="relative aspect-[4/5] w-full max-w-[220px] md:max-w-[360px] mx-auto md:mx-0 overflow-hidden rounded-2xl bg-zinc-100 shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={reelImages[currentImage]}
                                        alt="Reel Collage"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 360px"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <button
                                type="button"
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-6 py-3 text-xs font-medium text-black shadow-sm z-10"
                            >
                                Play Reel
                            </button>
                        </MotionReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};