import React from "react";
import style from "./InputBox.module.scss";

export function InputBox({
  type = "text",
  className = "",
  hasError = false,
  id = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  label = "",
  help = "",
  params = {},
}) {
  const tag = type === "textarea" ? "textarea" : "input";
  if (type === "textarea")
    return (
      <div className="form-floating mb-3">
        <textarea
          className={`${style.inputBox} form-control ${
            hasError ? "is-invalid" : ""
          } ${className}`}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...params}
        >
          {value}
        </textarea>
        <label htmlFor={id}>{label}</label>
        <div id={id} className="form-text" aria-describedby={help}>
          {help}
        </div>
      </div>
    );
  else
    return (
      <div className="form-floating mb-3">
        <input
          type={type}
          className={`${style.inputBox} form-control ${
            hasError ? "is-invalid" : ""
          } ${className}`}
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
