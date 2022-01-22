import Image from "next/image";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-grow justify-center items-center">
        <div>
          <Image
            alt="Mitchell Solomon Picture"
            height={250}
            width={250}
            src="/me.jpg"
            priority
            className="rounded-full"
          />
        </div>
        <div className="pl-10">
          <h1 className="text-4xl font-extrabold ">
            Hi, I&apos;m Mitchell Solomon
          </h1>
          <p className="font-code pt-2">Software Developer</p>
        </div>
      </div>
    </Layout>
  );
}
