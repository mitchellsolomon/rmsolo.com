"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  let pathname = usePathname();

  return (
    <nav className="font-medium flex justify-between items-center mb-12">
      <div className="flex gap-5">
        <Link
          href="/"
          key="home"
          className={clsx({
            "border-b border-blue-400": pathname === "/",
          })}
        >
          home
        </Link>
      </div>
      <Link
        href="/links"
        key="links"
        className={clsx({
          "border-b border-blue-400": pathname === "/links",
        })}
      >
        links
      </Link>
    </nav>
  );
}
