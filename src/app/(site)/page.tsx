import Image from "next/image";
import avatar from "@/app/avatar.jpg";

export default function Root() {
  return (
    <div>
      <div className="flex justify-between items-center mb-12 h-[90px]">
        <h1 className="text-4xl font-bold flex gap-x-4">
          <span>
            Hey, i&apos;m <span className="text-blue-400">Mitchell</span>
          </span>
          <span>👋</span>
        </h1>
        <Image
          alt="Image of Mitchell Solomon"
          src={avatar}
          width={100}
          height={100}
          preload
          placeholder="blur"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
