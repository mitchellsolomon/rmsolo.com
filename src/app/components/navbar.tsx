"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const className = (href: string) => {
    if (pathname === href) {
      return "border-b border-blue-400 hover:border-b hover:border-blue-300";
    }

    return "hover:border-b hover:border-blue-300";
  };

  return (
    <nav className="font-medium flex justify-between items-center mb-12">
      <div className="flex gap-5">
        <Link href="/" key="home" className={className("/")}>
          home
        </Link>
        <Link href="/about" key="about" className={className("/about")}>
          about
        </Link>
        <Link href="/photography" className={className("/photography")}>
          photography
        </Link>
      </div>
      <Link
        href="https://links.rmsolo.com"
        key="links"
        target="_blank"
        rel="noopener noreferrer"
        className={className("/links")}
      >
        links
      </Link>
    </nav>
  );
}
