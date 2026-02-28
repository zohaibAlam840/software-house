import Image from "next/image";
import React from "react";
import { MotionReveal } from "../motion/MotionReveal";

export const projects = [
    {
        title: "Leyloon",
        category: "Luxury Jewelry / E-commerce",
        summary: "Elevating luxury e-commerce through immersive storytelling and trust-driven UX.",
        tags: ["Luxury", "Next.js", "Performance"],
        images: ["/pro/l1.png", "/pro/l2.png", "/pro/l4.png"],
        link: "https://leyloon.com/",
        isMobile: false,
    },
    {
        title: "ArabRides",
        category: "Mobility / Rental Platform",
        summary: "Streamlining the future of mobility with a conversion-first booking ecosystem.",
        tags: ["Booking", "Mobile-First", "UX"],
        images: ["/pro/r1.png", "/pro/r2.png", "/pro/r4.png"],
        link: "https://www.arabrides.com/",
        isMobile: false,
    },
    {
        title: "EduPilot365",
        category: "EdTech / SaaS Dashboards",
        summary: "Orchestrating educational excellence with intuitive, role-based dashboards.",
        tags: ["EdTech", "SaaS", "Accessibility"],
        images: ["/pro/s1.png", "/pro/s2.png", "/pro/s3.png"],
        link: "https://www.edupilot365.com/",
        isMobile: false,
    },
    {
        title: "Daily Digest",
        category: "AI News / Mobile App",
        summary: "Revolutionizing news consumption with AI-powered personalized audio digests.",
        tags: ["AI", "React Native", "Audio UX"],
        images: ["/pro/d1.jpeg", "/pro/d2.jpeg", "/pro/d3.jpeg"],
        link: "#",
        isMobile: true,
    },
    {
        title: "AgroConecta",
        category: "Agriculture / Marketplace",
        summary: "Connecting local agriculture with a subscription-driven mobile marketplace.",
        tags: ["Marketplace", "React Native", "Fintech"],
        images: ["/pro/g2.webp", "/pro/g4.webp", "/pro/g8.png"],
        link: "#",
        isMobile: true,
    },
];

interface ProjectSlideProps {
    project: typeof projects[0];
    index: number;
}

export const ProjectSlide = ({ project, index }: ProjectSlideProps) => {
    return (
        <div className="h-[100svh] w-screen shrink-0 overflow-hidden px-6 md:px-20 pt-20 pb-12 md:pt-32 md:pb-20 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center h-full max-h-[100svh]">
                {/* Text Side (Left) */}
                <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-start mt-4 md:mt-0">
                    <MotionReveal variant="fadeUp">
                        <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2 md:mb-4 block">Project 0{index + 1}</span>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-2 md:mb-6">
                            {project.title}
                        </h2>
                        <p className="text-lg md:text-2xl text-zinc-600 leading-relaxed mb-4 md:mb-8 max-w-xl">
                            {project.summary}
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-4 text-lg font-bold hover:gap-6 transition-all"
                        >
                            Explore Project <span className="transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </MotionReveal>
                </div>

                {/* Visual Side (Right) - Triptych Layout */}
                <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
                    {project.isMobile ? (
                        /* Mobile Portrait Layout */
                        <div className="relative w-full max-w-[220px] md:max-w-[450px] aspect-[4/5] flex items-center justify-center">
                            {/* Main Center Image */}
                            <MotionReveal variant="fadeUp" delay={0.2} className="absolute inset-x-[20%] inset-y-0 z-20 shadow-2xl rounded-[2.5rem] overflow-hidden border-8 border-zinc-900 bg-black">
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </MotionReveal>

                            {/* Right Supporting Image */}
                            <MotionReveal variant="fadeUp" delay={0.4} className="absolute right-0 top-[10%] w-[35%] aspect-[9/16] z-10 shadow-xl rounded-[1.5rem] overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-700 opacity-60 scale-90 -rotate-6">
                                <Image
                                    src={project.images[1]}
                                    alt={`${project.title} detail`}
                                    fill
                                    className="object-cover"
                                />
                            </MotionReveal>

                            {/* Left Supporting Image */}
                            <MotionReveal variant="fadeUp" delay={0.6} className="absolute left-0 bottom-[10%] w-[35%] aspect-[9/16] z-10 shadow-xl rounded-[1.5rem] overflow-hidden border-4 border-white opacity-60 scale-90 rotate-6">
                                <Image
                                    src={project.images[2]}
                                    alt={`${project.title} interface`}
                                    fill
                                    className="object-cover"
                                />
                            </MotionReveal>
                        </div>
                    ) : (
                        /* Desktop Landscape Layout */
                        <div className="relative w-full aspect-[4/3] max-h-[30vh] md:max-h-[60vh]">
                            {/* Main Center Image */}
                            <MotionReveal variant="fadeUp" delay={0.2} className="absolute left-[10%] top-[10%] w-[70%] h-[80%] z-20 shadow-2xl rounded-2xl overflow-hidden border border-zinc-100">
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </MotionReveal>

                            {/* Top-Right Supporting Image */}
                            <MotionReveal variant="fadeUp" delay={0.4} className="absolute right-0 top-0 w-[45%] h-[50%] z-10 shadow-xl rounded-2xl overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={project.images[1]}
                                    alt={`${project.title} detail`}
                                    fill
                                    className="object-cover"
                                />
                            </MotionReveal>

                            {/* Bottom-Left Supporting Image */}
                            <MotionReveal variant="fadeUp" delay={0.6} className="absolute left-0 bottom-0 w-[40%] h-[45%] z-30 shadow-xl rounded-2xl overflow-hidden border-4 border-white">
                                <Image
                                    src={project.images[2]}
                                    alt={`${project.title} interface`}
                                    fill
                                    className="object-cover"
                                />
                            </MotionReveal>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ProjectsGrid = () => {
    return (
        <div className="flex h-full">
            {projects.map((project, index) => (
                <ProjectSlide key={project.title} project={project} index={index} />
            ))}
        </div>
    );
};
