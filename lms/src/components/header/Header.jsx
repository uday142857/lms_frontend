import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ sidebarOpen, onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      <div
        className={`search-backdrop ${searchOpen ? "search-backdrop--visible" : ""}`}
        onClick={closeSearch}
      />
      <header className="site-header">
        <div
          className={`header-normal ${searchOpen ? "header-normal--hidden" : ""}`}
        >
          <div className="header-left">
            <button
              className="hamburger-btn"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <span
                className={`ham-icon ${sidebarOpen ? "ham-icon--open" : ""}`}
              >
                <span />
                <span />
                <span />
              </span>
            </button>
            <div className="header-brand">
              <span className="header-logo">HT</span>
              <span className="header-brand-name">
                HorizonTrax <em className="header-brand-tag">LMS</em>
              </span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="search-trigger-btn"
              onClick={openSearch}
              aria-label="Open search"
            >
              <i className="bi bi-search" />
            </button>

            <span className="header-divider" />

            <NavLink to="/web" className="icon-btn" aria-label="Web Playground">
              <i class="bi bi-code-slash"></i>
              <span className="icon-btn-tooltip">IDE</span>
            </NavLink>
            <NavLink to="/web" className="icon-btn" aria-label="Web Playground">
              <i className="bi bi-braces-asterisk" />
              <span className="icon-btn-tooltip">Playground</span>
            </NavLink>

            <span className="header-divider" />
            <button className="avatar-btn" aria-label="User menu">
              <span className="avatar-initials">UK</span>
              <span className="avatar-dot" />
            </button>
          </div>
        </div>
        <div
          className={`header-search-bar ${searchOpen ? "header-search-bar--visible" : ""}`}
        >
          <i className="bi bi-search search-bar-icon" />
          <input
            ref={inputRef}
            className="search-bar-input"
            type="text"
            placeholder="Search courses, topics, instructors…"
            tabIndex={searchOpen ? 0 : -1}
          />
          <button
            className="search-close-btn"
            onClick={closeSearch}
            aria-label="Close search"
          >
            <i className="bi bi-x" />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
