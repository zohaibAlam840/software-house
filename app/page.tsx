"use client";

import { motion } from "framer-motion";
import { Hero } from "../components/sections/Hero";
import { ProjectsCarousel } from "../components/sections/ProjectsCarousel";
import { FeatureShowcase } from "../components/sections/LogoCloud";
import { ServicesSection } from "../components/sections/ServicesSection";
import { Process } from "../components/sections/Process";
import TeamGrid from "../components/sections/TeamGrid";
import { ContactCTA } from "../components/sections/ContactCTA";
import { AnimatedDivider } from "../components/motion/AnimatedDivider";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { FAQ } from "../components/sections/FAQ";
import { ContactSection } from "../components/sections/ContactSection";
import { CTABanner } from "../components/sections/CTABanner";
import { Navbar } from "../components/Navbar";
import { ContactModal } from "../components/ContactModal";

/** Reusable scroll-triggered reveal wrapper */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <ContactModal />

      {/* Hero — full screen, no animation needed (it's the first thing visible) */}
      <div className="h-screen w-full shrink-0 overflow-hidden">
        <Hero />
      </div>

      {/* Projects Carousel */}
      <ProjectsCarousel />

      {/* Subsequent sections — each wrapped in a scroll-triggered reveal */}
      <div className="relative z-10 bg-white">
        <Reveal><FeatureShowcase /></Reveal>
        <AnimatedDivider />

        <Reveal><ServicesSection /></Reveal>
        <AnimatedDivider />

        <Reveal><Process /></Reveal>
        <AnimatedDivider />

        <Reveal><CTABanner /></Reveal>
        <AnimatedDivider />

        <Reveal><WhyChooseUs /></Reveal>
        <AnimatedDivider />

        <Reveal><TeamGrid /></Reveal>
        <AnimatedDivider />

        <Reveal><ContactSection /></Reveal>
        <AnimatedDivider />

        <Reveal><FAQ /></Reveal>
        <AnimatedDivider />

        <Reveal><ContactCTA /></Reveal>
      </div>

      {/* Footer */}
      <motion.footer
        className="w-full px-6 py-12 md:px-20 bg-black text-zinc-600 text-xs font-medium uppercase tracking-widest border-t border-zinc-900 flex justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span>© 2026 GiantsOfTech</span>
        <div className="flex gap-6">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </motion.footer>
    </main>
  );
}
