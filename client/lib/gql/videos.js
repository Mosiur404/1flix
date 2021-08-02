import { gql } from "@apollo/client";
export const uploadVideoMutation = gql`
  mutation uploadVideo($file: Upload!) {
    uploadVideo(file: $file) {
      ID
      parent_ID
      video_title
      video_slug
      size
      file_extension
    }
  }
`;
export const videosQuery = gql`
  query getVideos($offset: Int, $limit: Int) {
    getVideos(offset: $offset, limit: $limit) {
      ID
      parent_ID
      video_title
      video_slug
      size
      file_extension
    }
    getVideoCount {
      count
    }
  }
`;

export const editVideoMutation = gql`
  mutation editVideo($ID: ID!, $video_title: String!, $video_slug: String!) {
    editVideo(ID: $ID, video_title: $video_title, video_slug: $video_slug) {
      ID
      parent_ID
      video_title
      video_slug
      size
      file_extension
    }
  }
`;

export const deleteVideoMutation = gql`
  mutation deleteVideo($ID: ID!, $slug: String!) {
    deleteVideo(ID: $ID, slug: $slug) {
      result
    }
  }
`;
