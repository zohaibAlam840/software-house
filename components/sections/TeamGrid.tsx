"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { team, type TeamMember } from "@/lib/team-data";

const row1 = team.slice(0, 3);
const row2 = team.slice(3, 6);
const loopRow1 = [...row1, ...row1, ...row1, ...row1];
const loopRow2 = [...row2, ...row2, ...row2, ...row2];

function AvatarFallback({ name }: { name: string }) {
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold tracking-tight">{initials}</span>
        </div>
    );
}

function MarqueeCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
    return (
        <motion.button
            type="button"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className="group relative flex-shrink-0 w-[180px] h-[240px] rounded-2xl overflow-hidden cursor-pointer text-left"
        >
            {/* Photo */}
            <div className="absolute inset-0 bg-zinc-800">
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <AvatarFallback name={member.name} />
                )}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Violet accent on hover */}
            <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/10 transition-colors duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-tight">{member.name}</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">{member.role}</p>
            </div>

            {/* "View" pill on hover */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-semibold rounded-full px-2.5 py-1">
                    View
                </span>
            </div>
        </motion.button>
    );
}

function MobileCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
    return (
        <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer text-left"
        >
            <div className="absolute inset-0 bg-zinc-800">
                {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                    <AvatarFallback name={member.name} />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{member.name}</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">{member.role}</p>
            </div>
        </motion.button>
    );
}

function Modal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 360, damping: 36 }}
                    onClick={e => e.stopPropagation()}
                    className="bg-zinc-900 border border-zinc-800 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-[560px] max-h-[92svh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="relative h-52 overflow-hidden rounded-t-3xl bg-zinc-800 flex-shrink-0">
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <AvatarFallback name={member.name} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/20 text-white/80 flex items-center justify-center text-xs hover:bg-black/70 transition-colors"
                        >
                            ✕
                        </button>

                        <div className="absolute bottom-5 left-6">
                            <span className="inline-block bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                                {member.role}
                            </span>
                            <h3 className="text-white text-2xl font-bold tracking-tight leading-none">{member.name}</h3>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col gap-5">
                        <p className="text-zinc-400 text-sm leading-relaxed">{member.bio}</p>

                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold mb-3">Expertise</p>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.map((s, i) => (
                                    <motion.span
                                        key={s}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-medium px-3 py-1.5 rounded-full"
                                    >
                                        {s}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap pt-1">
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white text-zinc-900 text-sm font-semibold px-5 py-3 rounded-xl hover:bg-zinc-100 transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    Email
                                </a>
                            )}
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-semibold px-5 py-3 rounded-xl hover:bg-zinc-700 transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

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

export default function TeamSection() {
    const [selected, setSelected] = useState<TeamMember | null>(null);
    const isMobile = useIsMobile();

    return (
        <>
            <section className="w-full bg-zinc-950 py-20 overflow-hidden">
                {/* Header */}
                <div className="px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto flex items-end justify-between mb-14">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600 mb-3">[ Team ]</p>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                            The people{" "}
                            <span className="font-serif italic font-normal text-zinc-400">behind the work.</span>
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-zinc-600 max-w-xs text-right">
                        Click any card to learn more about the person.
                    </p>
                </div>

                {isMobile ? (
                    <div className="px-6 grid grid-cols-2 gap-3">
                        {team.map(m => (
                            <MobileCard key={m.name} member={m} onClick={() => setSelected(m)} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {/* Row 1 — scrolls left */}
                        <div className="w-full overflow-hidden">
                            <motion.div
                                className="flex gap-4 w-max pl-16"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                            >
                                {loopRow1.map((m, i) => (
                                    <MarqueeCard key={`r1-${i}`} member={m} onClick={() => setSelected(m)} />
                                ))}
                            </motion.div>
                        </div>

                        {/* Row 2 — scrolls right */}
                        <div className="w-full overflow-hidden">
                            <motion.div
                                className="flex gap-4 w-max pl-8"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                            >
                                {loopRow2.map((m, i) => (
                                    <MarqueeCard key={`r2-${i}`} member={m} onClick={() => setSelected(m)} />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                )}
            </section>

            <AnimatePresence>
                {selected && <Modal member={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </>
    );
}
