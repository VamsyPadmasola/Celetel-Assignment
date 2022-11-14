import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ to, children }) {
  return (
    <Link
      className="hover:text-highlight transition"
      to={to}
    >
      {children}
    </Link>
  );
}
