import React, { useCallback, useState } from "react";
import Header from "../../Header/Layout/Header";
import Footer from "../../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import Image from "next/image";
import style from "./Attachment.module.scss";
import UploadFile from "./UploadFile";
import ListAttachment from "./ListAttachment";
import Pagination from "../../UI/Pagination/Pagination";
import { useDropzone } from "react-dropzone";
import EditAttachment from "./EditAttachment";

export default function Attachment({ currentPage }) {
  const [uploaderVisibility, setUploaderVisibility] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [attachments, setAttachments] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles = []) => {
    const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }));
    setAttachments((curr) => [...curr, ...mappedAcc, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
  });

  //edit attachment section
  const [editAttachment, seteditAttachment] = useState({
    ID: null,
    attachment_slug: null,
    attachment_title: null,
    file_extension: null,
    size: null,
    buildUrl: null,
  });
  const [editAttachmentVisibility, seteditAttachmentVisibility] =
    useState(false);
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
              {editAttachmentVisibility && (
                <EditAttachment
                  data={editAttachment}
                  setVisiblity={seteditAttachmentVisibility}
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

                  {attachments.map((wrap, index) => (
                    <UploadFile key={index} file={wrap.file} />
                  ))}
                </>
              )}
              <ListAttachment
                setUploaderVisibility={setUploaderVisibility}
                setTotal={setTotalItems}
                currentPage={currentPage}
                seteditAttachment={seteditAttachment}
                seteditAttachmentVisibility={seteditAttachmentVisibility}
              />
              <Pagination
                totalItems={totalItems}
                perPage={18}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
