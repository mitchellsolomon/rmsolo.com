import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill, BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function ThemeIcon() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className=""
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </>
  );
}
