import Image from "next/image";

export default function Layout(props) {
  return (
    <>
      <header className="text-3xl font-bold pt-4 text-center">
        This is the Header
      </header>
      <main>{props.children}</main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image
            src="/vercel.svg"
            width="100"
            height="100"
            alt="Vercel Logo"
            className="h-4 ml-2"
          />
        </a>
      </footer>
    </>
  );
}
