"use client";
import { Button } from "./ui/button";
import {FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button 
      variant='outline' 
      size='icon' 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
      </Button>
    </div>
  );
};

export default ThemeToggler;
