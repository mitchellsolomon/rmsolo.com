import type { Metadata } from "next";
import Gallery from "./gallery";
import { getPhotographs } from "./photos";

export const metadata: Metadata = {
  title: "Photography | Mitchell Solomon",
  description: "Photography by Mitchell Solomon.",
};

export const revalidate = 300;

export default async function PhotographyPage() {
  const photographs = await getPhotographs();
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container pb-20 sm:pb-28"
    >
      <header className="pb-10 sm:pb-14">
        <h1 className="page-title">photography</h1>
      </header>
      {photographs === null ? (
        <p role="status" className="py-20 text-sm text-neutral-600">
          Photography is temporarily unavailable. Please try again later.
        </p>
      ) : (
        <Gallery photos={photographs} />
      )}
    </main>
  );
}
