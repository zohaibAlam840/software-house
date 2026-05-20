"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { team, type TeamMember } from "@/lib/team-data";

/* ── Avatar fallback ─────────────────────────────────────── */
function AvatarFallback({ name }: { name: string }) {
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-5xl font-bold tracking-tight">{initials}</span>
        </div>
    );
}

/* ── Member card ─────────────────────────────────────────── */
function MemberCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            className="relative group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[3/4] flex flex-col"
        >
            {/* Photo */}
            <div className="absolute inset-0">
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <AvatarFallback name={member.name} />
                )}
            </div>

            {/* Always-on gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

            {/* Hover overlay */}
            <motion.div
                className="absolute inset-0 bg-violet-900/20"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Department badge */}
            <div className="absolute top-5 left-5">
                <span className="bg-black/40 backdrop-blur-md border border-white/10 text-white/70 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {member.department}
                </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Bio slides up on hover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.25 }}
                            className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3"
                        >
                            {member.bio}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Skills — visible on hover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.25, delay: 0.05 }}
                            className="flex flex-wrap gap-1.5 mb-4"
                        >
                            {member.skills.slice(0, 3).map(s => (
                                <span
                                    key={s}
                                    className="bg-white/10 border border-white/15 backdrop-blur-sm text-white/80 text-[10px] font-medium px-2.5 py-1 rounded-full"
                                >
                                    {s}
                                </span>
                            ))}
                            {member.skills.length > 3 && (
                                <span className="bg-white/10 border border-white/15 text-white/60 text-[10px] font-medium px-2.5 py-1 rounded-full">
                                    +{member.skills.length - 3}
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-end justify-between gap-3">
                    <div>
                        <h3 className="text-white font-semibold text-lg leading-tight">{member.name}</h3>
                        <p className="text-zinc-400 text-sm mt-0.5">{member.role}</p>
                    </div>

                    <motion.div
                        animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.4 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 w-9 h-9 rounded-full bg-white flex items-center justify-center text-zinc-900 text-sm font-bold hover:bg-violet-500 hover:text-white transition-colors"
                    >
                        →
                    </motion.div>
                </div>
            </div>
        </motion.article>
    );
}

/* ── Modal ───────────────────────────────────────────────── */
function Modal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xl p-0 sm:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
                onClick={e => e.stopPropagation()}
                className="bg-zinc-900 border border-zinc-800 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[92svh] overflow-y-auto"
            >
                {/* Header photo */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl bg-zinc-800 flex-shrink-0">
                    {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                        <AvatarFallback name={member.name} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/20 text-white/80 flex items-center justify-center text-sm hover:bg-black/80 transition-colors"
                    >
                        ✕
                    </button>

                    <div className="absolute bottom-5 left-6">
                        <span className="bg-violet-500/25 border border-violet-400/30 text-violet-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full block mb-2">
                            {member.role}
                        </span>
                        <h2 className="text-white text-2xl font-bold tracking-tight">{member.name}</h2>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-6">
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

                    <div className="flex gap-3 pt-1">
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-zinc-900 text-sm font-semibold px-5 py-3 rounded-2xl hover:bg-zinc-100 transition-colors"
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
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-semibold px-5 py-3 rounded-2xl hover:bg-zinc-700 transition-colors"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                LinkedIn
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Page client ─────────────────────────────────────────── */
export function TeamPageClient() {
    const [selected, setSelected] = useState<TeamMember | null>(null);

    return (
        <>
            {/* ── Hero ── */}
            <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-5">[ Our Team ]</p>
                    <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-white mb-6">
                        The people{" "}
                        <span className="font-serif italic font-normal text-zinc-400">building</span>
                        <br />
                        great things.
                    </h1>
                    <p className="max-w-lg text-base text-zinc-500 leading-relaxed">
                        We&apos;re a small, focused team of specialists who care deeply about what they build. Click any card to learn more.
                    </p>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 flex items-center gap-8 flex-wrap"
                >
                    {[
                        { n: `${team.length}`, label: "Team members" },
                        { n: "9+", label: "Years combined" },
                        { n: "3", label: "Departments" },
                        { n: "50+", label: "Products shipped" },
                    ].map(({ n, label }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <span className="text-2xl font-semibold text-white">{n}</span>
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ── Grid ── */}
            <section className="px-6 md:px-12 lg:px-20 pb-32 max-w-[1400px] mx-auto">
                {/* Featured member (CEO) — spans 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {team.map((member) => (
                        <MemberCard
                            key={member.name}
                            member={member}
                            onClick={() => setSelected(member)}
                        />
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="mx-6 md:mx-12 lg:mx-20 mb-16 rounded-3xl bg-violet-600 px-8 md:px-16 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                    Want to join us?
                </h2>
                <p className="text-violet-200 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                    We&apos;re always looking for talented people who care about great work.
                </p>
                <a
                    href="mailto:contact@giantsoftech.com"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
                >
                    Get in touch →
                </a>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <Modal member={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
