import React from "react";
import { useRouter } from "next/router";
import CheckAuth from "../../../components/Auth/CheckAuth";
import Movie from "../../../components/admin/Movie/Movie";

export default function attachmentPage() {
  const router = useRouter();
  const { moviePage } = router.query;

  return (
    <>
      <CheckAuth />
      <Movie currentPage={moviePage || 1} />
    </>
  );
}
