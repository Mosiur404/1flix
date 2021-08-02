import React from "react";
import Header from "../../Header/Layout/Header";
import Footer from "../../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";

import style from "./Movie.module.scss";
import EditMovie from "./EditMovie";

export default function Movie({ currentPage }) {
  return (
    <>
      <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
      <main className={style.adminSectionWrap}>
        <div className={`container py-5`}>
          <div className="row g-4">
            <div className="col-lg-3">
              <Sidenav />
            </div>
            <div className="col-lg-9">
              <EditMovie />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
