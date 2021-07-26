import React, { useEffect, useCallback, useState } from "react";
import Header from "../../Header/Layout/Header";
import Footer from "../../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import Image from "next/image";
import style from "./Admin.module.scss";
import UploadFile from "../Attachment/UploadFile";
import { useDropzone } from "react-dropzone";

export default function Admin() {
  const token =
    typeof window !== "undefined" && localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false;

  const [attachment, setAttachment] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles = []) => {
    const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }));
    setAttachment((curr) => [...curr, ...mappedAcc, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
  });
  return (
    <>
      <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
      <main className={style.adminSectionWrap}>
        <div className={`container py-5`}>
          <div className="row">
            <div className="col-lg-3">
              <Sidenav />
            </div>
            <div className="col-lg-9">
              {attachment.map((wrap, index) => (
                <UploadFile key={index} file={wrap.file} token={token} />
              ))}
              <div
                {...getRootProps({
                  className: `${style.dragContainer} ${
                    isDragActive ? style.active : ""
                  }`,
                })}
              >
                <input {...getInputProps()} />
                <Image src="/assets/icons/upload.svg" width="44" height="44" />
                <p className="lead text-center my-2">
                  Drag and drop here
                  <br />
                  or
                  <br />
                </p>
                <span className="text-secondary">Browse </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
