const Movie = require("./typeDefs/query/movie");
const Attachment = require("./typeDefs/query/attachment");
const User = require("./typeDefs/mutations/user");

const { getMovies, getMovie } = require("./resolvers/movie");
const { getAttachment } = require("./resolvers/attachment");
const { createUser, login } = require("./resolvers/user");

const resolvers = {
  Query: {
    movies: getMovies,
    movie: getMovie,
    attachment: getAttachment,
    login: login,
  },
  Movie: {
    attachment: getAttachment,
  },
  Mutation: {
    createUser: createUser,
  },
};

const Query = `
  scalar Date
  type Login {
    username: String!
    access_token: String!
    refresh_token: String!
  }
  type Query {
    movies: [Movie]
    movie(ID: ID!): Movie
    attachment(ID:ID!): Attachment
    login(email: String!, password: String!): Login
  }
`;

const Mutation = `
  type Mutation {
    createUser(email: String!, password: String!): User
  }
`;

module.exports = {
  typeDefs: [Query, Mutation, Movie, Attachment, User],
  resolvers,
};
