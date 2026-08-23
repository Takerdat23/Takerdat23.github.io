import type { Metadata } from "next";
import { sitePath } from "../site-path";

const title = "Dat Nguyen — Fun Portfolio Edition";
const description =
  "The experimental, cinematic edition of Dat Nguyen's research portfolio.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [sitePath("/og-research.png")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [sitePath("/og-research.png")],
  },
};

export default function FunLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
