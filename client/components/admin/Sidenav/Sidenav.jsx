import React from "react";
import NavLink from "../../UI/NavLink/NavLink";
import style from "./Sidenav.module.scss";
import Image from "next/dist/client/image";

export default function Sidenav() {
  return (
    <nav className={style.sideNav}>
      <NavLink href="/admin/attachment" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Image.svg" width="16" height="16" />
          &emsp;Attachments
        </a>
      </NavLink>
      <NavLink href="/admin/video" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Video.svg" width="16" height="16" />
          &emsp;Videos
        </a>
      </NavLink>
      <NavLink href="/admin/movies" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Play.svg" width="16" height="16" />
          &emsp;Movies
        </a>
      </NavLink>
    </nav>
  );
}
