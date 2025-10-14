import React from "react";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "../context/ThemeContext";

const About = () => {
  return (
    <ThemeProvider>
      <div className=" flex flex-col bg-background min-h-screen">
        <NavBar />
        <main className="max-w-screen-xl mx-auto ">About....</main>
      </div>
    </ThemeProvider>
  );
};

export default About;
