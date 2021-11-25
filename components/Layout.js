import Head from "next/head";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import ThemeIcon from "../components/ThemeIcon";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen bg-light100 dark:bg-dark600">
        <header className="">
          <nav className="font-extrabold py-5 flex justify-evenly">
            <ul className="flex items-baseline">
              <li className="pr-3">
                <Link href="/">
                  <a>home</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/about">
                  <a>about</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/projects">
                  <a>projects</a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/skills">
                  <a>skills</a>
                </Link>
              </li>
              <li className="px-3">
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  resume
                </a>
              </li>
            </ul>
            <ul className="flex items-center">
              <li className="pl-3">
                <ThemeIcon />
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-grow">{props.children}</main>

        <footer className="flex justify-evenly w-full py-5">
          <ul className=" flex items-center">
            <li className="items-center px-3">
              <a
                href="https://github.com/mitchellsolomon"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
            </li>
            <li className="px-3">
              <a
                href="https://www.linkedin.com/in/mitchell-solomon-2894b4a4/"
                target="_blank"
                rel="noreferrer"
              >
                <BsLinkedin />
              </a>
            </li>
            <li className="px-3">
              <a
                href="https://twitter.com/rmsolomon_"
                target="_blank"
                rel="noreferrer"
              >
                <BsTwitter />
              </a>
            </li>
          </ul>
          <div className="font-code">
            <p>© 2021 Mitchell Solomon. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
