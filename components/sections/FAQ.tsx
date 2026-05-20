"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "Does GiantsOfTech cover all stages of the SDLC?",
        answer: "Yes — we handle everything from initial planning and requirements gathering through design, development, testing, deployment, and ongoing maintenance. You get one partner for the full journey.",
    },
    {
        question: "How do you handle unexpected challenges during a project?",
        answer: "We work in short agile sprints, which means we surface risks early and adapt fast. You're never surprised — we communicate blockers and solutions transparently before they become problems.",
    },
    {
        question: "Will I own the final product and source code?",
        answer: "Absolutely. Upon final payment and project completion, all intellectual property rights and source code are fully transferred to you. No lock-in, no licensing fees.",
    },
    {
        question: "How does GiantsOfTech maintain consistency in quality?",
        answer: "We enforce strict coding standards, automated and manual testing pipelines, and thorough peer code reviews on every PR. Quality gates are non-negotiable — not optional.",
    },
    {
        question: "What if my requirements change mid-project?",
        answer: "Business needs evolve — we expect it. Our agile process accommodates scope changes through sprint planning and continuous feedback loops without derailing timelines.",
    },
    {
        question: "Can you improve or rebuild an existing system?",
        answer: "Yes. Legacy modernisation and performance optimisation are core services. We audit your existing system, plan a migration path, and rebuild incrementally to avoid downtime.",
    },
];

export function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="w-full bg-white px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="mx-auto w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

                {/* Left — sticky label */}
                <div className="lg:sticky lg:top-32">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 mb-4">[ FAQ ]</p>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-none mb-6">
                        Questions{" "}
                        <span className="font-serif italic font-normal">we get</span>
                        <br />
                        asked a lot.
                    </h2>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mb-10">
                        Can&apos;t find what you&apos;re looking for? We&apos;re a message away.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-violet-600 transition-colors"
                    >
                        Ask us directly →
                    </a>
                </div>

                {/* Right — accordion */}
                <div className="flex flex-col divide-y divide-zinc-100">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} className="py-6 first:pt-0">
                                <button
                                    className="w-full flex items-start justify-between gap-4 text-left group"
                                    onClick={() => setOpen(isOpen ? null : i)}
                                >
                                    <div className="flex items-start gap-4 min-w-0">
                                        <span className="text-[11px] font-mono text-zinc-400 mt-1 flex-shrink-0 w-6">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-base md:text-lg font-medium text-zinc-900 group-hover:text-violet-600 transition-colors leading-snug">
                                            {faq.question}
                                        </span>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                        className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-500 text-base leading-none"
                                    >
                                        +
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.28, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pt-4 pl-10 text-sm md:text-base text-zinc-500 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
