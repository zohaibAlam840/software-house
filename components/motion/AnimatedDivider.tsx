"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedDivider = () => {
    return (
        <div className="w-full flex justify-center py-8 md:py-16 bg-white overflow-hidden relative z-50">
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-[85%] max-w-5xl h-[2px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent origin-center"
            />
        </div>
    );
};
