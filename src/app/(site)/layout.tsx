export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="site-container pb-20">
      {children}
    </main>
  );
}
