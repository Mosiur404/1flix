const context = require("./context/context");

const Movie = require("./typeDefs/query/movie");
const Attachment = require("./typeDefs/query/attachment");
const User = require("./typeDefs/mutations/user");

const { getMovies, getMovie } = require("./resolvers/movie");
const {
  getAttachment,
  getAttachments,
  createAttachment,
} = require("./resolvers/attachment");
const { createUser, login } = require("./resolvers/user");

const resolvers = {
  Query: {
    movies: getMovies,
    movie: getMovie,
    attachment: getAttachment,
    attachments: getAttachments,
  },
  Movie: {
    attachment: getAttachment,
  },
  Mutation: {
    createUser: createUser,
    login: login,
    createAttachment,
  },
};

const Query = `
  scalar Date
  type Query {
    movies: [Movie]
    movie(ID: ID!): Movie
    attachment(ID:ID!): Attachment
    attachments(offset: Int!,limit: Int!): Attachments
  }
`;

const Mutation = `
  type Login {
    access_token: String!
    refresh_token: String!
  }
  type Mutation {
    createUser(username:String!,email: String!, password: String!): Login
    login(email: String!, password: String!): Login

    createAttachment(
      attachment_title: String!
      attachment_slug: String!
      size: Int!
      file_extension: String!
    ): Attachment
  }
`;

module.exports = {
  typeDefs: [Query, Mutation, Movie, Attachment, User],
  resolvers,
  context: context,
};
