
import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideNav from "./components/sidenav/SideNav";
import MainSection from "./components/mainsection/MainSection";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main">
      {/* Dark overlay behind sidebar on mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "sidebar-overlay--visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <SideNav onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="main-section">
        <MainSection
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default App;