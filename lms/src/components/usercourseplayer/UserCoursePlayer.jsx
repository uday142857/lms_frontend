import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { coursesData, getGradient, getInitials } from "../../data/Lmsdata";
import "./UserCoursePlayer.css";

// ── helpers ───────────────────────────────────────────────────────────────────
function buildSections(course) {
  if (!course?.chapters?.length) return [];
  const map = new Map();
  course.chapters.forEach((ch) => {
    const sec = ch.section?.trim() || "Course Content";
    if (!map.has(sec)) map.set(sec, []);
    map.get(sec).push(ch);
  });
  let i = 0;
  const out = [];
  map.forEach((chs, title) => {
    out.push({
      id: `s-${i}`,
      title,
      expanded: i === 0,
      lessons: chs.map((ch) => ({
        id: String(ch.id),
        title: ch.title,
        duration: ch.duration || "—",
        completed: false,
        videoUrl: ch.videoUrl || "",
        isFree: ch.isFree ?? false,
      })),
    });
    i++;
  });
  return out;
}

const flat = (secs) => secs.flatMap((s) => s.lessons);
const done = (secs) => flat(secs).filter((l) => l.completed).length;
const fmt = (s) =>
  !s || isNaN(s)
    ? "0:00"
    : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// ── Video Player ──────────────────────────────────────────────────────────────
function VideoPlayer({ lesson, onComplete }) {
  const vidRef = useRef(null);
  const wrapRef = useRef(null);
  const hideRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [full, setFull] = useState(false);
  const [ctrl, setCtrl] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [buf, setBuf] = useState(0);
  const [showSpd, setShowSpd] = useState(false);
  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    setPlaying(false);
    setCur(0);
    setDur(0);
    setCtrl(true);
  }, [lesson.id]);
  useEffect(() => () => clearTimeout(hideRef.current), []);

  const reveal = useCallback(() => {
    setCtrl(true);
    clearTimeout(hideRef.current);
    hideRef.current = setTimeout(() => setCtrl(false), 3000);
  }, []);

  const togglePlay = () => {
    const v = vidRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
      setCtrl(true);
    } else {
      v.play();
      setPlaying(true);
      reveal();
    }
  };
  const seek = (e) => {
    const v = vidRef.current;
    if (!v || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * dur;
  };
  const skip = (s) => {
    const v = vidRef.current;
    if (v) v.currentTime = Math.min(Math.max(0, v.currentTime + s), dur);
  };
  const volChange = (e) => {
    const val = parseFloat(e.target.value);
    setVol(val);
    setMuted(val === 0);
    if (vidRef.current) vidRef.current.volume = val;
  };
  const toggleMute = () => {
    const n = !muted;
    setMuted(n);
    if (vidRef.current) vidRef.current.muted = n;
  };
  const toggleFull = () => {
    if (!document.fullscreenElement) {
      wrapRef.current?.requestFullscreen();
      setFull(true);
    } else {
      document.exitFullscreen();
      setFull(false);
    }
  };
  const applySpeed = (s) => {
    if (vidRef.current) vidRef.current.playbackRate = s;
    setSpeed(s);
    setShowSpd(false);
  };

  const prog = dur ? (cur / dur) * 100 : 0;
  const volIcon =
    muted || vol === 0
      ? "bi-volume-mute-fill"
      : vol < 0.5
        ? "bi-volume-down-fill"
        : "bi-volume-up-fill";

  return (
    <div
      ref={wrapRef}
      className={`vp-wrap${ctrl ? " vp-ctrl" : ""}`}
      onMouseMove={reveal}
      onMouseLeave={() => playing && setCtrl(false)}
      onClick={togglePlay}
    >
      {lesson.videoUrl ? (
        <video
          ref={vidRef}
          className="vp-video"
          src={lesson.videoUrl}
          onTimeUpdate={(e) => setCur(e.target.currentTime)}
          onLoadedMetadata={(e) => setDur(e.target.duration)}
          onProgress={(e) => {
            const v = e.target;
            if (v.buffered.length)
              setBuf(
                (v.buffered.end(v.buffered.length - 1) / v.duration) * 100,
              );
          }}
          onEnded={() => {
            setPlaying(false);
            setCtrl(true);
            onComplete?.();
          }}
        />
      ) : (
        <div className="vp-ph">
          <div className="vp-ph-ring r1" />
          <div className="vp-ph-ring r2" />
          <div className="vp-ph-ring r3" />
          <div className="vp-ph-body">
            <div className="vp-ph-icon">
              <i className="bi bi-play-circle" />
            </div>
            <p className="vp-ph-title">{lesson.title}</p>
            <p className="vp-ph-hint">Video will be available soon</p>
          </div>
        </div>
      )}

      {/* Centre flash */}
      <div className={`vp-flash${!playing ? " vp-flash--on" : ""}`}>
        <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
      </div>

      {/* Controls */}
      <div className="vp-controls" onClick={(e) => e.stopPropagation()}>
        {/* Seek */}
        <div className="vp-seek" onClick={seek}>
          <div className="vp-seek-track">
            <div className="vp-seek-buf" style={{ width: `${buf}%` }} />
            <div className="vp-seek-fill" style={{ width: `${prog}%` }}>
              <div className="vp-seek-dot" />
            </div>
          </div>
        </div>
        {/* Row */}
        <div className="vp-row">
          <div className="vp-row-l">
            <button className="vp-btn" onClick={togglePlay}>
              <i
                className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`}
              />
            </button>
            <button className="vp-btn vp-btn-sm" onClick={() => skip(-10)}>
              <i className="bi bi-skip-backward-fill" />
            </button>
            <button className="vp-btn vp-btn-sm" onClick={() => skip(10)}>
              <i className="bi bi-skip-forward-fill" />
            </button>
            <div className="vp-vol">
              <button className="vp-btn" onClick={toggleMute}>
                <i className={`bi ${volIcon}`} />
              </button>
              <input
                className="vp-vol-range"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : vol}
                onChange={volChange}
              />
            </div>
            <span className="vp-time">
              {fmt(cur)} / {fmt(dur)}
            </span>
          </div>
          <div className="vp-row-r">
            <div className="vp-spd-wrap">
              <button
                className="vp-btn vp-btn-txt"
                onClick={() => setShowSpd((p) => !p)}
              >
                {speed}x
              </button>
              {showSpd && (
                <div className="vp-spd-menu">
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      className={`vp-spd-opt${speed === s ? " vp-spd-opt--on" : ""}`}
                      onClick={() => applySpeed(s)}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="vp-btn" onClick={toggleFull}>
              <i
                className={`bi ${full ? "bi-fullscreen-exit" : "bi-fullscreen"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function UserCoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course =
    coursesData.find((c) => String(c.id) === String(courseId)) || null;

  const [sections, setSections] = useState(() => buildSections(course));
  const [activeLesson, setActiveLesson] = useState(
    () => flat(buildSections(course))[0] || null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false); // closed by default on mobile
  const [activeTab, setActiveTab] = useState("overview");
  const [enrolled, setEnrolled] = useState(false);
  const [noteText, setNoteText] = useState("");

  // On desktop open sidebar by default
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    setSidebarOpen(mq.matches);
    const handler = (e) => setSidebarOpen(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const secs = buildSections(course);
    setSections(secs);
    setActiveLesson(flat(secs)[0] || null);
    setActiveTab("overview");
  }, [courseId]);

  const allLessons = useMemo(() => flat(sections), [sections]);
  const doneCount = useMemo(() => done(sections), [sections]);
  const total = allLessons.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const curIdx = activeLesson
    ? allLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;
  const prevL = curIdx > 0 ? allLessons[curIdx - 1] : null;
  const nextL = curIdx < total - 1 ? allLessons[curIdx + 1] : null;

  const selectLesson = (l) => {
    setActiveLesson(l);
    // On mobile close sidebar after selecting
    if (window.innerWidth < 769) setSidebarOpen(false);
  };

  const markDone = (lessonId) => {
    setSections((prev) =>
      prev.map((s) => ({
        ...s,
        lessons: s.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l,
        ),
      })),
    );
    const idx = allLessons.findIndex((l) => l.id === lessonId);
    if (idx < allLessons.length - 1)
      setTimeout(() => setActiveLesson(allLessons[idx + 1]), 500);
  };

  const toggleSec = (sId) =>
    setSections((prev) =>
      prev.map((s) => (s.id === sId ? { ...s, expanded: !s.expanded } : s)),
    );

  const grad = course ? getGradient(course.category) : "#059669";

  if (!course) {
    return (
      <div className="ucp-root">
        <header className="ucp-nav">
          <button className="ucp-back" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left" />
          </button>
          <div className="ucp-brand">
            <span className="ucp-brand-logo">HT</span>
            <span className="ucp-brand-name">HorizonTrax</span>
          </div>
        </header>
        <div className="ucp-notfound">
          <i className="bi bi-exclamation-circle" />
          <h2>Course not found</h2>
          <p>This course doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ucp-root">
      {/* ══ NAV ══════════════════════════════════════════════ */}
      <header className="ucp-nav">
        <div className="ucp-nav-l">
          <button className="ucp-back" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left" />
          </button>
          <div className="ucp-brand">
            <span className="ucp-brand-logo">HT</span>
            <span className="ucp-brand-name">HorizonTrax LMS</span>
          </div>
          <div className="ucp-nav-sep" />
          <span className="ucp-nav-title">{course.title}</span>
        </div>
        <div className="ucp-nav-r">
          {total > 0 && (
            <div className="ucp-nav-prog">
              <div className="ucp-nav-prog-track">
                <div
                  className="ucp-nav-prog-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="ucp-nav-pct">{pct}% complete</span>
            </div>
          )}
          <button
            className={`ucp-content-btn${sidebarOpen ? " active" : ""}`}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <i className="bi bi-layout-sidebar-reverse" />
            <span className="ucp-content-btn-label"> Course content</span>
          </button>
        </div>
      </header>

      {/* ══ BODY ═════════════════════════════════════════════ */}
      <div className="ucp-body">
        {/* Mobile scrim — tap to close sidebar */}
        {sidebarOpen && (
          <div className="ucp-scrim" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── MAIN COLUMN ── */}
        <div className="ucp-main">
          {/* VIDEO */}
          <div className="ucp-video-area">
            <VideoPlayer
              lesson={
                activeLesson || {
                  id: "e",
                  title: "Select a lesson",
                  videoUrl: "",
                }
              }
              onComplete={() => activeLesson && markDone(activeLesson.id)}
            />
          </div>

          {/* LESSON NAV BAR */}
          {total > 0 && (
            <div className="ucp-lbar">
              <button
                className="ucp-lbar-btn"
                disabled={!prevL}
                onClick={() => prevL && selectLesson(prevL)}
              >
                <i className="bi bi-chevron-left" /> <span>Previous</span>
              </button>
              <div className="ucp-lbar-mid">
                <span className="ucp-lbar-lesson">{activeLesson?.title}</span>
                {activeLesson && (
                  <button
                    className={`ucp-mark-btn${activeLesson.completed ? " done" : ""}`}
                    onClick={() => markDone(activeLesson.id)}
                    disabled={activeLesson.completed}
                  >
                    <i
                      className={`bi ${activeLesson.completed ? "bi-check-circle-fill" : "bi-circle"}`}
                    />
                    <span>
                      {activeLesson.completed ? "Completed" : "Mark complete"}
                    </span>
                  </button>
                )}
              </div>
              <button
                className="ucp-lbar-btn ucp-lbar-next"
                disabled={!nextL}
                onClick={() => nextL && selectLesson(nextL)}
              >
                <span>Next</span> <i className="bi bi-chevron-right" />
              </button>
            </div>
          )}

          {/* TABS */}
          <div className="ucp-tabs">
            {["overview", "notes", "resources", "reviews"].map((t) => (
              <button
                key={t}
                className={`ucp-tab${activeTab === t ? " on" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="ucp-tab-body">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="ucp-ov">
                <div className="ucp-ov-header">
                  <div className="ucp-ov-thumb">
                    {course.thumb ? (
                      <img src={course.thumb} alt={course.title} />
                    ) : (
                      <div
                        className="ucp-ov-thumb-grad"
                        style={{ background: grad }}
                      >
                        <span>{getInitials(course.title)}</span>
                      </div>
                    )}
                  </div>
                  <div className="ucp-ov-info">
                    <span className="ucp-ov-cat">{course.category}</span>
                    <h2 className="ucp-ov-h2">{course.title}</h2>
                    <div className="ucp-ov-meta">
                      {course.teacher && (
                        <span>
                          <i className="bi bi-person-fill" /> {course.teacher}
                        </span>
                      )}
                      {course.rating > 0 && (
                        <span className="star">
                          <i className="bi bi-star-fill" /> {course.rating}
                        </span>
                      )}
                      {course.students > 0 && (
                        <span>
                          <i className="bi bi-people-fill" />{" "}
                          {course.students.toLocaleString("en-IN")} students
                        </span>
                      )}
                      <span>
                        <i className="bi bi-collection-play" /> {total} lessons
                      </span>
                      {course.duration && (
                        <span>
                          <i className="bi bi-clock" /> {course.duration}
                        </span>
                      )}
                    </div>
                    <div className="ucp-ov-footer">
                      <span className="ucp-ov-price">
                        {course.price > 0 ? (
                          `₹${course.price.toLocaleString("en-IN")}`
                        ) : (
                          <span className="free">Free</span>
                        )}
                      </span>
                      <button
                        className={`ucp-enroll${enrolled ? " enrolled" : ""}`}
                        onClick={() => setEnrolled(true)}
                      >
                        <i
                          className={`bi ${enrolled ? "bi-check-circle-fill" : "bi-bookmark-plus"}`}
                        />
                        {enrolled ? "Enrolled" : "Enroll Now"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                {total > 0 && (
                  <div className="ucp-prog-card">
                    <div className="ucp-prog-top">
                      <span>Your Progress</span>
                      <span className="pct">{pct}%</span>
                    </div>
                    <div className="ucp-prog-track">
                      <div
                        className="ucp-prog-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p>
                      {doneCount} of {total} lessons completed
                    </p>
                  </div>
                )}

                {/* Description */}
                {course.description && (
                  <div className="ucp-ov-desc">
                    <h3>About this course</h3>
                    <p>{course.description}</p>
                  </div>
                )}

                {/* What you'll learn */}
                {course.chapters?.length > 0 && (
                  <div className="ucp-learn">
                    <h3>What you'll learn</h3>
                    <div className="ucp-learn-grid">
                      {course.chapters.map((ch) => (
                        <div key={ch.id} className="ucp-learn-item">
                          <i className="bi bi-check2-circle" /> {ch.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* NOTES */}
            {activeTab === "notes" && (
              <div className="ucp-notes">
                <p className="ucp-notes-label">
                  Notes for: <em>{activeLesson?.title}</em>
                </p>
                <textarea
                  className="ucp-notes-ta"
                  rows={8}
                  placeholder="Jot down key takeaways, questions, important concepts..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <div className="ucp-notes-btns">
                  <button
                    className="ucp-notes-save"
                    onClick={() => alert("Notes saved!")}
                  >
                    <i className="bi bi-save" /> Save Notes
                  </button>
                  {noteText && (
                    <button
                      className="ucp-notes-clear"
                      onClick={() => setNoteText("")}
                    >
                      <i className="bi bi-x" /> Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* RESOURCES */}
            {activeTab === "resources" && (
              <div className="ucp-resources">
                <p className="ucp-res-intro">
                  Downloadable materials for this course
                </p>
                {[
                  {
                    icon: "bi-file-earmark-pdf-fill",
                    c: "#ef4444",
                    name: "Course Slides.pdf",
                    size: "2.4 MB",
                  },
                  {
                    icon: "bi-file-earmark-code-fill",
                    c: "#2563eb",
                    name: "Starter Code.zip",
                    size: "1.1 MB",
                  },
                  {
                    icon: "bi-link-45deg",
                    c: "#059669",
                    name: "Further Reading Docs",
                    size: "External",
                  },
                  {
                    icon: "bi-file-earmark-text-fill",
                    c: "#f59e0b",
                    name: "Cheatsheet.pdf",
                    size: "840 KB",
                  },
                ].map((r, i) => (
                  <div key={i} className="ucp-res-row">
                    <i className={`bi ${r.icon}`} style={{ color: r.c }} />
                    <div className="ucp-res-info">
                      <span>{r.name}</span>
                      <span className="sz">{r.size}</span>
                    </div>
                    <button>Download</button>
                  </div>
                ))}
              </div>
            )}

            {/* REVIEWS */}
            {activeTab === "reviews" && (
              <div className="ucp-reviews">
                <div className="ucp-rv-summary">
                  <div className="ucp-rv-big">
                    <span className="score">{course.rating || "—"}</span>
                    <div className="stars-lg">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i
                          key={s}
                          className={`bi ${s <= Math.round(course.rating || 0) ? "bi-star-fill" : "bi-star"}`}
                        />
                      ))}
                    </div>
                    <p>Course Rating</p>
                  </div>
                  <div className="ucp-rv-bars">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <div key={n} className="ucp-rv-bar-row">
                        <span>
                          {n} <i className="bi bi-star-fill" />
                        </span>
                        <div className="ucp-rv-bar-track">
                          <div
                            className="ucp-rv-bar-fill"
                            style={{
                              width:
                                n === 5
                                  ? "72%"
                                  : n === 4
                                    ? "20%"
                                    : n === 3
                                      ? "6%"
                                      : "2%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {[
                  {
                    n: "Priya S.",
                    s: 5,
                    t: "Excellent course! Very well structured with great examples.",
                    ago: "2 weeks ago",
                  },
                  {
                    n: "Arjun M.",
                    s: 4,
                    t: "Really enjoyed the case studies — complex topics made easy.",
                    ago: "1 month ago",
                  },
                  {
                    n: "Neha R.",
                    s: 5,
                    t: "Best course on this topic. The instructor explains clearly.",
                    ago: "3 weeks ago",
                  },
                  {
                    n: "Rohan K.",
                    s: 4,
                    t: "Great content. Would love more exercises but overall very solid.",
                    ago: "2 months ago",
                  },
                ].map((r, i) => (
                  <div key={i} className="ucp-review">
                    <div className="ucp-rv-av">{r.n[0]}</div>
                    <div className="ucp-rv-body">
                      <div className="ucp-rv-top">
                        <span className="name">{r.n}</span>
                        <span className="ago">{r.ago}</span>
                      </div>
                      <div className="ucp-rv-stars">
                        {"★".repeat(r.s)}
                        {"☆".repeat(5 - r.s)}
                      </div>
                      <p>{r.t}</p>
                    </div>
                  </div>
                ))}

                <div className="ucp-write-review">
                  <h4>Write a Review</h4>
                  <div className="star-pick">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i key={s} className="bi bi-star" />
                    ))}
                  </div>
                  <textarea placeholder="Share your experience..." rows={3} />
                  <button>Submit Review</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <aside className={`ucp-sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="ucp-sb-head">
            <div className="ucp-sb-head-row">
              <h3>Course Content</h3>
              <button
                className="ucp-sb-close"
                onClick={() => setSidebarOpen(false)}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <p>
              {doneCount}/{total} lessons completed
            </p>
            {total > 0 && (
              <div className="ucp-sb-track">
                <div className="ucp-sb-fill" style={{ width: `${pct}%` }} />
              </div>
            )}
          </div>
          <div className="ucp-sb-list">
            {total === 0 ? (
              <div className="ucp-sb-empty">
                <i className="bi bi-collection-play" />
                <p>No chapters yet.</p>
              </div>
            ) : (
              sections.map((sec) => (
                <div key={sec.id} className="ucp-sec">
                  <button
                    className="ucp-sec-hdr"
                    onClick={() => toggleSec(sec.id)}
                  >
                    <div className="ucp-sec-l">
                      <i
                        className={`bi ${sec.expanded ? "bi-chevron-down" : "bi-chevron-right"}`}
                      />
                      <span>{sec.title}</span>
                    </div>
                    <span className="ucp-sec-count">
                      {sec.lessons.filter((l) => l.completed).length}/
                      {sec.lessons.length}
                    </span>
                  </button>
                  {sec.expanded && (
                    <div className="ucp-lessons">
                      {sec.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className={[
                            "ucp-lesson",
                            activeLesson?.id === lesson.id ? "active" : "",
                            lesson.completed ? "done" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => selectLesson(lesson)}
                        >
                          <span className="ucp-lesson-ic">
                            {lesson.completed ? (
                              <i className="bi bi-check-circle-fill done-ic" />
                            ) : activeLesson?.id === lesson.id ? (
                              <i className="bi bi-play-circle-fill active-ic" />
                            ) : (
                              <i className="bi bi-play-circle idle-ic" />
                            )}
                          </span>
                          <span className="ucp-lesson-info">
                            <span className="ucp-lesson-title">
                              {lesson.title}
                            </span>
                            <span className="ucp-lesson-meta">
                              {lesson.isFree && (
                                <span className="free-badge">Free</span>
                              )}
                              {lesson.duration}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
