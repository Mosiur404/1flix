import React from "react";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("video/1");
  }
  return null;
}
