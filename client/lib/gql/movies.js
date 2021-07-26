import { gql } from "@apollo/client";

export const movieQuery = gql`
  query {
    movies {
      ID
      movie_title
      attachment {
        attachment_title
        attachment_slug
        file_extension
      }
    }
  }
`;

export const singleMovieQuery = gql`
  query Movie($ID: ID!) {
    movie(ID: $ID) {
      ID
      movie_title
      movie_plot
      movie_length
      release_year
      attachment {
        attachment_title
        attachment_slug
        file_extension
      }
    }
  }
`;
