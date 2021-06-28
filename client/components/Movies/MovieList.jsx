import React from "react";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import MovieSwiper from "./MovieSwiper";
import MovieItem from "./MovieItem";
import style from "./MovieList.module.scss";
const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", (e) => updateTarget(e));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);

  return targetReached;
};

export default function MovieList({ title, movies = [], id }) {
  const isBreak = useMediaQuery(992);
  const router = useRouter();
  const nextMoviePage = (ID) => {
    router.push("/movie/" + ID);
  };

  return (
    <main className="container">
      {isBreak && (
        <div className={style.movieList}>
          <MovieSwiper
            movieLink={nextMoviePage}
            title={title}
            id={id}
            movies={movies}
          />
        </div>
      )}

      {!isBreak && (
        <div className={style.movieList}>
          <div className="h-flex">
            <h2 className="primary-text my-3">{title}</h2>
            <div className="primary-text h-flex">
              More videos{" "}
              <Image
                src="/assets/icons/grad-arrow-right.svg"
                width="16"
                height="16"
              />
            </div>
          </div>
          <div className="row">
            {movies.map((movie) => (
              <div
                className="col-6 col-lg-3 movie-item mb-3"
                key={movie.ID}
                onClick={() => nextMoviePage(movie.ID)}
              >
                <MovieItem movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
