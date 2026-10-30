import Image from "next/image";
import avatar from "@/app/avatar.jpg";

export default function Home() {
  return (
    <div className="flex flex-col-reverse items-start justify-between gap-8 sm:flex-row sm:items-center">
      <h1 className="page-title max-w-[24ch]">
        Hey, I&apos;m <span className="text-blue-700">Mitchell</span>{" "}
        <span role="img" aria-label="waving hand">👋</span>
      </h1>
      <Image
        alt="Mitchell Solomon"
        src={avatar}
        width={100}
        height={100}
        sizes="100px"
        preload
        placeholder="blur"
        className="size-25 shrink-0 rounded-full"
      />
    </div>
  );
}
