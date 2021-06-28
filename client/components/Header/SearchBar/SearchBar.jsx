import React from "react";
import Image from "next/image";
import style from "./SearchBar.module.scss";
export default function SearchBar() {
  return (
    <div className={style.searchBar}>
      <Image src="/assets/icons/Search.svg" width="16" height="16" />
    </div>
  );
}
