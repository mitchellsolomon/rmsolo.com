import Image from "next/image";
import avatar from "../app/avatar.jpg";

export default function Root() {
  return (
    <div>
      <div className="flex justify-between items-center mb-12 h-[90px]">
        <div className="font-bold">
          <h1 className="text-4xl mb-1">
            Hey, i&apos;m <span className="text-blue-400">Mitchell</span> 👋
          </h1>
          <h2>
            <span className="text-yellow-400 text-2xl">Web Developer</span>
          </h2>
        </div>
        <Image
          alt="Image of Mitchell Solomon"
          src={avatar}
          width={100}
          height={100}
          placeholder="blur"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-y-16">
        <div className="">
          <h2 className="mb-4 font-bold">
            <span className="text-red-400 text-xl">About me</span>
          </h2>
          <p className="leading-8 font-medium text-lg text-neutral-900 dark:text-neutral-300">
            I&apos;m a web developer 👨‍💻, tech enthusiast, and guitar player 🎸.
          </p>
        </div>
      </div>
    </div>
  );
}
