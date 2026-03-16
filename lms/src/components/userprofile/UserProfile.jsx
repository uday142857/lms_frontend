import React, { useState } from "react";
import { currentUser } from "../../data/UserStore";
import "./UserProfile.css";

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    location: currentUser.location,
    bio: currentUser.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    currentUser.name = form.name;
    currentUser.firstName = form.name.split(" ")[0];
    currentUser.email = form.email;
    currentUser.phone = form.phone;
    currentUser.location = form.location;
    currentUser.bio = form.bio;
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setForm({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      location: currentUser.location,
      bio: currentUser.bio,
    });
    setEditMode(false);
  };

  // ── Stat cards data ────────────────────────────────────────────────────────
  const stats = [
    {
      icon: "bi-bag-check-fill",
      label: "Courses Purchased",
      value: currentUser.enrolledCourses,
      color: "#10b981",
      bg: "#f0fdf4",
    },
    {
      icon: "bi-patch-check-fill",
      label: "Courses Completed",
      value: currentUser.completedCourses,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      icon: "bi-journal-check",
      label: "Tests Attended",
      value: currentUser.testsCompleted,
      color: "#6366f1",
      bg: "#eef2ff",
    },
    {
      icon: "bi-clipboard-data-fill",
      label: "Tests Assigned",
      value: currentUser.testsAssigned,
      color: "#0891b2",
      bg: "#ecfeff",
    },
    {
      icon: "bi-question-circle-fill",
      label: "Questions Attempted",
      value: currentUser.questionsAttempted,
      color: "#7c3aed",
      bg: "#faf5ff",
    },
    {
      icon: "bi-clock-history",
      label: "Time Spent",
      value: `${currentUser.totalTimeMins} mins`,
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      icon: "bi-award-fill",
      label: "Certificates Earned",
      value: currentUser.certificatesEarned,
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    {
      icon: "bi-fire",
      label: "Day Streak",
      value: currentUser.currentStreak,
      color: "#ef4444",
      bg: "#fef2f2",
    },
  ];

  return (
    <div className="up-root">
      {/* ══ PROFILE HEADER — no background color ════════════ */}
      <div className="up-header">
        <div className="up-avatar-wrap">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={form.name}
              className="up-avatar-img"
            />
          ) : (
            <div className="up-avatar-placeholder">
              {getInitials(form.name)}
            </div>
          )}
          <span className="up-role-badge">{currentUser.role}</span>
        </div>

        <div className="up-header-info">
          <h1 className="up-name">{form.name}</h1>
          <p className="up-joined">
            <i className="bi bi-calendar3" /> Member since {currentUser.joined}
          </p>
          {form.bio && <p className="up-bio">{form.bio}</p>}
        </div>

        <div className="up-header-actions">
          {!editMode && (
            <button className="up-edit-btn" onClick={() => setEditMode(true)}>
              <i className="bi bi-pencil-square" /> Edit Profile
            </button>
          )}
          {saved && (
            <div className="up-toast">
              <i className="bi bi-check-circle-fill" /> Saved successfully!
            </div>
          )}
        </div>
      </div>

      {/* ══ STATS ROW ════════════════════════════════════════ */}
      <div className="up-stats-grid">
        {stats.map((s, i) => (
          <div
            className="up-stat-card"
            key={i}
            style={{ "--sc": s.color, "--sb": s.bg }}
          >
            <div className="up-stat-icon">
              <i className={`bi ${s.icon}`} />
            </div>
            <div className="up-stat-body">
              <span className="up-stat-val">{s.value}</span>
              <span className="up-stat-lbl">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ══ PERSONAL INFORMATION ════════════════════════════ */}
      <div className="up-card">
        <div className="up-card-hdr">
          <h3>
            <i className="bi bi-person-lines-fill" />
            Personal Information
          </h3>
          {!editMode && (
            <button
              className="up-card-edit-btn"
              onClick={() => setEditMode(true)}
            >
              <i className="bi bi-pencil" /> Edit
            </button>
          )}
        </div>

        {!editMode ? (
          /* ── VIEW MODE ───────────────────────────────────── */
          <div className="up-info-list">
            {[
              { icon: "bi-person-fill", label: "Full Name", value: form.name },
              { icon: "bi-envelope-fill", label: "Email", value: form.email },
              { icon: "bi-telephone-fill", label: "Phone", value: form.phone },
              {
                icon: "bi-geo-alt-fill",
                label: "Location",
                value: form.location,
              },
            ].map((row, i) => (
              <div className="up-info-row" key={i}>
                <div className="up-info-icon">
                  <i className={`bi ${row.icon}`} />
                </div>
                <div className="up-info-content">
                  <span className="up-info-label">{row.label}</span>
                  <span className="up-info-value">{row.value}</span>
                </div>
              </div>
            ))}

            {/* Bio */}
            <div className="up-info-row up-info-row--bio">
              <div className="up-info-icon">
                <i className="bi bi-chat-quote-fill" />
              </div>
              <div className="up-info-content">
                <span className="up-info-label">About</span>
                <span className="up-info-value up-bio-text">{form.bio}</span>
              </div>
            </div>
          </div>
        ) : (
          /* ── EDIT MODE ───────────────────────────────────── */
          <div className="up-edit-form">
            {/* Full Name */}
            <div className="up-field">
              <label className="up-label">Full Name</label>
              <div className="up-input-wrap">
                <i className="bi bi-person-fill up-input-icon" />
                <input
                  className="up-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="up-field">
              <label className="up-label">Email</label>
              <div className="up-input-wrap">
                <i className="bi bi-envelope-fill up-input-icon" />
                <input
                  className="up-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="up-field">
              <label className="up-label">Phone</label>
              <div className="up-input-wrap">
                <i className="bi bi-telephone-fill up-input-icon" />
                <input
                  className="up-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            {/* Location */}
            <div className="up-field">
              <label className="up-label">Location</label>
              <div className="up-input-wrap">
                <i className="bi bi-geo-alt-fill up-input-icon" />
                <input
                  className="up-input"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="up-field">
              <label className="up-label">About</label>
              <textarea
                className="up-textarea"
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="up-form-actions">
              <button className="up-save-btn" onClick={handleSave}>
                <i className="bi bi-check-lg" /> Save Changes
              </button>
              <button className="up-cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
