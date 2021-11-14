import Head from "next/head";
import ThemeIcon from "../components/ThemeIcon";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>mitchellsolomon.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-light100 dark:bg-dark600">
        <nav className=" font-inter font-extrabold py-5 flex justify-between ">
          <ul className="flex items-center">
            <li className="text-2xl pl-8 pr-3">
              <a href="">mitchellsolomon.dev</a>
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
            <li className="pl-3 pr-8">
              <ThemeIcon />
            </li>
          </ul>
        </nav>

        <main className="flex-grow">
          <h1 className=" text-dark100 text-center text-2xl font-extrabold">
            Under Construction 🛠
          </h1>
        </main>

        <Footer />
      </div>
    </>
  );
}
