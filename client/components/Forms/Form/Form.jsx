import React from "react";
import style from "./Form.module.scss";

export function Form({ children, className = "", onSubmit = () => {} }) {
  return (
    <form onSubmit={onSubmit} className={`${style.formBox} ${className}`}>
      {children}
    </form>
  );
}
