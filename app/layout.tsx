import type { Metadata } from "next";
import "./globals.css";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iegy.net";
const publicPath = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  applicationName: "MO — Beyond the Frame",
  authors: [{ name: "Mohamed Hussein", url: "https://iegy.net" }],
  creator: "Mohamed Hussein",
  publisher: "IEgy — iegy.net",
  title: {
    default: "MO — Beyond the Frame | Chapter 01",
    template: "%s | MO — Beyond the Frame",
  },
  description:
    "Chapter 01 of MO — Beyond the Frame, a bilingual interactive cinematic comic by Mohamed Hussein.",
  keywords: [
    "MO",
    "Beyond the Frame",
    "خارج الإطار",
    "interactive comic",
    "webcomic",
    "Mohamed Hussein",
  ],
  metadataBase: new URL(siteOrigin),
  alternates: { canonical: `${basePath}/` },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    title: "MO — Beyond the Frame | Chapter 01",
    description: "Scroll. Mo moves. The frame breaks.",
    siteName: "MO — Beyond the Frame",
    images: [{ url: publicPath("/og.png"), width: 1200, height: 630, alt: "MO — Beyond the Frame · Chapter 01" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MO — Beyond the Frame | Chapter 01",
    description: "Scroll. Mo moves. The frame breaks.",
    images: [publicPath("/og.png")],
  },
  other: {
    "mo-project-id": "MO-IEGY-01",
    "mo-build-id": "MO-1.0.0-IEGY",
    copyright: "© 2026 Mohamed Hussein. All Rights Reserved.",
  },
  icons: { icon: publicPath("/favicon.svg"), shortcut: publicPath("/favicon.svg") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body data-iegy-signature="MO-IEGY-01:MH-4047">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWorkSeries",
              name: "MO — Beyond the Frame",
              alternateName: "مو — خارج الإطار",
              author: {
                "@type": "Person",
                name: "Mohamed Hussein",
                url: "https://iegy.net",
              },
              copyrightYear: 2026,
              inLanguage: ["ar", "en"],
              identifier: "MO-IEGY-01",
            }),
          }}
        />
        {/* MO — Beyond the Frame · Creator: Mohamed Hussein · iegy.net · MH-4047 */}
      </body>
    </html>
  );
}
