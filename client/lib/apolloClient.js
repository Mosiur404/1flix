import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000",
      // headers: {
      //   "X-hasura-admin-secret": "<YOUR_HASURA_KEY>", // or any other values for the http request
      //   lang: "en",
      // },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
