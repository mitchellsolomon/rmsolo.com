import Head from "next/head";
import ThemeIcon from "../components/ThemeIcon";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>mitchellsolomon.dev</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className=" font-extrabold py-5 bg-light100 dark:bg-dark100 flex justify-between">
          <ul className="flex items-center">
            <li className=" text-xl pl-6 pr-3">
              <a href="">mitchell solomon</a>
            </li>
            <li className="px-3">
              <a href="about">about</a>
            </li>
            <li className="px-3">
              <a href="projects">projects</a>
            </li>
            <li className="px-3">
              <a href="skills">skills</a>
            </li>
          </ul>
          <ul className="flex items-center">
            <li className="pl-2 pr-6">
              <ThemeIcon />
            </li>
          </ul>
        </nav>

        <main className="flex-grow">
          <h1 className="text-center text-3xl font-extrabold">
            Under Construction 🛠
          </h1>
        </main>

        <footer className=" flex items-center justify-center py-5">
          <ul className="items-center">
            <li className="px-3">
              <a href="https://github.com/mitchellsolomon">
                <BsGithub />
              </a>
            </li>
          </ul>
          <ul>
            <li className="px-3">
              <a href="https://www.linkedin.com/in/mitchell-solomon-2894b4a4/">
                <BsLinkedin />
              </a>
            </li>
          </ul>
          <ul>
            <li className="px-3">
              <a href="https://twitter.com/rmsolomon_">
                <BsTwitter />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
