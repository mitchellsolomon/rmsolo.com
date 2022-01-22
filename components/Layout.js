import Head from "next/head";
import Link from "next/link";
import { BsGithub, BsTwitter } from "react-icons/bs";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Mitchell Solomon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen bg-white">
        <header className="font-extrabold text-lg py-5">
          <nav className="flex justify-around items-center">
            <ul className="flex items-center">
              <li className="px-3">
                <Link href="/about">
                  <a className="">about</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/projects">
                  <a className="">projects</a>
                </Link>
              </li>
              <li className="px-3 ">
                <Link href="/">
                  <a className="">blog</a>
                </Link>
              </li>
              <li className="px-4 py-[6px] bg-black text-white rounded-full">
                <Link href="/resume.pdf">
                  <a target="_blank" rel="noreferrer">
                    resume
                  </a>
                </Link>
              </li>
            </ul>
            <ul className="flex items-center justify-center">
              <li className="px-3">
                <a
                  className="hover:text-gray-400"
                  href="https://github.com/mitchellsolomon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub size={22} />
                </a>
              </li>
              <li className="px-3">
                <a
                  className="hover:text-[#1d9bf0]"
                  href="https://twitter.com/rmsolomon_"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTwitter size={22} />
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex items-center h-full">{props.children}</main>

        {/* <footer className="">
          <div className="mb-4 flex justify-center"></div>
        </footer> */}
      </div>
    </>
  );
}
