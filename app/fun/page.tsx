"use client";

// The original cinematic portfolio is intentionally preserved as the fun edition.

import { useEffect, useRef } from "react";
import { sitePath } from "../site-path";

type Spark = {
  x: number;
  y: number;
  z: number;
  radius: number;
  speed: number;
  phase: number;
  warmth: number;
};

function RedSparkField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let previousTime = performance.now();
    let seed = 48271;

    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const sparkCount = window.matchMedia("(max-width: 680px)").matches ? 78 : 156;
    const sparks: Spark[] = Array.from({ length: sparkCount }, () => ({
      x: random() * 1.7 - 0.85,
      y: random() * 1.25 - 0.63,
      z: random(),
      radius: 0.75 + random() * random() * 8.5,
      speed: 0.000035 + random() * 0.00009,
      phase: random() * Math.PI * 2,
      warmth: random(),
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const recycle = (spark: Spark) => {
      spark.x = random() * 1.7 - 0.85;
      spark.y = random() * 1.25 - 0.63;
      spark.z = 0.02 + random() * 0.08;
      spark.radius = 0.75 + random() * random() * 8.5;
      spark.speed = 0.000035 + random() * 0.00009;
      spark.phase = random() * Math.PI * 2;
      spark.warmth = random();
    };

    const draw = (time: number) => {
      const elapsed = Math.min(40, Math.max(0, time - previousTime));
      previousTime = time;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      sparks.forEach((spark) => {
        if (!reducedMotion.matches) spark.z += spark.speed * elapsed;
        if (spark.z > 1.05) recycle(spark);

        const depth = 0.24 + spark.z * 1.68;
        const previousDepth = 0.24 + Math.max(0, spark.z - spark.speed * elapsed * 12) * 1.68;
        const shimmer = 0.74 + Math.sin(time * 0.003 + spark.phase) * 0.26;
        const drift = Math.sin(time * 0.00045 + spark.phase) * 7 * spark.z;
        const x = width / 2 + spark.x * width * depth + drift;
        const y = height / 2 + spark.y * height * depth;
        const previousX = width / 2 + spark.x * width * previousDepth + drift;
        const previousY = height / 2 + spark.y * height * previousDepth;
        const size = spark.radius * (0.55 + spark.z * 3.25);
        const alpha = Math.min(0.98, (0.26 + spark.z * 0.8) * shimmer);
        const green = Math.round(68 + spark.warmth * 72);
        const blue = Math.round(48 + spark.warmth * 42);

        if (size > 7) {
          const glow = context.createRadialGradient(x, y, 0, x, y, size * 2.6);
          glow.addColorStop(0, `rgba(255, 244, 220, ${alpha})`);
          glow.addColorStop(0.16, `rgba(255, ${green + 65}, ${blue + 45}, ${alpha * 0.9})`);
          glow.addColorStop(0.58, `rgba(255, ${green}, ${blue}, ${alpha * 0.38})`);
          glow.addColorStop(1, "rgba(255, 35, 28, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, size * 2.6, 0, Math.PI * 2);
          context.fill();
        } else {
          context.strokeStyle = `rgba(255, ${green}, ${blue}, ${alpha * 0.78})`;
          context.lineWidth = Math.max(1.1, size * 0.46);
          context.beginPath();
          context.moveTo(previousX, previousY);
          context.lineTo(x, y);
          context.stroke();

          context.fillStyle = `rgba(255, ${green + 50}, ${blue + 36}, ${alpha})`;
          context.fillRect(x - size * 0.45, y - size * 0.45, size * 0.9, size * 0.9);
        }
      });

      context.globalCompositeOperation = "source-over";
      if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    };

    resize();
    draw(previousTime);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="red-spark-field" aria-hidden="true" />;
}

const fieldNotes = [
  {
    label: "Current focus",
    text: "Building TerraAFM — research agents for Earth intelligence.",
  },
  {
    label: "Recent build",
    text: "A climate-science retrieval system grounded in exact evidence.",
  },
  {
    label: "Side quest",
    text: "Computer vision for road-graph extraction from satellite imagery.",
  },
];

const trajectory = [
  {
    index: "01",
    title: "Perception",
    role: "Computer vision",
    description: "Teach machines to recover useful structure from pixels.",
  },
  {
    index: "02",
    title: "Reasoning",
    role: "Research agents",
    description: "Connect tools, evidence, and plans into reliable systems.",
  },
  {
    index: "03",
    title: "Planetary",
    role: "Earth intelligence",
    description: "Build for scientific questions at climate scale.",
  },
];

const projects = [
  {
    index: "01",
    title: "TerraAFM",
    kind: "Research agent / Earth observation",
    description:
      "A system for evidence-grounded reasoning across geospatial tools, Earth data, and scientific questions.",
    tags: ["Agents", "EO", "Multimodal"],
    image: sitePath("/scene-green-pixel.jpg"),
    tone: "green",
  },
  {
    index: "02",
    title: "Climate Science RAG",
    kind: "Scientific retrieval / Knowledge systems",
    description:
      "Structure-aware ingestion, hybrid retrieval, and exact-span validation for scientific evidence you can trace.",
    tags: ["RAG", "Evidence", "Climate"],
    image: sitePath("/scene-red-pixel.jpg"),
    tone: "red",
  },
  {
    index: "03",
    title: "Road Graph Research",
    kind: "Computer vision / Satellite imagery",
    description:
      "A research workflow for extracting road networks from overhead imagery and evaluating their topology.",
    tags: ["Vision", "Graphs", "Remote sensing"],
    image: sitePath("/scene-green-pixel.jpg"),
    tone: "amber",
  },
];

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      root.style.setProperty("--journey", progress.toFixed(4));
      if (progressRef.current) {
        progressRef.current.textContent = String(Math.round(progress * 100)).padStart(
          3,
          "0",
        );
      }
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    root.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    updateScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const moveLight = (event: React.PointerEvent<HTMLElement>) => {
    if (!rootRef.current || event.pointerType === "touch") return;
    rootRef.current.style.setProperty("--pointer-x", `${event.clientX}px`);
    rootRef.current.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  return (
    <main ref={rootRef} className="portfolio" onPointerMove={moveLight}>
      <a className="skip-link" href="#profile">
        Skip to profile
      </a>

      <div className="space-backdrop" aria-hidden="true">
        <div className="space-scene space-scene--green">
          <img src={sitePath("/scene-green-pixel-4k.png")} alt="" />
        </div>
        <div className="space-scene space-scene--red">
          <img src={sitePath("/scene-red-pixel-4k.png")} alt="" />
        </div>
        <div className="space-vignette" />
        <div className="space-grid" />
        <div className="space-scanlines" />
        <div className="red-bloom" />
        <RedSparkField />
        <div className="pointer-flare" />
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Dat Nguyen — home">
          <span className="brand-mark">D/N</span>
          <span>DAT NGUYEN</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#profile">Profile</a>
          <a href="#trajectory">Trajectory</a>
          <a href="#work">Research</a>
        </nav>
        <p className="scroll-meter" aria-label="Scroll progress">
          SIGNAL <span ref={progressRef}>000</span>%
        </p>
      </header>

      <div id="top" />

      <section id="profile" className="hero shell">
        <aside className="identity-card pixel-panel reveal is-visible">
          <div className="portrait-window">
            <img
              src={sitePath("/scene-green-pixel.jpg")}
              alt="Pixel-art astronaut above a spacecraft"
            />
            <span className="portrait-status">● ONLINE</span>
          </div>
          <div className="identity-copy">
            <p className="micro-label">Researcher + builder</p>
            <h1>Dat Nguyen</h1>
            <p className="native-name">Earth intelligence / AI systems</p>
          </div>
          <dl className="identity-stats">
            <div>
              <dt>Base</dt>
              <dd>Dubai, UAE</dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>Research → product</dd>
            </div>
            <div>
              <dt>Signal</dt>
              <dd>Open to hard problems</dd>
            </div>
          </dl>
          <div className="focus-chips" aria-label="Research interests">
            <span>AI agents</span>
            <span>Earth observation</span>
            <span>Computer vision</span>
          </div>
        </aside>

        <div className="profile-main">
          <article className="bio-panel pixel-panel reveal is-visible">
            <p className="micro-label">Profile / 001</p>
            <h2>
              Building intelligent systems for a living planet<span>.</span>
            </h2>
            <p className="bio-lead">
              I build research agents and multimodal systems for understanding a
              changing Earth. My work connects Earth observation, scientific
              retrieval, and tools that turn complex evidence into useful decisions.
            </p>
            <p>
              I like problems with no clean boundary between research and engineering:
              define the scientific contract, find the right evidence, then make the
              whole thing work in the real world.
            </p>
          </article>

          <aside className="news-panel pixel-panel reveal is-visible">
            <div className="panel-title">
              <div>
                <p className="micro-label">Live transmission</p>
                <h2>Latest log</h2>
              </div>
              <span className="blink" aria-hidden="true" />
            </div>
            <ol>
              {fieldNotes.map((note, index) => (
                <li key={note.label}>
                  <span className="log-index">0{index + 1}</span>
                  <p>
                    <strong>{note.label}</strong>
                    {note.text}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <a className="descend" href="#trajectory">
          Scroll to descend <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section id="trajectory" className="trajectory shell section-block">
        <div className="section-intro reveal">
          <p className="micro-label">Experience / flight path</p>
          <h2>Trajectory</h2>
          <p>One continuous line from seeing, to reasoning, to understanding Earth.</p>
        </div>

        <div className="orbit-track reveal">
          {trajectory.map((stop, index) => (
            <article className="orbit-stop pixel-panel" key={stop.index}>
              <span className="orbit-node" aria-hidden="true">
                {index === trajectory.length - 1 ? "●" : "◇"}
              </span>
              <p className="stop-number">{stop.index}</p>
              <h3>{stop.title}</h3>
              <p className="stop-role">{stop.role}</p>
              <p>{stop.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="work shell section-block">
        <div className="section-intro section-intro--work reveal">
          <p className="micro-label">Selected work / mission archive</p>
          <h2>Research</h2>
          <p>Systems, experiments, and infrastructure built to make evidence move.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row pixel-panel reveal" key={project.title}>
              <div className={`project-image project-image--${project.tone}`}>
                <img src={project.image} alt="" />
                <span>{project.index}</span>
              </div>
              <div className="project-copy">
                <p className="project-kind">{project.kind}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} topics`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="closing shell section-block">
        <div className="closing-panel pixel-panel reveal">
          <p className="micro-label">End of transmission / begin the next one</p>
          <h2>Curious is a good place to start.</h2>
          <p>
            Research collaborations, difficult systems, and ideas that need a patient
            builder are always welcome.
          </p>
          <a href="#top">
            Return to surface <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <p>DAT NGUYEN / PERSONAL INDEX</p>
        <p>GREEN SIGNAL → RED SHIFT</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
