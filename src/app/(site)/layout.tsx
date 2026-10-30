export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-sm px-5 sm:max-w-lg sm:px-0 md:max-w-2xl">
      {children}
    </main>
  );
}
