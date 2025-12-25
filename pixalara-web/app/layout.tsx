import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import SmoothScrolling from "@/components/SmoothScrolling"; // <--- 1. IMPORT ADDED

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  },
  // === GOOGLE SEO ICON FIX ===
  icons: {
    icon: '/icon.jpg',      
    shortcut: '/icon.jpg',
    apple: '/icon.jpg',
  },
  // ===========================
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrolling> {/* <--- 2. WRAPPER ADDED */}
          <Navbar />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}