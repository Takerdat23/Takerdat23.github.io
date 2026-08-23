import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("defines the academic portfolio with the complete verified publication list", async () => {
  const [page, layout, themeToggle, styles] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/ThemeToggle.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(layout, /Dat Tien Nguyen — Earth Intelligence & AI Research/);
  assert.match(layout, /NEXT_PUBLIC_SITE_URL/);
  assert.match(layout, /NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN/);
  assert.match(layout, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
  assert.match(layout, /data-cf-beacon/);
  assert.match(layout, /images: \[sitePath\("\/og\.png"\)\]/);
  assert.match(layout, /\/goat-head-favicon-v2\.ico/);
  assert.match(layout, /\/goat-head-favicon-v2-16\.png/);
  assert.match(layout, /\/goat-head-favicon-v2-32\.png/);
  assert.match(layout, /\/goat-head-apple-v2\.png/);
  assert.match(layout, /academic-theme/);
  assert.match(layout, /prefers-color-scheme: dark/);
  assert.match(page, /\/logo_light\.png/);
  assert.match(page, /\/logo_dark\.png/);
  assert.match(page, /<ThemeToggle \/>/);
  assert.match(themeToggle, /Switch to \$\{nextTheme\} mode/);
  assert.match(themeToggle, /window\.localStorage\.setItem/);
  assert.match(styles, /html\[data-theme="dark"\] \.academic-site/);
  assert.match(page, /MSc student at Mohamed bin Zayed University/);
  assert.match(page, /Reinforce Trustworthiness in Multimodal Emotional Support System/);
  assert.match(page, /Vietnamese Words Are Not Constructed from Syllables/);
  assert.match(page, /Fusionista2\.0: Efficiency Retrieval System/);
  assert.doesNotMatch(page, /Fusionista: Fusion of 3-D Information/);
  assert.doesNotMatch(page, /Fustar: Divide and Conquer Query/);
  assert.match(page, /TerraBench: Can Agents Reason Over Heterogeneous Earth-System Data\?/);
  assert.match(page, /\/papers\/terrabench-overview\.png/);
  assert.match(page, /\/papers\/multimood-conversation\.png/);
  assert.match(page, /\/papers\/viwordformer-attention\.png/);
  assert.match(page, /scholar\.google\.com\/citations\?user=b-OcGIYAAAAJ/);
  assert.match(page, /AISIA Research Lab/);
  assert.match(page, /https:\/\/aisia\.vn\//);
  assert.match(page, /Associate Professor Binh T\. Nguyen/);
  assert.match(page, /https:\/\/www\.aisia\.vn\/about-us\/our-team/);
  assert.match(page, /Assistant Professor Lizi Liao/);
  assert.match(page, /https:\/\/faculty\.smu\.edu\.sg\/profile\/liao-lizi-6261/);
  assert.match(page, /Associate Professor Salman Khan/);
  assert.match(page, /https:\/\/mbzuai\.ac\.ae\/study\/faculty\/salman-khan\//);
  assert.match(page, /href="#future-direction"/);
  assert.match(page, /Future direction/);
  assert.match(page, /reliable, long-horizon AI agents/);
  assert.match(page, /reason over structured trajectories/);
  assert.match(page, /For 2027, I am open to research/);
  assert.match(page, /internships and collaborations in agentic AI/);
  assert.match(page, /Joined MBZUAI as an MSc student/);
  assert.match(page, /Joined MBZUAI as a research engineer/);
  assert.match(page, /Representative figure from this publication/);
  assert.doesNotMatch(page, /href="\/fun"/);
  assert.match(page, /sitePath\("\/privacy"\)/);
  assert.doesNotMatch(page, /recordPageView/);
  assert.doesNotMatch(page, /Your site is taking shape|codex-preview/);
});

test("keeps the original cinematic portfolio at the fun route", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("app/fun/page.tsx", root), "utf8"),
    readFile(new URL("app/fun/layout.tsx", root), "utf8"),
  ]);

  assert.match(layout, /Dat Nguyen — Fun Portfolio Edition/);
  assert.match(layout, /og-research\.png/);
  assert.match(layout, /force-static/);
  assert.doesNotMatch(layout, /recordPageView|next\/headers/);
  assert.match(page, /Building intelligent systems for a living planet/);
  assert.match(page, /GREEN SIGNAL → RED SHIFT/);
});

test("publishes a clear Cloudflare analytics privacy boundary", async () => {
  const html = await readFile(new URL("dist/client/privacy.html", root), "utf8");

  assert.match(html, /Simple, aggregate analytics/);
  assert.match(html, /Cloudflare Web Analytics/);
  assert.match(html, /does not collect or use visitors/);
  assert.doesNotMatch(html, /property="og:image"/);
  assert.doesNotMatch(html, /name="twitter:image"/);
});

test("exports every public route and all final imagery for GitHub Pages", async () => {
  const [hosting, nextConfig, homeHtml] = await Promise.all([
    readFile(new URL(".openai/hosting.json", root), "utf8"),
    readFile(new URL("next.config.ts", root), "utf8"),
    readFile(new URL("dist/client/index.html", root), "utf8"),
    access(new URL("dist/client/index.html", root)),
    access(new URL("dist/client/fun.html", root)),
    access(new URL("dist/client/privacy.html", root)),
    access(new URL("dist/client/fun/index.html", root)),
    access(new URL("dist/client/privacy/index.html", root)),
    access(new URL("dist/client/404.html", root)),
    access(new URL("dist/client/.nojekyll", root)),
    access(new URL("public/papers/terrabench-overview.png", root)),
    access(new URL("public/papers/multimood-conversation.png", root)),
    access(new URL("public/papers/viwordformer-attention.png", root)),
    access(new URL("public/papers/fusionista2-overview.png", root)),
    access(new URL("public/papers/shoulder-clarity-grades.jpg", root)),
    access(new URL("public/profile-dat-tien-nguyen.jpg", root)),
    access(new URL("public/logo_light.png", root)),
    access(new URL("public/logo_dark.png", root)),
    access(new URL("public/favicon.png", root)),
    access(new URL("public/favicon.ico", root)),
    access(new URL("public/favicon-16x16.png", root)),
    access(new URL("public/favicon-32x32.png", root)),
    access(new URL("public/apple-touch-icon.png", root)),
    access(new URL("public/goat-head-favicon-v2.ico", root)),
    access(new URL("public/goat-head-favicon-v2-16.png", root)),
    access(new URL("public/goat-head-favicon-v2-32.png", root)),
    access(new URL("public/goat-head-apple-v2.png", root)),
    access(new URL("public/og.png", root)),
  ]);

  assert.match(hosting, /"d1": null/);
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /assetPrefix/);
  assert.match(nextConfig, /unoptimized: true/);
  assert.doesNotMatch(homeHtml, /\/Users\/|\.vinext\/fonts/);

  const deploymentBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (deploymentBasePath) {
    const deploymentOrigin = new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ).origin;
    assert.ok(homeHtml.includes(`href="${deploymentBasePath}/_next/`));
    assert.ok(homeHtml.includes(`src="${deploymentBasePath}/logo_light.png"`));
    assert.ok(homeHtml.includes(`href="${deploymentBasePath}/privacy"`));
    assert.ok(
      homeHtml.includes(
        `content="${deploymentOrigin}${deploymentBasePath}/og.png"`,
      ),
    );
    assert.doesNotMatch(
      homeHtml,
      new RegExp(`${deploymentBasePath}${deploymentBasePath}/og\\.png`),
    );
    assert.doesNotMatch(homeHtml, /href="\/_next\//);
  }
});
