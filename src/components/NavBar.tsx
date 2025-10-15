import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { GitHub } from "../assets/icons/GitHub";
import { DarkMode } from "../assets/icons/DarkMode";
import { LightMode } from "../assets/icons/LightMode";
import { NavLink, Link } from "react-router";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 border-b-2 border-b-text mb-6">
      <div className="container px-4 mx-auto relative lg:text-sm text-text ">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-1 ">
            <h1 className=" text-lg font-bold tracking-wide hover:text-primary tranistion-all ease-in-out duration-200">
              Prisoner's Dilemma Visualization
            </h1>
          </Link>

          <ul className="hidden lg:flex gap-4 text-lg flex-1 justify-center  ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-primary text-text tranistion-all ease-in-out duration-200 ${
                  isActive ? "underline underline-offset-2" : ""
                }`
              }
            >
              Game
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-primary text-text tranistion-all ease-in-out duration-200 ${
                  isActive ? "underline underline-offset-2" : ""
                }`
              }
            >
              About
            </NavLink>
          </ul>
          <div className="hidden lg:flex gap-2 items-center flex-1 justify-end">
            <button
              onClick={toggleTheme}
              className="hover:text-primary hover:scale-110 transition-transform "
            >
              <div
                className="transition-all duration-200 ease-in-out"
                style={{
                  transform:
                    theme === "dark"
                      ? "rotate(180deg) scale(1)"
                      : "rotate(0deg) scale(1)",
                }}
              >
                {theme === "dark" ? <LightMode /> : <DarkMode />}
              </div>
            </button>
            <a
              href="https://github.com/LukeBatten17/prisoners-dilemma-viz"
              target="_blank"
              rel="noreferrer"
              className="hover:cursor-pointer hover:text-primary transition-all duration-200 ease-in-out"
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-primary text-text tranistion-all ease-in-out duration-200 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                Game
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-primary text-text tranistion-all ease-in-out duration-200 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                About
              </NavLink>
            </ul>
            <div className="flex mt-4 gap-2 items-center flex-1 justify-end ">
              <button
                onClick={toggleTheme}
                className="hover:text-primary hover:scale-110 transition-transform "
              >
                <div
                  className="transition-all duration-200 ease-in-out"
                  style={{
                    transform:
                      theme === "dark"
                        ? "rotate(180deg) scale(1)"
                        : "rotate(0deg) scale(1)",
                  }}
                >
                  {theme === "dark" ? <LightMode /> : <DarkMode />}
                </div>
              </button>
              <a
                href="https://github.com/LukeBatten17/prisoners-dilemma-viz"
                target="_blank"
                rel="noreferrer"
                className="hover:cursor-pointer hover:text-primary transition-all duration-200 ease-in-out"
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
