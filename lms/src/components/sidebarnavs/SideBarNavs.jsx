
{
  /* <NavLink to="/web" className="nav">
        <div className="icon">
          <i className="bi bi-braces-asterisk"></i>
        </div>
        <span>Web Playground</span>
      </NavLink> */
}

import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBarNavs.css";

function SideBarNavs({ onNavClick }) {
  return (
    <div className="nav-container">
      <NavLink to="/" className="nav" onClick={onNavClick}>
        <div className="icon">
          <i className="bi bi-mortarboard"></i>
        </div>
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/course" className="nav" onClick={onNavClick}>
        <div className="icon">
          <i className="bi bi-compass"></i>
        </div>
        <span>Courses</span>
      </NavLink>
      <NavLink to="/certificate" className="nav" onClick={onNavClick}>
        <div className="icon">
          <i class="bi bi-award"></i>
        </div>
        <span>Certificates</span>
      </NavLink>
      <NavLink to="/overallreport" className="nav" onClick={onNavClick}>
        <div className="icon">
          {/* <i class="bi bi-award"></i> */}
        </div>
        <span>Overall Report</span>
      </NavLink>

      <NavLink to="/leaderboard" className="nav" onClick={onNavClick}>
        <div className="icon">
          <i className="bi bi-bar-chart-line"></i>
        </div>
        <span>Leaderboard</span>
      </NavLink>

      <NavLink to="/mocktest" className="nav" onClick={onNavClick}>
        <div className="icon">
          <i className="bi bi-book-half"></i>
        </div>
        <span>Mock Test</span>
      </NavLink>

      <NavLink to="/shop" className="nav" onClick={onNavClick}>
        <div className="icon">
          <i className="bi bi-bag"></i>
        </div>
        <span>Shop</span>
      </NavLink>
    </div>
  );
}

export default SideBarNavs;