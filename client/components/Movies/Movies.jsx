import React from "react";
import { useQuery, gql } from "@apollo/client";
import MovieList from "./MovieList";

export default function Movies() {
  const query = gql`
    query {
      movies {
        ID
        movie_title
        attachment {
          medium
          file_extension
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(query);
  const movies = data ? data.movies : [];
  return (
    <>
      <MovieList title="Trending Movies" id="1" movies={movies} />
      <MovieList title="Featured TV Movies" id="2" movies={movies} />
    </>
  );
}
