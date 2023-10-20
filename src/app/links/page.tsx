export default function Links() {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <a
          href="https://github.com/mitchellsolomon"
          className="text-xl font-bold"
          target="_blank"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/reaganmitchellsolomon/"
          className="text-xl font-bold"
          target="_blank"
        >
          LinkedIn
        </a>
        {/* <a href="https://resume.com" className="text-xl font-bold">
          Resume
        </a> */}
      </div>
    </div>
  );
}
