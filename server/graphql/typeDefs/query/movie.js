const typeDef = `
  type Movie {
    ID: ID!
    movie_title: String
    movie_plot: String
    release_year: Date
    movie_length: Int
    cover_ID: Int
    attachment: Attachment
  }
`;
module.exports = typeDef;
