import React from "react";
import { useHistory } from "react-router";
import "./Header.css";

function Header() {
  const history = useHistory();

  return (
    <>
      <header onClick={() => window.scroll(0, 0)}>
        <div className="buttonss_nav">
          <button
            className="buttons_nav"
            onClick={(e) => history.push("/Movies")}
          >
            Movie
          </button>

          <button
            className="buttons_nav"
            autoFocus
            onClick={(e) => history.push("/")}
          >
            TV Shows
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
