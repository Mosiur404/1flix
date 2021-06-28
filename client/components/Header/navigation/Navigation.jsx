import React from "react";
import { useRouter } from "next/router";
import style from "./Navigation.module.scss";

export default function Navigation({ onHomeLink }) {
  const route = useRouter();
  const tvSeriesLinkHandler = () => {
    route.push("/");
  };

  return (
    <ul className={style.nav}>
      <li className={style.navLink} onClick={onHomeLink}>
        HOME
      </li>
      <li className={style.navLink} href="#">
        TV SERIES
      </li>
      <li className={style.navLink} href="#">
        MOVIES
      </li>
    </ul>
  );
}
