import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        className={`${inter.className} bg-neutral-50 dark:bg-[#0e0e0f] text-black dark:text-white m-16 flex flex-col max-w-2xl min-h-screen mx-auto`}
      >
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
