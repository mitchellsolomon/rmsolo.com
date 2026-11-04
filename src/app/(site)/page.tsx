import Image from "next/image";
import avatar from "@/app/avatar.jpg";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col-reverse items-center justify-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
      <h1 className="page-title max-w-[24ch]">
        Hey, I&apos;m <span className="text-blue-700">Mitchell</span>{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>
      </h1>
      <Image
        alt="Mitchell Solomon"
        src={avatar}
        width={200}
        height={200}
        sizes="200px"
        preload
        placeholder="blur"
        className="size-50 shrink-0 rounded-full"
      />
    </div>
  );
}
