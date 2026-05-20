"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "About", href: "/about" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            {/* ── Main bar ── */}
            <header
                className={[
                    "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
                    mobileOpen
                        ? "bg-zinc-950"
                        : scrolled
                            ? "bg-white/90 backdrop-blur-xl border-b border-zinc-100/80 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
                            : "bg-transparent",
                ].join(" ")}
            >
                <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between h-16 md:h-[72px]">

                    {/* Logo */}
                    <Link href="/" className="relative z-10 flex-shrink-0">
                        <Image
                            src="/logo.png"
                            alt="GiantsOfTech"
                            width={130}
                            height={36}
                            className="h-9 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* ── Desktop pill nav ── */}
                    <nav
                        className="hidden md:flex items-center gap-0.5 rounded-full border border-zinc-200/80 bg-zinc-50/90 backdrop-blur-sm px-1.5 py-1.5 shadow-sm"
                        aria-label="Main navigation"
                    >
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={[
                                        "relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-150 select-none",
                                        isActive ? "text-white" : "text-zinc-600 hover:text-zinc-900",
                                    ].join(" ")}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="absolute inset-0 rounded-full bg-zinc-900"
                                            transition={{ type: "spring", stiffness: 420, damping: 38 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ── Right: CTA + hamburger ── */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/contact"
                            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-600 transition-colors duration-200"
                        >
                            Start a project
                            <span className="opacity-60 text-xs">→</span>
                        </Link>

                        {/* Animated hamburger */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            className={[
                                "md:hidden relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-200",
                                mobileOpen ? "bg-white/10 border border-white/20" : "",
                            ].join(" ")}
                        >
                            <motion.span
                                className="block h-0.5 w-5 rounded-full bg-zinc-900 origin-center"
                                animate={mobileOpen ? { rotate: 45, y: 5.5, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#18181b" }}
                                transition={{ duration: 0.22, ease: "easeInOut" }}
                            />
                            <motion.span
                                className="block h-0.5 w-5 rounded-full bg-zinc-900"
                                animate={mobileOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                                transition={{ duration: 0.15 }}
                            />
                            <motion.span
                                className="block h-0.5 w-5 rounded-full bg-zinc-900 origin-center"
                                animate={mobileOpen ? { rotate: -45, y: -5.5, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#18181b" }}
                                transition={{ duration: 0.22, ease: "easeInOut" }}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile full-screen menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0px)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 0px)" }}
                        exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0px)" }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 bg-zinc-950 flex flex-col px-6 pt-24 pb-10 md:hidden"
                    >
                        {/* Nav links */}
                        <nav className="flex flex-col flex-1">
                            {[...links, { label: "Contact", href: "/contact" }].map((link, i) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="group flex items-center justify-between py-5 border-b border-zinc-800/70"
                                        >
                                            <span className={[
                                                "text-[2.4rem] font-medium tracking-tight transition-colors duration-150",
                                                isActive ? "text-violet-400" : "text-white group-hover:text-violet-400",
                                            ].join(" ")}>
                                                {link.label}
                                            </span>
                                            <motion.span
                                                className="text-zinc-600 group-hover:text-violet-400 transition-colors text-2xl"
                                                animate={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                            >
                                                →
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Bottom contact strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.46, duration: 0.35 }}
                            className="flex flex-col gap-2 pt-8 border-t border-zinc-800/60"
                        >
                            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-1">Get in touch</p>
                            <a
                                href="mailto:contact@giantsoftech.com"
                                className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
                            >
                                contact@giantsoftech.com
                            </a>
                            <div className="flex gap-5 mt-3">
                                {["Twitter", "LinkedIn", "Instagram"].map(s => (
                                    <a key={s} href="#" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors uppercase tracking-wider">
                                        {s}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
