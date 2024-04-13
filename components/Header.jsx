"use client";

import React, { useState, useEffect } from "react";
import ThemeToggler from "./ThemeToggler";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`${
        header
          ? "py-4 bg-white shadow-lg dark:bg-accent"
          : "py-6 dark:bg-secondary"
      } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-[#fef8f5]"}`}
    >
      <div className="container mx-auto justify-between flex">
        <div className="flex items-center gap-x-2">
          <Logo />
          <h1 className="text-4xl">
            Next Weather
          </h1>

        </div>
          <div className="flex items-center gap-x-6">
            <ThemeToggler />
          </div>
      </div>
    </header>
  );
};
export default Header;
