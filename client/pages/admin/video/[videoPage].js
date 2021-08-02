import React from "react";
import { useRouter } from "next/router";
import CheckAuth from "../../../components/Auth/CheckAuth";
import Video from "../../../components/admin/Video/Video";

export default function attachmentPage() {
  const router = useRouter();
  const { videoPage } = router.query;

  return (
    <>
      <CheckAuth />
      <Video currentPage={videoPage || 1} />
    </>
  );
}
