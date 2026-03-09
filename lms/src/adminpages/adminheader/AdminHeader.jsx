import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./AdminHeader.css";

function AdminHeader({ sidebarOpen, onToggleSidebar, onEnterAdmin }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/admin-dashboard";
  const showSearchBtn = !isDashboard;

  useEffect(() => {
    setSearchOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && inputRef.current)
      setTimeout(() => inputRef.current.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setProfileOpen(false);
        setTooltip(null);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [profileOpen]);

  const showTip = (e, text) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTooltip({ text, x: r.left + r.width / 2, y: r.bottom + 10 });
  };
  const hideTip = () => setTooltip(null);

  return (
    <>
      {tooltip && (
        <div
          className="a-hdr-tooltip"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.text}
        </div>
      )}

      <div
        className={`a-search-backdrop ${searchOpen ? "a-search-backdrop--visible" : ""}`}
        onClick={() => setSearchOpen(false)}
      />

      <header className="a-site-header">
        <div
          className={`a-header-normal ${searchOpen ? "a-header-normal--hidden" : ""}`}
        >
          <div className="a-header-left">
            <button
              className="a-hamburger-btn"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <span
                className={`a-ham-icon ${sidebarOpen ? "a-ham-icon--open" : ""}`}
              >
                <span />
                <span />
                <span />
              </span>
            </button>

            <div className="a-header-brand">
              <span className="a-header-logo">HT</span>
              <span className="a-header-brand-name">
                HorizonTrax <em className="a-header-brand-tag">LMS</em>
              </span>
            </div>
          </div>

          <div className="a-header-actions">
            {/* {showSearchBtn && (
              <button
                className="a-search-trigger-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <i className="bi bi-search" />
              </button>
            )} */}
            <button
              className="a-exit-btn"
              onClick={() => {
                onEnterAdmin();
                navigate("/dashboard");
              }}
              aria-label="Exit admin"
            >
              <i className="bi bi-box-arrow-right" />
              <span>Exit</span>
            </button>

            <span className="a-header-divider" />

            <NavLink
              to="/ide"
              className="a-icon-btn"
              aria-label="IDE"
              onMouseEnter={(e) => showTip(e, "IDE")}
              onMouseLeave={hideTip}
            >
              <i className="bi bi-code-slash" />
            </NavLink>

            <NavLink
              to="/playground"
              className="a-icon-btn"
              aria-label="Playground"
              onMouseEnter={(e) => showTip(e, "Playground")}
              onMouseLeave={hideTip}
            >
              <i className="bi bi-braces-asterisk" />
            </NavLink>

            <span className="a-header-divider" />

            <div className="a-avatar-wrapper" ref={profileRef}>
              <button
                className="a-avatar-btn"
                onClick={() => setProfileOpen((p) => !p)}
                aria-label="User menu"
              >
                <span className="a-avatar-initials">UK</span>
                <span className="a-avatar-dot" />
              </button>

              {profileOpen && (
                <div className="a-profile-dropdown">
                  <div className="a-profile-dropdown-user">
                    <div className="a-pd-avatar-circle">UK</div>
                    <div>
                      <p className="a-pd-name">Uday Kiran</p>
                      <p className="a-pd-email">uday@example.com</p>
                    </div>
                  </div>
                  <div className="a-pd-divider" />

                  <NavLink
                    to="/profile"
                    className="a-pd-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <i className="bi bi-person-circle" /> View Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className="a-pd-item"
                    onClick={() => {
                      setProfileOpen(false);
                      onEnterAdmin();
                    }}
                  >
                    <i className="bi bi-person-fill-gear" /> Student Dashboard
                  </NavLink>
                  <button
                    className="a-pd-item a-pd-logout"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/");
                    }}
                  >
                    <i className="bi bi-box-arrow-right" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* {showSearchBtn && (
          <div
            className={`a-header-search-bar ${searchOpen ? "a-header-search-bar--visible" : ""}`}
          >
            <i className="bi bi-search a-search-bar-icon" />
            <input
              ref={inputRef}
              className="a-search-bar-input"
              type="text"
              placeholder="Search courses, analytics, students…"
              tabIndex={searchOpen ? 0 : -1}
            />
            <button
              className="a-search-close-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <i className="bi bi-x" />
            </button>
          </div>
        )} */}
      </header>
    </>
  );
}

export default AdminHeader;
