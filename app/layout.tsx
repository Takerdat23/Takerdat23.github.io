import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Dat Tien Nguyen — Earth Intelligence & AI Research";
const description =
  "The academic portfolio of Dat Tien Nguyen, an MSc student at MBZUAI working across multimodal learning, NLP, video retrieval, and scientific AI.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const analyticsToken =
  process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

const themeScript = `
  (() => {
    try {
      const stored = localStorage.getItem("academic-theme");
      const theme = stored === "light" || stored === "dark"
        ? stored
        : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {}
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: [
      { url: "/goat-head-favicon-v2.ico", sizes: "32x32" },
      { url: "/goat-head-favicon-v2-16.png", type: "image/png", sizes: "16x16" },
      { url: "/goat-head-favicon-v2-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: ["/goat-head-favicon-v2.ico"],
    apple: [
      {
        url: "/goat-head-apple-v2.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
