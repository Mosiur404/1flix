import React, { useEffect } from "react";
import Image from "next/image";
import Button, { ButtonPrimary } from "../../UI/Button/Button";
import { Form } from "../../Forms/Form/Form";
import { InputBox } from "../../Forms/InputBox";
import { validateName } from "../../../lib/util/validators";
import { useMutation } from "@apollo/client";
import useInput from "../../../hooks/useInput";
import Spinner from "../../UI/Loader/Spinner";

import style from "./EditVideo.module.scss";
import { editVideoMutation, videosQuery } from "../../../lib/gql/videos";

export default function EditVideo({ data, setVisiblity }) {
  const [mutate, { loading, error }] = useMutation(editVideoMutation);

  useEffect(() => {
    setTitleValue(data.video_title);
    setSlugValue(data.video_slug);
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
        video_title: enteredTitle,
        video_slug: enteredSlug,
      },
    });
    // console.log(response);
  };
  return (
    <div className={style.videoWrap}>
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
        <div className="col-lg-7">
          <div className={style.editVideo}>
            <video preload="metadata" width="100%" height="auto" controls>
              <source src={data.buildVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="col-lg-5">
          <Form onSubmit={formSubmitHandler} className={style.editVideoForm}>
            <InputBox
              type="text"
              label="Video ID"
              id="videoID"
              value={data.ID}
              placeholder="ID of the image"
              params={{ disabled: true }}
            />
            <InputBox
              type="text"
              label="Video Filesize &amp; Extension"
              id="videoExtra"
              value={`Size: ${(data.size / 1024).toFixed(0)}KB | Extension: ${
                data.file_extension
              }`}
              placeholder="Filesize &amp; Extension"
              params={{ disabled: true }}
            />
            <InputBox
              type="text"
              label="Video Title"
              id="videoTitle"
              value={enteredTitle}
              hasError={titleHasError}
              placeholder="Can't be empty. Used in alt tag."
              onBlur={titleBlurHandler}
              onChange={titleChangeHandler}
            />
            <InputBox
              type="text"
              label="Video Filename"
              id="videoFilename"
              hasError={slugHasError}
              value={enteredSlug}
              placeholder="Filename"
              onBlur={slugBlurHandler}
              onChange={slugChangeHandler}
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
