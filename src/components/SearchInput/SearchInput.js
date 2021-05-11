import React from "react";
import "./SearchInput.css";

export default function SearchInput({ ...props }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search..."
      onkeyup="processChange()"
      {...props}
    />
  );
}
