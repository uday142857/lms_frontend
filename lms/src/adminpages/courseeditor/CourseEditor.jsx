import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coursesData, CATEGORIES } from "../../data/Lmsdata";
import "./CourseEditor.css";

// ══════════════════════════════════════════════════════════════════════════════
// RICH EDITOR  — Pure React contentEditable, zero dependencies
// StrictMode-safe: uses a single mounted flag per instance key
// ══════════════════════════════════════════════════════════════════════════════
const TOOLBAR_BTNS = [
  { cmd: "bold", icon: "bi-type-bold", title: "Bold" },
  { cmd: "italic", icon: "bi-type-italic", title: "Italic" },
  { cmd: "underline", icon: "bi-type-underline", title: "Underline" },
  {
    cmd: "strikeThrough",
    icon: "bi-type-strikethrough",
    title: "Strikethrough",
  },
  { type: "sep" },
  { cmd: "insertUnorderedList", icon: "bi-list-ul", title: "Bullet list" },
  { cmd: "insertOrderedList", icon: "bi-list-ol", title: "Numbered list" },
  { type: "sep" },
  { cmd: "removeFormat", icon: "bi-eraser", title: "Clear formatting" },
];

function RichEditor({ value, onChange, placeholder, minHeight = 140 }) {
  const editorRef = useRef(null);
  const onChgRef = useRef(onChange);
  const valueRef = useRef(value); // tracks last value we wrote
  const [active, setActive] = useState({});

  useEffect(() => {
    onChgRef.current = onChange;
  }, [onChange]);

  // Set content once on first mount only
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
      valueRef.current = value || "";
      // Set placeholder class if empty
      if (!value) editorRef.current.classList.add("re-empty");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync only when value changes from OUTSIDE (opening different chapter)
  useEffect(() => {
    if (!editorRef.current) return;
    const incoming = value || "";
    if (incoming !== valueRef.current) {
      editorRef.current.innerHTML = incoming;
      valueRef.current = incoming;
    }
  }, [value]);

  const emit = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    // Treat empty / whitespace-only editor as ""
    const clean = html
      .replace(/<br\s*\/?>/gi, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    const out = clean === "" ? "" : html;
    valueRef.current = out;
    onChgRef.current(out);
    // Toggle placeholder class
    if (clean === "") editorRef.current.classList.add("re-empty");
    else editorRef.current.classList.remove("re-empty");
  }, []);

  const queryActive = useCallback(() => {
    const state = {};
    TOOLBAR_BTNS.forEach((b) => {
      if (b.cmd) {
        try {
          state[b.cmd] = document.queryCommandState(b.cmd);
        } catch {}
      }
    });
    setActive(state);
  }, []);

  const exec = useCallback(
    (cmd) => {
      editorRef.current?.focus();
      document.execCommand(cmd, false, null);
      emit();
      queryActive();
    },
    [emit, queryActive],
  );

  const handleLink = useCallback(() => {
    editorRef.current?.focus();
    const url = window.prompt("Enter URL:", "https://");
    if (url) {
      document.execCommand("createLink", false, url);
      emit();
    }
  }, [emit]);

  const handleHeading = useCallback(
    (e) => {
      editorRef.current?.focus();
      document.execCommand("formatBlock", false, e.target.value);
      emit();
    },
    [emit],
  );

  // Prevent toolbar clicks from stealing focus from the editor
  const trapFocus = (e) => e.preventDefault();

  return (
    <div className="re-wrap">
      {/* ── Toolbar ── */}
      <div className="re-toolbar" onMouseDown={trapFocus}>
        <select
          className="re-heading-sel"
          onChange={handleHeading}
          defaultValue="p"
          title="Text style"
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <div className="re-sep" />

        {TOOLBAR_BTNS.map((btn, i) =>
          btn.type === "sep" ? (
            <div key={`sep-${i}`} className="re-sep" />
          ) : (
            <button
              key={btn.cmd}
              type="button"
              title={btn.title}
              className={`re-btn ${active[btn.cmd] ? "re-btn--on" : ""}`}
              onClick={() => exec(btn.cmd)}
            >
              <i className={`bi ${btn.icon}`} />
            </button>
          ),
        )}

        <div className="re-sep" />

        <button
          type="button"
          title="Insert link"
          className="re-btn"
          onClick={handleLink}
        >
          <i className="bi bi-link-45deg" />
        </button>
      </div>

      {/* ── Editable area ── */}
      <div
        ref={editorRef}
        className="re-editor"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder || "Write here..."}
        style={{ minHeight }}
        onInput={emit}
        onKeyUp={queryActive}
        onMouseUp={queryActive}
        onFocus={queryActive}
      />
    </div>
  );
}

// ── Count completed fields ────────────────────────────────────────────────────
function countCompleted(course) {
  let n = 0;
  if (course.title) n++;
  if (course.description) n++;
  if (course.thumb) n++;
  if (course.category) n++;
  if (course.chapters?.length) n++;
  if (course.price > 0) n++;
  return n;
}

// ── Modal backdrop + card ─────────────────────────────────────────────────────
function EditModal({ title, onClose, children, wide }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="ce-backdrop" onClick={onClose}>
      <div
        className={`ce-modal ${wide ? "ce-modal--wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ce-modal-head">
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

// ── Chapter editor modal ──────────────────────────────────────────────────────
function ChapterEditorModal({ chapter, onSave, onClose }) {
  const [title, setTitle] = useState(chapter?.title || "");
  const [section, setSection] = useState(chapter?.section || "");
  const [desc, setDesc] = useState(chapter?.description || "");
  const [video, setVideo] = useState(chapter?.videoUrl || "");
  const [isFree, setIsFree] = useState(chapter?.isFree ?? false);
  const [dur, setDur] = useState(chapter?.duration || "");
  const isNew = !chapter?.id;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      id: chapter?.id || Date.now(),
      title: title.trim(),
      section: section.trim(),
      description: desc,
      videoUrl: video.trim(),
      isFree,
      duration: dur.trim() || "—",
    });
  };

  return (
    <EditModal
      title={isNew ? "Add Chapter" : "Edit Chapter"}
      onClose={onClose}
      wide
    >
      {/* Title */}
      <div className="ce-field">
        <label className="ce-label">
          Chapter Title <span className="ce-req">*</span>
        </label>
        <input
          className="ce-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Introduction to AI"
          autoFocus
        />
      </div>

      {/* Section — groups chapters in the player sidebar */}
      <div className="ce-field">
        <label className="ce-label">
          <i className="bi bi-folder2 ce-label-ic" />
          Section Name
          <span className="ce-label-hint">
            Groups chapters in the course player
          </span>
        </label>
        <input
          className="ce-input"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="e.g. Getting Started, Core Concepts, Advanced Topics..."
        />
      </div>

      {/* Description */}
      <div className="ce-field">
        <label className="ce-label">Chapter Description</label>
        <RichEditor
          value={desc}
          onChange={setDesc}
          placeholder="Describe what students will learn in this chapter..."
          minHeight={140}
        />
      </div>

      {/* Video URL */}
      <div className="ce-field">
        <label className="ce-label">
          <i className="bi bi-play-circle-fill ce-label-ic" />
          Video URL
        </label>
        <input
          className="ce-input"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="https://example.com/video.mp4  or  YouTube embed URL"
        />
        {video && (
          <div className="ce-url-ok">
            <i className="bi bi-check-circle-fill" />
            Video URL saved — will play in Course Player.
          </div>
        )}
      </div>

      {/* Duration + Access — two equal columns */}
      <div className="ce-two-col">
        <div className="ce-field">
          <label className="ce-label">Duration</label>
          <input
            className="ce-input"
            value={dur}
            onChange={(e) => setDur(e.target.value)}
            placeholder="e.g.  12:30"
          />
        </div>

        <div className="ce-field">
          <label className="ce-label">Chapter Access</label>
          <button
            type="button"
            className={`ce-access-btn ${isFree ? "ce-access-btn--free" : ""}`}
            onClick={() => setIsFree((p) => !p)}
          >
            {/* pill switch */}
            <span className="ce-switch">
              <span className="ce-switch-dot" />
            </span>
            <span className="ce-access-text">
              {isFree ? "Free Preview" : "Paid — Enrolled only"}
            </span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="ce-modal-actions">
        <button className="ce-btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button
          className="ce-btn-save"
          onClick={handleSave}
          disabled={!title.trim()}
        >
          <i className={`bi ${isNew ? "bi-plus-lg" : "bi-check-lg"}`} />
          {isNew ? "Add Chapter" : "Save Changes"}
        </button>
      </div>
    </EditModal>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function CourseEditor() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const courseIndex = coursesData.findIndex(
    (c) => String(c.id) === String(courseId),
  );
  const [course, setCourse] = useState(
    courseIndex !== -1 ? { ...coursesData[courseIndex] } : null,
  );

  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editCat, setEditCat] = useState(false);
  const [chapterMod, setChapterMod] = useState(null);

  const [tmpTitle, setTmpTitle] = useState("");
  const [tmpTeacher, setTmpTeacher] = useState("");
  const [tmpDesc, setTmpDesc] = useState("");
  const [tmpPrice, setTmpPrice] = useState("");
  const [tmpCat, setTmpCat] = useState("");

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

  const save = (updated) => {
    const m = { ...course, ...updated };
    setCourse(m);
    if (courseIndex !== -1) Object.assign(coursesData[courseIndex], m);
  };

  const completed = countCompleted(course);
  const TOTAL = 6;

  const handlePublish = () => {
    if (!course.published && completed < TOTAL) {
      alert("Please complete all 6 fields before publishing.");
      return;
    }
    save({ published: !course.published });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => save({ thumb: ev.target.result });
    reader.readAsDataURL(file);
  };

  const saveChapter = (ch) => {
    const list = course.chapters || [];
    const idx = list.findIndex((c) => c.id === ch.id);
    save({
      chapters:
        idx !== -1 ? list.map((c) => (c.id === ch.id ? ch : c)) : [...list, ch],
    });
    setChapterMod(null);
  };

  const delChapter = (id) =>
    save({ chapters: course.chapters.filter((c) => c.id !== id) });

  const totalMins = (course.chapters || []).reduce((s, ch) => {
    const m = (ch.duration || "").match(/(\d+):(\d+)/);
    return s + (m ? parseInt(m[1]) : 0);
  }, 0);
  const totalDur =
    totalMins > 0 ? `${Math.floor(totalMins / 60)}h ${totalMins % 60}m` : null;

  return (
    <div className="ce-wrapper">
      {!course.published && (
        <div className="ce-banner">
          <i className="bi bi-exclamation-triangle-fill" />
          This course is not published — students cannot see it.
        </div>
      )}

      <div className="ce-page-header">
        <div>
          <h1 className="ce-page-title">Course Creation</h1>
          <p className="ce-page-sub">
            Complete all fields ({completed}/{TOTAL})
            <span className="ce-prog-bar">
              <span
                className="ce-prog-fill"
                style={{ width: `${(completed / TOTAL) * 100}%` }}
              />
            </span>
          </p>
        </div>
        <div className="ce-header-actions">
          <button
            className={`ce-publish-btn ${course.published ? "ce-publish-btn--on" : ""}`}
            onClick={handlePublish}
          >
            <i
              className={`bi ${course.published ? "bi-eye-slash" : "bi-send"}`}
            />
            {course.published ? "Unpublish" : "Publish"}
          </button>
          <button
            className="ce-delete-btn"
            onClick={() => {
              if (window.confirm("Delete this course?")) {
                coursesData.splice(courseIndex, 1);
                navigate("/admin-dashboard/my-courses");
              }
            }}
          >
            <i className="bi bi-trash-fill" />
          </button>
        </div>
      </div>

      <div className="ce-columns">
        {/* ════ LEFT ════ */}
        <div className="ce-col">
          <p className="ce-col-head">
            <i className="bi bi-grid-fill" /> Customize your course
          </p>

          {/* Title */}
          <div className="ce-block">
            <div className="ce-block-top">
              <span className="ce-block-title">
                Course Title &amp; Teacher <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpTitle(course.title || "");
                  setTmpTeacher(course.teacher || "");
                  setEditTitle(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit
              </button>
            </div>
            {course.title ? (
              <>
                <p className="ce-val">{course.title}</p>
                {course.teacher && (
                  <p className="ce-sub">By: {course.teacher}</p>
                )}
              </>
            ) : (
              <p className="ce-val">
                <em className="ce-empty">No title yet.</em>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="ce-block">
            <div className="ce-block-top">
              <span className="ce-block-title">
                Description <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpDesc(course.description || "");
                  setEditDesc(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit
              </button>
            </div>
            {course.description ? (
              <div
                className="ce-desc-preview"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            ) : (
              <p className="ce-val">
                <em className="ce-empty">No description yet.</em>
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="ce-block">
            <div className="ce-block-top">
              <span className="ce-block-title">
                Course Thumbnail <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => imageRef.current.click()}
              >
                <i className="bi bi-image" />{" "}
                {course.thumb ? "Change" : "Upload"}
              </button>
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
              />
            </div>
            <div className="ce-thumb-box">
              {course.thumb ? (
                <img src={course.thumb} alt="" className="ce-thumb-img" />
              ) : (
                <div className="ce-thumb-empty">
                  <i className="bi bi-image" />
                  <span>Upload a thumbnail (16:9)</span>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="ce-block">
            <div className="ce-block-top">
              <span className="ce-block-title">
                Category <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpCat(course.category || "");
                  setEditCat(true);
                }}
              >
                <i className="bi bi-gear" /> Change
              </button>
            </div>
            <p className="ce-val">
              {course.category ? (
                <span className="ce-cat-pill">{course.category}</span>
              ) : (
                <em className="ce-empty">No category.</em>
              )}
            </p>
          </div>
        </div>

        {/* ════ RIGHT ════ */}
        <div className="ce-col">
          <p className="ce-col-head">
            <i className="bi bi-list-ol" /> Course Chapters
            {totalDur && (
              <span className="ce-dur-badge">
                <i className="bi bi-clock" /> {totalDur}
              </span>
            )}
          </p>

          <div className="ce-block">
            <div className="ce-block-top">
              <span className="ce-block-title">
                Chapters <span className="ce-req">*</span>
                <span className="ce-count-badge">
                  {(course.chapters || []).length}
                </span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => setChapterMod("new")}
              >
                <i className="bi bi-plus-lg" /> Add Chapter
              </button>
            </div>

            {!course.chapters?.length ? (
              <div className="ce-ch-empty">
                <i className="bi bi-collection-play" />
                <p>No chapters yet. Add your first chapter above.</p>
              </div>
            ) : (
              <ul className="ce-ch-list">
                {course.chapters.map((ch, i) => (
                  <li key={ch.id} className="ce-ch-item">
                    <span className="ce-ch-num">{i + 1}</span>
                    <div className="ce-ch-info">
                      <span className="ce-ch-name">{ch.title}</span>
                      <div className="ce-ch-meta">
                        {ch.duration && ch.duration !== "—" && (
                          <span className="ce-ch-dur">
                            <i className="bi bi-clock" /> {ch.duration}
                          </span>
                        )}
                        {ch.videoUrl ? (
                          <span className="ce-ch-vid ce-ch-vid--yes">
                            <i className="bi bi-play-circle-fill" /> Video added
                          </span>
                        ) : (
                          <span className="ce-ch-vid ce-ch-vid--no">
                            <i className="bi bi-play-circle" /> No video
                          </span>
                        )}
                        {ch.isFree && <span className="ce-ch-free">Free</span>}
                      </div>
                    </div>
                    <div className="ce-ch-btns">
                      <button
                        className="ce-ch-btn"
                        onClick={() => setChapterMod(ch)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil" />
                      </button>
                      <button
                        className="ce-ch-btn ce-ch-btn--del"
                        onClick={() => delChapter(ch.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="ce-hint">
              <i className="bi bi-info-circle" /> Click the pencil on each
              chapter to add its video URL.
            </p>
          </div>

          <p className="ce-col-head">
            <i className="bi bi-currency-rupee" /> Pricing
          </p>

          <div className="ce-block">
            <div className="ce-block-top">
              <span className="ce-block-title">
                Course Price <span className="ce-req">*</span>
              </span>
              <button
                className="ce-edit-btn"
                onClick={() => {
                  setTmpPrice(String(course.price ?? ""));
                  setEditPrice(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit
              </button>
            </div>
            <p className="ce-val">
              {course.price > 0 ? (
                <span className="ce-price-val">
                  ₹{Number(course.price).toLocaleString("en-IN")}
                </span>
              ) : (
                <em className="ce-empty">No price set.</em>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════ MODALS ══════════ */}

      {editTitle && (
        <EditModal
          title="Edit Title & Teacher"
          onClose={() => setEditTitle(false)}
        >
          <div className="ce-field">
            <label className="ce-label">Course Title</label>
            <input
              className="ce-input"
              autoFocus
              value={tmpTitle}
              onChange={(e) => setTmpTitle(e.target.value)}
              placeholder="Course title"
            />
          </div>
          <div className="ce-field">
            <label className="ce-label">Teacher's Name</label>
            <input
              className="ce-input"
              value={tmpTeacher}
              onChange={(e) => setTmpTeacher(e.target.value)}
              placeholder="Instructor name"
            />
          </div>
          <div className="ce-modal-actions">
            <button
              className="ce-btn-cancel"
              onClick={() => setEditTitle(false)}
            >
              Cancel
            </button>
            <button
              className="ce-btn-save"
              onClick={() => {
                save({ title: tmpTitle, teacher: tmpTeacher });
                setEditTitle(false);
              }}
            >
              <i className="bi bi-check-lg" /> Save
            </button>
          </div>
        </EditModal>
      )}

      {editDesc && (
        <EditModal
          title="Edit Description"
          onClose={() => setEditDesc(false)}
          wide
        >
          <div className="ce-field">
            <label className="ce-label">Course Description</label>
            <RichEditor
              value={tmpDesc}
              onChange={setTmpDesc}
              placeholder="What will students learn? Include objectives and outcomes..."
              minHeight={220}
            />
          </div>
          <div className="ce-modal-actions">
            <button
              className="ce-btn-cancel"
              onClick={() => setEditDesc(false)}
            >
              Cancel
            </button>
            <button
              className="ce-btn-save"
              onClick={() => {
                save({ description: tmpDesc });
                setEditDesc(false);
              }}
            >
              <i className="bi bi-check-lg" /> Save
            </button>
          </div>
        </EditModal>
      )}

      {editPrice && (
        <EditModal title="Edit Price" onClose={() => setEditPrice(false)}>
          <div className="ce-field">
            <label className="ce-label">Price (₹)</label>
            <input
              className="ce-input"
              type="number"
              min="0"
              autoFocus
              value={tmpPrice}
              onChange={(e) => setTmpPrice(e.target.value)}
              placeholder="e.g. 1999"
            />
          </div>
          <div className="ce-modal-actions">
            <button
              className="ce-btn-cancel"
              onClick={() => setEditPrice(false)}
            >
              Cancel
            </button>
            <button
              className="ce-btn-save"
              onClick={() => {
                save({ price: Number(tmpPrice) });
                setEditPrice(false);
              }}
            >
              <i className="bi bi-check-lg" /> Save
            </button>
          </div>
        </EditModal>
      )}

      {editCat && (
        <EditModal title="Choose Category" onClose={() => setEditCat(false)}>
          <div className="ce-cat-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`ce-cat-item ${tmpCat === cat ? "ce-cat-item--on" : ""}`}
                onClick={() => setTmpCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ce-modal-actions">
            <button className="ce-btn-cancel" onClick={() => setEditCat(false)}>
              Cancel
            </button>
            <button
              className="ce-btn-save"
              onClick={() => {
                save({ category: tmpCat });
                setEditCat(false);
              }}
            >
              <i className="bi bi-check-lg" /> Save
            </button>
          </div>
        </EditModal>
      )}

      {chapterMod !== null && (
        <ChapterEditorModal
          chapter={chapterMod === "new" ? null : chapterMod}
          onSave={saveChapter}
          onClose={() => setChapterMod(null)}
        />
      )}
    </div>
  );
}

export default CourseEditor;
