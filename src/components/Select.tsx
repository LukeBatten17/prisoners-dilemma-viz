import React from "react";

const Select = ({
  children,
  name,
  id,
  onChange,
  value,
  defaultValue,
  className,
}) => {
  const selectProps = value !== undefined ? { value } : { defaultValue };
  return (
    <select
      name={name}
      id={id}
      className={`border p-1  text-text shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] hover:translate-px hover:shadow-none focus:outline-0 transition-all ease-in-out duration-150 ${className}`}
      onChange={onChange}
      {...selectProps}
    >
      {children}
    </select>
  );
};

export default Select;
