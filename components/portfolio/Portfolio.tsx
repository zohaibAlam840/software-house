"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { projects, type Project } from "./projects";
import styles from "./Portfolio.module.css";

const categories = ["All work", "Platforms", "Websites"] as const;
const angle = 360 / projects.length;
const wrap = (n: number) => ((n % projects.length) + projects.length) % projects.length;

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <path d="M26 3 45 14v24L26 49 7 38V14L26 3Z" stroke="currentColor" strokeWidth="3" />
      <path d="M34 18a12 12 0 1 0 2 16V25H25v6h5v1a6 6 0 1 1-1-11l5-3Z" fill="currentColor" />
    </svg>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Portfolio() {
  const [step, setStep] = useState(0);
  const [drag, setDrag] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number]>("All work");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Software Platform / SaaS",
    details: "",
  });
  const [contactStatus, setContactStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");
  const [contactError, setContactError] = useState("");

  const dialog = useRef<HTMLDialogElement>(null);
  const pointer = useRef<{ x: number; id: number; project?: string } | null>(null);

  const active = projects[wrap(step)];
  const filtered = projects.filter(p => category === "All work" || p.category === category);
  const visible = category === "All work" && !expanded ? filtered.slice(0, 6) : filtered;

  // Auto-rotation effect: automatically rotates by default, pauses on hover, drag, or modal open
  useEffect(() => {
    if (isHovered || isDragging || selected !== null) return;
    const timer = setInterval(() => {
      setStep(s => s + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, selected]);

  // Modal lifecycle and keyboard controls
  useEffect(() => {
    if (!selected) return;
    const el = dialog.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (el && !el.open) el.showModal();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelected(null);
      } else if (e.key === "ArrowLeft") {
        const curIdx = projects.findIndex(p => p.id === selected?.id);
        const prevIdx = wrap(curIdx - 1);
        setSelected(projects[prevIdx]);
        setStep(prevIdx);
      } else if (e.key === "ArrowRight") {
        const curIdx = projects.findIndex(p => p.id === selected?.id);
        const nextIdx = wrap(curIdx + 1);
        setSelected(projects[nextIdx]);
        setStep(nextIdx);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      if (el?.open) el.close();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  function beginDrag(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    setIsDragging(true);
    pointer.current = {
      x: e.clientX,
      id: e.pointerId,
      project: (e.target as HTMLElement).closest<HTMLElement>("[data-project]")?.dataset.project,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function moveDrag(e: PointerEvent<HTMLDivElement>) {
    if (!pointer.current) return;
    setDrag((e.clientX - pointer.current.x) * 0.18);
  }

  function finishDrag(e: PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    if (!pointer.current) return;
    const distance = e.clientX - pointer.current.x;
    if (Math.abs(distance) > 28) {
      setStep(s => s - Math.sign(distance) * Math.max(1, Math.round(Math.abs(distance) / 110)));
    } else if (pointer.current.project) {
      const targetProject = projects.find(p => p.id === pointer.current?.project);
      if (targetProject) {
        const targetIdx = projects.findIndex(p => p.id === targetProject.id);
        const cardDistance = Math.min(wrap(targetIdx - step), wrap(step - targetIdx));
        if (cardDistance === 0) {
          setSelected(targetProject);
        } else {
          setStep(targetIdx);
        }
      }
    }
    pointer.current = null;
    setDrag(0);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactStatus("LOADING");
    setContactError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setContactStatus("SUCCESS");
      setContactForm({
        name: "",
        email: "",
        phone: "",
        service: "Software Platform / SaaS",
        details: "",
      });
    } catch (err: unknown) {
      setContactStatus("ERROR");
      setContactError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className={styles.page}>
      <a href="#selected-work" className={styles.skip}>
        Skip to projects
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="GiantsOfTech home">
          GIANTS<span>OFTECH®</span>
        </Link>
        <nav className={styles.nav} aria-label="Portfolio navigation">
          <a href="#selected-work">The work <span>{projects.length}</span></a>
          <Link href="/about">The studio</Link>
        </nav>
        <Link href="/contact" className={styles.headerContact}>
          Let&apos;s talk <Arrow diagonal />
        </Link>
      </header>

      <section className={styles.hero} aria-labelledby="portfolio-title">
        <div className={styles.registrationTop} aria-hidden="true">
          <span>+</span><span>+</span><span>+</span><span>+</span>
        </div>
        <div className={styles.introLine}>
          <p>WELCOME<br />TO OUR</p>
          <Mark className={styles.heroMark} />
        </div>
        <div className={styles.redBar} aria-hidden="true" />
        <div className={styles.typeScene}>
          <span className={styles.outlineType} aria-hidden="true">PORTFOLIO</span>
          <h1 id="portfolio-title">PORTFOLIO</h1>
        </div>
        <div className={styles.heroMeta}>
          <span>INDEPENDENT MINDS. SHARED AMBITION.</span>
          <span>DESIGN &amp; DEVELOPMENT STUDIO</span>
        </div>
        <div className={styles.registrationBottom} aria-hidden="true">
          <span>+</span><span>+</span><span>+</span><span>+</span>
        </div>

        {/* Rotary Fan Controls */}
        <div className={styles.fanControls}>
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            aria-label="Previous project"
            className={styles.fanArrowBtn}
          >
            ◀
          </button>
          <span className={styles.fanControlsLabel}>
            TAKE A LOOK AROUND <span aria-hidden="true">↓</span>
          </span>
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            aria-label="Next project"
            className={styles.fanArrowBtn}
          >
            ▶
          </button>
        </div>

        {/* Fan Stage: 3D rotating wheel of bespoke project cards */}
        <div
          className={`${styles.fanStage} ${drag ? styles.dragging : ""}`}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={() => { pointer.current = null; setDrag(0); setIsDragging(false); }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.wheel} style={{ transform: `rotate(${-step * angle + drag}deg)` }}>
            {projects.map((p, i) => {
              const distance = Math.min(wrap(i - step), wrap(step - i));
              const isCenter = distance === 0;

              return (
                <div
                  key={p.id}
                  className={`${styles.fanSlot} ${isCenter ? styles.slotCenter : ""}`}
                  style={{
                    transform: `rotate(${i * angle}deg)`,
                    zIndex: 25 - distance,
                  }}
                >
                  <div
                    role="button"
                    tabIndex={Math.abs(distance) <= 2 ? 0 : -1}
                    data-project={p.id}
                    aria-label={`Project: ${p.title} (${p.category}) - ${isCenter ? "Click to view case study details" : "Click to rotate into spotlight"}`}
                    className={`${styles.fanCard} ${isCenter ? styles.cardCenter : ""}`}
                    style={{
                      "--card-color": p.color,
                      "--card-ink": p.ink,
                    } as CSSProperties}
                    onClick={() => {
                      if (isCenter) {
                        setSelected(p);
                      } else {
                        setStep(i);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(p);
                      }
                    }}
                  >
                    {/* Card Header: Category & Spotlight Tag */}
                    <div className={styles.cardHeader}>
                      <span className={styles.fanCategory}>
                        {p.category} / {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.cardStatusPill}>
                        <span className={styles.cardDot} aria-hidden="true" />
                        <span>{isCenter ? "SPOTLIGHT" : "CASE STUDY"}</span>
                      </span>
                    </div>

                    {/* Card Body: Discipline, Project Name, Tagline & Summary */}
                    <div className={styles.cardBody}>
                      <span className={styles.cardDiscipline}>{p.discipline}</span>
                      <h3 className={styles.fanTitle}>{p.title}</h3>
                      <p className={styles.cardTagline}>&ldquo;{p.tagline}&rdquo;</p>
                      <p className={styles.cardSummary}>{p.description}</p>
                    </div>

                    {/* Card Stack Badges */}
                    <div className={styles.cardStack}>
                      {p.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.cardStackBadge}>{tech}</span>
                      ))}
                      {p.stack.length > 3 && (
                        <span className={styles.cardStackBadge}>+{p.stack.length - 3}</span>
                      )}
                    </div>

                    {/* Card Bottom: Explore CTA */}
                    <div className={styles.fanBottom}>
                      <button
                        type="button"
                        className={styles.cardExploreBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(p);
                        }}
                        aria-label={`View details for ${p.title}`}
                      >
                        <span>{isCenter ? "VIEW CASE DETAILS" : "EXPLORE PROJECT"}</span>
                        <Arrow diagonal />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.orbitLabel} aria-hidden="true">
            <span>SOFTWARE WITH A POINT OF VIEW</span>
            <Mark />
            <span>GIANTS OF TECH</span>
          </div>
        </div>

        {/* Readout bar */}
        <div className={styles.carouselReadout}>
          <button
            type="button"
            className={styles.readoutProjectBtn}
            onClick={() => setSelected(active)}
            aria-label={`Open details for active project: ${active.title}`}
          >
            <span>{String(wrap(step) + 1).padStart(2, "0")} / {projects.length}</span>
            <strong>{active.title}</strong>
            <span className={styles.readoutTagline}>— {active.tagline}</span>
          </button>
          <div className={styles.readoutHints}>
            <span>DRAG TO ROTATE · CLICK CARD TO VIEW DETAILS</span>
          </div>
        </div>
      </section>

      {/* Selected Work Grid Section with high-res screenshots */}
      <section id="selected-work" className={styles.workSection} aria-labelledby="work-title">
        <div className={styles.sectionEyebrow}>
          <span>[ SELECTED WORK ]</span>
          <span>IDEAS MADE REAL ↙</span>
        </div>
        <div className={styles.workIntro}>
          <h2 id="work-title">
            GOOD IDEAS.<br /><span>REAL SOFTWARE.</span>
          </h2>
          <p>
            Tools for the everyday.<br />
            Platforms for the complex.<br />
            A few things we&apos;ve brought to life.
          </p>
        </div>
        <div className={styles.filterBar} aria-label="Filter projects">
          <div>
            {categories.map(c => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                className={category === c ? styles.activeFilter : ""}
                onClick={() => { setCategory(c); setExpanded(false); }}
              >
                {c}
                <sup>
                  {c === "All work" ? projects.length : projects.filter(p => p.category === c).length}
                </sup>
              </button>
            ))}
          </div>
          <span aria-live="polite">{String(filtered.length).padStart(2, "0")} PROJECTS</span>
        </div>
        <div className={styles.projectGrid}>
          {visible.map((p, i) => (
            <article className={styles.project} key={p.id}>
              <button
                type="button"
                className={styles.projectImage}
                style={{ background: p.color }}
                onClick={() => setSelected(p)}
                aria-label={`Explore ${p.title}`}
              >
                <span className={styles.projectIndex} style={{ color: p.ink }}>
                  {String(projects.indexOf(p) + 1).padStart(2, "0")} / GIANTS OF TECH
                </span>
                <Image
                  src={p.image}
                  alt={`${p.title} project interface`}
                  width={1440}
                  height={1000}
                  sizes="(max-width: 700px) 100vw, 50vw"
                  loading="lazy"
                />
                <span className={styles.projectExplore}>
                  EXPLORE PROJECT <Arrow diagonal />
                </span>
              </button>
              <div className={styles.projectCaption}>
                <div>
                  <h3>
                    <button type="button" onClick={() => setSelected(p)}>{p.title}</button>
                  </h3>
                  <p>{p.discipline}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </div>
              {i === 0 && p.id === "i2i" && (
                <p className={styles.demoCaption}>TRB141 valve-control dashboard · demo environment</p>
              )}
            </article>
          ))}
        </div>
        {category === "All work" && (
          <button
            type="button"
            className={styles.moreButton}
            onClick={() => setExpanded(s => !s)}
          >
            {expanded ? "SHOW SELECTED PROJECTS" : `EXPLORE ALL ${projects.length} PROJECTS`}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        )}
      </section>

      <section className={styles.studioStrip}>
        <Mark />
        <p>
          Different projects.<br />
          <strong>The same attention to detail.</strong>
        </p>
        <Link href="/about">MEET THE STUDIO <Arrow diagonal /></Link>
      </section>

      <section id="contact-section" className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.contactTop}>
          <span>[ NEXT UP: YOUR IDEA ]</span>
          <span>LET&apos;S MAKE SOMETHING GOOD.</span>
        </div>

        <div className={styles.contactGrid}>
          {/* Left Column: Heading, pitch & quick contacts */}
          <div className={styles.contactLeft}>
            <h2 id="contact-title" className={styles.contactHeading}>
              HAVE SOMETHING<br />IN MIND?
            </h2>
            <p className={styles.contactPitch}>
              Tell us about your project, idea, or challenge. Our team reviews every inquiry and will get back to you within 24 hours.
            </p>

            <div className={styles.contactMetaList}>
              <div className={styles.contactMetaItem}>
                <span className={styles.contactMetaLabel}>Official Email</span>
                <a href="mailto:contact@giantsoftech.com" className={styles.contactMetaLink}>
                  contact@giantsoftech.com <Arrow diagonal />
                </a>
              </div>
              <div className={styles.contactMetaItem}>
                <span className={styles.contactMetaLabel}>Studio Location</span>
                <span className={styles.contactMetaText}>Lahore, Pakistan · Worldwide Remote</span>
              </div>
              <div className={styles.contactMetaItem}>
                <span className={styles.contactMetaLabel}>Response Window</span>
                <span className={styles.contactMetaText}>Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.contactRight}>
            {contactStatus === "SUCCESS" ? (
              <div className={styles.contactSuccessBox}>
                <div className={styles.successBadge}>✓ SENT</div>
                <h3 className={styles.successTitle}>Inquiry Sent Successfully!</h3>
                <p className={styles.successText}>
                  Thank you for reaching out! We have received your inquiry and our team will be in touch within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setContactStatus("IDLE")}
                  className={styles.sendAnotherBtn}
                >
                  Send another inquiry <Arrow diagonal />
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.formLabel}>Your Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email" className={styles.formLabel}>Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-phone" className={styles.formLabel}>Phone / WhatsApp</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +1 555 0192"
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-service" className={styles.formLabel}>Service Interested In</label>
                    <select
                      id="contact-service"
                      value={contactForm.service}
                      onChange={e => setContactForm({ ...contactForm, service: e.target.value })}
                      className={styles.formSelect}
                    >
                      <option value="Software Platform / SaaS">Software Platform / SaaS</option>
                      <option value="Web Design & Development">Web Design &amp; Development</option>
                      <option value="IoT & Hardware Systems">IoT &amp; Hardware Systems</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="UI/UX & Product Design">UI/UX &amp; Product Design</option>
                      <option value="Other Technical Challenge">Other Technical Challenge</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-details" className={styles.formLabel}>Project Details &amp; Scope *</label>
                  <textarea
                    id="contact-details"
                    required
                    rows={4}
                    placeholder="Briefly describe what you're building, key requirements, or any timeline in mind..."
                    value={contactForm.details}
                    onChange={e => setContactForm({ ...contactForm, details: e.target.value })}
                    className={styles.formTextarea}
                  />
                </div>

                {contactStatus === "ERROR" && (
                  <div className={styles.formError} role="alert">
                    <span>⚠ {contactError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactStatus === "LOADING"}
                  className={styles.formSubmitBtn}
                >
                  <span>{contactStatus === "LOADING" ? "TRANSMITTING..." : "SEND INQUIRY"}</span>
                  <Arrow diagonal />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.contactBottom}>
          <a href="mailto:contact@giantsoftech.com">contact@giantsoftech.com <Arrow diagonal /></a>
          <span>GIANTS OF TECH · FAST RESPONSE GUARANTEED</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/">GIANTSOFTECH®</Link>
        <span>DESIGN. DEVELOP. MAKE A DIFFERENCE.</span>
        <a href="#portfolio-title">BACK TO TOP ↑</a>
      </footer>

      {/* Spotlight Details Dialog: Complete showcase with high-res screenshots and case study data */}
      <dialog
        ref={dialog}
        className={styles.dialog}
        onClose={() => setSelected(null)}
        onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
        aria-labelledby="project-dialog-title"
      >
        {selected && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogHeader}>
              <div className={styles.dialogNav}>
                <button
                  type="button"
                  onClick={() => {
                    const curIdx = projects.findIndex(p => p.id === selected.id);
                    const prevIdx = wrap(curIdx - 1);
                    setSelected(projects[prevIdx]);
                    setStep(prevIdx);
                  }}
                  aria-label="Previous project in spotlight"
                  className={styles.dialogNavBtn}
                >
                  ◀ Prev
                </button>
                <span className={styles.dialogCounter}>
                  {String(projects.findIndex(p => p.id === selected.id) + 1).padStart(2, "0")} / {projects.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const curIdx = projects.findIndex(p => p.id === selected.id);
                    const nextIdx = wrap(curIdx + 1);
                    setSelected(projects[nextIdx]);
                    setStep(nextIdx);
                  }}
                  aria-label="Next project in spotlight"
                  className={styles.dialogNavBtn}
                >
                  Next ▶
                </button>
              </div>
              <div className={styles.dialogHeaderRight}>
                <span className={styles.dialogDiscipline}>{selected.discipline}</span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close project details"
                  className={styles.dialogCloseBtn}
                  autoFocus
                >
                  Close <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>

            <div className={styles.dialogHeading}>
              <p className={styles.dialogEyebrow}>[ PROJECT SPOTLIGHT · {selected.category.toUpperCase()} ]</p>
              <h2 id="project-dialog-title">{selected.title}</h2>
              <p className={styles.dialogTagline}>{selected.tagline}</p>
            </div>

            {/* High-res Screenshot with polished browser frame */}
            <div className={styles.dialogImageWrapper}>
              <div className={styles.dialogBrowserBar}>
                <div className={styles.browserDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.browserUrl}>giantsoftech.com/case-studies/{selected.id}</span>
              </div>
              <div className={styles.dialogImage} style={{ background: selected.color }}>
                <Image
                  src={selected.image}
                  width={1440}
                  height={1000}
                  alt={`${selected.title} interface preview`}
                  sizes="(max-width: 800px) 100vw, 950px"
                  priority
                />
              </div>
            </div>
            <p className={styles.imageNote}>{selected.note}</p>

            <div className={styles.dialogInfo}>
              <div>
                <h3>The project</h3>
                <p>{selected.description}</p>
                <h3>The approach</h3>
                <p>{selected.approach}</p>
              </div>
              <div>
                <h3>What&apos;s inside</h3>
                <ul>
                  {selected.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <h3>Built with</h3>
                <div className={styles.tags}>
                  {selected.stack.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>

            <div className={styles.dialogActions}>
              <Link href={`/work/${selected.id}`} className={styles.dialogCaseLink}>
                Full Case Study Page <Arrow diagonal />
              </Link>
              <Link href="/contact" className={styles.dialogCta}>
                Have a similar challenge? Let&apos;s talk <Arrow diagonal />
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
