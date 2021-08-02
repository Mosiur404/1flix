import React, { useState, useCallback } from "react";
import Header from "../../Header/Layout/Header";
import Footer from "../../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import UploadFile from "./UploadFile";
import ListVideo from "./ListVideo";
import style from "./Video.module.scss";
import EditVideo from "./EditVideo";

export default function Video() {
  const [editVideoVisibility, seteditVideoVisibility] = useState(false);
  const [uploaderVisibility, setUploaderVisibility] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [videos, setVideos] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles = []) => {
    const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }));
    setVideos((curr) => [...curr, ...mappedAcc, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/mp4,video/x-m4v,video/*",
  });

  const [editVideo, seteditVideo] = useState({
    ID: null,
    parent_ID: null,
    video_slug: null,
    video_title: null,
    size: null,
    file_extension: null,
    buildUrl: null,
  });

  return (
    <>
      <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
      <main className={style.adminSectionWrap}>
        <div className={`container py-5`}>
          <div className="row g-4">
            <div className="col-lg-3">
              <Sidenav />
            </div>
            <div className="col-lg-9">
              {editVideoVisibility && (
                <EditVideo
                  data={editVideo}
                  setVisiblity={seteditVideoVisibility}
                />
              )}
              {uploaderVisibility && (
                <>
                  <div
                    {...getRootProps({
                      className: `${style.dragContainer} ${
                        isDragActive ? style.active : ""
                      }`,
                    })}
                  >
                    <input {...getInputProps()} />
                    <Image
                      src="/assets/icons/upload.svg"
                      width="44"
                      height="44"
                    />
                    <p className="lead text-center my-2">
                      Drag and drop here
                      <br />
                      or
                      <br />
                    </p>
                    <span className="text-secondary">Browse </span>
                  </div>

                  {videos.map((wrap, index) => (
                    <UploadFile key={index} file={wrap.file} />
                  ))}
                </>
              )}
              <ListVideo
                setUploaderVisibility={setUploaderVisibility}
                setTotal={setTotalItems}
                currentPage={1}
                seteditVideo={seteditVideo}
                seteditVideoVisibility={seteditVideoVisibility}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
