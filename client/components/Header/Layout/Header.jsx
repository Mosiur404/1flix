import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Navigation from "../Navigation/Navigation";
import NavLink from "../../UI/NavLink/NavLink";
import Toggler from "../Toggler/Toggler";
import style from "./Header.module.scss";
import { AuthContext } from "../../../store/auth";
export default function Header({ metaTitle = "", metaDescription = "" }) {
  const authCtx = useContext(AuthContext);

  const username = authCtx?.user?.username || "_";
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header suppressHydrationWarning={true} className="container">
        <div className={style.navbar}>
          <Toggler />
          <Link href="/">
            <a className={`${style.navbarBrand} primary-text`}>1FLIX</a>
          </Link>
          <Navigation />
          <NavLink href="/me">
            <a className={style.userName} suppressHydrationWarning={true}>
              {username[0]}
            </a>
          </NavLink>
        </div>
      </header>
    </>
  );
}
