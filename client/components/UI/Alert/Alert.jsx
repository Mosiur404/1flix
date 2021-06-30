import React from "react";
import style from "./Alert.module.scss";

export function AlertDanger({ children }) {
  return (
    <div className={style.alert + " " + style.alertDanger} role="alert">
      {children}
    </div>
  );
}
