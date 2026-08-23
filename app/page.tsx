import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { sitePath } from "./site-path";

type Publication = {
  year: string;
  venue: string;
  title: string;
  authors: string;
  summary: string;
  image: string;
  imageAlt: string;
  paper: string;
  links: Array<{ label: string; href: string }>;
};

const publications: Publication[] = [
  {
    year: "2026",
    venue: "AAAI",
    title: "Reinforce Trustworthiness in Multimodal Emotional Support System",
    authors:
      "Huy M. Le, Dat Tien Nguyen, Ngan T. T. Vo, Tuan D. Q. Nguyen, Nguyen Le Binh, Duy Minh Ho Nguyen, Daniel Sonntag, Lizi Liao, Binh T. Nguyen",
    summary:
      "MULTIMOOD combines video, audio, text, and dialogue history to recognize emotional-support needs and generate responses aligned with professional therapeutic criteria.",
    image: sitePath("/papers/multimood-conversation.png"),
    imageAlt:
      "MULTIMOOD paper figure comparing a prior system response with an empathetic multimodal response",
    paper: "https://ojs.aaai.org/index.php/AAAI/article/view/40412",
    links: [
      { label: "Paper", href: "https://ojs.aaai.org/index.php/AAAI/article/view/40412" },
      { label: "Code", href: "https://github.com/quangtuan-0504/Multimood" },
    ],
  },
  {
    year: "2026",
    venue: "arXiv preprint",
    title: "TerraBench: Can Agents Reason Over Heterogeneous Earth-System Data?",
    authors:
      "Dat Tien Nguyen, Thao Nguyen, Fadillah Adamsyah Maani, Huy M. Le, Muhammad Umer Sheikh, Numan Saeed, Muhammad Haris Khan, Salman Khan",
    summary:
      "A benchmark and executable agent framework for grounded reasoning across Earth observation, gridded environmental data, GIS, simulation, and scientific documents.",
    image: sitePath("/papers/terrabench-overview.png"),
    imageAlt:
      "TerraBench overview figure showing Earth-science use cases and reasoning levels",
    paper: "https://arxiv.org/abs/2606.13148",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2606.13148" },
      { label: "Code", href: "https://github.com/Takerdat23/TerraBench" },
    ],
  },
  {
    year: "2026",
    venue: "MMM",
    title: "Fusionista2.0: Efficiency Retrieval System for Large-Scale Datasets",
    authors:
      "Huy M. Le, Dat Tien Nguyen, Phuc Binh Nguyen, Gia-Bao Le-Tran, Phu Truong Thien, Cuong Dinh, Minh Nguyen, Nga Nguyen, Thuy T. N. Nguyen, Huy Gia Ngo, Tan Nhat Nguyen, Binh T. Nguyen",
    summary:
      "A faster, more accessible video-retrieval system with optimized keyframe extraction, multilingual OCR and ASR, lightweight visual question answering, and interactive reranking.",
    image: sitePath("/papers/fusionista2-overview.png"),
    imageAlt:
      "Fusionista2.0 paper figure showing its indexing and interactive search architecture",
    paper: "https://doi.org/10.1007/978-981-95-6957-1_25",
    links: [
      { label: "Publisher", href: "https://doi.org/10.1007/978-981-95-6957-1_25" },
      { label: "arXiv", href: "https://arxiv.org/abs/2511.12255" },
    ],
  },
  {
    year: "2025",
    venue: "AAAI",
    title:
      "Vietnamese Words Are Not Constructed from Syllables: Rethinking the Role of Word Segmentation in Natural Language Processing for Vietnamese Texts",
    authors: "Nghia Hieu Nguyen, Dat Tien Nguyen, Ngan Luu-Thuy Nguyen",
    summary:
      "A linguistic and empirical re-examination of Vietnamese word segmentation, with ViWordFormer modeling phrasal lexemes directly from Vietnamese text.",
    image: sitePath("/papers/viwordformer-attention.png"),
    imageAlt:
      "ViWordFormer paper figure showing attention-score maps across six model layers",
    paper: "https://ojs.aaai.org/index.php/AAAI/article/view/34581",
    links: [
      { label: "Paper", href: "https://ojs.aaai.org/index.php/AAAI/article/view/34581" },
    ],
  },
  {
    year: "2025",
    venue: "JSES International",
    title:
      "The Reliability of Deep Learning Models in Assessing the Shoulder Arthroscopic Field’s Visual Clarity in Relation to Bleeding",
    authors:
      "Son Quang Tran, Minh Cong Bui, Dat Tien Nguyen, Thun Itthipanichpong, Danaithep Limskul, Napatpong Thamrongskulsiri, Thanathep Tanpowpong",
    summary:
      "An evaluation of six deep-learning models for grading visual clarity in shoulder arthroscopy, supporting more consistent assessment of bleeding-related image quality.",
    image: sitePath("/papers/shoulder-clarity-grades.jpg"),
    imageAlt:
      "Paper figure showing three grades of shoulder arthroscopic visual clarity relative to bleeding",
    paper: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12144979/",
    links: [
      { label: "Paper", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12144979/" },
    ],
  },
];

export default function Home() {
  return (
    <main className="academic-site">
      <header className="academic-nav">
        <a className="academic-wordmark" href="#top" aria-label="Dat Tien Nguyen, home">
          <span className="academic-logo" aria-hidden="true">
            <Image
              className="academic-logo-light"
              src={sitePath("/logo_light.png")}
              alt=""
              width={1254}
              height={1254}
              priority
            />
            <Image
              className="academic-logo-dark"
              src={sitePath("/logo_dark.png")}
              alt=""
              width={1254}
              height={1254}
              priority
            />
          </span>
          <span>Dat Tien Nguyen</span>
        </a>
        <div className="academic-nav-actions">
          <nav aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#future-direction">Research</a>
            <a href="#news">News</a>
            <a href="#publications">Publications</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <div id="top" className="academic-shell">
        <section id="about" className="academic-intro" aria-labelledby="intro-title">
          <div className="academic-portrait">
            <Image
              src={sitePath("/profile-dat-tien-nguyen.jpg")}
              alt="Dat Tien Nguyen"
              width={996}
              height={974}
              priority
            />
          </div>
          <div className="academic-intro-copy">
            <p className="academic-kicker">MSc student &amp; AI researcher · Abu Dhabi, UAE</p>
            <h1 id="intro-title">Dat Tien Nguyen</h1>
            <p className="academic-welcome">
              I am an MSc student at Mohamed bin Zayed University of Artificial Intelligence
              (MBZUAI), where I am supervised by{" "}
              <a href="https://mbzuai.ac.ae/study/faculty/salman-khan/">
                Associate Professor Salman Khan
              </a>{"."} Before joining MBZUAI, I worked at the{" "}
              <a href="https://aisia.vn/">AISIA Research Lab</a> with{" "}
              <a href="https://www.aisia.vn/about-us/our-team">
                Associate Professor Binh T. Nguyen
              </a>{" "}
              and collaborated with{" "}
              <a href="https://faculty.smu.edu.sg/profile/liao-lizi-6261">
                Assistant Professor Lizi Liao
              </a>{" "}
              at Singapore Management University. My research spans multimodal learning,
              natural language processing, video retrieval, trustworthy emotional-support
              systems, Vietnamese language modeling, medical image analysis, and scientific
              AI. I am particularly interested in practical AI systems that coordinate
              external tools, reason across heterogeneous data, and keep their conclusions
              traceable to evidence.
            </p>
            <div className="academic-links" aria-label="Profile links">
              <a href="https://scholar.google.com/citations?user=b-OcGIYAAAAJ&amp;hl=en">
                Google Scholar
              </a>
              <a href="https://github.com/Takerdat23">GitHub</a>
              <a href="https://ae.linkedin.com/in/dat-tien-nguyen-39a75220a">LinkedIn</a>
            </div>
          </div>
        </section>

        <section
          id="future-direction"
          className="academic-section academic-future"
          aria-labelledby="future-direction-title"
        >
          <div className="academic-section-heading">
            <p>Research outlook</p>
            <h2 id="future-direction-title">Future direction</h2>
          </div>
          <div className="future-direction-copy">
            <p>
              I am currently interested in developing reliable,{" "}
              <strong className="research-keyword">long-horizon AI agents</strong> that can
              reason over structured trajectories, use external tools, detect and recover from
              failures, and keep their decisions grounded in verifiable evidence. In particular,
              I am exploring process-level representations,{" "}
              <strong className="research-keyword">post-training</strong>, and{" "}
              <strong className="research-keyword">reinforcement learning</strong> methods for
              improving agent planning, replanning, memory, and recovery across scientific
              workflows. For 2027, I am open to research{" "}
              <strong className="research-keyword">internships</strong> and collaborations in{" "}
              <strong className="research-keyword">agentic AI</strong>, reasoning and{" "}
              <strong className="research-keyword">post-training</strong>,{" "}
              <strong className="research-keyword">reinforcement learning</strong>, multimodal
              and scientific agents, trustworthy AI, and{" "}
              <strong className="research-keyword">AI for science</strong>.
            </p>
          </div>
        </section>

        <section id="news" className="academic-section academic-news" aria-labelledby="news-title">
          <div className="academic-section-heading">
            <p>Updates</p>
            <h2 id="news-title">News</h2>
          </div>
          <ol>
            <li>
              <time dateTime="2026-08">Aug 2026</time>
              <p>Joined MBZUAI as an MSc student.</p>
            </li>
            <li>
              <time dateTime="2026-06">Jun 2026</time>
              <p>
                Released <a href="https://arxiv.org/abs/2606.13148">TerraBench</a>, a
                benchmark for grounded Earth-science reasoning with executable agents.
              </p>
            </li>
            <li>
              <time dateTime="2026">2026</time>
              <p>
                Published <a href="https://ojs.aaai.org/index.php/AAAI/article/view/40412">MULTIMOOD</a>
                {" "}at AAAI on trustworthy multimodal emotional-support systems.
              </p>
            </li>
            <li>
              <time dateTime="2025-09">Sep 2025</time>
              <p>Joined MBZUAI as a research engineer.</p>
            </li>
            <li>
              <time dateTime="2025-04">Apr 2025</time>
              <p>
                Published <a href="https://ojs.aaai.org/index.php/AAAI/article/view/34581">ViWordFormer</a>
                {" "}at AAAI, rethinking word segmentation for Vietnamese NLP.
              </p>
            </li>
          </ol>
        </section>

        <section
          id="publications"
          className="academic-section academic-publications"
          aria-labelledby="publications-title"
        >
          <div className="academic-section-heading">
            <p>Research</p>
            <h2 id="publications-title">Publications</h2>
          </div>
          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <a
                  className="publication-figure"
                  href={publication.paper}
                  aria-label={`Open ${publication.title}`}
                >
                  <Image
                    src={publication.image}
                    alt={publication.imageAlt}
                    width={1200}
                    height={525}
                    sizes="(max-width: 720px) calc(100vw - 2rem), 660px"
                  />
                  <span className="publication-figure-caption">
                    Representative figure from this publication
                  </span>
                </a>
                <div className="publication-copy">
                  <p className="publication-meta">
                    {publication.venue} · {publication.year}
                  </p>
                  <h3>
                    <a href={publication.paper}>{publication.title}</a>
                  </h3>
                  <p className="publication-authors">{publication.authors}</p>
                  <p className="publication-summary">{publication.summary}</p>
                  <div className="publication-links">
                    {publication.links.map((link) => (
                      <a href={link.href} key={link.href}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="academic-footer">
          <p>© 2026 Dat Tien Nguyen</p>
          <p><a href={sitePath("/privacy")}>Privacy</a></p>
        </footer>
      </div>
    </main>
  );
}
