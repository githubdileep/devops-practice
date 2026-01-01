import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"; // <--- 1. IMPORT ADDED
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import SmoothScrolling from "@/components/SmoothScrolling"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pixalara.com"), 
  title: {
    default: "Pixalara | Global Digital Experience Agency",
    template: "%s | Pixalara"
  },
  description: "Pixalara is a premium digital agency specializing in Web Design, App Development, Branding, and Cloud Solutions. We build digital products for global brands.",
  keywords: ["Web Design", "App Development", "Branding", "UI/UX", "Next.js Agency", "Digital Marketing"],
  openGraph: {
    title: "Pixalara | Global Digital Experience Agency",
    description: "We build digital products for global brands.",
    url: "https://pixalara.com",
    siteName: "Pixalara",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/android-chrome-512x512.png', 
        width: 512,
        height: 512,
        alt: 'Pixalara Logo',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrolling>
          <Navbar />
          {children}
          {/* <--- 2. COMPONENT ADDED HERE (It tracks all pages) */}
          <SpeedInsights /> 
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}