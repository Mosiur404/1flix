const { ApolloServer } = require("apollo-server");
const schema = require("./graphql/schema");

const server = new ApolloServer(schema);

server.listen(3000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
