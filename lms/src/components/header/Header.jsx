import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

/* ── Tooltip component that calculates its own position ── */
function IconBtn({ to, icon, label }) {
  const [hover, setHover] = useState(false);
  const btnRef = useRef(null);
  const [tipStyle, setTipStyle] = useState({});

  const handleMouseEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setTipStyle({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
    setHover(true);
  };

  return (
    <>
      <NavLink
        to={to}
        className="icon-btn"
        aria-label={label}
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHover(false)}
      >
        <i className={icon} />
      </NavLink>
      {hover && (
        <div
          className="icon-btn-tooltip"
          style={{ top: tipStyle.top, left: tipStyle.left }}
        >
          {label}
        </div>
      )}
    </>
  );
}

function Header({ sidebarOpen, onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && inputRef.current)
      setTimeout(() => inputRef.current.focus(), 50);
  }, [searchOpen]);

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

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  return (
    <>
      <div
        className={`search-backdrop ${searchOpen ? "search-backdrop--visible" : ""}`}
        onClick={() => setSearchOpen(false)}
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
            <button
              className="search-trigger-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <i className="bi bi-search" />
            </button>

            <span className="header-divider" />

            <IconBtn to="/ide" icon="bi bi-code-slash" label="IDE" />
            <IconBtn
              to="/playground"
              icon="bi bi-braces-asterisk"
              label="Playground"
            />

            <span className="header-divider" />

            {/* Avatar + dropdown */}
            <div className="avatar-wrapper" ref={profileRef}>
              <button
                className="avatar-btn"
                onClick={() => setProfileOpen((p) => !p)}
                aria-label="User menu"
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
                    <i className="bi bi-person-circle" /> View Profile
                  </NavLink>
                  <button
                    className="pd-item pd-item-logout"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/login");
                    }}
                  >
                    <i className="bi bi-box-arrow-right" /> Logout
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
            onClick={() => setSearchOpen(false)}
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
