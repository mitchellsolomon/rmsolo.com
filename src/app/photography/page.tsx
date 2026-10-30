import type { Metadata } from "next";
import Gallery from "./gallery";
import { photographs } from "./photos";

export const metadata: Metadata = {
  title: "Photography | Mitchell Solomon",
  description: "Photography by Mitchell Solomon.",
};

export default function PhotographyPage() {
  return (
    <main data-photography-page className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <header className="pt-4 pb-12 sm:pt-8 sm:pb-16">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Photography</h1>
        </header>
        <Gallery photos={photographs} />
      </div>
    </main>
  );
}
