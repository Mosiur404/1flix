import React from "react";
import style from "./Button.module.scss";
export default function Button({
  children,
  className = "",
  onClick = () => {},
}) {
  return (
    <button className={`btn ${style.btnLight} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
