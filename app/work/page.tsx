import type { Metadata } from "next";
import Portfolio from "@/components/portfolio/Portfolio";

export const metadata: Metadata = {
  title: "Selected Work & Portfolio — GiantsOfTech",
  description: "Explore GiantsOfTech projects across software platforms, IoT, education, healthcare, websites and interactive experiences. Let's build your next idea.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected Work — GiantsOfTech",
    description: "Good ideas. Real software. Explore our selected projects.",
    url: "/work",
    images: [{ url: "/portfolio/portfolio-social.jpg", width: 1200, height: 630, alt: "GiantsOfTech selected projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work — GiantsOfTech",
    description: "Good ideas. Real software.",
    images: ["/portfolio/portfolio-social.jpg"],
  },
};

export default function WorkPage() {
  return <Portfolio />;
}
