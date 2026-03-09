"use client";

import React, { useState } from "react";
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
        name: "Daniel Mensah",
        role: "CEO",
        image: "/my%20team/CEO.jpeg",
        bio: "Daniel leads the company vision, partnerships, and long-term strategy. He focuses on growth, innovation, and building strong client relationships.",
        skills: ["Leadership", "Business Strategy", "Product Vision", "Partnerships"],
        email: "daniel@giantsoftech.com",
        linkedin: "#",
    },
    {
        name: "Ibrahim Okoro",
        role: "Head of Development",
        image: "/my%20team/HOD%20of%20development.jpeg",
        bio: "Ibrahim oversees the engineering team and ensures products are built with performance, security, and scalability in mind.",
        skills: ["System Architecture", "Team Leadership", "Code Review", "Cloud Infrastructure"],
        email: "ibrahim@giantsoftech.com",
        linkedin: "#",
    },
    {
        name: "Ethan Cole",
        role: "Senior Software Engineer",
        image: "/my%20team/senior%20software%20engineer.jpeg",
        bio: "Ethan specializes in building robust web applications and supports the team with backend systems, integrations, and clean engineering practices.",
        skills: ["React", "Node.js", "TypeScript", "APIs", "PostgreSQL"],
        email: "ethan@giantsoftech.com",
    },
    {
        name: "Naomi Reed",
        role: "Admin Officer",
        image: "/my%20team/Admin.jpeg",
        bio: "Naomi handles internal coordination, scheduling, documentation, and daily administrative operations that keep the team organized and efficient.",
        skills: ["Administration", "Scheduling", "Documentation", "Communication"],
        email: "naomi@giantsoftech.com",
    },
    {
        name: "Grace Walker",
        role: "Accounts Officer",
        image: "/my%20team/accounting.jpeg",
        bio: "Grace manages invoicing, expense tracking, and financial records while helping the company maintain accurate and reliable accounting processes.",
        skills: ["Accounting", "Bookkeeping", "Financial Records", "Reporting"],
        email: "grace@giantsoftech.com",
    },
    {
        name: "Maya Bennett",
        role: "AI Analyst",
        bio: "Maya works on AI-driven insights, data interpretation, and workflow automation. She helps the team turn raw information into smart business decisions.",
        skills: ["AI Analysis", "Prompt Design", "Data Insights", "Automation", "Research"],
        email: "maya@giantsoftech.com",
        linkedin: "#",
    },
];
const row1 = team.slice(0, 3);
const row2 = team.slice(3, 6);
const loopRow1 = [...row1, ...row1, ...row1, ...row1];
const loopRow2 = [...row2, ...row2, ...row2, ...row2];

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
            <div style={{
                width: "76px", height: "76px", minWidth: "76px",
                borderRadius: "50%", overflow: "hidden",
                background: "#e4e4e7", flexShrink: 0,
            }}>
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

function Modal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(6px)",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                }}
            >
                {/* Panel */}
                <motion.div
                    key="panel"
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 24 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "white",
                        borderRadius: "24px",
                        padding: "0",
                        width: "100%",
                        maxWidth: "520px",
                        overflow: "hidden",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
                        position: "relative",
                    }}
                >
                    {/* Top colour band */}
                    <div style={{
                        height: "120px",
                        background: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
                        position: "relative",
                        flexShrink: 0,
                    }} />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            position: "absolute", top: "16px", right: "16px",
                            width: "36px", height: "36px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "white",
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "18px", lineHeight: 1,
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        ✕
                    </button>

                    {/* Avatar — overlaps the band */}
                    <div style={{
                        position: "absolute",
                        top: "68px", left: "32px",
                        width: "100px", height: "100px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "4px solid white",
                        background: "#e4e4e7",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}>
                        {member.image
                            ? <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            : <AvatarPlaceholder />}
                    </div>

                    {/* Body */}
                    <div style={{ padding: "60px 32px 36px" }}>
                        <h3 style={{ margin: "0 0 4px", fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#18181b" }}>
                            {member.name}
                        </h3>
                        <p style={{ margin: "0 0 20px", fontSize: "0.9rem", fontWeight: 600, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {member.role}
                        </p>

                        <p style={{ margin: "0 0 24px", fontSize: "0.975rem", lineHeight: 1.7, color: "#3f3f46" }}>
                            {member.bio}
                        </p>

                        {/* Skills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                            {member.skills.map(s => (
                                <span key={s} style={{
                                    padding: "5px 14px",
                                    borderRadius: "9999px",
                                    background: "#f4f4f5",
                                    border: "1px solid #e4e4e7",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    color: "#3f3f46",
                                    letterSpacing: "0.02em",
                                }}>
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* Contact links */}
                        <div style={{ display: "flex", gap: "12px" }}>
                            {member.email && (
                                <a href={`mailto:${member.email}`} style={{
                                    display: "inline-flex", alignItems: "center", gap: "8px",
                                    padding: "10px 20px",
                                    borderRadius: "9999px",
                                    background: "#18181b",
                                    color: "white",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}>
                                    ✉ Email
                                </a>
                            )}
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{
                                    display: "inline-flex", alignItems: "center", gap: "8px",
                                    padding: "10px 20px",
                                    borderRadius: "9999px",
                                    background: "#f4f4f5",
                                    border: "1px solid #e4e4e7",
                                    color: "#18181b",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}>
                                    in LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function TeamSection() {
    const [selected, setSelected] = useState<TeamMember | null>(null);

    return (
        <>
            <section style={{ width: "100%", background: "white", padding: "64px 24px 80px", boxSizing: "border-box" }}>
                <div style={{
                    width: "100%", maxWidth: "1600px", margin: "0 auto",
                    background: "#f4f4f5",
                    borderRadius: "24px", overflow: "hidden",
                    border: "1px solid #e4e4e7",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}>
                    {/* Header */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "64px 24px 60px" }}>
                        <div style={{
                            width: "116px", height: "54px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            borderRadius: "9999px",
                            background: "white", color: "#18181b",
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        }}>
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h2 style={{
                            margin: 0,
                            fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)",
                            fontWeight: 700, letterSpacing: "-0.04em",
                            color: "#18181b", textAlign: "center", lineHeight: 1,
                        }}>
                            Meet Our Team
                        </h2>
                        <p style={{ margin: 0, fontSize: "1rem", color: "#71717a", textAlign: "center", maxWidth: "480px", lineHeight: 1.6 }}>
                            Click any card to learn more about the person behind the work.
                        </p>
                    </div>

                    {/* Row 1 — scrolls LEFT */}
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

                    {/* Row 2 — scrolls RIGHT */}
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
                </div>
            </section>

            {/* Modal */}
            {selected && <Modal member={selected} onClose={() => setSelected(null)} />}
        </>
    );
}