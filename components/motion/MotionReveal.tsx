"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { variants } from "./motionVariants";

interface MotionRevealProps {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    delay?: number;
    once?: boolean;
    threshold?: number;
    className?: string;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
    children,
    variant = "fadeUp",
    delay = 0,
    once = true,
    threshold = 0.2,
    className = "",
}) => {
    const shouldReduceMotion = useReducedMotion();
    const selectedVariant = variants[variant];

    const animationVariants = shouldReduceMotion
        ? {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: { duration: 0.6, delay: 0 }
            },
        }
        : selectedVariant;

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount: threshold }}
            variants={animationVariants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
