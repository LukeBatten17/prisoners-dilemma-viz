import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { GitHub } from "../assets/icons/GitHub";
import { DarkMode } from "../assets/icons/DarkMode";
import { LightMode } from "../assets/icons/LightMode";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-primary  border-b border-b-text">
      <div className="container px-4 mx-auto relative lg:text-sm text-text">
        <div className="flex justify-between items-center">
          <h1 className=" text-lg font-bold flex-1 tracking-wide">
            Prisoner's Dilemma Visualization
          </h1>
          <ul className="hidden lg:flex gap-4 text-lg flex-1 justify-center ">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About
            </a>
          </ul>
          <div className="hidden lg:flex gap-2 items-center flex-1 justify-end">
            <button onClick={toggleTheme}>
              {theme === "dark" ? <LightMode /> : <DarkMode />}
            </button>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:cursor-pointer fill-text"
            >
              <GitHub />
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end h-6">
            <button onClick={toggleNavbar} className="">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="sticky right-0 z-20 bg-background w-full pt-4 pb-2 flex flex-col justify-center items-center lg:hidden">
            <ul className="flex flex-col text-lg items-center ">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/about" className="hover:underline">
                About
              </a>
            </ul>
            <div className="flex mt-4 gap-2 items-center flex-1 justify-end ">
              <button onClick={toggleTheme}>
                {theme === "dark" ? <LightMode /> : <DarkMode />}
              </button>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:cursor-pointer fill-text"
              >
                <GitHub />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
