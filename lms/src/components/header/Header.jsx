import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ sidebarOpen, onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [searchOpen]);

  // close search on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // close profile dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const handleLogout = () => {
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* backdrop for search */}
      <div
        className={`search-backdrop ${searchOpen ? "search-backdrop--visible" : ""}`}
        onClick={closeSearch}
      />

      <header className="site-header">
        {/* ── NORMAL ROW ── */}
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
            {/* Search button */}
            <button
              className="search-trigger-btn"
              onClick={openSearch}
              aria-label="Open search"
            >
              <i className="bi bi-search" />
            </button>

            <span className="header-divider" />

            {/* IDE */}
            <NavLink to="/ide" className="icon-btn" aria-label="IDE">
              <i className="bi bi-code-slash" />
              <span className="icon-btn-tooltip">IDE</span>
            </NavLink>

            {/* Playground */}
            <NavLink
              to="/playground"
              className="icon-btn"
              aria-label="Playground"
            >
              <i className="bi bi-braces-asterisk" />
              <span className="icon-btn-tooltip">Playground</span>
            </NavLink>

            <span className="header-divider" />

            {/* Avatar + dropdown */}
            <div className="avatar-wrapper" ref={profileRef}>
              <button
                className="avatar-btn"
                aria-label="User menu"
                onClick={() => setProfileOpen((p) => !p)}
              >
                <span className="avatar-initials">UK</span>
                <span className="avatar-dot" />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-user">
                    <div className="profile-dropdown-avatar">UK</div>
                    <div>
                      <p className="pd-name">Uday Kumar</p>
                      <p className="pd-email">uday@example.com</p>
                    </div>
                  </div>
                  <div className="profile-dropdown-divider" />
                  <NavLink
                    to="/profile"
                    className="pd-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <i className="bi bi-person-circle" />
                    View Profile
                  </NavLink>
                  <button
                    className="pd-item pd-item-logout"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
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
