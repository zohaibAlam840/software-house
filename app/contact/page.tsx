"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GridDots } from "@/components/ui/GridDots";

const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"];
const services = ["Web Development", "Mobile App", "Branding", "UI/UX Design", "E-Commerce", "Other"];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email, details: `Service: ${form.service} | Budget: ${form.budget}\n\n${form.message}` }),
            });
            setStatus(res.ok ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            <section className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-6 md:px-12 lg:px-20 overflow-hidden">
                <GridDots color="rgb(124,58,237)" size={26} dotSize={1} fade />

                <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left — info */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-6">[ CONTACT ]</p>
                        <h1 className="text-[clamp(2rem,5vw,4.8rem)] font-medium leading-none tracking-tight text-zinc-900 mb-6 sm:mb-8">
                            Let&apos;s build{" "}
                            <span className="font-serif italic font-normal text-violet-600">something.</span>
                        </h1>
                        <p className="max-w-sm text-sm sm:text-base text-zinc-500 leading-relaxed mb-8 sm:mb-14">
                            Tell us about your project. We respond within 24 hours and
                            kick off every engagement with a free discovery call.
                        </p>

                        <div className="flex flex-col gap-6">
                            {[
                                { label: "Email", value: "contact@giantsoftech.com", href: "mailto:contact@giantsoftech.com" },
                                { label: "Location", value: "Lahore, Pakistan · Remote worldwide", href: null },
                                { label: "Response time", value: "Within 24 hours", href: null },
                            ].map(({ label, value, href }) => (
                                <div key={label}>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
                                    {href ? (
                                        <a href={href} className="text-sm text-zinc-800 font-medium hover:text-violet-600 transition-colors">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-zinc-800 font-medium">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — form */}
                    <div className="bg-white rounded-3xl border border-zinc-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-5 sm:p-8 md:p-10">
                        {status === "sent" ? (
                            <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                                <div className="text-4xl">🎉</div>
                                <h2 className="text-xl font-semibold text-zinc-900">Message sent!</h2>
                                <p className="text-sm text-zinc-500">We&apos;ll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Name *</label>
                                        <input
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Your full name"
                                            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Email *</label>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="you@company.com"
                                            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Service needed</label>
                                    <div className="flex flex-wrap gap-2">
                                        {services.map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setForm({ ...form, service: s })}
                                                className={`rounded-full px-4 py-2 text-xs font-medium border transition-all ${form.service === s ? "bg-violet-600 border-violet-600 text-white" : "bg-white border-zinc-200 text-zinc-600 hover:border-violet-400"}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Budget range</label>
                                    <div className="flex flex-wrap gap-2">
                                        {budgets.map((b) => (
                                            <button
                                                key={b}
                                                type="button"
                                                onClick={() => setForm({ ...form, budget: b })}
                                                className={`rounded-full px-4 py-2 text-xs font-medium border transition-all ${form.budget === b ? "bg-zinc-900 border-zinc-900 text-white" : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"}`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Project details *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tell us about your project — what you're building, your goals, timeline..."
                                        className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-xs text-red-500">Something went wrong. Please try emailing us directly.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-2 w-full rounded-full bg-zinc-900 py-4 text-sm font-medium text-white hover:bg-violet-600 transition-colors disabled:opacity-60"
                                >
                                    {status === "loading" ? "Sending…" : "Send message →"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
