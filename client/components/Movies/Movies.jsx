import React from "react";
import { useQuery } from "@apollo/client";
import { movieQuery } from "../../lib/gql/movies";
import MovieList from "./MovieList";

export default function Movies() {
  const { loading, error, data } = useQuery(movieQuery);
  const movies = data ? data.movies : [];
  return (
    <>
      <MovieList title="Trending Movies" id="1" movies={movies} />
      <MovieList title="Featured TV Movies" id="2" movies={movies} />
    </>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: movieQuery,
    // variables: { code: VARIABLE },
  });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};
