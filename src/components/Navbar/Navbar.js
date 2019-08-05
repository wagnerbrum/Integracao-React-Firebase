import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { urls } from "../../util/urlUtils";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <ul className="menu-list">
        {Object.values(urls).map((url, key) => {
          return (
            <li className="menu-list-item" key={key}>
              <Link to={url.path} {...props}>
                {url.name}
              </Link>
            </li>
          );
        })}
      </ul>
      Integração - React x Firebase <br />
    </div>
  );
}
