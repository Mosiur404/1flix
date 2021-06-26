import React from "react";
import { useRouter } from "next/router";
export default function singleMovie() {
  const router = useRouter();
  console.log(router.query.singleMovie);
  return <div>hello</div>;
}
