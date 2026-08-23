import { recordPageView } from "../db/analytics";
import Image from "next/image";

export const dynamic = "force-dynamic";

const publications = [
  {
    year: "2026",
    venue: "arXiv preprint",
    title: "TerraBench: Can Agents Reason Over Heterogeneous Earth-System Data?",
    authors:
      "Dat Tien Nguyen, Thao Nguyen, Fadillah Adamsyah Maani, Huy M. Le, Muhammad Umer Sheikh, Numan Saeed, Muhammad Haris Khan, Salman Khan",
    summary:
      "A benchmark and executable agent framework for grounded reasoning across Earth observation, gridded environmental data, GIS, simulation, and scientific documents.",
    image: "/papers/terrabench-overview.png",
    paper: "https://arxiv.org/abs/2606.13148",
    code: "https://github.com/Takerdat23/TerraBench",
  },
];

export default async function Home() {
  await recordPageView("/");

  return (
    <main className="academic-site">
      <header className="academic-nav">
        <a className="academic-wordmark" href="#top" aria-label="Dat Tien Nguyen, home">
          Dat Tien Nguyen
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#news">News</a>
          <a href="#publications">Publications</a>
          <a href="/fun">Fun version</a>
        </nav>
      </header>

      <div id="top" className="academic-shell">
        <section id="about" className="academic-intro" aria-labelledby="intro-title">
          <div className="academic-monogram" aria-hidden="true">
            <span>DN</span>
          </div>
          <div className="academic-intro-copy">
            <p className="academic-kicker">AI researcher · Abu Dhabi, UAE</p>
            <h1 id="intro-title">Dat Tien Nguyen</h1>
            <p className="academic-role">
              PhD student at Mohamed bin Zayed University of Artificial Intelligence.
            </p>
            <p className="academic-bio">
              I build intelligent systems that help researchers reason with a changing
              planet. My work sits at the intersection of Earth observation, multimodal
              learning, scientific agents, and evidence-grounded AI.
            </p>
            <p className="academic-bio">
              I am especially interested in systems that can coordinate real scientific
              tools, work across heterogeneous data, and keep every conclusion traceable
              to its evidence.
            </p>
            <div className="academic-links" aria-label="Profile links">
              <a href="https://github.com/Takerdat23">GitHub</a>
              <a href="https://ae.linkedin.com/in/dat-tien-nguyen-39a75220a">LinkedIn</a>
              <a href="https://arxiv.org/search/?query=Dat+Tien+Nguyen&searchtype=author">arXiv</a>
            </div>
          </div>
        </section>

        <section id="news" className="academic-section academic-news" aria-labelledby="news-title">
          <div className="academic-section-heading">
            <p>Updates</p>
            <h2 id="news-title">News</h2>
          </div>
          <ol>
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
                Building TerraAFM: research agents for Earth intelligence, scientific
                retrieval, and reproducible tool use.
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
            <h2 id="publications-title">Selected publications</h2>
          </div>
          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <a className="publication-figure" href={publication.paper}>
                  <Image
                    src={publication.image}
                    alt="TerraBench overview figure showing three question types, eight Earth-science use cases, and four reasoning levels"
                    width={1210}
                    height={350}
                    sizes="(max-width: 720px) calc(100vw - 2rem), 660px"
                  />
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
                    <a href={publication.paper}>Paper</a>
                    <a href={publication.code}>Code</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="academic-footer">
          <p>© 2026 Dat Tien Nguyen</p>
          <p>
            <a href="/privacy">Privacy</a> · Looking for the experimental edition?{" "}
            <a href="/fun">Enter the fun version</a>.
          </p>
        </footer>
      </div>
    </main>
  );
}
