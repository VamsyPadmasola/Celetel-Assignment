import React from "react";

export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 w-full text-lg outline-none focus:border-highlight p-1 peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold dark:text-dark-subtle text-light-subtle peer-focus:text-highlight transition self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
