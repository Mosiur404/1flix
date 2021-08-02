const { GraphQLUpload } = require("graphql-upload");
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Upload
  type DeleteResponse {
    result: Boolean!
  }
  type Count {
    count: Int!
  }
  type Attachment {
    ID: ID!
    attachment_title: String!
    attachment_slug: String!
    size: String!
    file_extension: String!
  }
  type Video {
    ID: ID!
    parent_ID: ID!
    video_title: String!
    video_slug: String!
    size: Int!
    file_extension: String!
  }
  type Movie {
    ID: ID!
    movie_title: String
    movie_plot: String
    release_year: Date
    movie_length: Int
    cover_ID: Int
    attachment: Attachment
  }
  type User {
    ID: ID!
    email: String!
    password: String!
    username: String!
    role: Int!
    google_enabled: Int
    created_at: Date
  }
  type Login {
    access_token: String!
    refresh_token: String!
  }
  type Query {
    movies: [Movie]
    movie(ID: ID!): Movie
    attachment(ID: ID!): Attachment
    getAttachments(offset: Int, limit: Int, search: String): [Attachment]
    getAttachmentCount: Count

    video(ID: ID!): Video
    getVideos(offset: Int, limit: Int): [Video]
    getVideoCount: Count
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Login
    login(email: String!, password: String!): Login

    uploadAttachment(file: Upload!): Attachment
    editAttachment(
      ID: ID!
      attachment_title: String!
      attachment_slug: String!
    ): Attachment
    deleteAttachment(ID: ID!, slug: String!): DeleteResponse

    uploadVideo(file: Upload!): Video
    editVideo(ID: ID!, video_title: String!, video_slug: String!): Video
    deleteVideo(ID: ID!, slug: String!): DeleteResponse
  }
`;
module.exports = typeDefs;
