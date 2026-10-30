import type { Metadata } from "next";

export const metadata: Metadata = { title: "Links | Mitchell Solomon" };

export default function Links() {
  return (
    <div>
      <h1 className="page-title mb-6">Links</h1>
      <ul>
        <li>
          <a
            href="https://github.com/mitchellsolomon"
            className="inline-flex min-h-11 items-center text-base underline underline-offset-4 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
