const { ApolloServer } = require("apollo-server");
const schema = require("./graphql/schema");

const server = new ApolloServer(schema);

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
