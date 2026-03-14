import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { coursesData, getGradient, getInitials } from "../../data/Lmsdata";
import "./CoursePlayer.css";

// ── Build lesson sections from chapters ───────────────────────────────────────
// Groups chapters by their `section` field (set in CourseEditor).
// Chapters without a section all go into "Course Content".
function buildSectionsFromCourse(course) {
  if (!course) return [];
  const chapters = course.chapters || [];
  if (chapters.length === 0) return [];

  const sectionMap = new Map(); // preserves insertion order

  chapters.forEach((ch) => {
    const secName =
      ch.section && ch.section.trim() ? ch.section.trim() : "Course Content";
    if (!sectionMap.has(secName)) sectionMap.set(secName, []);
    sectionMap.get(secName).push(ch);
  });

  let sIdx = 0;
  const sections = [];
  sectionMap.forEach((chs, secName) => {
    sections.push({
      id: `s-${sIdx}`,
      title: secName,
      expanded: sIdx === 0,
      lessons: chs.map((ch) => ({
        id: String(ch.id),
        title: ch.title,
        duration: ch.duration || "—",
        type: "video",
        completed: false,
        videoUrl: ch.videoUrl || "",
        isFree: ch.isFree ?? false,
      })),
    });
    sIdx++;
  });
  return sections;
}

const flatLessons = (secs) => secs.flatMap((s) => s.lessons);
const countDone = (secs) => flatLessons(secs).filter((l) => l.completed).length;
const fmtTime = (s) => {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO PLAYER
// ─────────────────────────────────────────────────────────────────────────────
function VideoPlayer({ lesson, onComplete }) {
  const vidRef = useRef(null);
  const wrapRef = useRef(null);
  const hideRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [full, setFull] = useState(false);
  const [showCtrl, setShowCtrl] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [bufPct, setBufPct] = useState(0);
  const [showSpd, setShowSpd] = useState(false);

  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setDur(0);
    setShowCtrl(true);
  }, [lesson.id]);

  const reveal = useCallback(() => {
    setShowCtrl(true);
    clearTimeout(hideRef.current);
    hideRef.current = setTimeout(() => setShowCtrl(false), 3000);
  }, []);
  useEffect(() => () => clearTimeout(hideRef.current), []);

  const togglePlay = () => {
    const v = vidRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
      setShowCtrl(true);
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
  const onVolChange = (e) => {
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

  const prog = dur ? (current / dur) * 100 : 0;
  const volIcon =
    muted || vol === 0
      ? "bi-volume-mute-fill"
      : vol < 0.5
        ? "bi-volume-down-fill"
        : "bi-volume-up-fill";

  return (
    <div
      ref={wrapRef}
      className={`vp-wrap ${showCtrl ? "vp-ctrl-visible" : ""}`}
      onMouseMove={reveal}
      onMouseLeave={() => {
        if (playing) setShowCtrl(false);
      }}
      onClick={togglePlay}
    >
      {lesson.videoUrl ? (
        <video
          ref={vidRef}
          className="vp-video"
          src={lesson.videoUrl}
          onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
          onLoadedMetadata={(e) => setDur(e.target.duration)}
          onProgress={(e) => {
            const v = e.target;
            if (v.buffered.length)
              setBufPct(
                (v.buffered.end(v.buffered.length - 1) / v.duration) * 100,
              );
          }}
          onEnded={() => {
            setPlaying(false);
            setShowCtrl(true);
            onComplete?.();
          }}
        />
      ) : (
        <div className="vp-placeholder">
          <div className="vp-ph-ring vp-ph-ring--1" />
          <div className="vp-ph-ring vp-ph-ring--2" />
          <div className="vp-ph-ring vp-ph-ring--3" />
          <div className="vp-ph-body">
            <div className="vp-ph-icon">
              <i className="bi bi-play-circle" />
            </div>
            <p className="vp-ph-title">{lesson.title}</p>
            <p className="vp-ph-hint">
              Add a video URL in the Course Editor to enable playback
            </p>
          </div>
        </div>
      )}

      <div className={`vp-flash ${!playing ? "vp-flash--show" : ""}`}>
        <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
      </div>

      <div className="vp-controls" onClick={(e) => e.stopPropagation()}>
        <div className="vp-seekbar" onClick={seek}>
          <div className="vp-seek-track">
            <div className="vp-seek-buf" style={{ width: `${bufPct}%` }} />
            <div className="vp-seek-fill" style={{ width: `${prog}%` }}>
              <div className="vp-seek-dot" />
            </div>
          </div>
        </div>
        <div className="vp-row">
          <div className="vp-row-l">
            <button className="vp-icn" onClick={togglePlay}>
              <i
                className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`}
              />
            </button>
            <button className="vp-icn vp-icn--sm" onClick={() => skip(-10)}>
              <i className="bi bi-skip-backward-fill" />
            </button>
            <button className="vp-icn vp-icn--sm" onClick={() => skip(10)}>
              <i className="bi bi-skip-forward-fill" />
            </button>
            <div className="vp-vol-wrap">
              <button className="vp-icn" onClick={toggleMute}>
                <i className={`bi ${volIcon}`} />
              </button>
              <input
                className="vp-vol-range"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : vol}
                onChange={onVolChange}
              />
            </div>
            <span className="vp-timer">
              {fmtTime(current)} / {fmtTime(dur)}
            </span>
          </div>
          <div className="vp-row-r">
            <div className="vp-spd-wrap">
              <button
                className="vp-icn vp-icn--txt"
                onClick={() => setShowSpd((p) => !p)}
              >
                {speed}x
              </button>
              {showSpd && (
                <div className="vp-spd-menu">
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      className={`vp-spd-opt ${speed === s ? "vp-spd-opt--on" : ""}`}
                      onClick={() => applySpeed(s)}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="vp-icn" onClick={toggleFull}>
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

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY COURSE STATE
// ─────────────────────────────────────────────────────────────────────────────
function EmptyCoursePage({ course, navigate }) {
  const grad = getGradient(course.category);
  return (
    <div className="cp-empty-page">
      <div className="cp-empty-thumb" style={{ background: grad }}>
        <span className="cp-empty-initials">{getInitials(course.title)}</span>
      </div>
      <h2 className="cp-empty-title">{course.title}</h2>
      <p className="cp-empty-sub">This course has no chapters yet.</p>
      <button
        className="cp-empty-btn"
        onClick={() => navigate(`/admin-dashboard/courses/${course.id}`)}
      >
        <i className="bi bi-plus-lg" /> Add Chapters in Course Editor
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course =
    coursesData.find((c) => String(c.id) === String(courseId)) || null;

  const [sections, setSections] = useState(() =>
    course ? buildSectionsFromCourse(course) : [],
  );
  const [activeLesson, setActiveLesson] = useState(() => {
    const secs = course ? buildSectionsFromCourse(course) : [];
    return flatLessons(secs)[0] || null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const notesQuillRef = useRef(null);

  // Re-init on courseId change
  useEffect(() => {
    const c =
      coursesData.find((c) => String(c.id) === String(courseId)) || null;
    const secs = c ? buildSectionsFromCourse(c) : [];
    setSections(secs);
    setActiveLesson(flatLessons(secs)[0] || null);
    setActiveTab("overview");
    notesQuillRef.current = null;
  }, [courseId]);

  // Notes Quill init
  useEffect(() => {
    if (activeTab !== "notes" || total === 0) return;
    const tryInit = () => {
      if (typeof window.Quill === "undefined") {
        setTimeout(tryInit, 80);
        return;
      }
      const el = document.getElementById("cp-notes-editor");
      if (!el || notesQuillRef.current) return;
      notesQuillRef.current = new window.Quill(el, {
        theme: "snow",
        placeholder: "Jot down your notes, key takeaways, questions...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "link"],
            ["clean"],
          ],
        },
      });
    };
    setTimeout(tryInit, 50);
    return () => {
      notesQuillRef.current = null;
    };
  }, [activeTab]); // eslint-disable-line

  const allLessons = useMemo(() => flatLessons(sections), [sections]);
  const done = useMemo(() => countDone(sections), [sections]);
  const total = allLessons.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const curIdx = activeLesson
    ? allLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;
  const prevL = curIdx > 0 ? allLessons[curIdx - 1] : null;
  const nextL = curIdx < total - 1 ? allLessons[curIdx + 1] : null;

  const selectLesson = (l) => {
    if (l.type === "video") setActiveLesson(l);
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
  };
  const toggleSec = (sId) =>
    setSections((prev) =>
      prev.map((s) => (s.id === sId ? { ...s, expanded: !s.expanded } : s)),
    );

  const hasThumb = !!course?.thumb;
  const courseGrad = course ? getGradient(course.category) : "#2563eb";

  // Course not found
  if (!course) {
    return (
      <div className="cp-root">
        <header className="cp-nav">
          <div className="cp-nav-l">
            <button className="cp-back" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left" />
            </button>
            <div className="cp-brand">
              <span className="cp-brand-logo">HT</span>
              <span className="cp-brand-text">
                HorizonTrax <b>LMS</b>
              </span>
            </div>
          </div>
        </header>
        <div className="cp-empty-page">
          <i
            className="bi bi-exclamation-circle"
            style={{
              fontSize: 48,
              color: "#bfdbfe",
              display: "block",
              marginBottom: 16,
            }}
          />
          <h2 className="cp-empty-title">Course not found</h2>
          <p className="cp-empty-sub">
            This course doesn't exist or was removed.
          </p>
          <button className="cp-empty-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-root">
      {/* ── NAV ── */}
      <header className="cp-nav">
        <div className="cp-nav-l">
          <button className="cp-back" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left" />
          </button>
          <div className="cp-brand">
            <span className="cp-brand-logo">HT</span>
            <span className="cp-brand-text">
              HorizonTrax <b>LMS</b>
            </span>
          </div>
          <div className="cp-nav-divider" />
          <span className="cp-nav-coursetitle">{course.title}</span>
        </div>
        <div className="cp-nav-r">
          {total > 0 && (
            <div className="cp-nav-progress">
              <div className="cp-nav-prog-track">
                <div
                  className="cp-nav-prog-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="cp-nav-pct">{pct}% complete</span>
            </div>
          )}
          <button
            className={`cp-content-toggle ${sidebarOpen ? "active" : ""}`}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <i className="bi bi-layout-sidebar-reverse" /> Course content
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className={`cp-body ${sidebarOpen ? "with-sidebar" : ""}`}>
        {/* Main column */}
        <div className="cp-main">
          {total === 0 ? (
            <EmptyCoursePage course={course} navigate={navigate} />
          ) : (
            <>
              {/* Video */}
              <div className="cp-player-box">
                {activeLesson ? (
                  <VideoPlayer
                    lesson={activeLesson}
                    onComplete={() => markDone(activeLesson.id)}
                  />
                ) : (
                  <div className="vp-wrap">
                    <div className="vp-placeholder">
                      <div className="vp-ph-body">
                        <div className="vp-ph-icon">
                          <i className="bi bi-play-circle" />
                        </div>
                        <p className="vp-ph-title">Select a lesson to begin</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson nav */}
              <div className="cp-lbar">
                <button
                  className="cp-lbar-btn"
                  disabled={!prevL}
                  onClick={() => prevL && selectLesson(prevL)}
                >
                  <i className="bi bi-chevron-left" /> Previous
                </button>
                <div className="cp-lbar-center">
                  <span className="cp-lbar-name">{activeLesson?.title}</span>
                  {activeLesson && (
                    <button
                      className={`cp-mark-btn ${activeLesson.completed ? "cp-mark-btn--done" : ""}`}
                      onClick={() => markDone(activeLesson.id)}
                    >
                      {activeLesson.completed ? (
                        <>
                          <i className="bi bi-check-circle-fill" /> Completed
                        </>
                      ) : (
                        <>
                          <i className="bi bi-circle" /> Mark complete
                        </>
                      )}
                    </button>
                  )}
                </div>
                <button
                  className="cp-lbar-btn cp-lbar-btn--next"
                  disabled={!nextL}
                  onClick={() => nextL && selectLesson(nextL)}
                >
                  Next <i className="bi bi-chevron-right" />
                </button>
              </div>

              {/* Tabs */}
              <div className="cp-tabs">
                {["overview", "notes", "resources", "reviews"].map((t) => (
                  <button
                    key={t}
                    className={`cp-tab ${activeTab === t ? "cp-tab--on" : ""}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <div className="cp-tab-body">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="cp-ov">
                    <div className="cp-ov-header">
                      <div className="cp-ov-thumb-wrap">
                        {hasThumb ? (
                          <img
                            src={course.thumb}
                            alt={course.title}
                            className="cp-ov-thumb-img"
                          />
                        ) : (
                          <div
                            className="cp-ov-thumb-grad"
                            style={{ background: courseGrad }}
                          >
                            <span className="cp-ov-thumb-initials">
                              {getInitials(course.title)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="cp-ov-header-info">
                        <h2 className="cp-ov-h">{course.title}</h2>
                        <div className="cp-ov-meta">
                          {course.teacher && (
                            <span>
                              <i className="bi bi-person-fill" />{" "}
                              {course.teacher}
                            </span>
                          )}
                          {course.rating > 0 && (
                            <span>
                              <i className="bi bi-star-fill cp-star" />{" "}
                              {course.rating}
                            </span>
                          )}
                          {course.students > 0 && (
                            <span>
                              <i className="bi bi-people-fill" />{" "}
                              {course.students.toLocaleString("en-IN")} students
                            </span>
                          )}
                          <span>
                            <i className="bi bi-collection-play" /> {total}{" "}
                            lessons
                          </span>
                          {course.category && (
                            <span>
                              <i className="bi bi-tag-fill" /> {course.category}
                            </span>
                          )}
                          {course.duration && (
                            <span>
                              <i className="bi bi-clock" /> {course.duration}
                            </span>
                          )}
                        </div>
                        {course.price > 0 && (
                          <div className="cp-ov-price">
                            ₹{course.price.toLocaleString("en-IN")}
                          </div>
                        )}
                      </div>
                    </div>

                    {course.description && (
                      <div
                        className="cp-ov-desc"
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />
                    )}

                    {(course.chapters || []).length > 0 && (
                      <>
                        <h3 className="cp-ov-sub">What you'll learn</h3>
                        <div className="cp-learn-grid">
                          {course.chapters.map((ch) => (
                            <div key={ch.id} className="cp-learn-item">
                              <i className="bi bi-check2-circle" /> {ch.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Notes */}
                {activeTab === "notes" && (
                  <div className="cp-notes">
                    <p className="cp-notes-label">
                      Notes for: <em>{activeLesson?.title}</em>
                    </p>
                    <div className="cp-notes-rich-wrap">
                      <div id="cp-notes-editor" className="cp-notes-quill" />
                    </div>
                    <button className="cp-notes-save">
                      <i className="bi bi-save" /> Save Notes
                    </button>
                  </div>
                )}

                {/* Resources */}
                {activeTab === "resources" && (
                  <div className="cp-resources">
                    {[
                      {
                        icon: "bi-file-earmark-pdf-fill",
                        c: "#ef4444",
                        name: "Course Slides.pdf",
                        btn: "Download",
                      },
                      {
                        icon: "bi-file-earmark-code-fill",
                        c: "#2563eb",
                        name: "Starter Code.zip",
                        btn: "Download",
                      },
                      {
                        icon: "bi-link-45deg",
                        c: "#059669",
                        name: "Further Reading Docs",
                        btn: "Open",
                      },
                    ].map((r, i) => (
                      <div key={i} className="cp-res-row">
                        <i className={`bi ${r.icon}`} style={{ color: r.c }} />
                        <span className="cp-res-name">{r.name}</span>
                        <button className="cp-res-btn">{r.btn}</button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews */}
                {activeTab === "reviews" && (
                  <div className="cp-reviews">
                    {course.students > 0 ? (
                      [
                        {
                          n: "Priya S.",
                          s: 5,
                          t: "Excellent course! Very well structured with great examples.",
                        },
                        {
                          n: "Arjun M.",
                          s: 4,
                          t: "Really enjoyed the case studies — complex topics made easy.",
                        },
                        {
                          n: "Neha R.",
                          s: 5,
                          t: "Best course on this topic. The instructor explains clearly.",
                        },
                      ].map((r, i) => (
                        <div key={i} className="cp-review">
                          <div className="cp-rv-av">{r.n[0]}</div>
                          <div className="cp-rv-body">
                            <div className="cp-rv-name">{r.n}</div>
                            <div className="cp-rv-stars">
                              {"★".repeat(r.s)}
                              {"☆".repeat(5 - r.s)}
                            </div>
                            <p className="cp-rv-text">{r.t}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="cp-empty-reviews">
                        <i className="bi bi-chat-square-text" />
                        <p>No reviews yet — be the first to review!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="cp-sidebar">
            <div className="cp-sb-head">
              <h3 className="cp-sb-h">Course Content</h3>
              <p className="cp-sb-sub">
                {done}/{total} lessons completed
              </p>
              {total > 0 && (
                <div className="cp-sb-prog-track">
                  <div
                    className="cp-sb-prog-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </div>

            <div className="cp-sb-list">
              {total === 0 ? (
                <div className="cp-sb-empty">
                  <i className="bi bi-collection-play" />
                  <p>No chapters added yet.</p>
                  <button
                    onClick={() =>
                      navigate(`/admin-dashboard/courses/${course.id}`)
                    }
                  >
                    <i className="bi bi-pencil" /> Edit Course
                  </button>
                </div>
              ) : (
                sections.map((sec) => (
                  <div key={sec.id} className="cp-section">
                    <button
                      className="cp-sec-hdr"
                      onClick={() => toggleSec(sec.id)}
                    >
                      <div className="cp-sec-hdr-l">
                        <i
                          className={`bi ${sec.expanded ? "bi-chevron-down" : "bi-chevron-right"} cp-sec-arrow`}
                        />
                        <span className="cp-sec-title">{sec.title}</span>
                      </div>
                      <span className="cp-sec-count">
                        {sec.lessons.filter((l) => l.completed).length}/
                        {sec.lessons.length}
                      </span>
                    </button>

                    {sec.expanded && (
                      <div className="cp-lessons">
                        {sec.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            className={[
                              "cp-lesson",
                              activeLesson?.id === lesson.id
                                ? "cp-lesson--active"
                                : "",
                              lesson.completed ? "cp-lesson--done" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => selectLesson(lesson)}
                          >
                            <span className="cp-lesson-ic">
                              {lesson.completed ? (
                                <i className="bi bi-check-circle-fill cp-ic-done" />
                              ) : (
                                <i className="bi bi-play-circle-fill cp-ic-type" />
                              )}
                            </span>
                            <span className="cp-lesson-info">
                              <span className="cp-lesson-title">
                                {lesson.title}
                              </span>
                              <span className="cp-lesson-meta">
                                {lesson.isFree && (
                                  <span className="cp-badge cp-badge--free">
                                    Free
                                  </span>
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
        )}
      </div>
    </div>
  );
}
