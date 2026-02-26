import React from "react";
import "./SideNav.css";
import SideBarNavs from "../sidebarnavs/SideBarNavs";

function SideNav() {
  return (
    <aside className="sidebar">
      <header className="side-header">
        <div className="brand">
          <h1 className="logo">HT</h1>
          <h1 className="brand-name">
            {" "}
            HorizonTrax <span className="brand-tag">LMS</span>
          </h1>
        </div>
      </header>

      <div>
        <SideBarNavs />
      </div>
    </aside>
  );
}

export default SideNav;
