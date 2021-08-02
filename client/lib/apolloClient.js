import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function createApolloClient() {
  const token =
    typeof window !== "undefined" && localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token") || ""
      : "";
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      headers: {
        Authorization: token, // or any other values for the http request
        // lang: "en",
      },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Attachment: {
          keyFields: ["ID"],
        },
        Video: {
          keyFields: ["ID"],
        },
        Movie: {
          keyFields: ["ID"],
        },
      },
    }),
  });
}

export default createApolloClient;
