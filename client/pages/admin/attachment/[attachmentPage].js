import React from "react";
import { useRouter } from "next/router";
import Attachment from "../../../components/admin/Attachment/Attachment";
import CheckAuth from "../../../components/Auth/CheckAuth";

export default function attachmentPage(props) {
  const router = useRouter();
  const { attachmentPage } = router.query;

  return (
    <>
      <CheckAuth />
      <Attachment currentPage={attachmentPage || 1} />
    </>
  );
}
