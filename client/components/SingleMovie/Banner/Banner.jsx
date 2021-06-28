import React from "react";
import style from "./Banner.module.scss";
import Image from "next/image";

export default function Banner({ movie }) {
  return (
    <div className={` ${style.bannerWrap}`}>
      <div className="container" style={{ zIndex: 1 }}>
        <div className="row">
          <div className={`col-8 ${style.movieContentBox}`}>
            <h1 className={style.movieTitle}>{movie.movie_title}</h1>
          </div>
          <div className={`col-4 ${style.movieImageBox}`}>
            <Image
              alt={movie.movie_title}
              src={`/assets/images/${
                movie.attachment.medium + "." + movie.attachment.file_extension
              }`}
              width={300}
              height={450}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
