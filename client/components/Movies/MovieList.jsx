import React from "react";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import MovieSwiper from "./MovieSwiper";

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
    router.push("/" + ID);
  };

  return (
    <>
      {isBreak && (
        <div className="my-3">
          <MovieSwiper
            movieLink={nextMoviePage}
            title={title}
            id={id}
            movies={movies}
          />
        </div>
      )}

      {!isBreak && (
        <div className="my-3">
          <h2 className="primary-text my-3">{title}</h2>
          <div className="row">
            {movies.map((movie) => (
              <div
                className="col-6 col-lg-3 movie-item mb-3"
                key={movie.ID}
                nextMoviePage={() => nextMoviePage(movie.ID)}
              >
                <Image
                  alt={movie.movie_title}
                  src={`/assets/images/${
                    movie.attachment.medium +
                    "." +
                    movie.attachment.file_extension
                  }`}
                  width={300}
                  height={450}
                  layout="responsive"
                />
                <h3 className="my-1">{movie.movie_title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
