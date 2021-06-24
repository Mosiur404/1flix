const typeDef = `
type Attachment {
    ID: ID!
    attachment_title: String!
    thumbnail: String
    medium: String
    large: String
    full: String
    file_extension: String!
}
`;
module.exports = typeDef;
