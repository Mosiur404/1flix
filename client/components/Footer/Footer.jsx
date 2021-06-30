import React from "react";
import style from "./Footer.module.scss";
export default function Footer() {
  return (
    <footer className={style.mainFooter}>
      <div className="container">
        <div className={style.footerContent}>© 2021 1FLIX</div>
      </div>
    </footer>
  );
}
