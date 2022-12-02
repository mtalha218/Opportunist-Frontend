import React from "react";
import ContentContainer from "./ContentContainer";

import Sidebar from "./Sidebar";
import "./sidebarLayout.css";

const SidebarLayout = ({ children }) => {
  return (
    <div className="sidebar-layout-container">
      <Sidebar />
      <ContentContainer children={children} />
    </div>
  );
};

export default SidebarLayout;
