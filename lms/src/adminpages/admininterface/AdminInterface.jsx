import React from "react";
import { useNavigate } from "react-router-dom";
import { coursesData } from "../ourcourses/OurCourses";
import "./AdminInterface.css";

// ── Stat box data ─────────────────────────────────────────────────────────────
function getCourseStats() {
  const total = coursesData.length;
  const published = coursesData.filter((c) => c.published).length;
  const draft = total - published;
  return { total, published, draft };
}

const mockTestStats = [
  {
    label: "Tests Created",
    value: 12,
    icon: "bi bi-journal-plus",
    color: "#2563eb",
    bg: "#dbeafe",
  },
  {
    label: "Tests Published",
    value: 8,
    icon: "bi bi-send-check-fill",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  {
    label: "Avg Score",
    value: "74%",
    icon: "bi bi-bar-chart-fill",
    color: "#d97706",
    bg: "#fef3c7",
  },
  {
    label: "Total Attempts",
    value: 1840,
    icon: "bi bi-people-fill",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
];

// ── Student enrolments only ───────────────────────────────────────────────────
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const studentData = [24, 38, 29, 52, 41, 63, 47];
const maxStu = Math.max(...studentData);

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

// ─────────────────────────────────────────────────────────────────────────────
function AdminInterface() {
  const navigate = useNavigate();
  const stats = getCourseStats();

  const courseBoxes = [
    {
      label: "Total Courses",
      value: stats.total,
      icon: "bi bi-collection-fill",
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      label: "Published",
      value: stats.published,
      icon: "bi bi-send-check",
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      label: "Draft",
      value: stats.draft,
      icon: "bi bi-pencil-square",
      color: "#d97706",
      bg: "#fef3c7",
    },
    {
      label: "Total Students",
      value: "1.2K",
      icon: "bi bi-people-fill",
      color: "#7c3aed",
      bg: "#ede9fe",
    },
  ];

  return (
    <div className="ai-wrapper">
      {/* ── GREET CARD — professional white with blue accent ── */}
      <div className="ai-greet">
        <div className="ai-greet-pill">
          <div className="ai-greet-icon">
            <i className="bi bi-shield-fill-check" />
          </div>
          <div>
            <h2 className="ai-greet-title">{getGreeting()}, Admin! 👋</h2>
            <p className="ai-greet-sub">
              Welcome back to HorizonTrax dashboard.
            </p>
          </div>
        </div>
        <div className="ai-greet-actions">
          <button
            className="ai-greet-btn"
            onClick={() => navigate("/admin-dashboard/create-course")}
          >
            <i className="bi bi-plus-lg" /> New Course
          </button>
          <button
            className="ai-greet-btn ai-greet-btn--outline"
            onClick={() => navigate("/admin-dashboard/create-mocktest")}
          >
            <i className="bi bi-journal-plus" /> New Test
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT: LEFT + RIGHT ─────────────────────── */}
      <div className="ai-body">
        {/* ════ LEFT SIDE ════════════════════════════════════ */}
        <div className="ai-left">
          {/* ── Courses Section ─────────────────────────── */}
          <div className="ai-section">
            <div className="ai-section-hdr">
              <div>
                <h3 className="ai-section-title">
                  <i className="bi bi-collection-fill" /> Courses
                </h3>
                <p className="ai-section-sub">
                  Overview of your course library
                </p>
              </div>
              <button
                className="ai-full-btn"
                onClick={() => navigate("/admin-dashboard/my-courses")}
              >
                Full Details <i className="bi bi-arrow-right" />
              </button>
            </div>

            <div className="ai-boxes">
              {courseBoxes.map((b) => (
                <div className="ai-box" key={b.label}>
                  <div
                    className="ai-box-icon"
                    style={{ background: b.bg, color: b.color }}
                  >
                    <i className={b.icon} />
                  </div>
                  <p className="ai-box-label">{b.label}</p>
                  <p className="ai-box-value" style={{ color: b.color }}>
                    {b.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="ai-course-list">
              {coursesData.slice(0, 5).map((c) => (
                <div
                  className="ai-course-row"
                  key={c.id}
                  onClick={() => navigate(`/admin-dashboard/courses/${c.id}`)}
                >
                  <div className="ai-course-row-icon">
                    <i className="bi bi-play-circle-fill" />
                  </div>
                  <div className="ai-course-row-info">
                    <p className="ai-course-row-title">{c.title}</p>
                    <p className="ai-course-row-price">
                      ₹{c.price.toLocaleString("en-IN")}.00
                    </p>
                  </div>
                  <span
                    className={`ai-badge ${c.published ? "ai-badge--live" : "ai-badge--draft"}`}
                  >
                    {c.published ? "Live" : "Draft"}
                  </span>
                  <i className="bi bi-chevron-right ai-row-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ RIGHT SIDE — Analytics ═══════════════════════ */}
        <div className="ai-right">
          <div className="ai-section ai-section--full-h">
            <div className="ai-section-hdr">
              <div>
                <h3 className="ai-section-title">
                  <i className="bi bi-graph-up-arrow" /> Analytics
                </h3>
                <p className="ai-section-sub">Last 7 days performance</p>
              </div>
              <button
                className="ai-full-btn"
                onClick={() => navigate("/admin-dashboard/analytics")}
              >
                Full Details <i className="bi bi-arrow-right" />
              </button>
            </div>

            {/* Summary numbers */}
            <div className="ai-analytics-summary">
              <div className="ai-an-num">
                <p className="ai-an-val">₹3,99,700</p>
                <p className="ai-an-lbl">This Week Revenue</p>
              </div>
              <div className="ai-an-divider" />
              <div className="ai-an-num">
                <p className="ai-an-val">294</p>
                <p className="ai-an-lbl">New Enrolments</p>
              </div>
            </div>

            {/* Student enrolments bar chart only */}
            <p className="ai-chart-label">Student Enrolments</p>
            <div className="ai-chart">
              {studentData.map((v, i) => (
                <div className="ai-chart-col" key={i}>
                  <p className="ai-chart-val">{v}</p>
                  <div className="ai-chart-track">
                    <div
                      className="ai-chart-bar ai-chart-bar--green"
                      style={{ height: `${(v / maxStu) * 100}%` }}
                    />
                  </div>
                  <p className="ai-chart-day">{weekDays[i]}</p>
                </div>
              ))}
            </div>

            {/* Top course revenue */}
            <p className="ai-chart-label" style={{ marginTop: 28 }}>
              Top Courses by Revenue
            </p>
            <div className="ai-top-list">
              {[
                { title: "Responsible AI Practices", rev: 124488, pct: 100 },
                { title: "Intro to Machine Learning", rev: 115611, pct: 93 },
                { title: "Data Science with Python", rev: 72059, pct: 58 },
                { title: "NLP Fundamentals", rev: 65200, pct: 52 },
              ].map((c, i) => (
                <div className="ai-top-row" key={i}>
                  <span className="ai-top-rank">{i + 1}</span>
                  <div className="ai-top-info">
                    <p className="ai-top-name">{c.title}</p>
                    <div className="ai-top-bar-track">
                      <div
                        className="ai-top-bar-fill"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="ai-top-rev">
                    ₹{(c.rev / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOCK TESTS — full width row below ──────────────── */}
      <div className="ai-bottom">
        <div className="ai-section">
          <div className="ai-section-hdr">
            <div>
              <h3 className="ai-section-title">
                <i className="bi bi-journal-check" /> Mock Tests
              </h3>
              <p className="ai-section-sub">Test creation overview</p>
            </div>
            <button
              className="ai-full-btn"
              onClick={() => navigate("/admin-dashboard/create-mocktest")}
            >
              Full Details <i className="bi bi-arrow-right" />
            </button>
          </div>

          <div className="ai-boxes ai-boxes--mocktest">
            {mockTestStats.map((m) => (
              <div className="ai-box" key={m.label}>
                <div
                  className="ai-box-icon"
                  style={{ background: m.bg, color: m.color }}
                >
                  <i className={m.icon} />
                </div>
                <p className="ai-box-label">{m.label}</p>
                <p className="ai-box-value" style={{ color: m.color }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInterface;
