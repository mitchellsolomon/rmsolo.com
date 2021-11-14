import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export default function ThemeIcon() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        aria-label="Toggle Theme Mode"
        title="Toggle Theme Mode"
        type="button"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </>
  );
}
