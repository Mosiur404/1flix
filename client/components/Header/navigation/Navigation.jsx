import React from "react";
import { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../../../store/auth";
import style from "./Navigation.module.scss";
import NavLink from "../../UI/NavLink/NavLink";

export default function Navigation() {
  const authCtx = useContext(AuthContext);

  const username = authCtx?.user?.username || "_";

  return (
    <nav className={style.nav}>
      <NavLink href="/">
        <a className={style.navLink}>HOME</a>
      </NavLink>
      <NavLink href="/tv-series">
        <a className={style.navLink}>TV SERIES</a>
      </NavLink>
      <NavLink href="/movies">
        <a className={style.navLink}>MOVIES</a>
      </NavLink>
      <NavLink href="/search">
        <a className={style.navLink}>
          <Image src="/assets/icons/Search.svg" width="16" height="16" />
        </a>
      </NavLink>

      <div className={style.navLink + " " + style.notGrad} href="#">
        <NavLink href="/me">
          <a className={style.userName} suppressHydrationWarning={true}>
            {username[0]}
          </a>
        </NavLink>
        <nav className={style.dropdown}>
          <NavLink href="/admin">
            <a className={style.navLink}>Admin</a>
          </NavLink>
          <a className={style.navLink} onClick={authCtx.logout}>
            Logout
          </a>
        </nav>
      </div>
    </nav>
  );
}
