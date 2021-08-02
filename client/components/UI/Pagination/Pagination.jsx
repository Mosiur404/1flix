import React from "react";
import NavLink from "../NavLink/NavLink";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./Pagination.module.scss";

export default function Pagination({ totalItems, perPage, currentPage }) {
  const router = useRouter();
  const mainLink = router.pathname.split("/").slice(0, -1).join("/");
  const numberOfPages = Math.ceil(totalItems / perPage);
  const pages = [];

  for (let i = 0; i < numberOfPages; i++) {
    pages[i] = i + 1;
  }
  const prev = +currentPage - 1;
  const next = +currentPage + 1;

  const prevClass =
    currentPage > 1
      ? style.paginationItem
      : `${style.paginationItem} ${style.disabled}`;
  const nextClass =
    currentPage < numberOfPages
      ? style.paginationItem
      : `${style.paginationItem} ${style.disabled}`;

  return (
    <nav className={style.pagination}>
      <Link href={[mainLink, prev].join("/")}>
        <a className={prevClass}>
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            width="16"
            height="16"
          />
        </a>
      </Link>
      {pages.map((page) => (
        <NavLink
          key={page}
          href={[mainLink, page].join("/")}
          activeClassName={style.active}
        >
          <a className={style.paginationItem}>{page}</a>
        </NavLink>
      ))}
      <Link href={[mainLink, next].join("/")}>
        <a className={nextClass}>
          <Image
            src="/assets/icons/arrow-right-dark.svg"
            width="16"
            height="16"
          />
        </a>
      </Link>
    </nav>
  );
}
