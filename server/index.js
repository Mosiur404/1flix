require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const schema = require("./graphql/schema");

async function startApolloServer() {
  const server = new ApolloServer(schema);
  await server.start();

  const app = express();
  app.use(cors());
  app.use(graphqlUploadExpress({ maxFileSize: 10e9, maxFiles: 10 }));
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

module.exports = startApolloServer();
