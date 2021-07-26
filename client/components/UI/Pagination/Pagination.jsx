import React from "react";
import NavLink from "../NavLink/NavLink";
import style from "./Pagination.module.scss";

export default function Pagination({ totalItems, perPage }) {
  const currentPage = 0;
  const numberOfPages = parseInt(totalItems / perPage);
  const pages = [];

  for (let i = 0; i < numberOfPages; i++) {
    pages[i] = i + 1;
  }
  console.log(pages);
  return (
    <nav className={style.pagination}>
      <a className={style.paginationItem}>&lt;</a>
      {pages.map((page) => (
        <a key={page} className={style.paginationItem}>
          {page}
        </a>
      ))}
      <a className={style.paginationItem}>&gt;</a>
    </nav>
  );
}
