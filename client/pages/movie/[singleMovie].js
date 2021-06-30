import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { singleMovieQuery } from "../../lib/gql/movies";
import SingleMovie from "../../components/SingleMovie/Layout/SingleMovie";
import Header from "../../components/Header/Layout/Header";
import Footer from "../../components/Footer/Footer";

export default function singleMovie() {
  const router = useRouter();
  const { loading, error, data } = useQuery(singleMovieQuery, {
    variables: { ID: router?.query?.singleMovie ?? 0 },
  });
  const movie = data?.movie ?? {};

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Header />
      <SingleMovie movie={movie} />
      <Footer />
    </>
  );
}
