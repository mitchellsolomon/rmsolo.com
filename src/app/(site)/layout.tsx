export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="site-container flex flex-1 flex-col pb-20">
      {children}
    </main>
  );
}
