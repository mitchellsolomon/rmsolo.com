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
        className={`${inter.className} bg-neutral-50 dark:bg-[#0e0e0f] text-black dark:text-white flex flex-col items-center max-w-sm sm:max-w-lg md:max-w-2xl mt-6 sm:mt-10 md:mt-14 min-h-screen w-full mx-auto px-5 md:px-0 sm:px-0`}
      >
        <main className="w-full">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
