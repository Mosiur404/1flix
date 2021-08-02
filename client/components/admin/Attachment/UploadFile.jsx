import { useEffect, useState } from "react";
import style from "./UploadFile.module.scss";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import {
  attachmentMutation,
  attachmentsQuery,
} from "../../../lib/gql/attachments";
import createApolloUploadClient from "../../../lib/apolloUploadClient";

const uploadClient = createApolloUploadClient();

export default function UploadFile({ file }) {
  const [success, setSuccess] = useState(null);

  const [mutate, { loading, error }] = useMutation(attachmentMutation, {
    client: uploadClient,
  });

  useEffect(() => {
    const runUplaod = async () => {
      const { data } = await mutate({
        variables: { file: file },
        refetchQueries: [{ query: attachmentsQuery }],
      });
      if (!loading && data?.uploadAttachment) setSuccess(true);
    };
    runUplaod();
    return () => {};
  }, []);

  let successMesage = "Uploading...";

  if (success === false || error) successMesage = "Failed uploading.";
  else if (success === true) successMesage = "Successfully Uploaded. ✓";

  return (
    <div className={style.uploadedFiles}>
      <div className="h-flex w-100">
        <span className="h-flex">
          <Image src="/assets/icons/Image.svg" width="16" height="16" />
          <div className={style.fileTitle}>{file.name}</div>
        </span>
        <span class="text-secondary">( {successMesage} )</span>
      </div>
    </div>
  );
}
