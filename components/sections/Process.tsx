"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "../Process.module.css";

type Step = {
    id: number;
    title: string;
    details: string[];
    badgeClass: string;
    tintClass: string;
};

const steps: Step[] = [
    { id: 1, title: "Project Planning\n& Strategy", details: ["Goal definition", "Resource allocation", "Timeline mapping"], badgeClass: "bg-blue-500", tintClass: "bg-blue-100/60" },
    { id: 2, title: "Analysis\n& Documentation", details: ["Requirement gathering", "Technical specification", "User stories"], badgeClass: "bg-indigo-500", tintClass: "bg-indigo-100/60" },
    { id: 3, title: "Design &\nPrototyping", details: ["UX wireframes", "UI high-fidelity design", "Interactive prototypes"], badgeClass: "bg-purple-500", tintClass: "bg-purple-100/60" },
    { id: 4, title: "Implementation\n& Coding", details: ["Frontend development", "Backend architecture", "API integration"], badgeClass: "bg-emerald-500", tintClass: "bg-emerald-100/60" },
    { id: 5, title: "Quality\nAssurance &\nTesting", details: ["Manual & automated testing", "Security audits", "Bug tracking"], badgeClass: "bg-orange-500", tintClass: "bg-orange-100/60" },
    { id: 6, title: "Deployment\n& Training", details: ["Server configuration", "Client handoff", "Staff training"], badgeClass: "bg-red-500", tintClass: "bg-red-100/60" },
    { id: 7, title: "Web Content\n& SEO", details: ["Optimized, engaging content", "On-page SEO for visibility and discovery"], badgeClass: "bg-cyan-500", tintClass: "bg-cyan-100/70" },
    { id: 8, title: "Maintenance\n& Support", details: ["Continuous updates, improvements", "Monitoring, troubleshooting, scaling"], badgeClass: "bg-amber-500", tintClass: "bg-amber-100/70" },
];

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/** Simple media query hook */
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useLayoutEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia(query);

        const onChange = () => setMatches(mql.matches);
        onChange();

        if (mql.addEventListener) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, [query]);

    return matches;
}

/** connector endpoint on ellipse edge */
function ellipseEdgePoint(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    tx: number,
    ty: number,
    shrinkPx = 6
) {
    const dx = tx - cx;
    const dy = ty - cy;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    const denom = Math.sqrt((ux * ux) / (rx * rx) + (uy * uy) / (ry * ry)) || 1;
    const t = 1 / denom;

    const dist = Math.max(0, t - shrinkPx);
    return { x: cx + ux * dist, y: cy + uy * dist };
}

export function Process() {
    const [active, setActive] = useState<number | null>(null);
    const reduceMotion = useReducedMotion();
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const blobRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const setBlobRef = (id: number) => (el: HTMLDivElement | null) => {
        blobRefs.current[id] = el;
    };

    const connections = useMemo(
        () =>
            [
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 5],
                [5, 6],
                [6, 7],
                [7, 8],
            ] as Array<[number, number]>,
        []
    );

    const [svgSize, setSvgSize] = useState({ w: 1200, h: 420 });
    const [paths, setPaths] = useState<string[]>([]);

    useLayoutEffect(() => {
        if (!isDesktop) return;

        const update = () => {
            const container = containerRef.current;
            if (!container) return;

            const cRect = container.getBoundingClientRect();
            const w = Math.max(1, cRect.width);
            const h = Math.max(1, cRect.height);
            setSvgSize({ w, h });

            const newPaths: string[] = [];

            for (const [from, to] of connections) {
                const a = blobRefs.current[from]?.getBoundingClientRect();
                const b = blobRefs.current[to]?.getBoundingClientRect();
                if (!a || !b) continue;

                const ax = a.left - cRect.left + a.width / 2;
                const ay = a.top - cRect.top + a.height / 2;
                const bx = b.left - cRect.left + b.width / 2;
                const by = b.top - cRect.top + b.height / 2;

                const start = ellipseEdgePoint(ax, ay, a.width / 2, a.height / 2, bx, by, 6);
                const end = ellipseEdgePoint(bx, by, b.width / 2, b.height / 2, ax, ay, 6);

                newPaths.push(
                    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
                );
            }

            setPaths(newPaths);
        };

        update();

        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
        if (ro && containerRef.current) ro.observe(containerRef.current);

        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
            ro?.disconnect();
        };
    }, [connections, isDesktop]);

    return (
        <section className="relative z-10 w-full bg-white px-6 md:px-12 lg:px-16 pt-16 pb-48 md:pt-24 md:pb-80">
            <div className="mx-auto w-full max-w-[1400px]">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-900">
                        The Process That Transforms{" "}
                        <span className="text-red-500 italic font-bold">Ideas</span> Into Impact
                    </h2>
                </div>

                <div ref={containerRef} className="relative">
                    {/* connectors (desktop only) */}
                    {isDesktop && (
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
                            viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
                            fill="none"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            {paths.map((d, i) => (
                                <path
                                    key={i}
                                    d={d}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeDasharray="10 10"
                                    className="text-zinc-300"
                                />
                            ))}
                        </svg>
                    )}

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-10 md:gap-12 lg:gap-x-16 lg:gap-y-32">
                        {steps.map((step, index) => {
                            const isActive = active === step.id;

                            // ✅ ZIG-ZAG like screenshot: 1,3,5,7 top; 2,4,6,8 bottom (desktop only)
                            const lifted = step.id % 2 === 0;

                            const col = index % 4;
                            const tooltipAlign =
                                col === 0
                                    ? "lg:left-0 lg:translate-x-0"
                                    : col === 3
                                        ? "lg:right-0 lg:left-auto lg:translate-x-0"
                                        : "lg:left-1/2 lg:-translate-x-1/2";

                            const rotation = !reduceMotion && isActive ? 180 : 0;

                            // shape choice (2 types)
                            const isStartEnd = step.id === 1 || step.id === 8;
                            const boxAR = isStartEnd ? styles.boxA : styles.boxB;
                            const blobShape = isStartEnd ? styles.blobStartEnd : styles.blobMiddle;

                            // base bg to match your css colors
                            const baseBg = isStartEnd ? "bg-[#f7f9fc]" : "bg-[#f1f3f0]";

                            return (
                                <div
                                    key={step.id}
                                    className={cx(
                                        "relative flex flex-col items-center",
                                        lifted && "lg:translate-y-24",
                                        isActive && "z-[99998]"
                                    )}
                                    onPointerEnter={isDesktop ? () => setActive(step.id) : undefined}
                                    onPointerLeave={isDesktop ? () => setActive(null) : undefined}
                                >
                                    <motion.button
                                        type="button"
                                        className="relative group outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                                        onClick={() => setActive((p) => (p === step.id ? null : step.id))}
                                        onFocus={() => setActive(step.id)}
                                        onBlur={() => {
                                            if (isDesktop) setActive(null);
                                        }}
                                        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        aria-expanded={isActive}
                                    >
                                        {/* small badge */}
                                        <div
                                            className={cx(
                                                "absolute left-1/2 -translate-x-1/2 z-20",
                                                "-top-4",
                                                "h-8 w-8 md:h-9 md:w-9",
                                                "rounded-full flex items-center justify-center",
                                                "text-white font-bold text-sm md:text-[0.95rem]",
                                                "shadow-md",
                                                step.badgeClass
                                            )}
                                        >
                                            {step.id}
                                        </div>

                                        {/* wrapper that defines size + used for connector measurements */}
                                        <div
                                            ref={setBlobRef(step.id)}
                                            className={cx("relative w-56 md:w-64", boxAR)}
                                        >
                                            {/* BACKGROUND SHAPE (rotates 180deg) */}
                                            <motion.div
                                                className={cx(
                                                    "absolute inset-0 z-0",
                                                    "border border-zinc-100",
                                                    styles.blobFallback,
                                                    blobShape,
                                                    isActive
                                                        ? cx(step.tintClass, "shadow-[0_28px_70px_-40px_rgba(0,0,0,0.22)]")
                                                        : baseBg
                                                )}
                                                style={{ transformOrigin: "50% 50%" }}
                                                animate={{ rotate: rotation }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />

                                            {/* CONTENT (static – no rotation) */}
                                            <div className="relative z-10 h-full w-full flex items-center justify-center p-6 text-center">
                                                <h3 className="text-lg md:text-xl font-semibold leading-tight text-zinc-800 whitespace-pre-line">
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* DESKTOP tooltip */}
                                        {isDesktop && (
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                        transition={{ duration: reduceMotion ? 0 : 0.18 }}
                                                        className={cx(
                                                            "absolute top-full mt-6",
                                                            "w-[22rem] md:w-[24rem]",
                                                            tooltipAlign,
                                                            "rounded-3xl border border-zinc-100 bg-white/90 backdrop-blur-md",
                                                            "shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)]",
                                                            "p-7",
                                                            "z-[999999]"
                                                        )}
                                                        style={{ pointerEvents: "none" }}
                                                        role="tooltip"
                                                    >
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="h-10 w-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                                                                <span className="text-red-500 font-black">≡</span>
                                                            </div>
                                                            <h4 className="text-lg font-bold text-zinc-900">
                                                                {step.title.replace(/\n/g, " ")}
                                                            </h4>
                                                        </div>

                                                        <ul className="space-y-3">
                                                            {step.details.map((d) => (
                                                                <li key={d} className="flex gap-3 text-sm text-zinc-600">
                                                                    <span className="text-red-500 font-black shrink-0">▶</span>
                                                                    <span>{d}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </motion.button>

                                    {/* MOBILE/TABLET panel below */}
                                    {!isDesktop && (
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                                    exit={{ opacity: 0, y: 8, height: 0 }}
                                                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                                                    className={cx(
                                                        "mt-4 w-full max-w-[22rem]",
                                                        "rounded-3xl border border-zinc-100 bg-white",
                                                        "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)]",
                                                        "p-6",
                                                        "z-[999999]"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="h-10 w-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                                                            <span className="text-red-500 font-black">≡</span>
                                                        </div>
                                                        <h4 className="text-base font-bold text-zinc-900">
                                                            {step.title.replace(/\n/g, " ")}
                                                        </h4>
                                                    </div>

                                                    <ul className="space-y-2">
                                                        {step.details.map((d) => (
                                                            <li key={d} className="flex gap-3 text-sm text-zinc-600">
                                                                <span className="text-red-500 font-black shrink-0">▶</span>
                                                                <span>{d}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}