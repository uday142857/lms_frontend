import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebarNav.css";

function AdminSidebarNav({ onNavClick }) {
  return (
    <div className="a-nav-container">
      <NavLink to="/dashboard" className="a-nav" onClick={onNavClick}>
        <div className="a-icon">
          <i class="bi bi-arrow-left"></i>
        </div>
        <span>Student Dashboard</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/create-course"
        className="a-nav"
        onClick={onNavClick}
      >
        <div className="a-icon">
          <i class="bi bi-plus-circle"></i>
        </div>
        <span>Create a Course</span>
      </NavLink>

      <NavLink
        to="/admin-dashboard/my-courses"
        className="a-nav"
        onClick={onNavClick}
      >
        <div className="a-icon">
          <i class="bi bi-list-ul"></i>
        </div>
        <span>My Courses</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/create-mocktest"
        className="a-nav"
        onClick={onNavClick}
      >
        <div className="a-icon">
          <i class="bi bi-plus-circle-dotted"></i>
        </div>
        <span>Create a Mocktest</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/analytics"
        className="a-nav"
        onClick={onNavClick}
      >
        <div className="a-icon">
          <i class="bi bi-bar-chart-line"></i>
        </div>
        <span>Analytics</span>
      </NavLink>
    </div>
  );
}

export default AdminSidebarNav;
