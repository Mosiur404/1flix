import React from "react";
import { useQuery } from "@apollo/client";
import { movieQuery } from "../../lib/gql/movies";
import MovieList from "./MovieList";
import Spinner from "../UI/Loader/Spinner";
import { initializeApollo } from "../../lib/apollo";

export default function Movies(props) {
  const { loading, error, data } = useQuery(movieQuery);
  console.log(props);
  if (error) return <p className="lead">Error loading</p>;
  if (loading) return <Spinner />;
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
  console.log(apolloClient.cache.extract());
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
    revalidate: 1,
  };
};
