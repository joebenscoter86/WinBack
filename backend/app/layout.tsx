import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Inter } from "next/font/google";
import "./globals.css";
import { ORGANIZATION } from "./lib/marketing";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// Sitewide-only metadata. Landing-page-specific fields (title, description,
// keywords, OG, Twitter, canonical) live in app/page.tsx so sibling routes
// (/upgrade, /setup-billing) do not inherit marketing copy via the root
// layout. /privacy and /terms export their own metadata already.
export const metadata: Metadata = {
  metadataBase: new URL("https://winbackpay.com"),
  authors: [{ name: "JB Technology LLC", url: "https://winbackpay.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${manrope.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-on-surface font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: ORGANIZATION.legalName,
              url: ORGANIZATION.url,
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
