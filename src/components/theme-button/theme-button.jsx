import { useApp } from "@/context/useApp";
import { useCallback, useEffect } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useApp();

  const handleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button className="uppercase p-2 px-4 bg-purple-500 rounded-md min-w-32" onClick={handleTheme} type="button">{theme}</button>
  )
}