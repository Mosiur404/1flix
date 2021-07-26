import React from "react";
import Image from "next/image";
import style from "./MovieItem.module.scss";

export default function MovieItem({ movie }) {
  return (
    <>
      <Image
        alt={movie.movie_title}
        src={`/assets/images/${movie.attachment.attachment_slug}`}
        width={300}
        height={450}
        layout="responsive"
      />
      <h3 className={style.movieTitle}>{movie.movie_title}</h3>
    </>
  );
}
