"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/photography", label: "photography" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm font-medium sm:text-base">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center decoration-1 underline-offset-8 hover:underline ${pathname === href ? "underline" : "no-underline"}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <a
        href="https://links.rmsolo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 min-w-11 items-center justify-end underline-offset-8 hover:underline"
      >
        links<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </nav>
  );
}
