import { gql } from "@apollo/client";

export const attachmentMutation = `
  mutation uploadAttachment(
    $attachment_title: String!
    $attachment_slug: String!
    $size: Int!
    $file_extension: String!
  ) {
    createAttachment(
      attachment_title: $attachment_title
      attachment_slug: $attachment_slug
      size: $size
      file_extension: $file_extension
    ) {
      ID
      attachment_title
      attachment_slug
      size
      file_extension
    }
  }
`;

export const attachmentsQuery = gql`
  query getAttachments($offset: Int!, $limit: Int!) {
    attachments(offset: $offset, limit: $limit) {
      items {
        ID
        attachment_title
        attachment_slug
        size
        file_extension
      }
      total
    }
  }
`;
