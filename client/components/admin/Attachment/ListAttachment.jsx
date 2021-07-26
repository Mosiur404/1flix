import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { attachmentsQuery } from "../../../lib/gql/attachments";
import Image from "next/image";
import { ButtonPrimary } from "../../UI/Button/Button";
import style from "./ListAttachment.module.scss";

export default function ListAttachment({ onUpload, setTotal }) {
  const { loading, error, data } = useQuery(attachmentsQuery, {
    variables: { offset: 0, limit: 18 },
  });
  const images = data?.attachments?.items || [];
  //set total for pagination
  useEffect(() => {
    setTotal(data?.attachments?.total);
    return () => {};
  }, [data]);
  return (
    <div className={style.attachmentWrap}>
      <div className="h-flex my-4">
        <h1 className="primary-text">ATTACHMENTS</h1>
        <ButtonPrimary onClick={onUpload}>UPLOAD</ButtonPrimary>
      </div>
      <div className="row g-3">
        {images.map((image) => (
          <div key={image.ID} className="col-4 col-lg-2">
            <div className={style.attachment}>
              <Image
                src={`/uploads/${image.attachment_slug}`}
                layout="fill"
                objectFit="cover"
              />
              <div className={`h-flex ${style.attachmentAction}`}>
                <a>Edit</a>
                <a>Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = () => {};
