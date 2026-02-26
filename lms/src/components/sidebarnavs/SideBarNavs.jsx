import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideBarNavs.css";

function SideBarNavs() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="nav-container">
      <NavLink to="/" className="nav">
        <div className="icon">
          <i className="bi bi-mortarboard"></i>
        </div>
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/course" className="nav">
        <div className="icon">
          <i className="bi bi-compass"></i>
        </div>
        <span>Courses</span>
      </NavLink>

      <NavLink to="/leaderboard" className="nav">
        <div className="icon">
          <i className="bi bi-bar-chart-line"></i>
        </div>
        <span>Leaderboard</span>
      </NavLink>

      {/* <NavLink to="/web" className="nav">
        <div className="icon">
          <i className="bi bi-braces-asterisk"></i>
        </div>
        <span>Web Playground</span>
      </NavLink> */}

      <NavLink to="/mocktest" className="nav">
        <div className="icon">
          <i class="bi bi-book-half"></i>
        </div>
        <span>Mock Test</span>
      </NavLink>
      <NavLink to="/shop" className="nav">
        <div className="icon">
          <i className="bi bi-bag"></i>
        </div>
        <span>Shop</span>
      </NavLink>
    </div>
  );
}

export default SideBarNavs;
