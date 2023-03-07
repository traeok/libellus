import { FaFilter, FaPlus } from "react-icons/fa";
import ThemeIcon from "@/components/icons/Theme";
import { useEffect, useState } from "react";

export const MenuBar = ({ setAddingItem }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", (e) => {
    const darkModeOn = e.matches;
    setIsDarkMode(darkModeOn);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="ml-auto mr-2 flex items-center">
      <ThemeIcon
        isDarkMode={isDarkMode}
        size="1.5em"
        className="cursor-pointer mr-4 dark:text-zinc-100 text-zinc-800"
        onClick={(_e) => setIsDarkMode((wasDark) => !wasDark)}
      />
      <button
        type="button"
        className="flex items-center align-center py-2 px-4 mr-2 text-sm font-medium text-zinc-900 focus:outline-none bg-zinc-100 rounded-lg hover:bg-zinc-300 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-700"
      >
        <FaFilter className="mr-3 max-[460px]:mr-0" />
        <div className="hide-mobile">Filter by...</div>
      </button>

      <button
        type="button"
        className="flex items-center align-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
        onClick={() => setAddingItem(true)}
      >
        <FaPlus className="mr-3 max-[460px]:mr-0" />
        <div className="hide-mobile">Add item</div>
      </button>
    </div>
  );
};
