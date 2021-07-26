import React from "react";
import style from "./InputBox.module.scss";

export function InputBox({
  type = "text",
  className = "",
  id = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  label = "",
  help = "",
  params = {},
}) {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`${style.inputBox} form-control ${className}`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...params}
      />
      <label htmlFor={id}>{label}</label>
      <div id={id} className="form-text" aria-describedby={help}>
        {help}
      </div>
    </div>
  );
}
