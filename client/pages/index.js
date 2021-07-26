import { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Layout/Header";
import Movies from "../components/Movies/Movies";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../store/auth";
import { useRouter } from "next/router";
import Spinner from "../components/UI/Loader/Spinner";

export default function Home() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    setloaded(true);
    return () => {};
  }, []);

  if (!authCtx.user && typeof window !== "undefined") {
    router.replace("/login");
    return <Spinner />;
  }

  if (!loaded) return <Spinner />;
  else
    return (
      <>
        <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
        <HeaderSlider />
        <Movies />
        <Footer />
      </>
    );
}
