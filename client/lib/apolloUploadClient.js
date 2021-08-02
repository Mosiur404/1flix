import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

function createApolloUploadClient() {
  const token =
    typeof window !== "undefined" && localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token") || ""
      : "";
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createUploadLink({
      uri: "http://localhost:4000/graphql",
      headers: {
        Authorization: token, // or any other values for the http request
        // lang: "en",
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloUploadClient;
