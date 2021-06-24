const Movie = require("./typeDefs/movie");
const Attachment = require("./typeDefs/attachment");

const { getMovies, getMovie } = require("./resolvers/movie");
const { getAttachment } = require("./resolvers/attachment");

const resolvers = {
  Query: {
    movies: getMovies,
    movie: getMovie,
    attachment: getAttachment,
  },
  Movie: {
    attachment: getAttachment,
  },
};

const Query = `
  type Query {
    movies: [Movie]
    movie(ID: ID!): Movie
    attachment(ID:ID!): Attachment
  }
`;

module.exports = {
  typeDefs: [Query, Movie, Attachment],
  resolvers,
};
