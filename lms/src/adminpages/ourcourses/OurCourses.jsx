import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./OurCourses.css";

// ── Shared courses store ─────────────────────────────────────────────────────
export const coursesData = [
  {
    id: 1,
    title: "Responsible AI Practices",
    price: 3999,
    published: true,
    category: "AI & Ethics",
    students: 342,
    rating: 4.8,
    duration: "6h 20m",
    thumb: null,
  },
  {
    id: 2,
    title: "Ethics in Artificial Intelligence",
    price: 3999,
    published: true,
    category: "AI & Ethics",
    students: 218,
    rating: 4.7,
    duration: "5h 45m",
    thumb: null,
  },
  {
    id: 3,
    title: "Foundations of Computer Vision",
    price: 3999,
    published: true,
    category: "Computer Vision",
    students: 195,
    rating: 4.6,
    duration: "8h 10m",
    thumb: null,
  },
  {
    id: 4,
    title: "AI Fundamentals & Applications",
    price: 3999,
    published: true,
    category: "AI Basics",
    students: 421,
    rating: 4.9,
    duration: "7h 30m",
    thumb: null,
  },
  {
    id: 5,
    title: "Introduction to Machine Learning",
    price: 3999,
    published: true,
    category: "Machine Learning",
    students: 510,
    rating: 4.8,
    duration: "9h 15m",
    thumb: null,
  },
  {
    id: 6,
    title: "AI Fluency Teaching Frameworks",
    price: 3999,
    published: true,
    category: "Education",
    students: 134,
    rating: 4.5,
    duration: "4h 50m",
    thumb: null,
  },
  {
    id: 7,
    title: "AI Readiness for Educators",
    price: 3499,
    published: true,
    category: "Education",
    students: 98,
    rating: 4.4,
    duration: "3h 40m",
    thumb: null,
  },
  {
    id: 8,
    title: "Student AI Readiness Course",
    price: 1499,
    published: true,
    category: "AI Basics",
    students: 673,
    rating: 4.7,
    duration: "2h 55m",
    thumb: null,
  },
  {
    id: 9,
    title: "AI Fluency – Core Principles",
    price: 1499,
    published: true,
    category: "AI Basics",
    students: 289,
    rating: 4.6,
    duration: "3h 20m",
    thumb: null,
  },
  {
    id: 10,
    title: "Understanding AI",
    price: 599,
    published: true,
    category: "AI Basics",
    students: 892,
    rating: 4.5,
    duration: "1h 45m",
    thumb: null,
  },
  {
    id: 11,
    title: "Deep Learning Fundamentals",
    price: 4999,
    published: false,
    category: "Deep Learning",
    students: 0,
    rating: 0,
    duration: "11h 0m",
    thumb: null,
  },
  {
    id: 12,
    title: "Natural Language Processing",
    price: 4499,
    published: true,
    category: "NLP",
    students: 167,
    rating: 4.7,
    duration: "8h 30m",
    thumb: null,
  },
  {
    id: 13,
    title: "Data Science with Python",
    price: 2999,
    published: true,
    category: "Data Science",
    students: 445,
    rating: 4.8,
    duration: "10h 0m",
    thumb: null,
  },
  {
    id: 14,
    title: "Computer Vision Advanced",
    price: 5499,
    published: false,
    category: "Computer Vision",
    students: 0,
    rating: 0,
    duration: "12h 15m",
    thumb: null,
  },
  {
    id: 15,
    title: "Reinforcement Learning Basics",
    price: 3299,
    published: true,
    category: "Machine Learning",
    students: 203,
    rating: 4.6,
    duration: "7h 0m",
    thumb: null,
  },
];

// ── Gradient palettes per category ───────────────────────────────────────────
const CATEGORY_GRADIENTS = {
  "AI & Ethics": ["#1d4ed8", "#7c3aed"],
  "Computer Vision": ["#0891b2", "#0d9488"],
  "AI Basics": ["#2563eb", "#0891b2"],
  "Machine Learning": ["#7c3aed", "#db2777"],
  Education: ["#059669", "#0891b2"],
  "Deep Learning": ["#1d4ed8", "#0f172a"],
  NLP: ["#d97706", "#dc2626"],
  "Data Science": ["#059669", "#2563eb"],
};

function getGradient(category) {
  const g = CATEGORY_GRADIENTS[category] || ["#2563eb", "#7c3aed"];
  return `linear-gradient(135deg, ${g[0]}, ${g[1]})`;
}

// Initials from title
function getInitials(title) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const PAGE_SIZE = 12;
const DROPDOWN_WIDTH = 210;
const DROPDOWN_HEIGHT = 190;

// ── Portal dropdown ──────────────────────────────────────────────────────────
function PortalMenu({ anchorRef, onClose, children }) {
  const menuRef = useRef(null);
  const [style, setStyle] = useState({ visibility: "hidden" });

  useEffect(() => {
    const rect = anchorRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < DROPDOWN_HEIGHT + 10;
    setStyle({
      position: "fixed",
      width: DROPDOWN_WIDTH,
      left: rect.right - DROPDOWN_WIDTH,
      top: openUp ? rect.top - DROPDOWN_HEIGHT - 6 : rect.bottom + 6,
      visibility: "visible",
      zIndex: 999999,
    });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      )
        onClose();
    };
    const t = setTimeout(
      () => document.addEventListener("mousedown", handler),
      10,
    );
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div ref={menuRef} className="oc-dropdown" style={style}>
      {children}
    </div>,
    document.body,
  );
}

// ── Delete modal ─────────────────────────────────────────────────────────────
function DeleteModal({ course, onConfirm, onCancel }) {
  return ReactDOM.createPortal(
    <div className="oc-modal-backdrop" onClick={onCancel}>
      <div className="oc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="oc-modal-x" onClick={onCancel}>
          <i className="bi bi-x-lg" />
        </button>
        <div className="oc-modal-icon">
          <i className="bi bi-exclamation-triangle-fill" />
        </div>
        <h2 className="oc-modal-title">Are you absolutely sure?</h2>
        <p className="oc-modal-desc">
          This will permanently delete <strong>"{course.title}"</strong> and
          remove all its data.
        </p>
        <div className="oc-modal-actions">
          <button className="oc-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="oc-modal-delete" onClick={onConfirm}>
            <i className="bi bi-trash-fill" /> Delete Course
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── Card action menu ──────────────────────────────────────────────────────────
function CardMenu({ course, onDeleteRequest }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const btnRef = useRef(null);
  const close = () => setOpen(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(course.id)).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        close();
      }, 1200);
    });
  };

  return (
    <div className="oc-card-menu-wrap">
      <button
        ref={btnRef}
        className={`oc-card-menu-btn ${open ? "oc-card-menu-btn--on" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        title="More options"
      >
        <i className="bi bi-three-dots-vertical" />
      </button>

      {open && (
        <PortalMenu anchorRef={btnRef} onClose={close}>
          <p className="oc-dropdown-label">Actions</p>
          <button className="oc-dropdown-item" onClick={handleCopyId}>
            <i className="bi bi-copy" />
            {copied ? "Copied!" : "Copy Course ID"}
          </button>
          <button
            className="oc-dropdown-item"
            onClick={() => {
              close();
              alert(`Viewing: "${course.title}"`);
            }}
          >
            <i className="bi bi-eye" />
            View Course
          </button>
          <button
            className="oc-dropdown-item"
            onClick={() => {
              close();
              navigate(`/admin-dashboard/courses/${course.id}`);
            }}
          >
            <i className="bi bi-pencil" />
            Edit Course Details
          </button>
          <div className="oc-dropdown-divider" />
          <button
            className="oc-dropdown-item oc-dropdown-item--danger"
            onClick={() => {
              close();
              onDeleteRequest(course);
            }}
          >
            <i className="bi bi-trash" />
            Delete Course
          </button>
        </PortalMenu>
      )}
    </div>
  );
}

// ── Course card ───────────────────────────────────────────────────────────────
function CourseCard({ course, onDeleteRequest, style }) {
  const navigate = useNavigate();
  const grad = getGradient(course.category);

  return (
    <div className="oc-card" style={style}>
      {/* Thumbnail */}
      <div
        className="oc-card-thumb"
        style={{ background: grad }}
        onClick={() => navigate(`/admin-dashboard/learn/${course.id}`)}
      >
        {course.thumb ? (
          <img
            src={course.thumb}
            alt={course.title}
            className="oc-card-thumb-img"
          />
        ) : (
          <div className="oc-card-thumb-placeholder">
            <span className="oc-card-initials">
              {getInitials(course.title)}
            </span>
            <div className="oc-card-thumb-pattern" />
          </div>
        )}

        {/* Play overlay on hover */}
        <div className="oc-card-play-overlay">
          <div className="oc-card-play-btn">
            <i className="bi bi-play-fill" />
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`oc-card-status ${course.published ? "oc-card-status--live" : "oc-card-status--draft"}`}
        >
          {course.published ? (
            <>
              <span className="oc-status-dot" />
              Live
            </>
          ) : (
            <>Draft</>
          )}
        </span>

        {/* Duration chip */}
        <span className="oc-card-duration">
          <i className="bi bi-clock" /> {course.duration}
        </span>
      </div>

      {/* Card body */}
      <div className="oc-card-body">
        <div className="oc-card-top">
          <span className="oc-card-category">{course.category}</span>
          <CardMenu course={course} onDeleteRequest={onDeleteRequest} />
        </div>

        <h3
          className="oc-card-title"
          onClick={() => navigate(`/admin-dashboard/courses/${course.id}`)}
        >
          {course.title}
        </h3>

        {/* Stats row */}
        <div className="oc-card-stats">
          {course.published && course.students > 0 && (
            <span className="oc-card-stat">
              <i className="bi bi-people-fill" />
              {course.students.toLocaleString("en-IN")}
            </span>
          )}
          {course.published && course.rating > 0 && (
            <span className="oc-card-stat oc-card-stat--star">
              <i className="bi bi-star-fill" />
              {course.rating}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="oc-card-footer">
          <span className="oc-card-price">
            ₹{course.price.toLocaleString("en-IN")}
          </span>
          <button
            className="oc-card-edit-btn"
            onClick={() => navigate(`/admin-dashboard/courses/${course.id}`)}
          >
            <i className="bi bi-pencil-square" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function OurCourses({ onCreateClick }) {
  const [courses, setCourses] = useState([...coursesData]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [deletingCourse, setDeletingCourse] = useState(null);

  const handleDeleteConfirm = () => {
    const id = deletingCourse.id;
    setCourses((prev) => prev.filter((c) => c.id !== id));
    const idx = coursesData.findIndex((c) => c.id === id);
    if (idx !== -1) coursesData.splice(idx, 1);
    setDeletingCourse(null);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...courses];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      );
    }
    if (filterStatus === "published") list = list.filter((c) => c.published);
    if (filterStatus === "draft") list = list.filter((c) => !c.published);
    if (sortBy === "title_asc")
      list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "title_desc")
      list.sort((a, b) => b.title.localeCompare(a.title));
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "popular") list.sort((a, b) => b.students - a.students);
    return list;
  }, [courses, search, sortBy, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(totalPages, 1));
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const publishedCount = courses.filter((c) => c.published).length;
  const draftCount = courses.filter((c) => !c.published).length;

  return (
    <div className="oc-wrapper">
      {deletingCourse && (
        <DeleteModal
          course={deletingCourse}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingCourse(null)}
        />
      )}

      {/* ── Heading ── */}
      <div className="oc-heading">
        <div>
          <h1 className="oc-title">Your Courses</h1>
          <p className="oc-subtitle">Manage and publish your course library</p>
        </div>
        <button className="oc-create-btn" onClick={onCreateClick}>
          <i className="bi bi-plus-lg" /> Create Course
        </button>
      </div>

      {/* ── Summary chips ── */}
      <div className="oc-summary">
        <button
          className={`oc-chip ${filterStatus === "all" ? "oc-chip--on" : ""}`}
          onClick={() => {
            setFilterStatus("all");
            setPage(1);
          }}
        >
          All <span className="oc-chip-count">{courses.length}</span>
        </button>
        <button
          className={`oc-chip oc-chip--live ${filterStatus === "published" ? "oc-chip--on" : ""}`}
          onClick={() => {
            setFilterStatus("published");
            setPage(1);
          }}
        >
          <span className="oc-status-dot" />
          Live <span className="oc-chip-count">{publishedCount}</span>
        </button>
        <button
          className={`oc-chip oc-chip--draft ${filterStatus === "draft" ? "oc-chip--on" : ""}`}
          onClick={() => {
            setFilterStatus("draft");
            setPage(1);
          }}
        >
          Draft <span className="oc-chip-count">{draftCount}</span>
        </button>
      </div>

      {/* ── Toolbar ── */}
      <div className="oc-toolbar">
        <div className="oc-search-wrap">
          <i className="bi bi-search oc-search-icon" />
          <input
            className="oc-search-input"
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button
              className="oc-search-clear"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
            >
              <i className="bi bi-x" />
            </button>
          )}
        </div>
        <select
          className="oc-sort-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="title_asc">Title A→Z</option>
          <option value="title_desc">Title Z→A</option>
          <option value="price_asc">Price Low→High</option>
          <option value="price_desc">Price High→Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* ── Grid ── */}
      {paginated.length === 0 ? (
        <div className="oc-empty">
          <i className="bi bi-collection oc-empty-icon" />
          <p>No courses match your filters.</p>
        </div>
      ) : (
        <div className="oc-grid">
          {paginated.map((course, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              onDeleteRequest={setDeletingCourse}
              style={{ animationDelay: `${idx * 40}ms` }}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="oc-pagination">
          <span className="oc-page-info">
            Showing {(safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="oc-page-btns">
            <button
              className="oc-page-btn"
              disabled={safePage === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <i className="bi bi-chevron-left" /> Previous
            </button>
            <button
              className="oc-page-btn"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <i className="bi bi-chevron-right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OurCourses;
