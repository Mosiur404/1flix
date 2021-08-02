import React from "react";
import NavLink from "../../UI/NavLink/NavLink";
import style from "./Sidenav.module.scss";
import Image from "next/dist/client/image";

export default function Sidenav() {
  return (
    <nav className={style.sideNav}>
      <NavLink href="/admin/genre/1" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/category.svg" width="16" height="16" />
          &emsp;Genre
        </a>
      </NavLink>
      <NavLink href="/admin/crew/1" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/profile.svg" width="16" height="16" />
          &emsp;Crew
        </a>
      </NavLink>
      <NavLink href="/admin/attachment" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Image.svg" width="16" height="16" />
          &emsp;Images
        </a>
      </NavLink>
      <NavLink href="/admin/video" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Video.svg" width="16" height="16" />
          &emsp;Videos
        </a>
      </NavLink>
      <NavLink href="/admin/movie/1" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Play.svg" width="16" height="16" />
          &emsp;Movies
        </a>
      </NavLink>
      <NavLink href="/admin/series/1" activeClassName={style.active}>
        <a className={style.sideNavLink}>
          <Image src="/assets/icons/Play.svg" width="16" height="16" />
          &emsp;TV Series
        </a>
      </NavLink>
    </nav>
  );
}
