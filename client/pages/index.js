import Header from "../components/Header/Layout/Header";
import Movies from "../components/Movies/Movies";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";
import Layout from "../components/Footer/Layout";

export default function Home() {
  return (
    <>
      <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
      <HeaderSlider />
      <Movies />
      <Layout />
    </>
  );
}
