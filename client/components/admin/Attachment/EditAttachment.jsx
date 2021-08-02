import React, { useEffect } from "react";
import Image from "next/image";
import Button, { ButtonPrimary } from "../../UI/Button/Button";
import { Form } from "../../Forms/Form/Form";
import { InputBox } from "../../Forms/InputBox";
import { validateName } from "../../../lib/util/validators";
import { useMutation } from "@apollo/client";
import useInput from "../../../hooks/useInput";
import Spinner from "../../UI/Loader/Spinner";

import style from "./EditAttachment.module.scss";
import {
  editAttachmentMutation,
  attachmentsQuery,
} from "../../../lib/gql/attachments";

export default function EditAttachment({ data, setVisiblity }) {
  const [mutate, { loading, error }] = useMutation(editAttachmentMutation);

  useEffect(() => {
    setTitleValue(data.attachment_title);
    setSlugValue(data.attachment_slug);
    return () => {};
  }, [data.ID]);

  const {
    value: enteredTitle,
    setValue: setTitleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(validateName);
  const {
    value: enteredSlug,
    setValue: setSlugValue,
    isValid: slugIsValid,
    hasError: slugHasError,
    inputChangeHandler: slugChangeHandler,
    inputBlurHandler: slugBlurHandler,
  } = useInput(validateName);

  let formIsValid = false;
  if (titleIsValid && slugIsValid) formIsValid = true;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const response = await mutate({
      variables: {
        ID: data.ID,
        attachment_title: enteredTitle,
        attachment_slug: enteredSlug,
      },
      update: (store, { data }) => {
        console.log(store.readQuery({ query: attachmentsQuery }));
        console.log(data);
      },
    });
    // console.log(response);
  };
  return (
    <div className={style.attachmentWrap}>
      <div className="h-flex mb-4">
        <h1 className="primary-text">Edit</h1>
        <div>
          <Button
            className={style.editButton}
            onClick={() => {
              setVisiblity(false);
            }}
          >
            <small>CANCEL</small>
          </Button>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-6">
          <div className={style.editImage}>
            <Image src={data.buildUrl} layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="col-lg-6">
          <Form
            onSubmit={formSubmitHandler}
            className={style.editAttachmentForm}
          >
            <InputBox
              type="text"
              label="Attachment ID"
              id="attachmentID"
              value={data.ID}
              placeholder="ID of the image"
              params={{ disabled: true }}
            />
            <InputBox
              type="text"
              label="Attachment Filesize &amp; Extension"
              id="attachmentExtra"
              value={`Size: ${(data.size / 1024).toFixed(0)}KB | Extension: ${
                data.file_extension
              }`}
              placeholder="Filesize &amp; Extension"
              params={{ disabled: true }}
            />
            <InputBox
              type="text"
              label="Attachment Title"
              id="attachmentTitle"
              value={enteredTitle}
              hasError={titleHasError}
              placeholder="Can't be empty. Used in alt tag."
              onBlur={titleBlurHandler}
              onChange={titleChangeHandler}
              help="Can't be empty. Used in alt tag."
            />
            <InputBox
              type="text"
              label="Attachment Filename"
              id="attachmentFilename"
              hasError={slugHasError}
              value={enteredSlug}
              placeholder="Filename"
              onBlur={slugBlurHandler}
              onChange={slugChangeHandler}
              help="Must be with folder path."
            />
            <div className="h-flex">
              <span>
                {loading && <Spinner />}
                {error && error.message}
              </span>
              <ButtonPrimary type="submit" isDisabled={!formIsValid}>
                SAVE
              </ButtonPrimary>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
