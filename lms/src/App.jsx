import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideNav from "./components/sidenav/SideNav";
import MainSection from "./components/mainsection/MainSection";

function App() {
  return (
    <div className="main">
      <div className="sidebar">
        <SideNav />
      </div>
      <div className="main-section">
        <MainSection />
      </div>
    </div>
  );
}

export default App;
