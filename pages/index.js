import Image from "next/image";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-grow justify-center items-center text-center ">
        <div>
          <Image
            alt="Mitchell Solomon"
            height={250}
            width={250}
            src="/me.jpg"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="pl-10 text-4xl font-extrabold text-center">
            Hi, I&apos;m Mitchell Solomon
          </h1>
          <p className="font-code pt-1">Web Developer</p>
        </div>
      </div>
    </Layout>
  );
}
