import React, { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Button from "../UI/Button/Button";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination]);

export default function HeaderSlider() {
  const slides = [
    { title: "Stranger Things", image: `/assets/slides/slide-1.jpg` },
    { title: "Loki", image: `/assets/slides/slide-2.jpg` },
    { title: "Shadow & Bone", image: `/assets/slides/slide-3.jpg` },
  ];

  return (
    <section className="headerSwiperWrap">
      <Swiper
        id="main"
        className="headerSwiper"
        tag="div"
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
            <div className="headerSlide">
              <Image
                className="sliderImage"
                src={slide.image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="overlay">
                <div className="container headerContent">
                  <h2 className="sliderTitle">{slide.title.toUpperCase()}</h2>
                  <Button className="h-flex">
                    <span>WATCH NOW</span>&nbsp;
                    <Image
                      src="/assets/icons/Video.svg"
                      width="16"
                      height="16"
                      priority
                    />
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiperNav">
          <div className="container h-flex">
            <div className="swiperPagination"></div>
            <div className="mb-5 swiperArrow">
              <div id="prevSlide" className="arrowSlide bg-dark">
                <Image
                  src="/assets/icons/Arrow-Left.svg"
                  width="44"
                  height="44"
                />
              </div>
              <div id="nextSlide" className="arrowSlide bg-dark">
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
