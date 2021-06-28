import React from "react";
import style from "./Toggler.module.scss";

export default function Toggler() {
  return (
    <div className={style.navToggler}>
      <div className={style.line}></div>
      <div className={style.line}></div>
      <div className={style.line}></div>
    </div>
  );
}
