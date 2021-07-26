import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/auth";
import { useRouter } from "next/router";
import Login from "../../components/Auth/Login/Login";
import Loading from "../../components/UI/Loader/Spinner";
export default function index() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  if (authCtx.user) {
    router.replace("/");
    return <Loading />;
  }

  return <Login />;
}
