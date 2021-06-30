const typeDef = `
  type User {
    ID: ID!
    email: String!
    password: String!
    display_name: String
    role: Int!
    google_enabled: Int
    created_at: Date
  }
`;
module.exports = typeDef;
