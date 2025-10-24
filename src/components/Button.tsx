import React from "react";

type ButtonProps = {
  onClick: any;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  disabled,
  ariaLabel,
}) => {
  return (
    <button
      className={`border shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] hover:translate-px hover:shadow-none disabled:cursor-not-allowed disabled:bg-primary/50 disabled:hover:translate-none disabled:hover:shadow-sm transition-all ease-in-out duration-150 ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
