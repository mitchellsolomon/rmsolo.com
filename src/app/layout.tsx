import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mitchell Solomon",
  description: "Personal website of Mitchell Solomon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-dvh bg-white text-base leading-relaxed text-neutral-900 antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-blue-700 focus:shadow-md">
          Skip to content
        </a>
        <header className="site-container pt-5 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
