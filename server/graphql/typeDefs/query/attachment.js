const typeDef = `
  type Attachment {
    ID: ID!
    attachment_title: String!
    attachment_slug: String!
    size: String!
    file_extension: String!
  }
  type Attachments {
    items: [Attachment]
    total: Int!
  }
`;
module.exports = typeDef;
