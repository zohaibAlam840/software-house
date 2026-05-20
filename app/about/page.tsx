import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "About — GiantsOfTech | Software Agency Since 2015",
    description:
        "Meet the team behind GiantsOfTech — a software development agency with 9+ years of experience building scalable digital products for startups and enterprises worldwide.",
    openGraph: {
        title: "About GiantsOfTech",
        description: "9+ years of building world-class software products.",
        url: "https://giantsoftech.com/about",
    },
};

const values = [
    {
        icon: "⚡",
        title: "Speed without shortcuts",
        description:
            "We move fast using proven systems — not hacks. Quality is non-negotiable.",
    },
    {
        icon: "🎯",
        title: "Outcome-driven",
        description:
            "We measure success by your results, not by deliverables. Every decision ties back to your goals.",
    },
    {
        icon: "🤝",
        title: "True partnership",
        description:
            "We embed into your team, not just pick up tickets. You get a partner who cares about the product.",
    },
    {
        icon: "🔬",
        title: "Craft & precision",
        description:
            "We sweat the details — from pixel-perfect UI to clean, maintainable code architecture.",
    },
];

const milestones = [
    { year: "2015", event: "Founded in Lahore, Pakistan" },
    { year: "2017", event: "First international client (UK)" },
    { year: "2019", event: "Expanded to mobile app development" },
    { year: "2021", event: "Crossed 30 delivered projects" },
    { year: "2023", event: "Team grew to 15+ specialists" },
    { year: "2026", event: "50+ projects, 3 continents served" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-6">[ ABOUT ]</p>
                <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-zinc-900 mb-8 max-w-3xl">
                    We are{" "}
                    <span className="text-violet-600">GiantsOfTech</span>
                    {" "}—{" "}
                    <span className="font-serif italic font-normal">builders</span>{" "}
                    at heart.
                </h1>
                <p className="max-w-2xl text-base text-zinc-500 leading-relaxed">
                    Since 2015, we&apos;ve been a team of engineers, designers, and
                    strategists obsessed with building digital products that make a real
                    difference. We work with startups, scale-ups, and enterprises across
                    three continents.
                </p>
            </section>

            {/* Values */}
            <section className="px-6 md:px-12 lg:px-20 py-20 max-w-[1400px] mx-auto">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-12 tracking-tight">
                    What we stand for
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v) => (
                        <div
                            key={v.title}
                            className="rounded-2xl border border-zinc-100 bg-zinc-50 p-7 flex flex-col gap-4"
                        >
                            <span className="text-2xl">{v.icon}</span>
                            <h3 className="text-base font-semibold text-zinc-900">{v.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="px-6 md:px-12 lg:px-20 py-20 bg-zinc-950">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-2xl font-semibold text-white mb-14 tracking-tight">
                        Our journey
                    </h2>
                    <div className="flex flex-col gap-0">
                        {milestones.map((m, i) => (
                            <div
                                key={m.year}
                                className="flex items-start gap-8 pb-10 relative"
                            >
                                <div className="flex flex-col items-center gap-0 flex-shrink-0 w-16">
                                    <div className="w-3 h-3 rounded-full bg-violet-500 flex-shrink-0 mt-1" />
                                    {i < milestones.length - 1 && (
                                        <div className="w-px flex-1 bg-zinc-800 mt-1" style={{ minHeight: 40 }} />
                                    )}
                                </div>
                                <div className="pb-4">
                                    <span className="text-xs font-mono text-violet-400 mb-1 block">{m.year}</span>
                                    <p className="text-sm text-zinc-300 font-medium">{m.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="px-6 md:px-12 lg:px-20 py-24 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { n: "50+", label: "Projects Delivered" },
                        { n: "9+", label: "Years Experience" },
                        { n: "15+", label: "Team Members" },
                        { n: "3", label: "Continents Served" },
                    ].map(({ n, label }) => (
                        <div key={label} className="flex flex-col gap-2">
                            <span className="text-5xl font-semibold text-violet-600">{n}</span>
                            <span className="text-xs uppercase tracking-wider text-zinc-400">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
