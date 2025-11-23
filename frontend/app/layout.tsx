import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VyomGarud - Military Grade UAV Systems",
  description: "Advanced autonomous UAV systems engineered for precision, reliability, and mission-critical performance",
  keywords: "UAV, drones, military, autonomous systems, defense technology",
  authors: [{ name: "VyomGarud" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="antialiased bg-black text-white font-sans"
        suppressHydrationWarning 
      >
        <Header />
        <main className="min-h-screen" suppressHydrationWarning>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}