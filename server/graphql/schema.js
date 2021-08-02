const { GraphQLUpload } = require("graphql-upload");
const context = require("./context");
const typeDefs = require("./typeDefs");

const { getMovies, getMovie } = require("./resolvers/movie");
const {
  getAttachment,
  getAttachments,
  getAttachmentCount,
  uploadAttachment,
  editAttachment,
  deleteAttachment,
} = require("./resolvers/attachment");
const {
  getVideo,
  getVideos,
  getVideoCount,
  uploadVideo,
  editVideo,
  deleteVideo,
} = require("./resolvers/video");
const { createUser, login } = require("./resolvers/user");

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    movies: getMovies,
    movie: getMovie,
    attachment: getAttachment,
    getAttachments: getAttachments,
    getAttachmentCount: getAttachmentCount,
    video: getVideo,
    getVideos: getVideos,
    getVideoCount: getVideoCount,
  },
  Movie: {
    attachment: getAttachment,
  },
  Mutation: {
    createUser: createUser,
    login: login,
    uploadAttachment,
    editAttachment,
    deleteAttachment,
    uploadVideo,
    deleteVideo,
    editVideo,
  },
};

module.exports = {
  typeDefs,
  resolvers,
  introspection: true,
  context: context,
};
