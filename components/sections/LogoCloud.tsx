"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "../motion/MotionReveal";

type Item = {
    id: string;
    title: string;
    desc: string;
    detail: string;
    icon: React.ReactNode;
    previewImage?: string; // /public/... (Next) OR full URL
    href?: string;
};

const Icon = ({ children, active }: { children: React.ReactNode; active: boolean }) => (
    <div className={active ? "text-violet-600" : "text-zinc-400"}>{children}</div>
);

const Icons = {
    Sliders: (active: boolean) => (
        <Icon active={active}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </Icon>
    ),
    Carousels: (active: boolean) => (
        <Icon active={active}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M7 7h10v10H7V7Z" stroke="currentColor" strokeWidth="2" />
                <path d="M3 9v6M21 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </Icon>
    ),
    Hero: (active: boolean) => (
        <Icon active={active}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 6h14v12H5V6Z" stroke="currentColor" strokeWidth="2" />
                <path d="M8 9h8M8 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </Icon>
    ),
    Websites: (active: boolean) => (
        <Icon active={active}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4V5Z" stroke="currentColor" strokeWidth="2" />
                <path d="M8 19v-4M16 19v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </Icon>
    ),
    Dynamic: (active: boolean) => (
        <Icon active={active}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M7 7h10v10H7V7Z" stroke="currentColor" strokeWidth="2" />
                <path d="M7 3v4M17 3v4M7 17v4M17 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </Icon>
    ),
};

export const FeatureShowcase = () => {
    const reduceMotion = useReducedMotion();
    const [activeId, setActiveId] = useState("websites");

    const items: Item[] = useMemo(
        () => [
            {
                id: "sliders",
                title: "Immersive Sliders",
                desc: "Craft immersive, multi-layered visual journeys.",
                detail: "Our sliders combine kinetic typography with high-fidelity media to capture attention instantly and guide users through your brand's narrative. We focus on performance and seamless transitions to ensure a premium feel across all devices.",
                icon: Icons.Sliders(activeId === "sliders"),
                previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
                href: "#services",
            },
            {
                id: "carousels",
                title: "Content Carousels",
                desc: "Dynamic showcases for your premium content.",
                detail: "Implement frictionless scrolling and touch-optimized navigation to present product galleries or featured portfolios with maximum impact. Designed for ease of use and high engagement.",
                icon: Icons.Carousels(activeId === "carousels"),
                previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
                href: "#work",
            },
            {
                id: "hero",
                title: "Hero Sections",
                desc: "The architectural centerpiece of your digital identity.",
                detail: "We design high-conversion entry points that blend bold typography with atmospheric visuals to define your brand in seconds. Every pixel is optimized for search engines and user experience.",
                icon: Icons.Hero(activeId === "hero"),
                previewImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200",
                href: "#services",
            },
            {
                id: "websites",
                title: "Full Websites",
                desc: "Bespoke digital ecosystems tailored for growth.",
                detail: "From minimalist one-pagers to complex enterprise platforms, we build responsive, performant, and future-proof web experiences that drive results and delight users.",
                icon: Icons.Websites(activeId === "websites"),
                previewImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                href: "#process",
            },
            {
                id: "dynamic",
                title: "Dynamic Content",
                desc: "Intelligent interfaces that breathe with your data.",
                detail: "Seamlessly integrate real-time APIs and content management systems to keep your site fresh, relevant, and automated. We make data beautiful and interactive.",
                icon: Icons.Dynamic(activeId === "dynamic"),
                previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
                href: "#services",
            },
        ],
        [activeId]
    );

    const active = items.find((i) => i.id === activeId) ?? items[0];

    return (
        <section className="w-full px-6 py-20 md:px-20 bg-white">
            <div className="mx-auto max-w-7xl">
                <MotionReveal variant="fadeUp">
                    <div className="mb-10 md:mb-12">
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900">
                            What we build
                        </h2>
                        <p className="mt-3 text-zinc-500 text-base md:text-lg max-w-2xl">
                            Click a card — it “opens” and visually merges into the large preview panel.
                        </p>
                    </div>
                </MotionReveal>

                {/* One shared lavender surface (like your screenshot) */}
                <div className="rounded-3xl bg-violet-100/70 overflow-hidden">
                    {/* Desktop: left column + right panel with NO GAP so it feels connected */}
                    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] lg:gap-0">
                        {/* LEFT */}
                        <div className="p-5 md:p-6">
                            <div className="space-y-4">
                                {items.map((it) => {
                                    const isActive = it.id === activeId;

                                    return (
                                        <motion.button
                                            key={it.id}
                                            type="button"
                                            layout
                                            onClick={() => setActiveId(it.id)}
                                            className={[
                                                "relative w-full text-left rounded-2xl overflow-hidden",
                                                "border border-zinc-100/80",
                                                "transition-colors",
                                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60",
                                                // inactive cards are white (contrast vs lavender surface)
                                                isActive ? "border-transparent" : "bg-white/70 hover:bg-white",
                                            ].join(" ")}
                                            style={{ WebkitTapHighlightColor: "transparent" }}
                                        >
                                            {/* This is the “opening” effect: active card becomes the SAME lavender as the big panel */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeCardBg"
                                                    className="absolute inset-0 bg-violet-100/70"
                                                    transition={{ type: "spring", stiffness: 500, damping: 45 }}
                                                />
                                            )}

                                            <div
                                                className={[
                                                    "relative z-10 flex items-start justify-between gap-5",
                                                    // active card gets a little bigger (like screenshot)
                                                    isActive ? "p-8" : "p-6",
                                                ].join(" ")}
                                            >
                                                <div>
                                                    <div
                                                        className={[
                                                            "text-2xl font-bold tracking-tight",
                                                            isActive ? "text-violet-950" : "text-zinc-900",
                                                        ].join(" ")}
                                                    >
                                                        {it.title}
                                                    </div>
                                                    <p
                                                        className={[
                                                            "mt-2 leading-relaxed",
                                                            isActive ? "text-violet-800/80" : "text-zinc-600",
                                                        ].join(" ")}
                                                    >
                                                        {it.desc}
                                                    </p>
                                                </div>

                                                <div className="shrink-0 mt-1">{it.icon}</div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="p-6 md:p-10 lg:p-12">
                            <div className="flex flex-col items-center">
                                {/* white preview card */}
                                <div className="relative w-full max-w-4xl h-[400px] md:h-[600px] rounded-2xl bg-white shadow-[0_30px_70px_-35px_rgba(0,0,0,0.35)] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={active.id}
                                            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                                            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0 group"
                                        >
                                            {active.previewImage ? (
                                                <>
                                                    <Image
                                                        src={active.previewImage}
                                                        alt={`${active.title} preview`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        sizes="(max-width: 1024px) 100vw, 800px"
                                                        priority
                                                    />

                                                    {/* Descriptive Overlay */}
                                                    <div className="absolute bottom-6 left-6 right-6 p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
                                                        <div className="flex flex-col gap-2">
                                                            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                                                                {active.title}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-zinc-100/90 leading-relaxed max-w-2xl">
                                                                {active.detail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="relative w-full h-full bg-gradient-to-br from-zinc-50 to-zinc-200 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-zinc-900">{active.title}</div>
                                                        <div className="mt-2 text-zinc-600">Add previewImage for this item</div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* CTA */}
                                <div className="mt-10">
                                    <a
                                        href={active.href ?? "#services"}
                                        className="inline-flex items-center justify-center rounded-full bg-rose-500 px-14 py-4 text-white font-semibold shadow-[0_18px_40px_-20px_rgba(244,63,94,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile note */}
                    <div className="px-6 pb-6 text-xs text-zinc-500 lg:hidden">
                        Tip: tap a card to update the preview.
                    </div>
                </div>
            </div>
        </section>
    );
};