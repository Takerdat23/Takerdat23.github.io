import type { Metadata } from "next";
import Link from "next/link";

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
        <Link className="policy-back" href="/">
          ← Back to the portfolio
        </Link>
        <p className="academic-kicker">Privacy</p>
        <h1>Simple, aggregate analytics.</h1>
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
      </div>
    </main>
  );
}
