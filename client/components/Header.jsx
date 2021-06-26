import React from "react";

export default function Header() {
  return (
    <header className="navbar navbar-light bg-light">
      <nav className="container">
        <a className="navbar-brand primary-text" href="#">
          1FLIX
        </a>
        <nav className="nav">
          <a className="nav-link" href="#">
            HOME
          </a>
          <a className="nav-link" href="#">
            TV SERIES
          </a>
          <a className="nav-link" href="#">
            MOVIES
          </a>
        </nav>
      </nav>
    </header>
  );
}
