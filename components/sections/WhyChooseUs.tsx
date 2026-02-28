"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function WhyChooseUs() {
    const [hoveredCol, setHoveredCol] = useState<number | null>(null);
    const reduceMotion = useReducedMotion();
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

        // Defer initial check to avoid synchronous setState warning
        setTimeout(() => setIsDesktop(mql.matches), 0);

        // Handle older browser compatibility just in case
        if (mql.addEventListener) {
            mql.addEventListener("change", onChange);
        } else {
            mql.addListener(onChange);
        }

        return () => {
            if (mql.removeEventListener) {
                mql.removeEventListener("change", onChange);
            } else {
                mql.removeListener(onChange);
            }
        };
    }, []);

    // Helper to conditionally apply flex-grow only on desktop
    const getFlexGrow = (colIndex: number) => {
        if (reduceMotion || !isDesktop) return 1;
        if (hoveredCol === colIndex) return 1.5;
        if (hoveredCol !== null) return 0.8;
        return 1;
    };

    return (
        <section className="relative z-10 w-full bg-white px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="mx-auto w-full max-w-[1400px]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 mb-6">
                        Why Choose <span className="text-red-600 font-bold italic">GiantsOfTech</span>
                    </h2>
                    <p className="max-w-4xl mx-auto text-sm md:text-base text-zinc-600 leading-relaxed">
                        At GiantsOfTech, we don&apos;t just count successes, we deliver outcomes that count for your business. These figures reflect our pace, quality, and consistent success in building workable digital ecosystems.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px] w-full items-stretch">

                    {/* Col 1 */}
                    <motion.div
                        className="flex flex-col gap-4 flex-1 origin-left"
                        animate={{ flexGrow: getFlexGrow(1) }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onMouseEnter={isDesktop ? () => setHoveredCol(1) : undefined}
                        onMouseLeave={isDesktop ? () => setHoveredCol(null) : undefined}
                    >
                        {/* Top Card */}
                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm h-24 lg:h-1/4 transition-all hover:bg-zinc-100/80">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-zinc-200 border-2 border-white z-20 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64" alt="Client" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-zinc-300 border-2 border-white z-10 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=64" alt="Client" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-[#2b2b2b] border-2 border-white z-0 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64" alt="Client" className="w-full h-full object-cover" />
                                    </div>
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-700 ml-2">50+ HAPPY CLIENTS</span>
                            </div>
                        </div>
                        {/* Bottom Card */}
                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 md:p-8 flex flex-col justify-end shadow-sm flex-1 min-h-[220px] transition-all hover:bg-zinc-100/80 relative overflow-hidden">
                            <p className="text-xs md:text-sm text-zinc-700 absolute top-6 left-6">30% faster than industry average</p>
                            <div>
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-zinc-900 mb-2">50+</h3>
                                <p className="text-zinc-500 text-sm">Projects Delivered</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Col 2 */}
                    <motion.div
                        className="flex flex-col gap-4 flex-1 origin-center"
                        animate={{ flexGrow: getFlexGrow(2) }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onMouseEnter={isDesktop ? () => setHoveredCol(2) : undefined}
                        onMouseLeave={isDesktop ? () => setHoveredCol(null) : undefined}
                    >
                        <div className="bg-[#effefb] border border-[#dffaf5] rounded-2xl p-6 flex flex-col justify-between h-full min-h-[250px] shadow-sm transition-all hover:bg-[#e4fcfa]">
                            <h3 className="text-3xl lg:text-4xl font-medium text-zinc-900 mt-2">10x Scale</h3>
                            <p className="text-zinc-500 text-sm max-w-[200px]">High-Performance Products, Built to grow without slowdown.</p>
                        </div>
                    </motion.div>

                    {/* Col 3 */}
                    <motion.div
                        className="flex flex-col gap-4 flex-1 origin-center"
                        animate={{ flexGrow: getFlexGrow(3) }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onMouseEnter={isDesktop ? () => setHoveredCol(3) : undefined}
                        onMouseLeave={isDesktop ? () => setHoveredCol(null) : undefined}
                    >
                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col justify-end shadow-sm flex-[1.5] min-h-[200px] transition-all hover:bg-zinc-100 relative">
                            <p className="text-sm text-zinc-500 absolute top-6 left-6">Mobile, Web & Digital Solutions</p>
                            <div>
                                <h3 className="text-3xl lg:text-4xl font-medium text-zinc-900 mb-2">9+</h3>
                                <p className="text-zinc-500 text-sm">Years Industry Experience</p>
                            </div>
                        </div>
                        <div className="bg-[#fceef6] border border-[#f5dce8] rounded-2xl p-6 flex flex-col justify-center shadow-sm flex-1 min-h-[140px] transition-all hover:bg-[#fadceb]">
                            <h3 className="text-xl font-medium text-zinc-900 mb-1">Expert Team</h3>
                            <p className="text-xs text-zinc-600">Enterprise-level scalable solutions</p>
                        </div>
                    </motion.div>

                    {/* Col 4 */}
                    <motion.div
                        className="flex flex-col gap-4 flex-1 origin-right"
                        animate={{ flexGrow: getFlexGrow(4) }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onMouseEnter={isDesktop ? () => setHoveredCol(4) : undefined}
                        onMouseLeave={isDesktop ? () => setHoveredCol(null) : undefined}
                    >
                        <div className="bg-[#333333] rounded-2xl p-6 flex flex-col justify-between h-full min-h-[250px] overflow-hidden relative group">
                            <h3 className="text-3xl lg:text-4xl font-medium leading-tight text-white relative z-10 w-[90%] mt-2">100% On-Time Delivery</h3>

                            <motion.div
                                className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-20 text-[200px] leading-none select-none text-zinc-300 origin-center pointer-events-none"
                                animate={{ rotate: hoveredCol === 4 ? 15 : 0, scale: hoveredCol === 4 ? 1.1 : 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                ✦
                            </motion.div>

                            <p className="text-zinc-50 text-xs relative z-10 mb-2 font-medium">Clear workflows & planned milestones</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
