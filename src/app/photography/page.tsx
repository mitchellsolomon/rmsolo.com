import type { Metadata } from "next";
import Gallery from "./gallery";
import { photographs } from "./photos";

export const metadata: Metadata = {
  title: "Photography | Mitchell Solomon",
  description: "Photography by Mitchell Solomon.",
};

export default function PhotographyPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container pb-20 sm:pb-28"
    >
      <header className="pb-10 sm:pb-14">
        <h1 className="page-title">photography</h1>
      </header>
      <Gallery photos={photographs} />
    </main>
  );
}
