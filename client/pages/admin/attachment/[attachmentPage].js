import React from "react";
import { useRouter } from "next/router";

export default function attachmentPage(props) {
  const router = useRouter();
  const { attachmentPage } = router.query;

  return <p>Post: {attachmentPage}</p>;
}
