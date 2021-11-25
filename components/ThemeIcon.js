import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export default function ThemeIcon() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "light") {
      return <BsFillSunFill role="button" onClick={() => setTheme("dark")} />;
    } else {
      return <BsFillMoonFill role="button" onClick={() => setTheme("light")} />;
    }
  };

  return (
    <>
      <button>{renderThemeChanger()}</button>
    </>
  );
}
