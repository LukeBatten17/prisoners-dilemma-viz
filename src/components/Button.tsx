import React from "react";

const Button = ({ onClick, className, children }) => {
  return (
    <button
      className={`border shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] hover:translate-px hover:shadow-none transition-all ease-in-out duration-150 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
