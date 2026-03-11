// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Header.css";

// function Header({ sidebarOpen, onToggleSidebar }) {
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [tooltip, setTooltip] = useState(null);

//   const inputRef = useRef(null);
//   const profileRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (searchOpen && inputRef.current)
//       setTimeout(() => inputRef.current.focus(), 50);
//   }, [searchOpen]);

//   useEffect(() => {
//     const fn = (e) => {
//       if (e.key === "Escape") {
//         setSearchOpen(false);
//         setProfileOpen(false);
//         setTooltip(null);
//       }
//     };
//     window.addEventListener("keydown", fn);
//     return () => window.removeEventListener("keydown", fn);
//   }, []);

//   useEffect(() => {
//     const fn = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target))
//         setProfileOpen(false);
//     };
//     if (profileOpen) document.addEventListener("mousedown", fn);
//     return () => document.removeEventListener("mousedown", fn);
//   }, [profileOpen]);

//   const showTip = (e, text) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     setTooltip({ text, x: r.left + r.width / 2, y: r.bottom + 10 });
//   };
//   const hideTip = () => setTooltip(null);

//   return (
//     <>
//       {tooltip && (
//         <div
//           className="hdr-tooltip"
//           style={{ top: tooltip.y, left: tooltip.x }}
//         >
//           {tooltip.text}
//         </div>
//       )}

//       <div
//         className={`search-backdrop ${searchOpen ? "search-backdrop--visible" : ""}`}
//         onClick={() => setSearchOpen(false)}
//       />

//       <header className="site-header">
//         <div
//           className={`header-normal ${searchOpen ? "header-normal--hidden" : ""}`}
//         >
//           <div className="header-left">
//             <button
//               className="hamburger-btn"
//               onClick={onToggleSidebar}
//               aria-label="Toggle sidebar"
//             >
//               <span
//                 className={`ham-icon ${sidebarOpen ? "ham-icon--open" : ""}`}
//               >
//                 <span />
//                 <span />
//                 <span />
//               </span>
//             </button>
//             <div className="header-brand">
//               <span className="header-logo">HT</span>
//               <span className="header-brand-name">
//                 HorizonTrax <em className="header-brand-tag">LMS</em>
//               </span>
//             </div>
//           </div>

//           <div className="header-actions">
//             <button
//               className="search-trigger-btn"
//               onClick={() => setSearchOpen(true)}
//               aria-label="Open search"
//             >
//               <i className="bi bi-search" />
//             </button>

//             <span className="header-divider" />

//             <NavLink
//               to="/ide"
//               className="icon-btn"
//               aria-label="IDE"
//               onMouseEnter={(e) => showTip(e, "IDE")}
//               onMouseLeave={hideTip}
//             >
//               <i className="bi bi-code-slash" />
//             </NavLink>

//             <NavLink
//               to="/playground"
//               className="icon-btn"
//               aria-label="Playground"
//               onMouseEnter={(e) => showTip(e, "Playground")}
//               onMouseLeave={hideTip}
//             >
//               <i className="bi bi-braces-asterisk" />
//             </NavLink>

//             <span className="header-divider" />

//             <div className="avatar-wrapper" ref={profileRef}>
//               <button
//                 className="avatar-btn"
//                 onClick={() => setProfileOpen((p) => !p)}
//                 aria-label="User menu"
//               >
//                 <span className="avatar-initials">UK</span>
//                 <span className="avatar-dot" />
//               </button>

//               {profileOpen && (
//                 <div className="profile-dropdown">
//                   <div className="profile-dropdown-user">
//                     <div className="pd-avatar-circle">UK</div>
//                     <div>
//                       <p className="pd-name">Uday Kumar</p>
//                       <p className="pd-email">uday@example.com</p>
//                     </div>
//                   </div>
//                   <div className="pd-divider" />
//                   <NavLink
//                     to="/profile"
//                     className="pd-item"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     <i className="bi bi-person-circle" /> View Profile
//                   </NavLink>
//                   <button
//                     className="pd-item pd-logout"
//                     onClick={() => {
//                       setProfileOpen(false);
//                       navigate("/login");
//                     }}
//                   >
//                     <i className="bi bi-box-arrow-right" /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div
//           className={`header-search-bar ${searchOpen ? "header-search-bar--visible" : ""}`}
//         >
//           <i className="bi bi-search search-bar-icon" />
//           <input
//             ref={inputRef}
//             className="search-bar-input"
//             type="text"
//             placeholder="Search courses, topics, instructors…"
//             tabIndex={searchOpen ? 0 : -1}
//           />
//           <button
//             className="search-close-btn"
//             onClick={() => setSearchOpen(false)}
//             aria-label="Close search"
//           >
//             <i className="bi bi-x" />
//           </button>
//         </div>
//       </header>
//     </>
//   );
// }

// export default Header;

//------------------------------------------------------------------------------------

import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ sidebarOpen, onToggleSidebar, onEnterAdmin }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/";
  const isCoursesPage = location.pathname === "/course";
  const showSearchBtn = !isDashboard && !isCoursesPage;

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
          className="hdr-tooltip"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.text}
        </div>
      )}

      <div
        className={`search-backdrop ${searchOpen ? "search-backdrop--visible" : ""}`}
        onClick={() => setSearchOpen(false)}
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
            {showSearchBtn && (
              <button
                className="search-trigger-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <i className="bi bi-search" />
              </button>
            )}

            <span className="header-divider" />

            <NavLink
              to="/ide"
              className="icon-btn"
              aria-label="IDE"
              onMouseEnter={(e) => showTip(e, "IDE")}
              onMouseLeave={hideTip}
            >
              <i className="bi bi-code-slash" />
            </NavLink>

            <NavLink
              to="/playground"
              className="icon-btn"
              aria-label="Playground"
              onMouseEnter={(e) => showTip(e, "Playground")}
              onMouseLeave={hideTip}
            >
              <i className="bi bi-braces-asterisk" />
            </NavLink>

            <span className="header-divider" />

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
                    <div className="pd-avatar-circle">UK</div>
                    <div>
                      <p className="pd-name">Uday Kiran</p>
                      <p className="pd-email">uday@example.com</p>
                    </div>
                  </div>
                  <div className="pd-divider" />
                  <NavLink
                    to="/profile"
                    className="pd-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <i className="bi bi-person-circle" /> View Profile
                  </NavLink>
                  <NavLink
                    to="/admin-dashboard/admin-interface"
                    className="pd-item"
                    onClick={() => {
                      setProfileOpen(false);
                      onEnterAdmin();
                    }}
                  >
                    <i class="bi bi-person-fill-gear"></i> Admin Dashboard
                  </NavLink>
                  <button
                    className="pd-item pd-logout"
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

        {showSearchBtn && (
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
        )}
      </header>
    </>
  );
}

export default Header;
