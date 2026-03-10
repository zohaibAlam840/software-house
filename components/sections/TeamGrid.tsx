"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TeamMember = {
    name: string;
    role: string;
    image?: string;
    bio: string;
    skills: string[];
    email?: string;
    linkedin?: string;
};

const team: TeamMember[] = [
    {
        name: "Hamad Shahid",
        role: "CEO",
        image: "/my%20team/CEO.jpeg",
        bio: "Hamad leads the company vision, partnerships, and long-term strategy. He focuses on growth, innovation, and building strong client relationships that drive lasting impact.",
        skills: ["Leadership", "Business Strategy", "Product Vision", "Partnerships"],
        email: "hamad@giantsoftech.com",
        linkedin: "#",
    },
    {
        name: "Muhammad Saad",
        role: "Head of Development",
        image: "/my%20team/HOD%20of%20development.jpeg",
        bio: "Muhammad oversees the engineering team and ensures every product is built with performance, security, and scalability in mind — from architecture to deployment.",
        skills: ["System Architecture", "Team Leadership", "Code Review", "Cloud Infrastructure"],
        email: "saad@giantsoftech.com",
        linkedin: "#",
    },
    {
        name: "Zohaib Alam",
        role: "Senior Software Engineer",
        image: "/my%20team/senior%20software%20engineer.jpeg",
        bio: "Zohaib specialises in building robust web applications and supports the team with backend systems, API integrations, and clean engineering practices across every project.",
        skills: ["React", "Node.js", "TypeScript", "APIs", "PostgreSQL", "AWS", "Docker", "NEST.JS", "NEXT.JS", "Tenser Flow", "React Native"],
        email: "zohaibe840@gmail.com",
    },
    {
        name: "Syed Ashir",
        role: "Admin Officer",
        image: "/my%20team/Admin.jpeg",
        bio: "Syed handles internal coordination, scheduling, documentation, and daily administrative operations that keep the team organised, efficient, and always moving forward.",
        skills: ["Administration", "Scheduling", "Documentation", "Communication"],
        email: "ashir@giantsoftech.com",
    },
    {
        name: "Hamza Pervez",
        role: "Accounts Officer",
        image: "/my%20team/accounting.jpeg",
        bio: "Hamza manages invoicing, expense tracking, and financial records while helping the company maintain accurate, transparent, and reliable accounting processes.",
        skills: ["Accounting", "Bookkeeping", "Financial Records", "Reporting"],
        email: "hamza@giantsoftech.com",
    },
    {
        name: "Maya Bennett",
        role: "AI Analyst",
        bio: "Maya works on AI-driven insights, data interpretation, and workflow automation. She helps the team turn raw information into smart business decisions with precision.",
        skills: ["AI Analysis", "Prompt Design", "Data Insights", "Automation", "Research"],
        email: "maya@giantsoftech.com",
        linkedin: "#",
    },
];

const row1 = team.slice(0, 3);
const row2 = team.slice(3, 6);
const loopRow1 = [...row1, ...row1, ...row1, ...row1];
const loopRow2 = [...row2, ...row2, ...row2, ...row2];

/* ─── Avatar placeholder ─────────────────────────────────────────── */
function AvatarPlaceholder() {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}>
            <circle cx="50" cy="50" r="50" fill="#D4D4D8" />
            <circle cx="50" cy="36" r="18" fill="#A1A1AA" />
            <ellipse cx="50" cy="79" rx="28" ry="18" fill="#A1A1AA" />
        </svg>
    );
}

/* ─── Marquee card ───────────────────────────────────────────────── */
function MemberCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
    return (
        <motion.div
            whileHover={{ scale: 1.025, boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                padding: "16px 32px 16px 16px",
                borderRadius: "9999px",
                background: "#f4f4f5",
                border: "1px solid #e4e4e7",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                flexShrink: 0,
                minWidth: "300px",
                height: "108px",
                cursor: "pointer",
                userSelect: "none",
            }}
        >
            <div style={{ width: "76px", height: "76px", minWidth: "76px", borderRadius: "50%", overflow: "hidden", background: "#e4e4e7", flexShrink: 0 }}>
                {member.image
                    ? <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    : <AvatarPlaceholder />}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#18181b", whiteSpace: "nowrap", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                    {member.name}
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#71717a", whiteSpace: "nowrap" }}>
                    {member.role}
                </span>
            </div>
        </motion.div>
    );
}

/* ─── Mobile grid card ───────────────────────────────────────────── */
function MobileCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                padding: "24px 16px 20px",
                borderRadius: "20px",
                background: "#f4f4f5",
                border: "1px solid #e4e4e7",
                cursor: "pointer",
                userSelect: "none",
                textAlign: "center",
            }}
        >
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", background: "#e4e4e7" }}>
                {member.image
                    ? <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    : <AvatarPlaceholder />}
            </div>
            <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em" }}>{member.name}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#71717a", marginTop: "2px" }}>{member.role}</div>
            </div>
        </motion.div>
    );
}

/* ─── Image lightbox ─────────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    // close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 2000,
                background: "rgba(0,0,0,0.88)",
                backdropFilter: "blur(16px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "24px",
            }}
        >
            <motion.img
                src={src} alt={alt}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: "min(560px, 90vw)",
                    maxHeight: "80vh",
                    borderRadius: "20px",
                    objectFit: "cover",
                    boxShadow: "0 48px 120px rgba(0,0,0,0.6)",
                }}
            />
            <button
                onClick={onClose}
                aria-label="Close image"
                style={{
                    position: "absolute", top: "20px", right: "20px",
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "white", fontSize: "17px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}
            >✕</button>
        </motion.div>
    );
}

/* ─── Member modal ───────────────────────────────────────────────── */
function Modal({ member, onClose, isMobile }: { member: TeamMember; onClose: () => void; isMobile: boolean }) {
    const [lightbox, setLightbox] = useState(false);

    return (
        <>
            <AnimatePresence>
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    style={{
                        position: "fixed", inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(10px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: isMobile ? "flex-end" : "center",
                        justifyContent: "center",
                        padding: isMobile ? "0" : "16px",
                    }}
                >
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: 20 }}
                        transition={{ type: "spring", stiffness: 380, damping: 38 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: "white",
                            borderRadius: isMobile ? "24px 24px 0 0" : "24px",
                            width: "100%",
                            maxWidth: isMobile ? "100%" : "640px",
                            maxHeight: isMobile ? "92svh" : "calc(100svh - 32px)",
                            overflowY: "auto",
                            boxShadow: "0 48px 120px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* ── Dark header ── */}
                        <div style={{
                            position: "relative",
                            background: "linear-gradient(135deg, #0f0f0f 0%, #27272a 60%, #111827 100%)",
                            padding: isMobile ? "24px 20px 48px" : "32px 32px 56px",
                            overflow: "hidden",
                            flexShrink: 0,
                        }}>
                            {/* decorative circles */}
                            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }} />
                            <div style={{ position: "absolute", top: "20px", right: "60px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />

                            {/* close */}
                            <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "16px", right: "16px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

                            {/* role badge */}
                            <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
                                fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.7)",
                                letterSpacing: "0.1em", textTransform: "uppercase",
                                marginBottom: isMobile ? "8px" : "12px"
                            }}>        {member.role}
                            </span>
                            <h3 style={{ margin: 0, fontSize: isMobile ? "1.4rem" : "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "white", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                                {member.name}
                            </h3>
                        </div>

                        {/* ── Avatar overlapping seam — clickable ── */}
                        <div style={{ position: "relative", height: 0 }}>
                            <motion.div
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => member.image && setLightbox(true)}
                                title={member.image ? "Click to enlarge" : undefined}
                                style={{
                                    position: "absolute",
                                    top: isMobile ? "-36px" : "-44px",
                                    left: isMobile ? "20px" : "32px",
                                    width: isMobile ? "72px" : "88px",
                                    height: isMobile ? "72px" : "88px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    border: "4px solid white",
                                    background: "#e4e4e7",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                                    cursor: member.image ? "zoom-in" : "default",
                                }}
                            >
                                {member.image
                                    ? <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                    : <AvatarPlaceholder />}
                            </motion.div>
                        </div>

                        {/* ── Body ── */}
                        <div style={{ padding: isMobile ? "44px 18px 28px" : "56px 28px 28px" }}>
                            <p style={{ margin: "0 0 18px", fontSize: isMobile ? "0.9rem" : "0.95rem", lineHeight: 1.7, color: "#52525b" }}>
                                {member.bio}
                            </p>

                            <div style={{ height: "1px", background: "#f4f4f5", marginBottom: "18px" }} />

                            <p style={{ margin: "0 0 8px", fontSize: "0.68rem", fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                Expertise
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "26px" }}>
                                {member.skills.map((s, i) => (
                                    <motion.span
                                        key={s}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05, duration: 0.2 }}
                                        style={{ padding: isMobile ? "5px 11px" : "6px 14px", borderRadius: "9999px", background: "#fafafa", border: "1px solid #e4e4e7", fontSize: isMobile ? "0.73rem" : "0.78rem", fontWeight: 600, color: "#18181b", letterSpacing: "0.01em" }}
                                    >{s}</motion.span>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {member.email && (
                                    <a href={`mailto:${member.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: isMobile ? "10px 16px" : "11px 22px", borderRadius: "12px", background: "#18181b", color: "white", fontSize: isMobile ? "0.82rem" : "0.85rem", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em", flex: isMobile ? "1" : "none" }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        Send Email
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: isMobile ? "10px 16px" : "11px 22px", borderRadius: "12px", background: "white", border: "1.5px solid #e4e4e7", color: "#18181b", fontSize: isMobile ? "0.82rem" : "0.85rem", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em", flex: isMobile ? "1" : "none" }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* ── Image lightbox (on top of modal) ── */}
            <AnimatePresence>
                {lightbox && member.image && (
                    <Lightbox src={member.image} alt={member.name} onClose={() => setLightbox(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

/* ─── Responsive hook ────────────────────────────────────────────── */
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

/* ─── Main section ───────────────────────────────────────────────── */
export default function TeamSection() {
    const [selected, setSelected] = useState<TeamMember | null>(null);
    const isMobile = useIsMobile();

    return (
        <>
            <section style={{ width: "100%", background: "white", padding: isMobile ? "40px 16px 56px" : "64px 24px 80px", boxSizing: "border-box" }}>
                <div style={{
                    width: "100%", maxWidth: "1600px", margin: "0 auto",
                    background: "#f4f4f5",
                    borderRadius: isMobile ? "20px" : "24px",
                    overflow: "hidden",
                    border: "1px solid #e4e4e7",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}>
                    {/* Header */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: isMobile ? "40px 20px 36px" : "64px 24px 60px" }}>
                        <div style={{ width: "116px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "9999px", background: "white", color: "#18181b", border: "1px solid #e4e4e7", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h2 style={{ margin: 0, fontSize: "clamp(2rem, 3.5vw, 3.6rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#18181b", textAlign: "center", lineHeight: 1 }}>
                            Meet Our Team
                        </h2>
                        <p style={{ margin: 0, fontSize: "1rem", color: "#71717a", textAlign: "center", maxWidth: "480px", lineHeight: 1.6 }}>
                            Click any card to learn more about the person behind the work.
                        </p>
                    </div>

                    {isMobile ? (
                        /* ── Mobile: 2-col grid, no marquee ── */
                        <div style={{ borderTop: "1px solid #e4e4e7", padding: "24px 16px 40px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                {team.map(m => (
                                    <MobileCard key={m.name} member={m} onClick={() => setSelected(m)} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ── Desktop: two marquee rows ── */
                        <>
                            <div style={{ width: "100%", overflow: "hidden", padding: "16px 0", borderTop: "1px solid #e4e4e7" }}>
                                <motion.div
                                    style={{ display: "flex", gap: "14px", width: "max-content", willChange: "transform", padding: "0 7px" }}
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                                >
                                    {loopRow1.map((m, i) => (
                                        <MemberCard key={`r1-${i}`} member={m} onClick={() => setSelected(m)} />
                                    ))}
                                </motion.div>
                            </div>
                            <div style={{ width: "100%", overflow: "hidden", padding: "16px 0 64px", borderTop: "1px solid #e4e4e7" }}>
                                <motion.div
                                    style={{ display: "flex", gap: "14px", width: "max-content", willChange: "transform", padding: "0 7px" }}
                                    animate={{ x: ["-50%", "0%"] }}
                                    transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                                >
                                    {loopRow2.map((m, i) => (
                                        <MemberCard key={`r2-${i}`} member={m} onClick={() => setSelected(m)} />
                                    ))}
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Modal */}
            {selected && <Modal member={selected} onClose={() => setSelected(null)} isMobile={isMobile} />}
        </>
    );
}