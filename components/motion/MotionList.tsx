"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "./motionVariants";

interface MotionListProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    once?: boolean;
}

export const MotionListItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = "",
}) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : staggerItem}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const MotionList = ({
    children,
    className = "",
    delay = 0,
    once = true,
}: MotionListProps) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount: 0.1 }}
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : staggerContainer}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
