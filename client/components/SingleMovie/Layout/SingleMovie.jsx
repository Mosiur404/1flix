import React from "react";
import style from "./SingleMovie.module.scss";
import Banner from "../Banner/Banner";

export default function SingleMovie({ movie }) {
  return (
    <>
      <div
        className={`${style.singleMovieWrap}`}
        style={{
          backgroundImage: `url("${`/assets/images/${movie.attachment.attachment_slug}`}")`,
        }}
      >
        <Banner movie={movie} />
      </div>
      <div className="container">
        <br />
        <p>Plot : {movie.movie_plot}</p>
        <p>length {movie.movie_length}</p>
        <p>Released: {new Date(movie.release_year).getFullYear()}</p>
      </div>
    </>
  );
}
