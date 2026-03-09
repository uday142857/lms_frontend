import React, { useState, useMemo, useRef, useEffect } from "react";
import "./OurCourses.css";

// ── Shared courses store ─────────────────────────────────────────────────────
export const coursesData = [
  { id: 1, title: "Responsible AI Practices", price: 3999, published: true },
  {
    id: 2,
    title: "Ethics in Artificial Intelligence",
    price: 3999,
    published: true,
  },
  {
    id: 3,
    title: "Foundations of Computer Vision",
    price: 3999,
    published: true,
  },
  {
    id: 4,
    title: "AI Fundamentals & Applications",
    price: 3999,
    published: true,
  },
  {
    id: 5,
    title: "Introduction to Machine Learning",
    price: 3999,
    published: true,
  },
  {
    id: 6,
    title: "AI Fluency Teaching Frameworks",
    price: 3999,
    published: true,
  },
  { id: 7, title: "AI Readiness for Educators", price: 3499, published: true },
  { id: 8, title: "Student AI Readiness Course", price: 1499, published: true },
  {
    id: 9,
    title: "AI Fluency – Core Principles",
    price: 1499,
    published: true,
  },
  { id: 10, title: "Understanding AI", price: 599, published: true },
  {
    id: 11,
    title: "Deep Learning Fundamentals",
    price: 4999,
    published: false,
  },
  {
    id: 12,
    title: "Natural Language Processing",
    price: 4499,
    published: true,
  },
  { id: 13, title: "Data Science with Python", price: 2999, published: true },
  { id: 14, title: "Computer Vision Advanced", price: 5499, published: false },
  {
    id: 15,
    title: "Reinforcement Learning Basics",
    price: 3299,
    published: true,
  },
];

const PAGE_SIZE = 10;

// ── Row action dropdown ──────────────────────────────────────────────────────
function ActionMenu({ course, onDelete }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(course.id)).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
    });
  };

  const handleView = () => {
    alert(`Viewing course: "${course.title}"`);
    setOpen(false);
  };

  const handleEdit = () => {
    alert(`Edit course: "${course.title}"`);
    setOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${course.title}"?`)) onDelete(course.id);
    setOpen(false);
  };

  return (
    <div className="oc-menu-wrap" ref={ref}>
      <button
        className={`oc-action-btn ${open ? "oc-action-btn--active" : ""}`}
        onClick={() => setOpen((p) => !p)}
        title="More options"
      >
        <i className="bi bi-three-dots" />
      </button>

      {open && (
        <div className="oc-dropdown">
          <p className="oc-dropdown-label">Actions</p>

          <button className="oc-dropdown-item" onClick={handleCopyId}>
            <i className="bi bi-copy" />
            {copied ? "Copied!" : "Copy Course ID"}
          </button>

          <button className="oc-dropdown-item" onClick={handleView}>
            <i className="bi bi-eye" />
            View Course
          </button>

          <button className="oc-dropdown-item" onClick={handleEdit}>
            <i className="bi bi-pencil" />
            Edit Course Details
          </button>

          <div className="oc-dropdown-divider" />

          <button
            className="oc-dropdown-item oc-dropdown-item--danger"
            onClick={handleDelete}
          >
            <i className="bi bi-trash" />
            Delete Course
          </button>
        </div>
      )}
    </div>
  );
}

// ── Sortable column header ───────────────────────────────────────────────────
function SortTh({ label, sortKey, sortBy, onSort, className }) {
  const isAsc = sortBy === `${sortKey}_asc`;
  const isDesc = sortBy === `${sortKey}_desc`;
  const active = isAsc || isDesc;

  const handleClick = () => {
    if (!active || isDesc) onSort(`${sortKey}_asc`);
    else onSort(`${sortKey}_desc`);
  };

  return (
    <th className={`oc-th ${className || ""}`}>
      <button
        className={`oc-th-btn ${active ? "oc-th-btn--active" : ""}`}
        onClick={handleClick}
      >
        {label}
        <span className="oc-th-icons">
          <i
            className={`bi bi-caret-up-fill   oc-caret ${isAsc ? "oc-caret--on" : ""}`}
          />
          <i
            className={`bi bi-caret-down-fill oc-caret ${isDesc ? "oc-caret--on" : ""}`}
          />
        </span>
      </button>
    </th>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
function OurCourses({ onCreateClick }) {
  const [courses, setCourses] = useState(coursesData);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q));
    }

    if (sortBy === "title_asc")
      list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "title_desc")
      list.sort((a, b) => b.title.localeCompare(a.title));
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "status_asc")
      list.sort((a, b) => Number(b.published) - Number(a.published));
    if (sortBy === "status_desc")
      list.sort((a, b) => Number(a.published) - Number(b.published));

    return list;
  }, [courses, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleSort = (val) => {
    setSortBy(val);
    setPage(1);
  };

  return (
    <div className="oc-wrapper">
      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <div className="oc-heading">
        <div>
          <h1 className="oc-title">Your Courses</h1>
          <p className="oc-subtitle">Here is a list of all your courses</p>
        </div>
        <button className="oc-create-btn" onClick={onCreateClick}>
          <i className="bi bi-plus-lg" />
          Create Course
        </button>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="oc-toolbar">
        <div className="oc-search-wrap">
          <i className="bi bi-search oc-search-icon" />
          <input
            className="oc-search-input"
            type="text"
            placeholder="Filter titles..."
            value={search}
            onChange={handleSearch}
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
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="oc-table-wrap">
        <table className="oc-table">
          <thead>
            <tr>
              <SortTh
                label="Title"
                sortKey="title"
                sortBy={sortBy}
                onSort={handleSort}
                className="oc-th--title"
              />
              <SortTh
                label="Price"
                sortKey="price"
                sortBy={sortBy}
                onSort={handleSort}
                className="oc-th--price"
              />
              <SortTh
                label="Published"
                sortKey="status"
                sortBy={sortBy}
                onSort={handleSort}
                className="oc-th--status"
              />
              <th className="oc-th oc-th--actions" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="oc-empty">
                  <i className="bi bi-inbox oc-empty-icon" />
                  <p>No courses match your filters.</p>
                </td>
              </tr>
            ) : (
              paginated.map((course) => (
                <tr key={course.id} className="oc-row">
                  <td className="oc-td oc-td--title">{course.title}</td>
                  <td className="oc-td oc-td--price">
                    ₹{course.price.toLocaleString("en-IN")}.00
                  </td>
                  <td className="oc-td oc-td--status">
                    <span
                      className={`oc-badge ${course.published ? "oc-badge--published" : "oc-badge--draft"}`}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="oc-td oc-td--actions">
                    <ActionMenu course={course} onDelete={handleDelete} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ──────────────────────────────────────────────────── */}
      <div className="oc-pagination">
        <span className="oc-page-info">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
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
    </div>
  );
}

export default OurCourses;
