import Header from "../components/Header/Layout/Header";
import Movies from "../components/Movies/Movies";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
      <HeaderSlider />
      <Movies />
      <Footer />
    </>
  );
}
