"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function ContactModal() {
    const [open, setOpen] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    // Open after 8 seconds — only once per session
    useEffect(() => {
        if (sessionStorage.getItem("contactModalDismissed")) return;
        const t = setTimeout(() => setOpen(true), 8000);
        return () => clearTimeout(t);
    }, []);

    const close = () => {
        setOpen(false);
        setDismissed(true);
        sessionStorage.setItem("contactModalDismissed", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setSent(true);
        setTimeout(close, 2800);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (dismissed && !open) return null;

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* ── Backdrop ── */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={close}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(8px)",
                            zIndex: 9000,
                        }}
                    />

                    {/*
                     * Centering shell — uses flexbox so framer-motion's
                     * own transform (scale/y) doesn't fight with the
                     * translate(-50%,-50%) trick.
                     */}
                    <div
                        key="center"
                        style={{
                            position: "fixed",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "24px",
                            zIndex: 9001,
                            pointerEvents: "none",   // clicks pass through to backdrop
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88, y: 32 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 20 }}
                            transition={{ type: "spring", stiffness: 360, damping: 36 }}
                            style={{
                                pointerEvents: "auto",   // re-enable clicks on modal itself
                                width: "min(480px, 100%)",
                                maxHeight: "calc(100svh - 48px)",
                                overflowY: "auto",
                                background: "white",
                                borderRadius: "28px",
                                boxShadow: "0 40px 100px rgba(0,0,0,0.30), 0 0 0 1px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={close}
                                aria-label="Close"
                                style={{
                                    position: "absolute", top: "16px", right: "16px",
                                    width: "34px", height: "34px",
                                    borderRadius: "50%",
                                    background: "#f4f4f5",
                                    border: "1px solid #e4e4e7",
                                    color: "#71717a",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    zIndex: 1,
                                }}
                            >✕</button>

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    /* ── Success state ── */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "56px 32px",
                                            gap: "14px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div style={{ width: "140px", height: "140px" }}>
                                            <DotLottieReact
                                                src="/Email.lottie"
                                                autoplay
                                                loop={false}
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#111", letterSpacing: "-0.03em" }}>
                                            Message sent! 🎉
                                        </h3>
                                        <p style={{ margin: 0, fontSize: "0.88rem", color: "#71717a", lineHeight: 1.6 }}>
                                            Thanks for reaching out. We'll get back to you within 24 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    /* ── Form state ── */
                                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        {/* Dark header + Lottie */}
                                        <div style={{
                                            background: "linear-gradient(160deg, #111 0%, #2d2d2d 100%)",
                                            borderRadius: "28px 28px 0 0",
                                            padding: "8px 24px 0",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}>
                                            <div style={{ width: "160px", height: "160px" }}>
                                                <DotLottieReact
                                                    src="/Email.lottie"
                                                    autoplay
                                                    loop
                                                    style={{ width: "100%", height: "100%" }}
                                                />
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div style={{ padding: "24px 28px 28px" }}>
                                            <h2 style={{
                                                margin: "0 0 6px",
                                                fontSize: "1.45rem",
                                                fontWeight: 700,
                                                color: "#111",
                                                letterSpacing: "-0.035em",
                                            }}>
                                                Let's work together
                                            </h2>
                                            <p style={{
                                                margin: "0 0 22px",
                                                fontSize: "0.87rem",
                                                color: "#71717a",
                                                lineHeight: 1.6,
                                            }}>
                                                Got a project in mind? Drop us a message and we'll get back to you within 24&nbsp;hours.
                                            </p>

                                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                                                <div>
                                                    <label style={labelStyle}>Your Name</label>
                                                    <input
                                                        name="name" value={form.name} onChange={handleChange}
                                                        required placeholder="Alex Johnson"
                                                        style={inputStyle}
                                                        onFocus={e => (e.target.style.borderColor = "#111")}
                                                        onBlur={e => (e.target.style.borderColor = "#e4e4e7")}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>Email Address</label>
                                                    <input
                                                        type="email" name="email" value={form.email} onChange={handleChange}
                                                        required placeholder="alex@company.com"
                                                        style={inputStyle}
                                                        onFocus={e => (e.target.style.borderColor = "#111")}
                                                        onBlur={e => (e.target.style.borderColor = "#e4e4e7")}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>Message</label>
                                                    <textarea
                                                        name="message" value={form.message} onChange={handleChange}
                                                        required rows={3} placeholder="Tell us about your project…"
                                                        style={{ ...inputStyle, resize: "none", height: "90px", lineHeight: 1.55 }}
                                                        onFocus={e => (e.target.style.borderColor = "#111")}
                                                        onBlur={e => (e.target.style.borderColor = "#e4e4e7")}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    style={{
                                                        width: "100%", padding: "14px",
                                                        borderRadius: "12px",
                                                        background: loading ? "#3f3f46" : "#111",
                                                        color: "white", fontWeight: 700, fontSize: "0.92rem",
                                                        border: "none",
                                                        cursor: loading ? "not-allowed" : "pointer",
                                                        letterSpacing: "-0.01em",
                                                        transition: "background 0.2s",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        gap: "8px", marginTop: "4px",
                                                    }}
                                                >
                                                    {loading ? <><Spinner /> Sending…</> : "Send Message →"}
                                                </button>
                                                <p style={{ margin: 0, textAlign: "center", fontSize: "0.72rem", color: "#a1a1aa" }}>
                                                    We reply within 24 hours · No spam, ever
                                                </p>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#3f3f46",
    marginBottom: "5px",
    letterSpacing: "0.01em",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e4e4e7",
    background: "#fafafa",
    fontSize: "0.88rem",
    color: "#111",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.18s",
};

function Spinner() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round"
            style={{ animation: "spin 0.75s linear infinite" }}>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
    );
}
