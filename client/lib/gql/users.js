import { gql } from "@apollo/client";

export const loginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const registerQuery = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;
