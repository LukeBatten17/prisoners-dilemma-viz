import React from "react";
import NavBar from "../components/NavBar";
import AboutContent from "../content/about.md?raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const About = () => {
  return (
    <div className=" flex flex-col bg-background min-h-screen">
      <NavBar />
      <main className="markdown mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {AboutContent}
        </ReactMarkdown>
      </main>
    </div>
  );
};

export default About;
