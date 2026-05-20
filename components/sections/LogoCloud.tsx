"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Service = {
    id: string;
    index: string;
    title: string;
    tagline: string;
    description: string;
    tags: string[];
    stat: { value: string; label: string };
    image: string;
    href: string;
};

const services: Service[] = [
    {
        id: "web",
        index: "01",
        title: "Web Development",
        tagline: "Fast, scalable, future-proof.",
        description:
            "We build full-stack web applications — from marketing sites to complex SaaS platforms — using modern tech that performs under pressure and scales with your business.",
        tags: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"],
        stat: { value: "30+", label: "Web apps shipped" },
        image: "/pro/l1.png",
        href: "/services",
    },
    {
        id: "mobile",
        index: "02",
        title: "Mobile Apps",
        tagline: "iOS & Android, one codebase.",
        description:
            "Cross-platform mobile products built with React Native — smooth, native-feeling experiences that launch on both app stores without doubling your development cost.",
        tags: ["React Native", "Expo", "iOS", "Android", "Push Notifications"],
        stat: { value: "10+", label: "Apps in production" },
        image: "/pro/d1.jpeg",
        href: "/services",
    },
    {
        id: "brand",
        index: "03",
        title: "Brand & Design",
        tagline: "Identities that command attention.",
        description:
            "End-to-end brand strategy and visual identity — logo systems, typography, colour palettes, and brand guidelines that make you impossible to forget.",
        tags: ["Logo Design", "Brand Strategy", "Figma", "Typography", "UI/UX"],
        stat: { value: "20+", label: "Brands designed" },
        image: "/pro/r1.png",
        href: "/services",
    },
    {
        id: "ecom",
        index: "04",
        title: "E-Commerce",
        tagline: "Stores built to convert.",
        description:
            "Custom storefronts and Shopify builds with seamless checkout flows, inventory management, multi-currency support, and performance-first architecture.",
        tags: ["Shopify", "Custom Storefront", "Stripe", "Inventory", "SEO"],
        stat: { value: "15+", label: "Stores launched" },
        image: "/pro/s1.png",
        href: "/services",
    },
    {
        id: "ai",
        index: "05",
        title: "AI & Cloud",
        tagline: "Automation that works for you.",
        description:
            "We integrate AI-powered features — chatbots, recommendation engines, smart workflows — and deploy on AWS, GCP, or Vercel with CI/CD pipelines built in.",
        tags: ["AWS", "OpenAI", "Docker", "CI/CD", "Automation"],
        stat: { value: "20+", label: "AI integrations" },
        image: "/pro/g2.webp",
        href: "/services",
    },
];

export const FeatureShowcase = () => {
    const [activeId, setActiveId] = useState("web");
    const active = services.find(s => s.id === activeId) ?? services[0];

    return (
        <section className="w-full bg-zinc-950 py-20 md:py-28 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-4">[ Services ]</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-none">
                            Things we&apos;re{" "}
                            <span className="font-serif italic font-normal text-zinc-400">exceptional</span>
                            <br className="hidden md:block" />
                            {" "}at.
                        </h2>
                    </div>
                    <a
                        href="/services"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-zinc-500 border-b border-zinc-700 pb-0.5 hover:text-white hover:border-white transition-colors self-end"
                    >
                        All services →
                    </a>
                </div>

                {/* Tab bar */}
                <div className="flex gap-2 overflow-x-auto pb-1 mb-10 scrollbar-none">
                    {services.map(s => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => setActiveId(s.id)}
                            className={[
                                "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                                activeId === s.id
                                    ? "bg-white text-zinc-900"
                                    : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800",
                            ].join(" ")}
                        >
                            <span className="font-mono text-[10px] opacity-50 mr-1.5">{s.index}</span>
                            {s.title}
                        </button>
                    ))}
                </div>

                {/* Content area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8"
                    >
                        {/* Left — service details */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col gap-6 justify-between">
                            <div className="flex flex-col gap-5">
                                {/* Index + title */}
                                <div>
                                    <span className="font-mono text-[11px] text-zinc-600">{active.index} /</span>
                                    <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mt-2 leading-none">
                                        {active.title}
                                    </h3>
                                    <p className="text-violet-400 text-sm font-medium mt-2">{active.tagline}</p>
                                </div>

                                {/* Description */}
                                <p className="text-zinc-400 text-base leading-relaxed">
                                    {active.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {active.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-zinc-800 border border-zinc-700/60 text-zinc-300 text-[11px] font-medium px-3 py-1.5 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom: stat + CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div>
                                    <span className="text-3xl font-semibold text-white">{active.stat.value}</span>
                                    <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">{active.stat.label}</p>
                                </div>
                                <a
                                    href={active.href}
                                    className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
                                >
                                    Learn more →
                                </a>
                            </div>
                        </div>

                        {/* Right — project image */}
                        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 min-h-[360px] lg:min-h-0">
                            <Image
                                src={active.image}
                                alt={active.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                priority
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                            {/* Service name watermark */}
                            <div className="absolute bottom-6 left-6">
                                <span className="bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
                                    {active.title}
                                </span>
                            </div>

                            {/* Dot navigation */}
                            <div className="absolute bottom-6 right-6 flex gap-2">
                                {services.map(s => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => setActiveId(s.id)}
                                        aria-label={s.title}
                                        className={[
                                            "rounded-full transition-all duration-200",
                                            s.id === activeId
                                                ? "bg-white w-5 h-2"
                                                : "bg-white/30 w-2 h-2 hover:bg-white/60",
                                        ].join(" ")}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <style>{`.scrollbar-none::-webkit-scrollbar{display:none}`}</style>
        </section>
    );
};
