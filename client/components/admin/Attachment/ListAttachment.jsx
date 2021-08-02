import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useQuery, useMutation } from "@apollo/client";
import { attachmentsQuery } from "../../../lib/gql/attachments";
import Button, { ButtonPrimary } from "../../UI/Button/Button";
import { deleteAttachmentMutation } from "../../../lib/gql/attachments";
import Spinner from "../../UI/Loader/Spinner";
import useInput from "../../../hooks/useInput";
import { buildUrl, setConfig } from "cloudinary-build-url";
setConfig({ cloudName: "mosiur404" });
import style from "./ListAttachment.module.scss";

export default function ListAttachment({
  setUploaderVisibility,
  setTotal,
  currentPage,
  seteditAttachment,
  seteditAttachmentVisibility,
}) {
  const {
    value: searchValue,
    inputChangeHandler: searchChangeHandler,
    inputBlurHandler: searchBlurHandler,
  } = useInput((e) => e);
  const toggleUploaderVisibility = (event) => {
    setUploaderVisibility((visible) => !visible);
  };

  const limit = 18;
  const offset = (currentPage - 1) * limit;
  const attachmentVar = { offset, limit, search: searchValue };

  const { loading, error, data } = useQuery(attachmentsQuery, {
    variables: attachmentVar,
  });
  const images = data?.getAttachments || [];

  //set total for pagination
  useEffect(() => {
    setTotal(data?.getAttachmentCount?.count);
    return () => {};
  }, [data]);

  //starts delete method from here on
  const [deleteMutate, { deleteLoading, deleteError }] = useMutation(
    deleteAttachmentMutation,
    { refetchQueries: [{ query: attachmentsQuery, variables: attachmentVar }] }
  );

  const handleAttachmentDelete = async (ID, slug) => {
    if (window.confirm("Do you really wish to delete?")) {
      seteditAttachmentVisibility(false);
      setUploaderVisibility(false);
      const { data: attachment } = await deleteMutate({
        variables: { ID, slug },
      });
    }
  };

  //edit part here
  const editAttachmentHandler = (attachment, buildUrl) => {
    seteditAttachmentVisibility(true);
    setUploaderVisibility(false);
    seteditAttachment({ ...attachment, buildUrl: buildUrl });
  };

  return (
    <div className={style.attachmentWrap}>
      <div className="h-flex mb-4">
        <h1 className="primary-text">ATTACHMENTS</h1>
        <ButtonPrimary onClick={toggleUploaderVisibility}>UPLOAD</ButtonPrimary>
      </div>
      <div className="row g-3">
        <div className="col-12">
          <div className="row">
            <div className="col-lg-6">
              <div className="h-flex mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onBlur={searchBlurHandler}
                  onChange={searchChangeHandler}
                  value={searchValue}
                />
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className={style.spinnerContainer}>
            <Spinner />
          </div>
        )}
        {!loading && error && <p>Error Loading Attachments.</p>}
        {!loading && !error && !images.length && <p>No items found</p>}
        {!loading &&
          !error &&
          images.length &&
          images.map((image) => (
            <div key={image.ID} className="col-4 col-lg-2">
              <div className={style.attachment}>
                <Image
                  src={buildUrl(image.attachment_slug, {})}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={`h-flex ${style.attachmentAction}`}>
                  <button
                    onClick={() =>
                      editAttachmentHandler(
                        image,
                        buildUrl(image.attachment_slug, {})
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleAttachmentDelete(image.ID, image.attachment_slug)
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
