import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Services — GiantsOfTech | Web Development, Branding & Digital",
    description:
        "GiantsOfTech offers full-service digital solutions: custom web development, mobile apps, brand identity, UI/UX design, and cloud infrastructure. Explore our services.",
    openGraph: {
        title: "Services — GiantsOfTech",
        description: "Custom software, branding, and digital experiences built for scale.",
        url: "https://giantsoftech.com/services",
    },
};

const services = [
    {
        index: "01",
        title: "Web Development",
        description:
            "High-performance websites and web apps built with Next.js, React, and modern full-stack technologies. From MVPs to enterprise platforms.",
        tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    },
    {
        index: "02",
        title: "Mobile App Development",
        description:
            "Cross-platform iOS and Android apps using React Native and Expo. Clean code, smooth UX, and app store ready.",
        tags: ["React Native", "Expo", "iOS", "Android", "TypeScript"],
    },
    {
        index: "03",
        title: "Brand Identity & Design",
        description:
            "End-to-end brand strategy and visual identity — logo design, typography, color systems, and brand guidelines that stand out.",
        tags: ["Logo Design", "Brand Strategy", "Typography", "UI/UX"],
    },
    {
        index: "04",
        title: "UI/UX Design",
        description:
            "Research-driven design that converts. From wireframes to pixel-perfect Figma prototypes, we craft experiences users love.",
        tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    },
    {
        index: "05",
        title: "E-Commerce Solutions",
        description:
            "Scalable online stores with custom storefronts, payment integrations, and back-office dashboards that grow with your business.",
        tags: ["Shopify", "Stripe", "Custom Storefront", "WooCommerce"],
    },
    {
        index: "06",
        title: "Cloud & DevOps",
        description:
            "CI/CD pipelines, cloud deployment, infrastructure as code, and monitoring — so your product ships fast and stays reliable.",
        tags: ["AWS", "Vercel", "Docker", "GitHub Actions", "Monitoring"],
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-6">[ SERVICES ]</p>
                <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-zinc-900 mb-8">
                    What we{" "}
                    <span className="font-serif italic font-normal">do best.</span>
                </h1>
                <p className="max-w-xl text-base text-zinc-500 leading-relaxed">
                    From concept to launch, we cover the full spectrum of digital product
                    development — design, engineering, and strategy under one roof.
                </p>
            </section>

            {/* Services grid */}
            <section className="px-6 md:px-12 lg:px-20 pb-32 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s) => (
                        <article
                            key={s.index}
                            className="group rounded-2xl border border-zinc-100 bg-zinc-50 p-8 hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-300 flex flex-col gap-6"
                        >
                            <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-600">
                                {s.index}
                            </span>
                            <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-white transition-colors">
                                {s.title}
                            </h2>
                            <p className="text-sm text-zinc-500 group-hover:text-zinc-400 leading-relaxed flex-1 transition-colors">
                                {s.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {s.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-white group-hover:bg-zinc-800 border border-zinc-200 group-hover:border-zinc-700 px-3 py-1 text-[11px] font-medium text-zinc-600 group-hover:text-zinc-300 transition-all"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-zinc-950 px-6 md:px-12 lg:px-20 py-24 text-center">
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">
                    Ready to build something{" "}
                    <span className="text-violet-400 font-serif italic font-normal">great?</span>
                </h2>
                <p className="text-zinc-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
                    Tell us about your project and we&apos;ll get back to you within 24 hours.
                </p>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
                >
                    Start a conversation →
                </a>
            </section>

            <Footer />
        </main>
    );
}
