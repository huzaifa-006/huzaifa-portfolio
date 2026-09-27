import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { seo, siteUrl } from "@/data/site";
import { profile } from "@/data/profile";
import { allSocialLinks } from "@/data/socialLinks";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap", weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s · ${seo.shortTitle}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: seo.shortTitle,
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Junior Data Scientist",
  url: siteUrl,
  email: `mailto:${profile.email}`,
  image: `${siteUrl}${profile.photo.src}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "PMAS Arid Agriculture University Rawalpindi" },
  knowsAbout: ["Data Science", "Data Analysis", "Machine Learning", "Python", "SQL", "Docker"],
  sameAs: allSocialLinks.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="page-bg min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
