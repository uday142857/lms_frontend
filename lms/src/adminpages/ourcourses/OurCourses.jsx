import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { coursesData, getGradient, getInitials } from "../../data/Lmsdata";
import "./OurCourses.css";

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
              navigate(`/learn/${course.id}`);
            }}
          >
            <i className="bi bi-play-circle" />
            View as Student
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
  const chapterCount = (course.chapters || []).length;

  return (
    <div className="oc-card" style={style}>
      {/* Thumbnail */}
      <div
        className="oc-card-thumb"
        style={course.thumb ? undefined : { background: grad }}
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

        <div className="oc-card-play-overlay">
          <div className="oc-card-play-btn">
            <i className="bi bi-play-fill" />
          </div>
        </div>

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

        {course.duration && (
          <span className="oc-card-duration">
            <i className="bi bi-clock" /> {course.duration}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="oc-card-body">
        <div className="oc-card-top">
          <span className="oc-card-category">
            {course.category || "General"}
          </span>
          <CardMenu course={course} onDeleteRequest={onDeleteRequest} />
        </div>

        <h3
          className="oc-card-title"
          onClick={() => navigate(`/admin-dashboard/courses/${course.id}`)}
        >
          {course.title}
        </h3>

        {/* Teacher */}
        {course.teacher && (
          <p className="oc-card-teacher">
            <i className="bi bi-person" /> {course.teacher}
          </p>
        )}

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
          {chapterCount > 0 && (
            <span className="oc-card-stat">
              <i className="bi bi-collection-play" />
              {chapterCount} chapters
            </span>
          )}
        </div>

        <div className="oc-card-footer">
          <span className="oc-card-price">
            {course.price > 0 ? (
              `₹${course.price.toLocaleString("en-IN")}`
            ) : (
              <span className="oc-free-label">Free</span>
            )}
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
          (c.category || "").toLowerCase().includes(q) ||
          (c.teacher || "").toLowerCase().includes(q),
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

      <div className="oc-heading">
        <div>
          <h1 className="oc-title">Your Courses</h1>
          <p className="oc-subtitle">Manage and publish your course library</p>
        </div>
        <button className="oc-create-btn" onClick={onCreateClick}>
          <i className="bi bi-plus-lg" /> Create Course
        </button>
      </div>

      <div className="oc-summary">
        {[
          { key: "all", label: "All", count: courses.length },
          { key: "published", label: "Live", count: publishedCount, dot: true },
          { key: "draft", label: "Draft", count: draftCount },
        ].map((f) => (
          <button
            key={f.key}
            className={`oc-chip ${filterStatus === f.key ? "oc-chip--on" : ""} ${f.dot ? "oc-chip--live" : ""}`}
            onClick={() => {
              setFilterStatus(f.key);
              setPage(1);
            }}
          >
            {f.dot && <span className="oc-status-dot" />}
            {f.label} <span className="oc-chip-count">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="oc-toolbar">
        <div className="oc-search-wrap">
          <i className="bi bi-search oc-search-icon" />
          <input
            className="oc-search-input"
            type="text"
            placeholder="Search by title, category or teacher..."
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
