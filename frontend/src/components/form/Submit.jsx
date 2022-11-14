import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ value, busy, type, onClick }) {
  return (
    <button
      type={type || "submit"}
      className={"w-44 rounded text-white font-semibold text-lg cursor-pointer h-10 flex items-center justify-center bg-success"}
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
  );
}
