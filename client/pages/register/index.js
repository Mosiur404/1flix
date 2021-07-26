import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/auth";
import Loading from "../../components/UI/Loader/Spinner";
import Register from "../../components/Auth/Register/Register";
import { useRouter } from "next/router";

export default function index() {
  useEffect(() => {
    // Prefetch the home page
    router.prefetch("/");
  }, []);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  if (authCtx.user) {
    router.replace("/");
    return <Loading />;
  }

  return <Register />;
}
