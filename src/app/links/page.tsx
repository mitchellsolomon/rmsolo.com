export default function Links() {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <a href="https://github.com" className="text-xl font-bold">
          GitHub
        </a>
        <a href="https://linkedin.com" className="text-xl font-bold">
          LinkedIn
        </a>
        <a href="https://resume.com" className="text-xl font-bold">
          Resume
        </a>
        <a href="mailto:me@example.com" className="text-xl font-bold">
          Email
        </a>
      </div>
    </div>
  );
}
