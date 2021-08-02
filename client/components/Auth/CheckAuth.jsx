import React, { useContext } from "react";
import { useRouter } from "next/router";
import Loading from "../UI/Loader/Spinner";
import { AuthContext } from "../../store/auth";

export default function CheckAuth() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  if (!authCtx.user && typeof window !== "undefined") {
    router.replace("/login");
    return <Loading />;
  } else return null;
}
