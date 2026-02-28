"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Hero } from "../components/sections/Hero";
import { ProjectsGrid } from "../components/sections/ProjectsGrid";
import { FeatureShowcase } from "../components/sections/LogoCloud";
import { ServicesSection } from "../components/sections/ServicesSection";
import { Process } from "../components/sections/Process";
import { TeamGrid } from "../components/sections/TeamGrid";
import { ContactCTA } from "../components/sections/ContactCTA";
import { AnimatedDivider } from "../components/motion/AnimatedDivider";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { FAQ } from "../components/sections/FAQ";
import { ContactSection } from "../components/sections/ContactSection";
import { CTABanner } from "../components/sections/CTABanner";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply spring physics for ultra-smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero (0%) -> Project 1 (16.6%) -> ... -> Project 5 (83.3%)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-83.333%"]);

  return (
    <main className="flex min-h-screen flex-col bg-white font-sans">
      {/* Simple Header */}
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-20 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="text-2xl font-black italic tracking-tighter">GiantsOfTech</div>
        <div className="hidden gap-8 text-sm font-semibold uppercase tracking-wider md:flex">
          <a href="/work" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="/services" className="hover:opacity-50 transition-opacity">Services</a>
          <a href="/team" className="hover:opacity-50 transition-opacity">Team</a>
          <a href="/contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
        <div className="block md:hidden">
          <span className="text-xl">Menu</span>
        </div>
      </nav>

      {/* Horizontal Scroll Sections (Hero -> Projects) */}
      <div ref={containerRef} className="relative h-[1000vh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full w-[600vw]"
          >
            <div className="h-full w-screen shrink-0 overflow-hidden">
              <Hero />
            </div>
            <ProjectsGrid />
          </motion.div>
        </div>
      </div>

      {/* Subsequent Sections (Vertical Backdrop) */}
      <div className="relative z-10 bg-white">
        <FeatureShowcase />
        <AnimatedDivider />
        <ServicesSection />
        <AnimatedDivider />
        <Process />
        <AnimatedDivider />
        <CTABanner />
        <AnimatedDivider />
        <WhyChooseUs />
        <AnimatedDivider />
        <ContactSection />
        <AnimatedDivider />
        <FAQ />
        <AnimatedDivider />


        <ContactCTA />
      </div>

      {/* Footer */}
      <footer className="w-full px-6 py-12 md:px-20 bg-black text-zinc-600 text-xs font-medium uppercase tracking-widest border-t border-zinc-900 flex justify-between">
        <span>© 2026 GiantsOfTech</span>
        <div className="flex gap-6">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </main>
  );
}
