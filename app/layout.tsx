import type { Metadata } from "next";
import "./globals.css";
import { sitePath } from "./site-path";

const title = "Dat Tien Nguyen — Earth Intelligence & AI Research";
const description =
  "The academic portfolio of Dat Tien Nguyen, an MSc student at MBZUAI working across multimodal learning, NLP, video retrieval, and scientific AI.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteOrigin = new URL(siteUrl).origin;
const analyticsToken =
  process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

const themeScript = `
  (() => {
    const storageKey = "academic-theme";

    const updateToggle = (theme) => {
      const button = document.querySelector("[data-theme-toggle]");
      if (!button) return;
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
      button.setAttribute("title", "Switch to " + nextTheme + " mode");
      const icon = button.querySelector("[data-theme-toggle-icon]");
      const label = button.querySelector("[data-theme-toggle-label]");
      if (icon) icon.textContent = theme === "dark" ? "☾" : "☀";
      if (label) label.textContent = theme === "dark" ? "Dark" : "Light";
    };

    const applyTheme = (theme) => {
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      updateToggle(theme);
    };

    let stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch {}

    const initialTheme = stored === "light" || stored === "dark"
      ? stored
      : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(initialTheme);

    document.addEventListener("DOMContentLoaded", () => updateToggle(initialTheme));
    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest("[data-theme-toggle]");
      if (!button) return;

      const currentTheme = document.documentElement.dataset.theme === "dark"
        ? "dark"
        : "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {}
      applyTheme(nextTheme);
    });
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description,
  icons: {
    icon: [
      { url: sitePath("/goat-head-favicon-v2.ico"), sizes: "32x32" },
      {
        url: sitePath("/goat-head-favicon-v2-16.png"),
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: sitePath("/goat-head-favicon-v2-32.png"),
        type: "image/png",
        sizes: "32x32",
      },
    ],
    shortcut: [sitePath("/goat-head-favicon-v2.ico")],
    apple: [
      {
        url: sitePath("/goat-head-apple-v2.png"),
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: sitePath("/og.png"), width: 1730, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [sitePath("/og.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8c89a7b4-9b5f-42e8-8164-de7214f971c5"
        />
      </head>
      <body>
        {children}
        {analyticsToken ? (
          <script
            type="module"
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
