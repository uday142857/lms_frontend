import React from 'react'
import "./AdminSideNav.css"
import AdminSidebarNav from '../adminsidebarnav/AdminSidebarNav';

function AdminSideNav({onClose}) {
  return (
    <aside className="a-sidenav">
      <header className="a-side-header">
        <div className="a-brand">
          <h1 className="a-logo">HT</h1>
          <h1 className="a-brand-name">
            HorizonTrax <span className="a-brand-tag">LMS</span>
          </h1>
        </div>

        <button
          className="a-sidenav-close-btn"
          onClick={onClose}
          aria-label="a-Close sidebar"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </header>

      <div>
        <AdminSidebarNav onNavClick={onClose} />
      </div>
    </aside>
  );
}

export default AdminSideNav