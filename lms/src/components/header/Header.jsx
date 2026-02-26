import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="header-left" />
      <div className={`search ${open ? "active" : ""}`}>
        <input
          className={`search-field ${open ? "visible" : ""}`}
          type="text"
          placeholder="Search for a course"
        />
        <button className="search-btn" onClick={() => setOpen(!open)}>
          <i className={`bi ${open ? "bi-x" : "bi-search"}`}></i>
        </button>
      </div>
      <div className="user-profile">
        <div className="user-status">
          {/* <div className="star">
            <i class="bi bi-star-fill"></i>
            0
          </div> */}
          <div className="user-name">
            <h1>UK</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
