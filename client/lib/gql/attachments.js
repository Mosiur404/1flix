import { gql } from "@apollo/client";

export const attachmentMutation = gql`
  mutation uploadAttachment($file: Upload!) {
    uploadAttachment(file: $file) {
      ID
      attachment_title
      attachment_slug
      size
      file_extension
    }
  }
`;

export const attachmentsQuery = gql`
  query getAttachments($offset: Int, $limit: Int, $search: String) {
    getAttachments(offset: $offset, limit: $limit, search: $search) {
      ID
      attachment_title
      attachment_slug
      size
      file_extension
    }
    getAttachmentCount {
      count
    }
  }
`;

export const editAttachmentMutation = gql`
  mutation editAttachment(
    $ID: ID!
    $attachment_title: String!
    $attachment_slug: String!
  ) {
    editAttachment(
      ID: $ID
      attachment_title: $attachment_title
      attachment_slug: $attachment_slug
    ) {
      ID
      attachment_title
      attachment_slug
      size
      file_extension
    }
  }
`;
export const deleteAttachmentMutation = gql`
  mutation deleteAttachment($ID: ID!, $slug: String!) {
    deleteAttachment(ID: $ID, slug: $slug) {
      result
    }
  }
`;
