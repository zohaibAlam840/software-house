"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "./ProjectsGrid";

export function ProjectsCarousel() {
    const [activeIndex, setActiveIndex] = useState(2);

    const visibleProjects = projects;

    return (
        <motion.section
            id="work"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            style={{
                width: "100%",
                padding: "72px 24px 96px",
                background: "#d7dde0",
                boxSizing: "border-box",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    width: "min(1120px, 100%)",
                    margin: "0 auto",
                    background: "#f6f6f4",
                    borderRadius: "10px",
                    padding: "20px 24px 24px",
                    boxShadow: "0 26px 60px rgba(0,0,0,0.18)",
                    border: "1px solid rgba(0,0,0,0.04)",
                }}
            >
                {/* Top bar */}


                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
                    style={{
                        marginBottom: "18px",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: "#111",
                        letterSpacing: "-0.02em",
                    }}
                >
                    SOME OF OUR PROJECTS
                </motion.div>

                {/* Project columns — horizontally scrollable */}
                <div
                    style={{
                        overflowX: "auto",
                        overflowY: "visible",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        paddingBottom: "4px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "14px",
                            width: "max-content",
                            alignItems: "flex-end",
                        }}
                    >
                        {visibleProjects.map((project, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <motion.div
                                    key={project.title}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: isActive ? 1 : 0.55, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.25 + index * 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={{
                                        width: isActive ? "240px" : "170px",
                                        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                                        minHeight: "540px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                        flexShrink: 0,
                                        opacity: isActive ? 1 : 0.55,
                                    }}
                                >
                                    {/* Top visual area */}
                                    <div
                                        style={{
                                            height: "430px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isActive ? (
                                                <motion.div
                                                    key="image"
                                                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                                    style={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "100%",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <Image
                                                        src={project.images[0]}
                                                        alt={project.title}
                                                        fill
                                                        sizes="(max-width: 900px) 100vw, 25vw"
                                                        style={{ objectFit: "cover" }}
                                                    />

                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            inset: 0,
                                                            background:
                                                                "linear-gradient(to top, rgba(0,0,0,0.56), rgba(0,0,0,0.08) 45%, transparent)",
                                                        }}
                                                    />

                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            inset: 0,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: "7rem",
                                                            fontWeight: 300,
                                                            color: "rgba(255,255,255,0.92)",
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="number"
                                                    initial={{ opacity: 0, scale: 0.96 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.96 }}
                                                    transition={{ duration: 0.2 }}
                                                    style={{
                                                        fontSize: "7.2rem",
                                                        lineHeight: 1,
                                                        fontWeight: 300,
                                                        color: "#111",
                                                    }}
                                                >
                                                    {index + 1}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Bottom content */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-end",
                                            justifyContent: "space-between",
                                            gap: "14px",
                                            paddingTop: "18px",
                                        }}
                                    >
                                        <div style={{ minWidth: 0 }}>
                                            <h3
                                                style={{
                                                    margin: "0 0 4px",
                                                    fontSize: "1.05rem",
                                                    fontWeight: 500,
                                                    color: isActive ? (index === activeIndex ? "#fff" : "#111") : "#111",
                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {project.title}
                                            </h3>

                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: "0.88rem",
                                                    color: "#555",
                                                }}
                                            >
                                                {project.category}
                                            </p>
                                        </div>

                                        {project.link && project.link !== "#" ? (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open ${project.title}`}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    width: "34px",
                                                    height: "34px",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#111",
                                                    textDecoration: "none",
                                                    fontSize: "1.5rem",
                                                    lineHeight: 1,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                ↗
                                            </a>
                                        ) : (
                                            <span
                                                style={{
                                                    width: "34px",
                                                    height: "34px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#111",
                                                    fontSize: "1.5rem",
                                                    lineHeight: 1,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                ↗
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            <style>{`
                div::-webkit-scrollbar { display: none; }
            `}</style>
            <style>{`
                @media (max-width: 960px) {
                    .projects-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }

                @media (max-width: 640px) {
                    .projects-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </motion.section>
    );
}