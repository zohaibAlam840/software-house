"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:py-6 md:px-20 bg-white/85 backdrop-blur-md border-b border-zinc-100">
                {/* Make z-index high so logo stays above menu overlay */}
                <div className="text-2xl font-black italic tracking-tighter relative z-50">GiantsOfTech</div>

                {/* Desktop Links */}
                <div className="hidden gap-8 text-sm font-semibold uppercase tracking-wider md:flex">
                    {links.map((link) => (
                        <a key={link.label} href={link.href} className="hover:text-red-500 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div className="block md:hidden relative z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-sm font-bold uppercase tracking-widest px-4 py-2 bg-zinc-100 rounded-full"
                    >
                        {isMobileMenuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-32 px-8 flex flex-col gap-8 md:hidden shadow-2xl"
                    >
                        {links.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-4xl font-bold tracking-tight text-zinc-900 border-b border-zinc-200 pb-4"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
