import React, { useState, useRef } from "react";
// NOTE: This file is for reference only - edit your actual project file
import { useParams, useNavigate } from "react-router-dom";
import { coursesData } from "../ourcourses/OurCourses";
import "./CourseEditor.css";

// ── Helpers ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile Development",
  "DevOps",
  "UI/UX Design",
  "Business & Finance",
];

function countCompleted(course) {
  let done = 0;
  if (course.title) done++;
  if (course.description) done++;
  if (course.image) done++;
  if (course.category) done++;
  if (course.chapters?.length) done++;
  if (course.price > 0) done++;
  return done;
}

// ── Inline edit modal ────────────────────────────────────────────────────────
function EditModal({ title, children, onClose }) {
  return (
    <div className="ce-modal-backdrop" onClick={onClose}>
      <div className="ce-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ce-modal-header">
          <h3 className="ce-modal-title">{title}</h3>
          <button className="ce-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="ce-modal-body">{children}</div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
function CourseEditor() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  // find course in shared array
  const courseIndex = coursesData.findIndex(
    (c) => String(c.id) === String(courseId),
  );
  const [course, setCourse] = useState(
    courseIndex !== -1 ? { ...coursesData[courseIndex] } : null,
  );

  // modal states
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [editingPrice, setEditingPrice] = useState(false);
  const [editingCat, setEditingCat] = useState(false);
  const [addingChapter, setAddingChapter] = useState(false);

  // temp edit values
  const [tmpTitle, setTmpTitle] = useState("");
  const [tmpTeacher, setTmpTeacher] = useState("");
  const [tmpDesc, setTmpDesc] = useState("");
  const [tmpPrice, setTmpPrice] = useState("");
  const [tmpCat, setTmpCat] = useState("");
  const [tmpChapter, setTmpChapter] = useState("");

  if (!course) {
    return (
      <div className="ce-notfound">
        <i className="bi bi-exclamation-circle" />
        <p>Course not found.</p>
        <button onClick={() => navigate("/admin-dashboard/my-courses")}>
          Back to My Courses
        </button>
      </div>
    );
  }

  // ── Sync back to shared array ─────────────────────────────────────────────
  const save = (updated) => {
    const merged = { ...course, ...updated };
    setCourse(merged);
    if (courseIndex !== -1) Object.assign(coursesData[courseIndex], merged);
  };

  const completed = countCompleted(course);
  const total = 6;

  // ── Publish toggle ────────────────────────────────────────────────────────
  const handlePublish = () => {
    if (completed < total) {
      alert("Please complete all fields before publishing.");
      return;
    }
    save({ published: !course.published });
  };

  // ── Image upload ──────────────────────────────────────────────────────────
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => save({ image: ev.target.result });
    reader.readAsDataURL(file);
  };

  // ── Chapter actions ───────────────────────────────────────────────────────
  const addChapter = () => {
    if (!tmpChapter.trim()) return;
    save({
      chapters: [
        ...(course.chapters || []),
        { id: Date.now(), title: tmpChapter.trim() },
      ],
    });
    setTmpChapter("");
    setAddingChapter(false);
  };

  const deleteChapter = (id) => {
    save({ chapters: course.chapters.filter((c) => c.id !== id) });
  };

  return (
    <div className="ce-wrapper">
      {/* ── Unpublished banner ─────────────────────────────────────────────── */}
      {!course.published && (
        <div className="ce-banner">
          <i className="bi bi-exclamation-triangle-fill" />
          This course is not published. It will not be visible to the students.
        </div>
      )}

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="ce-page-header">
        <div>
          <h1 className="ce-page-title">Course Creation</h1>
          <p className="ce-page-sub">
            Complete all fields ({completed}/{total})
            <span className="ce-progress-bar">
              <span
                className="ce-progress-fill"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </span>
          </p>
        </div>
        <div className="ce-header-actions">
          <button
            className={`ce-publish-btn ${course.published ? "ce-publish-btn--on" : ""}`}
            onClick={handlePublish}
          >
            {course.published ? "Unpublish" : "Publish"}
          </button>
          <button
            className="ce-delete-btn"
            title="Delete course"
            onClick={() => {
              if (window.confirm("Delete this course permanently?")) {
                coursesData.splice(courseIndex, 1);
                navigate("/admin-dashboard/my-courses");
              }
            }}
          >
            <i className="bi bi-trash-fill" />
          </button>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="ce-columns">
        {/* ── LEFT: Customize ─────────────────────────────────────────────── */}
        <div className="ce-col">
          <div className="ce-section-label">
            <i className="bi bi-grid-fill" /> Customize your course
          </div>

          {/* Title & Teacher */}
          <div className="ce-block">
            <div className="ce-block-header">
              <span className="ce-block-title">
                Course Title & Teacher <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpTitle(course.title);
                  setTmpTeacher(course.teacher);
                  setEditingTitle(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit Text
              </button>
            </div>
            <p className="ce-block-value">
              {course.title || <em className="ce-empty-val">No title</em>}
            </p>
            {course.teacher && (
              <p className="ce-block-by">By: {course.teacher}</p>
            )}
          </div>

          {/* Description */}
          <div className="ce-block">
            <div className="ce-block-header">
              <span className="ce-block-title">
                Course Description <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpDesc(course.description);
                  setEditingDesc(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit Text
              </button>
            </div>
            <p className="ce-block-value">
              {course.description || (
                <em className="ce-empty-val">No description</em>
              )}
            </p>
          </div>

          {/* Image */}
          <div className="ce-block">
            <div className="ce-block-header">
              <span className="ce-block-title">
                Course Image <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => imageRef.current.click()}
              >
                <i className="bi bi-image" />{" "}
                {course.image ? "Change Image" : "Add Image"}
              </button>
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
              />
            </div>
            <div className="ce-image-box">
              {course.image ? (
                <img
                  src={course.image}
                  alt="Course"
                  className="ce-image-preview"
                />
              ) : (
                <div className="ce-image-placeholder">
                  <i className="bi bi-image" />
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="ce-block">
            <div className="ce-block-header">
              <span className="ce-block-title">
                Course Category <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpCat(course.category);
                  setEditingCat(true);
                }}
              >
                <i className="bi bi-gear" /> Change
              </button>
            </div>
            <p className="ce-block-value">
              {course.category || <em className="ce-empty-val">No category</em>}
            </p>
          </div>
        </div>

        {/* ── RIGHT: Chapters + Price ──────────────────────────────────────── */}
        <div className="ce-col">
          {/* Chapters */}
          <div className="ce-section-label">
            <i className="bi bi-list-ol" /> Course chapters
          </div>

          <div className="ce-block">
            <div className="ce-block-header">
              <span className="ce-block-title">
                Course Chapter <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpChapter("");
                  setAddingChapter(true);
                }}
              >
                <i className="bi bi-plus-lg" /> Add a Chapter
              </button>
            </div>

            {course.chapters?.length === 0 || !course.chapters ? (
              <div className="ce-chapters-empty">No chapters</div>
            ) : (
              <ul className="ce-chapters-list">
                {course.chapters.map((ch, i) => (
                  <li key={ch.id} className="ce-chapter-item">
                    <span className="ce-chapter-num">{i + 1}</span>
                    <span className="ce-chapter-name">{ch.title}</span>
                    <button
                      className="ce-chapter-del"
                      onClick={() => deleteChapter(ch.id)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="ce-hint">Drag and drop to reorder chapters</p>
          </div>

          {/* Price */}
          <div className="ce-section-label">
            <i className="bi bi-currency-dollar" /> Sell your course
          </div>

          <div className="ce-block">
            <div className="ce-block-header">
              <span className="ce-block-title">
                Course Price <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpPrice(String(course.price ?? ""));
                  setEditingPrice(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit Price
              </button>
            </div>
            <p className="ce-block-value">
              {course.price > 0 ? (
                `₹${Number(course.price).toLocaleString("en-IN")}.00`
              ) : (
                <em className="ce-empty-val">No price</em>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────── */}

      {/* Edit Title & Teacher */}
      {editingTitle && (
        <EditModal
          title="Edit Title & Teacher"
          onClose={() => setEditingTitle(false)}
        >
          <label className="ce-modal-label">Course Title</label>
          <input
            className="ce-modal-input"
            value={tmpTitle}
            onChange={(e) => setTmpTitle(e.target.value)}
            placeholder="Course title"
          />
          <label className="ce-modal-label">Teacher's Name</label>
          <input
            className="ce-modal-input"
            value={tmpTeacher}
            onChange={(e) => setTmpTeacher(e.target.value)}
            placeholder="Teacher name"
          />
          <div className="ce-modal-actions">
            <button
              className="ce-modal-cancel"
              onClick={() => setEditingTitle(false)}
            >
              Cancel
            </button>
            <button
              className="ce-modal-save"
              onClick={() => {
                save({ title: tmpTitle, teacher: tmpTeacher });
                setEditingTitle(false);
              }}
            >
              Save
            </button>
          </div>
        </EditModal>
      )}

      {/* Edit Description */}
      {editingDesc && (
        <EditModal
          title="Edit Description"
          onClose={() => setEditingDesc(false)}
        >
          <label className="ce-modal-label">Description</label>
          <textarea
            className="ce-modal-textarea"
            rows={5}
            value={tmpDesc}
            onChange={(e) => setTmpDesc(e.target.value)}
            placeholder="Course description…"
          />
          <div className="ce-modal-actions">
            <button
              className="ce-modal-cancel"
              onClick={() => setEditingDesc(false)}
            >
              Cancel
            </button>
            <button
              className="ce-modal-save"
              onClick={() => {
                save({ description: tmpDesc });
                setEditingDesc(false);
              }}
            >
              Save
            </button>
          </div>
        </EditModal>
      )}

      {/* Edit Price */}
      {editingPrice && (
        <EditModal title="Edit Price" onClose={() => setEditingPrice(false)}>
          <label className="ce-modal-label">Price (₹)</label>
          <input
            className="ce-modal-input"
            type="number"
            min="0"
            value={tmpPrice}
            onChange={(e) => setTmpPrice(e.target.value)}
            placeholder="e.g. 1999"
          />
          <div className="ce-modal-actions">
            <button
              className="ce-modal-cancel"
              onClick={() => setEditingPrice(false)}
            >
              Cancel
            </button>
            <button
              className="ce-modal-save"
              onClick={() => {
                save({ price: Number(tmpPrice) });
                setEditingPrice(false);
              }}
            >
              Save
            </button>
          </div>
        </EditModal>
      )}

      {/* Edit Category */}
      {editingCat && (
        <EditModal title="Choose Category" onClose={() => setEditingCat(false)}>
          <div className="ce-cat-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`ce-cat-item ${tmpCat === cat ? "ce-cat-item--active" : ""}`}
                onClick={() => setTmpCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ce-modal-actions">
            <button
              className="ce-modal-cancel"
              onClick={() => setEditingCat(false)}
            >
              Cancel
            </button>
            <button
              className="ce-modal-save"
              onClick={() => {
                save({ category: tmpCat });
                setEditingCat(false);
              }}
            >
              Save
            </button>
          </div>
        </EditModal>
      )}

      {/* Add Chapter */}
      {addingChapter && (
        <EditModal title="Add Chapter" onClose={() => setAddingChapter(false)}>
          <label className="ce-modal-label">Chapter Title</label>
          <input
            className="ce-modal-input"
            value={tmpChapter}
            onChange={(e) => setTmpChapter(e.target.value)}
            placeholder="e.g. Introduction to AI"
            onKeyDown={(e) => e.key === "Enter" && addChapter()}
            autoFocus
          />
          <div className="ce-modal-actions">
            <button
              className="ce-modal-cancel"
              onClick={() => setAddingChapter(false)}
            >
              Cancel
            </button>
            <button className="ce-modal-save" onClick={addChapter}>
              Add
            </button>
          </div>
        </EditModal>
      )}
    </div>
  );
}

export default CourseEditor;
