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
        className={`${inter.className} bg-neutral-50 dark:bg-[#0e0e0f] text-black dark:text-white`}
      >
        <header className="mx-auto w-full max-w-sm px-5 pt-6 sm:max-w-lg sm:px-0 sm:pt-10 md:max-w-2xl md:pt-14">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
