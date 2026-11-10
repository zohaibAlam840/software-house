import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/components/portfolio/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study | GiantsOfTech`,
    description: `${project.tagline} ${project.description}`,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${project.title} — GiantsOfTech Case Study`,
      description: project.description,
      url: `/work/${project.id}`,
      images: [
        {
          url: project.image,
          width: 1440,
          height: 1000,
          alt: `${project.title} interface preview`,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projectIndex = projects.findIndex((p) => p.id === id);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#dededb] text-[#141413] font-sans selection:bg-[#e64b36] selection:text-white">
      {/* Top Header */}
      <header className="h-20 sm:h-24 px-6 md:px-16 flex items-center justify-between border-b border-[#c8c8c0] bg-[#dededb]/90 backdrop-blur sticky top-0 z-40">
        <Link href="/" className="text-lg font-black tracking-tighter leading-none hover:text-[#e64b36] transition-colors">
          GIANTS<span className="block text-xs font-bold tracking-widest text-zinc-500">OFTECH®</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/work"
            className="text-xs font-mono tracking-wider uppercase border border-[#141413] px-4 py-2 rounded-full hover:bg-[#141413] hover:text-white transition-all"
          >
            ← Back to All Projects
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase bg-[#e64b36] text-white px-5 py-2 rounded-full hover:bg-[#d03d29] transition-all"
          >
            Let&apos;s talk ↗
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-16 pt-12 pb-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between font-mono text-xs text-[#72726a] tracking-wider mb-6">
          <span>[ PROJECT {String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ]</span>
          <span className="uppercase">{project.category} · {project.discipline}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-700">
              &ldquo;{project.tagline}&rdquo;
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs bg-white/60 p-6 rounded-2xl border border-[#c8c8c0]">
            <div>
              <span className="text-zinc-500 block uppercase">Discipline</span>
              <span className="font-bold text-zinc-900">{project.discipline}</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase">Category</span>
              <span className="font-bold text-zinc-900">{project.category}</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase">Core Tech</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.stack.map(tech => (
                  <span key={tech} className="bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* High-Resolution Screenshot Showcase */}
        <div className="bg-[#181816] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
          <div className="px-6 py-3 bg-[#232320] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-zinc-400">
              giantsoftech.com/selected-work/{project.id}
            </span>
            <div className="w-12" />
          </div>
          <div
            className="p-4 sm:p-8 md:p-12 flex items-center justify-center transition-colors"
            style={{ backgroundColor: project.color }}
          >
            <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={project.image}
                alt={`${project.title} full interface preview and screenshot`}
                width={1440}
                height={1000}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <p className="font-mono text-xs text-zinc-500 mt-3 text-right">
          {project.note}
        </p>
      </section>

      {/* Case Study Details Grid */}
      <section className="bg-[#f1f0eb] border-y border-[#c8c8c0] py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Project Overview & Approach */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                01 / The Challenge &amp; Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                What we built
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-700">
                {project.description}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                02 / Strategic Approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                How we solved it
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-700">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Right Column: Features & Technology */}
          <div className="lg:col-span-5 space-y-8 bg-white/70 p-8 rounded-2xl border border-[#c8c8c0]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-2">
                03 / Key Capabilities
              </span>
              <h3 className="text-xl font-bold mb-4">
                What&apos;s inside the system
              </h3>
              <ul className="space-y-3 font-medium text-sm text-zinc-800">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className="text-[#e64b36] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-zinc-200">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-3">
                04 / Built With
              </span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border border-zinc-400 bg-white text-zinc-800 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next Project Switcher */}
      <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href={`/work/${prevProject.id}`}
          className="group p-6 rounded-2xl border border-[#c8c8c0] bg-white/60 hover:bg-white transition-all flex flex-col justify-between"
        >
          <span className="font-mono text-xs text-zinc-500 mb-2">← PREVIOUS CASE STUDY</span>
          <div>
            <h4 className="text-2xl font-black group-hover:text-[#e64b36] transition-colors">
              {prevProject.title}
            </h4>
            <p className="text-xs text-zinc-600 mt-1">{prevProject.discipline}</p>
          </div>
        </Link>
        <Link
          href={`/work/${nextProject.id}`}
          className="group p-6 rounded-2xl border border-[#c8c8c0] bg-white/60 hover:bg-white transition-all flex flex-col justify-between text-right"
        >
          <span className="font-mono text-xs text-zinc-500 mb-2">NEXT CASE STUDY →</span>
          <div>
            <h4 className="text-2xl font-black group-hover:text-[#e64b36] transition-colors">
              {nextProject.title}
            </h4>
            <p className="text-xs text-zinc-600 mt-1">{nextProject.discipline}</p>
          </div>
        </Link>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-[#e64b36] text-white px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-2 text-white/80">
              [ NEXT UP: YOUR PROJECT ]
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              HAVE A SIMILAR CHALLENGE?
            </h2>
            <p className="text-base text-white/90 mt-2 max-w-xl">
              Let&apos;s build something meaningful together. We turn complex requirements into clear, production-ready software.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-[#141413] rounded-full font-bold text-sm tracking-wide hover:bg-black hover:text-white transition-all shadow-xl whitespace-nowrap"
          >
            Start a Conversation ↗
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-[#c8c8c0] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-600">
        <span>GIANTSOFTECH® — DESIGN &amp; DEVELOPMENT STUDIO</span>
        <Link href="/work" className="hover:text-black transition-colors">
          Back to Selected Work ↑
        </Link>
      </footer>
    </main>
  );
}

