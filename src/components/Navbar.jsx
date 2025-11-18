import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 shadow-md border-b border-white/20 dark:border-gray-700/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold tracking-wide text-2xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-transparent bg-clip-text hover:scale-105 transition-transform"
        >
          <UsersIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-300" />
          UserMgmt
        </Link>

        {/* BUTTONS */}
        <div className="flex items-center gap-3">

          {/* CREATE BUTTON */}
          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white 
            font-semibold shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-all"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Create
          </Link>

          {/* THEME TOGGLE */}
          <button
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
            className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 shadow 
            hover:scale-110 hover:shadow-lg transition-all"
          >
            {theme === "light" ? (
              <MoonIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
