"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        details: ""
    });
    const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("LOADING");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("SUCCESS");
            setFormData({ name: "", email: "", phone: "", service: "", details: "" });
        } catch (error) {
            setStatus("ERROR");
            setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    };

    return (
        <section id="contact" className="w-full relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-[#fcfdfe] to-[#ffeef1]/60 flex items-center justify-center py-24 px-4 md:px-8">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent"></div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-100 via-transparent to-transparent"></div>

            <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#2b2b2b]">
                        Contact <span className="text-[#d32630]">Us.</span>
                    </h2>
                    <div className="space-y-6 max-w-lg">
                        <p className="text-xl lg:text-2xl text-zinc-800 leading-snug">
                            Have a project idea or just an idea that you wish to pursue?
                        </p>
                        <p className="text-base text-zinc-600 leading-relaxed">
                            Complete the form, and let&apos;s discuss how we can bring your vision to life.
                            Together, we will create something truly exceptional that aligns with your goals.
                        </p>
                    </div>
                </motion.div>

                {/* Right Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 md:p-10 backdrop-blur-xl"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">Start Your Journey</h3>
                        <p className="text-zinc-500 text-sm">Get your free quote and consultation today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">

                        {/* Loading Overlay */}
                        {status === "LOADING" && (
                            <div className="absolute -inset-4 z-50 bg-white/70 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center">
                                <span className="w-10 h-10 border-4 border-[#d32630]/20 border-t-[#d32630] rounded-full animate-spin mb-4"></span>
                                <p className="text-[#d32630] font-medium animate-pulse text-sm">Sending your request...</p>
                            </div>
                        )}

                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name *"
                                required
                                className="w-full h-12 px-4 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#d32630]/20 focus:border-[#d32630] transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address *"
                                required
                                className="w-full h-12 px-4 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#d32630]/20 focus:border-[#d32630] transition-colors"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative flex items-center">
                            <div className="absolute left-4 flex items-center gap-2 pointer-events-none">
                                <span className="text-lg">🇵🇰</span>
                                <span className="text-zinc-300 text-xs">▼</span>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full h-12 pl-20 pr-4 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#d32630]/20 focus:border-[#d32630] transition-colors"
                            />
                        </div>

                        {/* Service Dropdown */}
                        <div className="relative">
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-lg border border-zinc-200 bg-white text-zinc-500 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#d32630]/20 focus:border-[#d32630] transition-colors cursor-pointer"
                            >
                                <option value="" disabled hidden>Select Services</option>
                                <option value="Mobile App Development">Mobile App Development</option>
                                <option value="Web Development">Web Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Enterprise Solutions">Enterprise Solutions</option>
                                <option value="Other">Other</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-xs">▼</span>
                        </div>

                        {/* Details */}
                        <div>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                placeholder="Project Details *"
                                required
                                rows={4}
                                className="w-full p-4 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#d32630]/20 focus:border-[#d32630] transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Fake reCaptcha */}
                        <div className="w-fit p-3 bg-zinc-50 border border-zinc-200 rounded-md flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" required className="w-5 h-5 border-zinc-300 rounded cursor-pointer accent-[#d32630]" />
                                <span className="text-xs text-zinc-600 font-medium whitespace-nowrap">I&apos;m not a robot</span>
                            </div>
                            <div className="flex flex-col items-center ml-4 opacity-70">
                                <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                                <span className="text-[8px] text-zinc-400">reCAPTCHA</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "LOADING"}
                            className="w-full h-12 mt-4 bg-[#d32630] text-white font-medium rounded-lg hover:bg-[#b01f28] transition-colors focus:ring-4 focus:ring-red-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {status === "LOADING" ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : status === "SUCCESS" ? (
                                "Message Sent!"
                            ) : (
                                "Submit"
                            )}
                        </button>

                        {status === "ERROR" && (
                            <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
                        )}
                        {status === "SUCCESS" && (
                            <p className="text-green-600 text-xs text-center mt-2">Thank you! We will get back to you within 24 hours.</p>
                        )}

                        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-zinc-500 mt-2 flex-wrap">
                            <span>✓ No obligation</span>
                            <span className="hidden sm:inline">•</span>
                            <span>✓ Free consultation</span>
                            <span className="hidden sm:inline">•</span>
                            <span>✓ 24h response</span>
                        </div>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
