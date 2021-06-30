import React from "react";
import style from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={style["cool-loader"]}>
      <div className={style.loading + " " + style.squared}>
        <span className={style.square + " " + style.sq0}></span>
        <span className={style.square + " " + style.sq1}></span>
        <span className={style.square + " " + style.sq2}></span>
      </div>
    </div>
  );
}
