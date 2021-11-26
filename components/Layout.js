import Head from "next/head";
import Link from "next/link";
import { BsGithub, BsTwitter } from "react-icons/bs";
import ThemeIcon from "../components/ThemeIcon";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Mitchell Solomon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen bg-light100 dark:bg-dark600">
        <header className="font-extrabold py-5">
          <nav className="flex justify-around items-center">
            <ul className="flex">
              <li className="px-3">
                <Link href="/">
                  <a className="hover:text-dark100">home</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/about">
                  <a className="hover:text-dark100">about</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/projects">
                  <a className="hover:text-dark100">projects</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/skills">
                  <a className="hover:text-dark100">skills</a>
                </Link>
              </li>
              <li className="px-3">
                <a
                  className="hover:text-dark100"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  resume
                </a>
              </li>
            </ul>
            <ul>
              <li className="flex items-center px-3">
                <ThemeIcon />
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex items-center h-full">{props.children}</main>

        <footer className="">
          <ul className="flex items-center justify-center ">
            <li className="px-3 pb-1 hover:text-dark100">
              <a
                href="https://github.com/mitchellsolomon"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub size={18} />
              </a>
            </li>
            <li className="px-3 pb-1 hover:text-dark100">
              <a
                href="https://twitter.com/rmsolomon_"
                target="_blank"
                rel="noreferrer"
              >
                <BsTwitter size={18} />
              </a>
            </li>
          </ul>
          <div className="pb-5 pt-3 flex justify-center">
            <p className="font-code">
              © 2021 Mitchell Solomon. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
