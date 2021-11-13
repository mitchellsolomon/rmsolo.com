import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>mitchellsolomon.dev</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className=""></main>
      </div>
    </Layout>
  );
}
