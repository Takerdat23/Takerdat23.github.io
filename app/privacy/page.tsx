import type { Metadata } from "next";
import { sitePath } from "../site-path";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy — Dat Tien Nguyen",
  description: "How this academic portfolio handles aggregate visitor analytics.",
  openGraph: {
    title: "Privacy — Dat Tien Nguyen",
    description: "How this academic portfolio handles aggregate visitor analytics.",
    images: [],
  },
  twitter: {
    title: "Privacy — Dat Tien Nguyen",
    description: "How this academic portfolio handles aggregate visitor analytics.",
    images: [],
  },
};

export default function PrivacyPage() {
  return (
    <main className="academic-site policy-page">
      <div className="academic-shell policy-shell">
        <a className="policy-back" href={sitePath("/")}>
          ← Back to the portfolio
        </a>
        <p className="academic-kicker">Privacy</p>
        <h1>Visitor analytics.</h1>
        <p>
          This site uses Cloudflare Web Analytics to understand aggregate page views,
          page paths, broad geographic reach, referring sites, device and browser types,
          and website performance.
        </p>
        <p>
          Cloudflare states that Web Analytics does not collect or use visitors&apos;
          personal data and does not track people with cookies, local storage, or
          fingerprinting. The aggregate reports are available only through my Cloudflare
          account. You can read more in Cloudflare&apos;s{" "}
          <a href="https://developers.cloudflare.com/web-analytics/about/">
            Web Analytics documentation
          </a>
          .
        </p>
        <p>
          This site also uses Umami Cloud to understand page views, referring sites,
          browser and device types, and approximate location. Umami&apos;s tracker does
          not use cookies. Umami processes IP addresses to create anonymous session
          identifiers and estimate location, but does not store them in standard
          analytics records. You can read more in Umami&apos;s{" "}
          <a href="https://docs.umami.is/docs/metric-definitions">
            metric definitions
          </a>
          .
        </p>
      </div>
    </main>
  );
}
