"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "Does GiantsOfTech cover all stages of the SDLC?",
        answer: "Yes, we handle everything from initial planning and requirements gathering to design, development, testing, deployment, and ongoing maintenance."
    },
    {
        question: "How do you handle unexpected challenges during a project?",
        answer: "We employ an agile methodology, allowing us to adapt quickly to changes. Our experienced team identifies risks early and communicates transparently to find the best solutions."
    },
    {
        question: "Will I own the final product or the source code?",
        answer: "Absolutely. Upon final payment and project completion, all intellectual property rights and source code are fully transferred to you."
    },
    {
        question: "How does GiantsOfTech maintain consistency in quality across projects?",
        answer: "We adhere to strict coding standards, perform rigorous automated and manual testing, and conduct thorough peer code reviews to ensure premium quality on every deliverable."
    },
    {
        question: "What happens if my requirements change mid-project?",
        answer: "We understand that business needs evolve. With our agile process, we can incorporate changes flexibly through regular sprint planning and continuous feedback loops."
    },
    {
        question: "Can you improve or rebuild an existing system?",
        answer: "Yes, we specialize in legacy system modernization, performance optimization, and seamless migrations to modern technological stacks."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative z-10 w-full bg-white px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="mx-auto w-full max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">
                        Frequently <span className="text-red-600 font-bold">Asked</span> Questions
                    </h2>
                    <p className="text-sm md:text-base text-zinc-600 font-medium">
                        We handle every aspect of your project development so you can focus on your business success.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-xl bg-white overflow-hidden"
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span className="text-base md:text-lg font-medium text-zinc-900">{faq.question}</span>
                                    <span className="text-red-500 text-2xl font-light leading-none ml-4 relative flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                        <motion.span
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="absolute block"
                                        >
                                            +
                                        </motion.span>
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-zinc-600 text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 flex flex-col items-center justify-center text-center">
                    <span className="text-zinc-500 text-sm mb-4">Still Have a Question?</span>
                    <a
                        href="/contact"
                        className="inline-block bg-[#d32630] text-white font-medium px-8 py-3 rounded-lg shadow-md hover:bg-[#b01f28] transition-colors focus:ring-4 focus:ring-red-200"
                    >
                        Schedule a Call
                    </a>
                </div>
            </div>
        </section>
    );
}
