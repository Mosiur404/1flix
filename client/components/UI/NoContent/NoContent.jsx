import React from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Layout/Header";
import style from "./NoContent.module.scss";

export default function NoContent() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="m-5">
          <p className="text-center">You areAlready logged in</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
