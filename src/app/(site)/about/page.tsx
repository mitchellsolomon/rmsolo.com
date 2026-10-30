import type { Metadata } from "next";

export const metadata: Metadata = { title: "About | Mitchell Solomon" };

export default function About() {
  return (
    <div>
      <h1 className="page-title mb-6">About me</h1>
      <p className="max-w-prose text-base leading-relaxed text-neutral-700 sm:text-lg">
        I&apos;m a web developer, tech enthusiast, and guitar player.
      </p>
    </div>
  );
}
