import Head from "next/head";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Movies from "../components/Movies/Movies";

export default function Home() {
  return (
    <>
      <Head>
        <title>1FLIX</title>
        <meta name="description" content="New 1flix App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Slider />
      <main className="container">{<Movies />}</main>
    </>
  );
}
