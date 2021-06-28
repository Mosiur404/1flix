import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import MovieItem from "./MovieItem";
import style from "./MovieSwiper.module.scss";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation]);

export default function MovieSwiper({ title, movies, id, movieLink }) {
  return (
    <section className="movieSwiper">
      <div className="h-flex">
        <h2 className="primary-text my-3">{title}</h2>
        <div className="movieSwiperNav h-flex">
          <div id={`moviePrevSlide${id}`} className={style.movieSwiperNav}>
            <Image
              src="/assets/icons/grad-arrow-left.svg"
              width="16"
              height="16"
            />
          </div>
          <div id={`movieNextSlide${id}`} className={style.movieSwiperNav}>
            <Image
              src="/assets/icons/grad-arrow-right.svg"
              width="16"
              height="16"
            />
          </div>
          <div className="moviePrev">
            <Image src="/assets/icons/Category.svg" width="16" height="16" />
          </div>
        </div>
      </div>
      <Swiper
        id="main"
        className="movieSwiper"
        tag="section"
        wrapperTag="div"
        navigation={{
          prevEl: `#moviePrevSlide${id}`,
          nextEl: `#movieNextSlide${id}`,
        }}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
      >
        {movies.map((movie, i) => (
          <SwiperSlide
            key={`slide-${i}`}
            tag="div"
            onClick={() => movieLink(movie.ID)}
            className={style.movieItem}
          >
            <MovieItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
