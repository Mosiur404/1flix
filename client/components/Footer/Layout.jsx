import React from "react";
import style from "./Layout.module.scss";
export default function Layout() {
  return (
    <footer className={style.mainFooter}>
      <div className="container">
        <div className={style.footerContent}>© 2021 1FLIX</div>
      </div>
    </footer>
  );
}
