import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import classes from "../styles/Slider.module.scss";

SwiperCore.use([Navigation, Pagination]);

export default function Slider() {
  const slides = [
    { title: "Stranger Things", image: `/assets/slides/slide-1.jpg` },
    { title: "Loki", image: `/assets/slides/slide-2.jpg` },
    { title: "Shadow & Bone", image: `/assets/slides/slide-3.jpg` },
  ];

  return (
    <section className="headerSwiperWrap">
      <Swiper
        id="main"
        className={classes.headerSwiper + " headerSwiper"}
        tag="section"
        wrapperTag="div"
        navigation={{
          prevEl: "#prevSlide",
          nextEl: "#nextSlide",
        }}
        pagination={{
          el: `.swiperPagination`,
          clickable: true,
        }}
        spaceBetween={30}
        slidesPerView="auto"
        centeredSlides={true}
        centeredSlidesBounds={true}
        loop={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={`slide-${i}`} tag="div">
            <div className={classes.header_slide}>
              <Image
                className={classes.sliderImage}
                src={slide.image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="overlay">
                <div className={classes.header_content + " container"}>
                  <h2 className="mt-5 text-light display-5 fw-normal">
                    {slide.title.toUpperCase()}
                  </h2>
                  <button className="btn btn-light h-flex">
                    <span className="me-2">WATCH NOW</span>
                    <Image
                      src="/assets/icons/Video.svg"
                      width="16"
                      height="16"
                    />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className={classes.swiperNav}>
          <div className="container h-flex">
            <div className="swiperPagination"></div>
            <div className="mb-5 swiperArrow">
              <div id="prevSlide" className={`${classes.arrowSlide} bg-dark`}>
                <Image
                  src="/assets/icons/Arrow-Left.svg"
                  width="44"
                  height="44"
                />
              </div>
              <div id="nextSlide" className={`${classes.arrowSlide} bg-dark`}>
                <Image
                  src="/assets/icons/Arrow-Right.svg"
                  width="44"
                  height="44"
                />
              </div>
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
