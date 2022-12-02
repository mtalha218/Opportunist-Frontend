/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import BrandLogo from "assets/images/logo.png";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <img src={BrandLogo} alt="logo" />
        <nav>
          <ul className="nav__links">
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </nav>
        <button>
          <a href="#">Logout</a>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
