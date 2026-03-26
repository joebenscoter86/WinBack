import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WinBack: Stop Giving Away 30% of Your Recovered Revenue",
  description:
    "$29/month flat fee dispute resolution for Stripe merchants. No success fees. Guided playbooks built from 10+ years of issuer-side experience.",
  metadataBase: new URL("https://winbackpay.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WinBack: Stop Giving Away 30% of Your Recovered Revenue",
    description:
      "$29/month flat fee dispute resolution for Stripe merchants. No success fees.",
    url: "https://winbackpay.com",
    siteName: "WinBack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WinBack: Stop Giving Away 30% of Your Recovered Revenue",
    description:
      "$29/month flat fee dispute resolution for Stripe merchants. No success fees.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-on-surface font-sans">
        {children}
      </body>
    </html>
  );
}
