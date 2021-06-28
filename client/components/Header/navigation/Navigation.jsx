import React from "react";
import { useRouter } from "next/router";
import style from "./Navigation.module.scss";
import Image from "next/image";
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
      <li className={style.navLink} href="#">
        <Image src="/assets/icons/Search.svg" width="16" height="16" />
      </li>
    </ul>
  );
}
