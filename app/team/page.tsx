import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TeamPageClient } from "@/components/TeamPageClient";

export const metadata: Metadata = {
    title: "Our Team — GiantsOfTech",
    description:
        "Meet the engineers, designers, and strategists behind GiantsOfTech. A team of specialists united by a passion for building exceptional digital products.",
    openGraph: {
        title: "Our Team — GiantsOfTech",
        description: "The people behind 50+ shipped products and 9+ years of digital craftsmanship.",
        url: "https://giantsoftech.com/team",
    },
};

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-zinc-950 font-sans">
            <Navbar />
            <TeamPageClient />
            <Footer />
        </main>
    );
}
