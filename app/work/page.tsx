import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Our Work — GiantsOfTech | Portfolio of Digital Projects",
    description:
        "Browse the GiantsOfTech portfolio — web apps, mobile products, e-commerce stores, and brand identities built for clients worldwide.",
    openGraph: {
        title: "Portfolio — GiantsOfTech",
        description: "50+ projects built across web, mobile, and branding.",
        url: "https://giantsoftech.com/work",
    },
};

const projects = [
    {
        title: "LegalFlow Dashboard",
        category: "Web App · SaaS",
        description: "Case management platform for a UK legal firm — real-time collaboration, document management, and client portal.",
        tags: ["Next.js", "PostgreSQL", "Tailwind"],
        image: "/pro/d1.jpeg",
        accent: "bg-violet-50",
    },
    {
        title: "Snack&Go Mobile",
        category: "Mobile App · Food Tech",
        description: "On-demand food delivery app for a regional chain. 10k+ downloads in the first month.",
        tags: ["React Native", "Expo", "Stripe"],
        image: "/pro/r1.png",
        accent: "bg-orange-50",
    },
    {
        title: "Luxe Brand Identity",
        category: "Branding · Fashion",
        description: "Full brand identity including logo, typography system, and packaging design for a premium fashion label.",
        tags: ["Brand Strategy", "Logo", "Print"],
        image: "/pro/l1.png",
        accent: "bg-pink-50",
    },
    {
        title: "PropFinder Platform",
        category: "Web App · Real Estate",
        description: "End-to-end property search and listing platform with map views, filters, and mortgage calculators.",
        tags: ["Next.js", "Mapbox", "Prisma"],
        image: "/pro/s1.png",
        accent: "bg-emerald-50",
    },
    {
        title: "MedConnect Portal",
        category: "Web App · HealthTech",
        description: "Doctor-patient portal with appointment scheduling, video consultations, and prescription management.",
        tags: ["React", "Node.js", "WebRTC"],
        image: "/pro/d2.jpeg",
        accent: "bg-blue-50",
    },
    {
        title: "ShopEase Commerce",
        category: "E-Commerce",
        description: "Custom Shopify storefront with 3D product viewer, personalisation engine, and multi-currency checkout.",
        tags: ["Shopify", "Three.js", "Stripe"],
        image: "/pro/d3.jpeg",
        accent: "bg-yellow-50",
    },
];

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-6">[ WORK ]</p>
                <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-zinc-900 mb-8">
                    Selected{" "}
                    <span className="font-serif italic font-normal text-violet-600">projects.</span>
                </h1>
                <p className="max-w-lg text-base text-zinc-500 leading-relaxed">
                    A curated selection of recent work across web, mobile, and branding.
                    Every project is built to solve a real problem.
                </p>
            </section>

            {/* Projects */}
            <section className="px-6 md:px-12 lg:px-20 pb-32 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <article
                            key={p.title}
                            className="group rounded-3xl overflow-hidden border border-zinc-100 bg-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                        >
                            {/* Image */}
                            <div className={`relative h-56 w-full ${p.accent} overflow-hidden`}>
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col gap-3">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                                    {p.category}
                                </span>
                                <h2 className="text-lg font-semibold text-zinc-900 leading-tight">
                                    {p.title}
                                </h2>
                                <p className="text-sm text-zinc-500 leading-relaxed">{p.description}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {p.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-violet-600 px-6 md:px-12 lg:px-20 py-24 text-center">
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">
                    Your project could be{" "}
                    <span className="font-serif italic font-normal">next.</span>
                </h2>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-violet-700 hover:bg-zinc-100 transition-colors"
                >
                    Let&apos;s talk →
                </a>
            </section>

            <Footer />
        </main>
    );
}
