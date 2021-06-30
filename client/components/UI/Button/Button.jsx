import React from "react";
import style from "./Button.module.scss";
export default function Button({
  children,
  className = "",
  type = "button",
  isDisabled = false,
  onClick = () => {},
}) {
  return (
    <button
      type={type}
      className={`btn ${style.btnLight} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
export function ButtonPrimary({
  children,
  type = "button",
  className = "",
  onClick = () => {},
  isDisabled = false,
}) {
  return (
    <button
      type={type}
      className={`btn ${style.btnPrimary} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
