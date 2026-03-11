import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateMocktest.css";

export const adminMockTests = [];

const CATEGORIES = [
  "Programming",
  "Data Structures",
  "Algorithms",
  "Database & SQL",
  "System Design",
  "Aptitude & Reasoning",
  "Web Development",
  "Machine Learning",
  "Operating Systems",
  "Computer Networks",
];

const DURATION_OPTIONS = [
  "15 mins",
  "30 mins",
  "45 mins",
  "1h 0m",
  "1h 15m",
  "1h 30m",
  "1h 45m",
  "2h 0m",
  "2h 30m",
  "3h 0m",
];

const ICON_OPTIONS = [
  { icon: "bi bi-code-slash", label: "Code" },
  { icon: "bi bi-braces", label: "Braces" },
  { icon: "bi bi-database", label: "Database" },
  { icon: "bi bi-diagram-3", label: "System" },
  { icon: "bi bi-calculator", label: "Math" },
  { icon: "bi bi-cpu", label: "Hardware" },
  { icon: "bi bi-globe", label: "Web" },
  { icon: "bi bi-robot", label: "AI/ML" },
  { icon: "bi bi-journal-check", label: "General" },
  { icon: "bi bi-cup-hot", label: "Java/OOP" },
  { icon: "bi bi-lightning-charge", label: "Fast Track" },
  { icon: "bi bi-bar-chart-line", label: "Analytics" },
];

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatDisplayDate(isoStr) {
  if (!isoStr) return "Not set";
  return new Date(isoStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function countCompleted(test) {
  let n = 0;
  if (test.title) n++;
  if (test.desc) n++;
  if (test.category) n++;
  if (test.duration) n++;
  if (test.startDate && test.endDate) n++;
  if (test.questions?.length > 0) n++;
  return n;
}

const STATUS_META = {
  active: { label: "Active", cls: "mts-badge--active" },
  upcoming: { label: "Upcoming", cls: "mts-badge--upcoming" },
  expired: { label: "Expired", cls: "mts-badge--expired" },
  draft: { label: "Draft", cls: "mts-badge--draft" },
};

function Modal({ title, onClose, children }) {
  return (
    <div className="cmt-backdrop" onClick={onClose}>
      <div className="cmt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmt-modal-head">
          <h3>{title}</h3>
          <button className="cmt-modal-x" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="cmt-modal-body">{children}</div>
      </div>
    </div>
  );
}

function QuestionRow({ q, idx, onChange, onDelete }) {
  return (
    <div className="cmt-q-row">
      <div className="cmt-q-num">{idx + 1}</div>
      <div className="cmt-q-fields">
        <input
          className="cmt-q-input"
          placeholder="Question text…"
          value={q.text}
          onChange={(e) => onChange(idx, "text", e.target.value)}
        />
        <div className="cmt-q-options">
          {q.options.map((opt, oi) => (
            <div key={oi} className="cmt-q-opt-row">
              <button
                className={`cmt-q-correct-btn ${q.correct === oi ? "cmt-q-correct-btn--on" : ""}`}
                onClick={() => onChange(idx, "correct", oi)}
              >
                <i
                  className={`bi ${q.correct === oi ? "bi-check-circle-fill" : "bi-circle"}`}
                />
              </button>
              <input
                className="cmt-q-opt-input"
                placeholder={`Option ${oi + 1}`}
                value={opt}
                onChange={(e) => {
                  const opts = [...q.options];
                  opts[oi] = e.target.value;
                  onChange(idx, "options", opts);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="cmt-q-del" onClick={() => onDelete(idx)}>
        <i className="bi bi-trash" />
      </button>
    </div>
  );
}

// ── Tests List Panel ──────────────────────────────────────────────────────────
function TestsListPanel({ tests, onCreateNew }) {
  return (
    <div className="mts-panel">
      {/* Panel header */}
      <div className="mts-panel-hdr">
        <div>
          <h2 className="mts-panel-title">
            <i className="bi bi-journal-check" /> Mock Tests
          </h2>
          <p className="mts-panel-sub">
            {tests.length} test{tests.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <button className="mts-create-btn" onClick={onCreateNew}>
          <i className="bi bi-plus-lg" /> Create New Test
        </button>
      </div>

      {tests.length === 0 ? (
        <div className="mts-empty">
          <div className="mts-empty-icon">
            <i className="bi bi-journal-x" />
          </div>
          <p className="mts-empty-title">No tests yet</p>
          <p className="mts-empty-sub">
            Click "Create New Test" to get started.
          </p>
        </div>
      ) : (
        <div className="mts-grid">
          {tests.map((t, i) => {
            const meta =
              STATUS_META[t.published ? t.status : "draft"] ||
              STATUS_META.draft;
            return (
              <div className="mts-card" key={t.id || i}>
                <div className="mts-card-top">
                  <div className="mts-card-icon">
                    <i className={t.icon || "bi bi-journal-check"} />
                  </div>
                  <span className={`mts-badge ${meta.cls}`}>{meta.label}</span>
                </div>
                <h4 className="mts-card-title">{t.title}</h4>
                <p className="mts-card-desc">{t.desc || "No description."}</p>
                <div className="mts-card-meta">
                  <span>
                    <i className="bi bi-book" /> {t.questions} Qs
                  </span>
                  <span>
                    <i className="bi bi-clock" /> {t.duration || "—"}
                  </span>
                  <span>
                    <i className="bi bi-tag" /> {t.category || "—"}
                  </span>
                </div>
                <div className="mts-card-dates">
                  <i className="bi bi-calendar3" />
                  {formatDisplayDate(t.startDate)} →{" "}
                  {formatDisplayDate(t.endDate)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
function CreateMocktest() {
  const navigate = useNavigate();

  // "list" | "name" | "edit"
  const [view, setView] = useState("list");
  const [publishedTests, setPublishedTests] = useState([...adminMockTests]);

  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  const [test, setTest] = useState({
    id: null,
    title: "",
    desc: "",
    icon: "bi bi-journal-check",
    category: "",
    duration: "",
    startDate: "",
    endDate: "",
    questions: [],
    status: "upcoming",
    published: false,
  });

  const [editDesc, setEditDesc] = useState(false);
  const [editIcon, setEditIcon] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editDuration, setEditDuration] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [editQuestions, setEditQuestions] = useState(false);
  const [showPublish, setShowPublish] = useState(false);

  const [tmpDesc, setTmpDesc] = useState("");
  const [tmpIcon, setTmpIcon] = useState("bi bi-journal-check");
  const [tmpCategory, setTmpCategory] = useState("");
  const [tmpDuration, setTmpDuration] = useState("");
  const [tmpStart, setTmpStart] = useState("");
  const [tmpEnd, setTmpEnd] = useState("");
  const [tmpQuestions, setTmpQuestions] = useState([]);

  const save = (patch) => setTest((prev) => ({ ...prev, ...patch }));
  const completed = countCompleted(test);
  const total = 6;
  const blankQ = () => ({ text: "", options: ["", "", "", ""], correct: 0 });

  const handleNameSubmit = () => {
    if (!nameInput.trim()) {
      setNameError("Test title is required.");
      return;
    }
    const id = crypto.randomUUID();
    setTest((p) => ({ ...p, id, title: nameInput.trim() }));
    setView("edit");
  };

  const handlePublish = () => {
    if (completed < total) {
      setShowPublish(false);
      alert("Please complete all fields before publishing.");
      return;
    }
    const now = new Date(),
      start = new Date(test.startDate),
      end = new Date(test.endDate);
    let status = "upcoming";
    if (now >= start && now <= end) status = "active";
    if (now > end) status = "expired";
    const published = {
      ...test,
      status,
      published: true,
      questions: test.questions.length,
    };
    adminMockTests.push(published);
    setPublishedTests([...adminMockTests]);
    setTest((p) => ({ ...p, published: true, status }));
    setShowPublish(false);
    // After publishing, go back to list after short delay
    setTimeout(() => setView("list"), 800);
  };

  // ── VIEW: LIST ──────────────────────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="cmt-wrapper">
        <TestsListPanel
          tests={publishedTests}
          onCreateNew={() => {
            setNameInput("");
            setNameError("");
            setTest({
              id: null,
              title: "",
              desc: "",
              icon: "bi bi-journal-check",
              category: "",
              duration: "",
              startDate: "",
              endDate: "",
              questions: [],
              status: "upcoming",
              published: false,
            });
            setView("name");
          }}
        />
      </div>
    );
  }

  // ── VIEW: NAME ──────────────────────────────────────────────────────────────
  if (view === "name") {
    return (
      <div className="cmt-wrapper">
        {/* Back to tests list */}
        <button className="cmt-back-btn" onClick={() => setView("list")}>
          <i className="bi bi-arrow-left" /> Back to Mock Tests
        </button>

        <div className="cmt-name-card">
          <div className="cmt-name-head">
            <div className="cmt-name-icon-wrap">
              <i className="bi bi-journal-plus" />
            </div>
            <h1 className="cmt-name-title">Create a Mock Test</h1>
            <p className="cmt-name-sub">
              What would you like to name this test? You can change everything
              later.
            </p>
          </div>
          <div className="cmt-name-form">
            <label className="cmt-label">Test Title</label>
            <input
              className={`cmt-input ${nameError ? "cmt-input--err" : ""}`}
              placeholder="e.g. 'Java OOPS Professional'"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                setNameError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
              autoFocus
            />
            {nameError ? (
              <span className="cmt-err">{nameError}</span>
            ) : (
              <span className="cmt-hint">
                Students will see this name in their dashboard.
              </span>
            )}
          </div>
          <div className="cmt-name-actions">
            <button className="cmt-cancel-btn" onClick={() => setView("list")}>
              Cancel
            </button>
            <button className="cmt-submit-btn" onClick={handleNameSubmit}>
              Continue <i className="bi bi-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── VIEW: EDIT ──────────────────────────────────────────────────────────────
  return (
    <div className="cmt-wrapper">
      <button className="cmt-back-btn" onClick={() => setView("list")}>
        <i className="bi bi-arrow-left" /> Back to Mock Tests
      </button>

      {!test.published ? (
        <div className="cmt-banner">
          <i className="bi bi-exclamation-triangle-fill" />
          This test is not published. Students will not see it until you
          publish.
        </div>
      ) : (
        <div className="cmt-banner cmt-banner--ok">
          <i className="bi bi-check-circle-fill" />
          Published! Returning to test list…
        </div>
      )}

      <div className="cmt-page-header">
        <div>
          <h1 className="cmt-page-title">Mock Test Builder</h1>
          <p className="cmt-page-sub">
            Complete all fields ({completed}/{total})
            <span className="cmt-prog-bar">
              <span
                className="cmt-prog-fill"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </span>
          </p>
        </div>
        <div className="cmt-header-btns">
          {!test.published && (
            <button
              className="cmt-publish-btn"
              onClick={() => setShowPublish(true)}
            >
              <i className="bi bi-send-check" /> Publish Test
            </button>
          )}
          <button
            className="cmt-delete-btn"
            onClick={() => {
              if (window.confirm("Discard this test?")) setView("list");
            }}
          >
            <i className="bi bi-trash-fill" />
          </button>
        </div>
      </div>

      <div className="cmt-columns">
        {/* LEFT */}
        <div className="cmt-col">
          <div className="cmt-section-lbl">
            <i className="bi bi-grid-fill" /> Test Details
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">
                Test Title <span className="cmt-req">*</span>
              </span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  const t = prompt("Edit title:", test.title);
                  if (t?.trim()) save({ title: t.trim() });
                }}
              >
                <i className="bi bi-pencil" /> Edit
              </button>
            </div>
            <p className="cmt-block-val">{test.title}</p>
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">
                Description <span className="cmt-req">*</span>
              </span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  setTmpDesc(test.desc);
                  setEditDesc(true);
                }}
              >
                <i className="bi bi-pencil" /> Edit Text
              </button>
            </div>
            <p className="cmt-block-val">
              {test.desc || <em className="cmt-empty">No description</em>}
            </p>
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">Test Icon</span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  setTmpIcon(test.icon);
                  setEditIcon(true);
                }}
              >
                <i className="bi bi-palette" /> Change
              </button>
            </div>
            <div className="cmt-icon-preview">
              <i className={`${test.icon} cmt-icon-big`} />
              <span className="cmt-icon-name">
                {ICON_OPTIONS.find((o) => o.icon === test.icon)?.label}
              </span>
            </div>
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">
                Category <span className="cmt-req">*</span>
              </span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  setTmpCategory(test.category);
                  setEditCategory(true);
                }}
              >
                <i className="bi bi-tag" /> Change
              </button>
            </div>
            <p className="cmt-block-val">
              {test.category || (
                <em className="cmt-empty">No category selected</em>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="cmt-col">
          <div className="cmt-section-lbl">
            <i className="bi bi-clock" /> Schedule & Duration
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">
                Duration <span className="cmt-req">*</span>
              </span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  setTmpDuration(test.duration);
                  setEditDuration(true);
                }}
              >
                <i className="bi bi-pencil" /> Set
              </button>
            </div>
            <p className="cmt-block-val">
              {test.duration || <em className="cmt-empty">Not set</em>}
            </p>
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">
                Start & End Date <span className="cmt-req">*</span>
              </span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  setTmpStart(test.startDate || todayPlus(0));
                  setTmpEnd(test.endDate || todayPlus(30));
                  setEditDates(true);
                }}
              >
                <i className="bi bi-calendar3" /> Set
              </button>
            </div>
            <div className="cmt-date-row">
              <div className="cmt-date-item">
                <span className="cmt-date-lbl">Start</span>
                <span className="cmt-date-val">
                  {formatDisplayDate(test.startDate)}
                </span>
              </div>
              <i className="bi bi-arrow-right cmt-date-arrow" />
              <div className="cmt-date-item">
                <span className="cmt-date-lbl">End</span>
                <span className="cmt-date-val">
                  {formatDisplayDate(test.endDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="cmt-section-lbl">
            <i className="bi bi-question-circle" /> Questions
          </div>

          <div className="cmt-block">
            <div className="cmt-block-hdr">
              <span className="cmt-block-ttl">
                Questions ({test.questions.length}){" "}
                <span className="cmt-req">*</span>
              </span>
              <button
                className="cmt-edit-btn"
                onClick={() => {
                  setTmpQuestions(
                    test.questions.map((q) => ({
                      ...q,
                      options: [...q.options],
                    })),
                  );
                  setEditQuestions(true);
                }}
              >
                <i className="bi bi-plus-lg" /> Manage
              </button>
            </div>
            {test.questions.length === 0 ? (
              <div className="cmt-q-empty">
                <i className="bi bi-question-square" />
                <p>No questions added yet</p>
              </div>
            ) : (
              <ul className="cmt-q-list">
                {test.questions.slice(0, 4).map((q, i) => (
                  <li key={i} className="cmt-q-list-item">
                    <span className="cmt-q-list-num">{i + 1}</span>
                    <span className="cmt-q-list-text">
                      {q.text || <em>Untitled question</em>}
                    </span>
                  </li>
                ))}
                {test.questions.length > 4 && (
                  <li className="cmt-q-more">
                    +{test.questions.length - 4} more questions
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="cmt-section-lbl">
            <i className="bi bi-eye" /> Student Preview
          </div>
          <div className="cmt-preview-card">
            <div
              className={`cmt-preview-banner ${test.published ? "cmt-prev-active" : "cmt-prev-upcoming"}`}
            >
              {test.published ? "Active" : "Upcoming"}
            </div>
            <div className="cmt-preview-body">
              <div className="cmt-preview-title-row">
                <div>
                  <h4 className="cmt-preview-title">
                    {test.title || "Test Title"}
                  </h4>
                  <p className="cmt-preview-desc">
                    {test.desc || "No description yet."}
                  </p>
                </div>
                <i className={`${test.icon} cmt-preview-icon`} />
              </div>
              <div className="cmt-preview-meta">
                <span>
                  <i className="bi bi-book" /> {test.questions.length} questions
                </span>
                <span>
                  <i className="bi bi-clock" /> {test.duration || "—"}
                </span>
                <span>
                  <i className="bi bi-calendar3" />{" "}
                  {test.startDate ? formatDisplayDate(test.startDate) : "—"}
                </span>
              </div>
              <div className="cmt-preview-btn-mock">Start Test →</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {editDesc && (
        <Modal title="Edit Description" onClose={() => setEditDesc(false)}>
          <label className="cmt-label">Description</label>
          <textarea
            className="cmt-modal-textarea"
            rows={4}
            value={tmpDesc}
            onChange={(e) => setTmpDesc(e.target.value)}
            placeholder="What will students be tested on?"
            autoFocus
          />
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setEditDesc(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={() => {
                save({ desc: tmpDesc });
                setEditDesc(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {editIcon && (
        <Modal title="Choose Icon" onClose={() => setEditIcon(false)}>
          <div className="cmt-icon-grid">
            {ICON_OPTIONS.map((o) => (
              <button
                key={o.icon}
                className={`cmt-icon-btn ${tmpIcon === o.icon ? "cmt-icon-btn--on" : ""}`}
                onClick={() => setTmpIcon(o.icon)}
              >
                <i className={o.icon} />
                <span>{o.label}</span>
              </button>
            ))}
          </div>
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setEditIcon(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={() => {
                save({ icon: tmpIcon });
                setEditIcon(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {editCategory && (
        <Modal title="Choose Category" onClose={() => setEditCategory(false)}>
          <div className="cmt-cat-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cmt-cat-btn ${tmpCategory === cat ? "cmt-cat-btn--on" : ""}`}
                onClick={() => setTmpCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setEditCategory(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={() => {
                save({ category: tmpCategory });
                setEditCategory(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {editDuration && (
        <Modal title="Set Duration" onClose={() => setEditDuration(false)}>
          <div className="cmt-dur-grid">
            {DURATION_OPTIONS.map((d) => (
              <button
                key={d}
                className={`cmt-dur-btn ${tmpDuration === d ? "cmt-dur-btn--on" : ""}`}
                onClick={() => setTmpDuration(d)}
              >
                <i className="bi bi-clock" /> {d}
              </button>
            ))}
          </div>
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setEditDuration(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={() => {
                save({ duration: tmpDuration });
                setEditDuration(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {editDates && (
        <Modal
          title="Set Start & End Dates"
          onClose={() => setEditDates(false)}
        >
          <label className="cmt-label">Start Date</label>
          <input
            type="date"
            className="cmt-modal-input"
            value={tmpStart}
            onChange={(e) => setTmpStart(e.target.value)}
          />
          <label className="cmt-label" style={{ marginTop: 14 }}>
            End Date
          </label>
          <input
            type="date"
            className="cmt-modal-input"
            value={tmpEnd}
            onChange={(e) => setTmpEnd(e.target.value)}
          />
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setEditDates(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={() => {
                if (tmpEnd < tmpStart) {
                  alert("End date must be after start date.");
                  return;
                }
                save({ startDate: tmpStart, endDate: tmpEnd });
                setEditDates(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {editQuestions && (
        <Modal
          title={`Questions (${tmpQuestions.length})`}
          onClose={() => setEditQuestions(false)}
        >
          <div className="cmt-q-scroll">
            {tmpQuestions.length === 0 && (
              <p className="cmt-q-none">No questions yet. Add one below.</p>
            )}
            {tmpQuestions.map((q, i) => (
              <QuestionRow
                key={i}
                q={q}
                idx={i}
                onChange={(idx, field, val) => {
                  const copy = tmpQuestions.map((qq, ii) =>
                    ii === idx ? { ...qq, [field]: val } : qq,
                  );
                  setTmpQuestions(copy);
                }}
                onDelete={(idx) =>
                  setTmpQuestions((p) => p.filter((_, ii) => ii !== idx))
                }
              />
            ))}
          </div>
          <button
            className="cmt-add-q-btn"
            onClick={() => setTmpQuestions((p) => [...p, blankQ()])}
          >
            <i className="bi bi-plus-lg" /> Add Question
          </button>
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setEditQuestions(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={() => {
                save({ questions: tmpQuestions });
                setEditQuestions(false);
              }}
            >
              Save ({tmpQuestions.length} questions)
            </button>
          </div>
        </Modal>
      )}

      {showPublish && (
        <Modal title="Publish Mock Test" onClose={() => setShowPublish(false)}>
          <div className="cmt-pub-body">
            <div className="cmt-pub-icon">
              <i className="bi bi-send-check-fill" />
            </div>
            <h3 className="cmt-pub-title">Ready to publish?</h3>
            <p className="cmt-pub-desc">
              Once published, <strong>"{test.title}"</strong> will be visible to
              all students.
            </p>
            <div className="cmt-pub-checklist">
              {[
                ["Test Title", !!test.title],
                ["Description", !!test.desc],
                ["Category", !!test.category],
                ["Duration", !!test.duration],
                ["Start & End Dates", !!(test.startDate && test.endDate)],
                ["Questions Added", test.questions.length > 0],
              ].map(([label, done]) => (
                <div
                  key={label}
                  className={`cmt-pub-check ${done ? "cmt-pub-check--ok" : ""}`}
                >
                  <i
                    className={`bi ${done ? "bi-check-circle-fill" : "bi-circle"}`}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="cmt-modal-actions">
            <button
              className="cmt-modal-cancel"
              onClick={() => setShowPublish(false)}
            >
              Cancel
            </button>
            <button
              className="cmt-modal-save"
              onClick={handlePublish}
              disabled={completed < total}
              style={{ opacity: completed < total ? 0.5 : 1 }}
            >
              <i className="bi bi-send-check" /> Publish
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CreateMocktest;
