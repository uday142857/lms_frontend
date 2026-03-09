import React, { useState } from "react";
import "./AdminDashBoard.css";
import { useNavigate } from "react-router-dom";
import AdminSideNav from "../adminsidenav/AdminSideNav";
import AdminMainSection from "../adminmainsection/AdminMainSection";

function AdminDashBoard({ onBack }) {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="main">
        <div
          className={`sidebar-overlay ${
            sidebarOpen ? "sidebar-overlay--visible" : ""
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
          {/* <AdminSideNav onClose={() => setSidebarOpen(false)} /> */}
          <AdminSideNav onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="main-section">
          <AdminMainSection
          sidebarOpen={sidebarOpen}
          onEnterAdmin={onBack}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
        </div>
      </div>
      {/* <button onClick={onBack}>Back to User Dashboard</button> */}
    </div>
  );
}

export default AdminDashBoard;
