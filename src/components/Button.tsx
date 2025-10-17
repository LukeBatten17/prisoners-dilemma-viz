import React from "react";

const Button = ({ onClick, className, children }) => {
  return (
    <button
      className={`border dark:border-[#f3e2d8]  shadow-sm dark:shadow-[#f3e2d8] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
