import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { deleteVideoMutation, videosQuery } from "../../../lib/gql/videos";
import { ButtonPrimary } from "../../UI/Button/Button";
import Spinner from "../../UI/Loader/Spinner";

import { buildVideoUrl, setConfig } from "cloudinary-build-url";
setConfig({ cloudName: "mosiur404", resourceType: "video" });
import style from "./ListVideo.module.scss";

export default function ListVideo({
  setUploaderVisibility,
  setTotal,
  currentPage,
  seteditVideo,
  seteditVideoVisibility,
}) {
  const toggleUploaderVisibility = (event) => {
    setUploaderVisibility((visible) => !visible);
  };

  const limit = 18;
  const offset = (currentPage - 1) * limit;
  const videoVar = { offset, limit };

  const { loading, error, data } = useQuery(videosQuery, {
    variables: videoVar,
  });
  const videos = data?.getVideos || [];
  //set total for pagination
  useEffect(() => {
    setTotal(data?.getVideoCount?.count);
    return () => {};
  }, [data]);

  // starts delete method from here on
  const [deleteMutate, { deleteLoading, deleteError }] = useMutation(
    deleteVideoMutation,
    { refetchQueries: [{ query: videosQuery, variables: videoVar }] }
  );

  const handleVideoDelete = async (ID, slug) => {
    if (window.confirm("Do you really wish to delete?")) {
      seteditVideoVisibility(false);
      setUploaderVisibility(false);
      const { data: video } = await deleteMutate({
        variables: { ID, slug },
      });
    }
  };

  //   //edit part here
  const editVideoHandler = (video, buildVideoUrl) => {
    seteditVideoVisibility(true);
    setUploaderVisibility(false);
    seteditVideo({ ...video, buildVideoUrl: buildVideoUrl });
  };

  if (loading) return <Spinner />;
  else if (error) return <p>Error Loading Videos.</p>;
  else
    return (
      <div className={style.videoWrap}>
        <div className="h-flex mb-4">
          <h1 className="primary-text">VIDEOS</h1>
          <ButtonPrimary onClick={toggleUploaderVisibility}>
            UPLOAD
          </ButtonPrimary>
        </div>
        <div className="row g-3">
          {videos.map((video) => (
            <div key={video.ID} className="col-12 col-lg-6">
              <div className={style.video}>
                <video width="100%" height="auto" controls>
                  <source
                    src={buildVideoUrl(video.video_slug, {})}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className={`h-flex ${style.videoAction}`}>
                  <button
                    onClick={() =>
                      editVideoHandler(
                        video,
                        buildVideoUrl(video.video_slug, {})
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleVideoDelete(video.ID, video.video_slug)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export const getStaticProps = () => {};
