import { useEffect, useState } from "react";
import { upload } from "../../../lib/util/fileUploader";
import style from "./UploadFile.module.scss";
import Image from "next/image";

export default function UploadFile({ file, token }) {
  const [progress, setProgress] = useState(0);

  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const runUpload = async () => {
      try {
        const { data, errors } = await upload(file, token, setProgress);
        if (errors) setSuccess(false);
        else if (data?.createAttachment) setSuccess(true);
      } catch (e) {
        if (e) setSuccess(false);
      }
    };
    runUpload();
    return () => {};
  }, []);
  let successMesage = "Uploading";
  if (success === false) successMesage = "Failed uploading";
  else if (success === true) successMesage = "Successfully Uploaded";
  return (
    <div className={style.uploadedFiles}>
      <div className="h-flex w-100">
        <span div className="h-flex">
          <Image src="/assets/icons/Image.svg" width="16" height="16" />
          <div className={style.fileTitle}>
            {file.name} ({successMesage})
          </div>
        </span>
        <span>{progress}%</span>
      </div>
      <div
        className={style.progressBar}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
