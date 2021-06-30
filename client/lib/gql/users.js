import { gql } from "@apollo/client";

export const loginQuery = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;
