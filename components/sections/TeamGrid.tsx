import React from "react";
import { MotionReveal } from "../motion/MotionReveal";
import { MotionList, MotionListItem } from "../motion/MotionList";

const team = [
    { name: "Alex Rivera", role: "Creative Director" },
    { name: "Sarah Chen", role: "Tech Lead" },
    { name: "Marcus Thorne", role: "Product Strategist" },
    { name: "Elena Volkov", role: "UI/UX Designer" },
];

export const TeamGrid = () => {
    return (
        <section className="w-full px-6 py-32 md:px-20 bg-white">
            <div className="mb-20 flex flex-col items-start gap-8">
                <MotionReveal variant="fadeUp" className="max-w-2xl">
                    <h2 className="mb-6 text-sm font-semibold text-zinc-500 uppercase tracking-widest">Our Team</h2>
                    <p className="text-3xl font-medium leading-tight md:text-5xl">
                        We are a collective for global creative talent seeking safe harbour.
                    </p>
                </MotionReveal>
            </div>

            <MotionList className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((member, index) => (
                    <MotionListItem key={index} className="group flex flex-col items-center text-center">
                        <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-900 shadow-inner group-hover:scale-95 transition-transform duration-500">
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-30">Team Photo</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                        <p className="text-sm text-zinc-500">{member.role}</p>
                    </MotionListItem>
                ))}
            </MotionList>

            <MotionReveal variant="fadeUp" delay={0.4} className="mt-20 flex justify-center">
                <a href="/about" className="group flex items-center gap-2 text-lg font-semibold transition-all hover:gap-4">
                    Learn more about us <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
            </MotionReveal>
        </section>
    );
};
