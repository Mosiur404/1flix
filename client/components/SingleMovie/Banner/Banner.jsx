import React from "react";
import style from "./Banner.module.scss";
import Image from "next/image";
import Button from "../../UI/Button/Button";

export default function Banner({ movie }) {
  return (
    <div className={` ${style.bannerWrap}`}>
      <div className="container" style={{ zIndex: 1 }}>
        <div className="row">
          <div className={`col-8 ${style.movieContentBox}`}>
            <h1 className={style.movieTitle}>{movie.movie_title}</h1>
            <Button className="h-flex">
              <span>PLAY NOW</span>&nbsp;
              <Image src="/assets/icons/Video.svg" width="16" height="16" />
            </Button>
          </div>
          <div className={`col-4 ${style.movieImageBox}`}>
            <Image
              alt={movie.movie_title}
              src={`/assets/images/${movie.attachment.attachment_slug}`}
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
