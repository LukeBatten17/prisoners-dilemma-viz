import React from "react";

interface SelectProps {
  children: React.ReactNode;
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  defaultValue?: string | number;
  className?: string;
  ariaLabel?: string;
}

const Select: React.FC<SelectProps> = ({
  children,
  name,
  id,
  onChange,
  value,
  defaultValue,
  className,
  ariaLabel,
}) => {
  const selectProps = value !== undefined ? { value } : { defaultValue };
  return (
    <select
      name={name}
      id={id}
      className={`border p-1   shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] hover:translate-px hover:shadow-none focus:outline-0 transition-all ease-in-out duration-150 ${className}`}
      onChange={onChange}
      aria-label={ariaLabel}
      {...selectProps}
    >
      {children}
    </select>
  );
};

export default Select;
