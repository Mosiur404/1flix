import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navigation from "../navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import Toggler from "../Toggler/Toggler";
import style from "./Header.module.scss";
export default function Header({ metaTitle = "", metaDescription = "" }) {
  const route = useRouter();
  const homeLinkHandler = () => {
    route.push("/");
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="container">
        <nav className={style.navbar}>
          <Toggler />
          <a
            className={`${style.navbarBrand} primary-text`}
            onClick={homeLinkHandler}
          >
            1FLIX
          </a>
          <Navigation onHomeLink={homeLinkHandler} />
          <SearchBar />
        </nav>
      </header>
    </>
  );
}
