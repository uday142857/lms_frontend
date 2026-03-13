import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CoursePlayer.css";

// ── ALL 15 courses info ───────────────────────────────────────────────────────
const COURSES_INFO = {
  1: {
    title: "Responsible AI Practices",
    instructor: "Dr. Rahul Kiran",
    rating: 4.8,
    students: 3420,
    category: "AI & Ethics",
  },
  2: {
    title: "Ethics in Artificial Intelligence",
    instructor: "Prof. Anita Sharma",
    rating: 4.7,
    students: 2180,
    category: "AI & Ethics",
  },
  3: {
    title: "Foundations of Computer Vision",
    instructor: "Dr. Vikram Nair",
    rating: 4.6,
    students: 1950,
    category: "Computer Vision",
  },
  4: {
    title: "AI Fundamentals & Applications",
    instructor: "Dr. Priya Menon",
    rating: 4.9,
    students: 4210,
    category: "AI Basics",
  },
  5: {
    title: "Introduction to Machine Learning",
    instructor: "Prof. Suresh Babu",
    rating: 4.8,
    students: 5100,
    category: "Machine Learning",
  },
  6: {
    title: "AI Fluency Teaching Frameworks",
    instructor: "Dr. Kavya Reddy",
    rating: 4.5,
    students: 1340,
    category: "Education",
  },
  7: {
    title: "AI Readiness for Educators",
    instructor: "Dr. Anjali Das",
    rating: 4.4,
    students: 980,
    category: "Education",
  },
  8: {
    title: "Student AI Readiness Course",
    instructor: "Mr. Rohit Pillai",
    rating: 4.7,
    students: 6730,
    category: "AI Basics",
  },
  9: {
    title: "AI Fluency – Core Principles",
    instructor: "Dr. Meera Joshi",
    rating: 4.6,
    students: 2890,
    category: "AI Basics",
  },
  10: {
    title: "Understanding AI",
    instructor: "Prof. Arjun Kumar",
    rating: 4.5,
    students: 8920,
    category: "AI Basics",
  },
  11: {
    title: "Deep Learning Fundamentals",
    instructor: "Dr. Sneha Patel",
    rating: 4.8,
    students: 0,
    category: "Deep Learning",
  },
  12: {
    title: "Natural Language Processing",
    instructor: "Prof. Ravi Verma",
    rating: 4.7,
    students: 1670,
    category: "NLP",
  },
  13: {
    title: "Data Science with Python",
    instructor: "Dr. Pooja Singh",
    rating: 4.8,
    students: 4450,
    category: "Data Science",
  },
  14: {
    title: "Computer Vision Advanced",
    instructor: "Dr. Karan Mehta",
    rating: 4.9,
    students: 0,
    category: "Computer Vision",
  },
  15: {
    title: "Reinforcement Learning Basics",
    instructor: "Prof. Lakshmi Rao",
    rating: 4.6,
    students: 2030,
    category: "Machine Learning",
  },
};

// ── Build sections dynamically for any course ─────────────────────────────────
function buildSections(courseId, title) {
  const id = parseInt(courseId, 10);
  return [
    {
      id: `${id}-s1`,
      title: "Getting Started",
      expanded: true,
      lessons: [
        {
          id: `${id}-l1`,
          title: "Welcome to the Course",
          duration: "3:24",
          type: "video",
          completed: true,
          videoUrl: "",
        },
        {
          id: `${id}-l2`,
          title: "Course Overview & Roadmap",
          duration: "8:12",
          type: "video",
          completed: true,
          videoUrl: "",
        },
        {
          id: `${id}-l3`,
          title: "Setting Up Your Environment",
          duration: "12:05",
          type: "video",
          completed: false,
          videoUrl: "",
        },
      ],
    },
    {
      id: `${id}-s2`,
      title: "Core Concepts",
      expanded: true,
      lessons: [
        {
          id: `${id}-l4`,
          title: `Introduction to ${title}`,
          duration: "15:30",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l5`,
          title: "Key Principles & Foundations",
          duration: "11:45",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l6`,
          title: "Practical Examples & Demos",
          duration: "18:20",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l7`,
          title: "Module Quiz",
          duration: "10 Qs",
          type: "quiz",
          completed: false,
          videoUrl: "",
        },
      ],
    },
    {
      id: `${id}-s3`,
      title: "Advanced Topics",
      expanded: false,
      lessons: [
        {
          id: `${id}-l8`,
          title: "Deep Dive — Part 1",
          duration: "22:10",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l9`,
          title: "Deep Dive — Part 2",
          duration: "19:55",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l10`,
          title: "Real-World Case Study",
          duration: "25:00",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l11`,
          title: "Advanced Assessment",
          duration: "15 Qs",
          type: "quiz",
          completed: false,
          videoUrl: "",
        },
      ],
    },
    {
      id: `${id}-s4`,
      title: "Final Project & Wrap-up",
      expanded: false,
      lessons: [
        {
          id: `${id}-l12`,
          title: "Project Brief & Guidelines",
          duration: "8:00",
          type: "video",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l13`,
          title: "Final Project Submission",
          duration: "—",
          type: "project",
          completed: false,
          videoUrl: "",
        },
        {
          id: `${id}-l14`,
          title: "Course Wrap-up & Next Steps",
          duration: "5:30",
          type: "video",
          completed: false,
          videoUrl: "",
        },
      ],
    },
  ];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
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

  // Reset state on lesson change
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
      {/* ── Video or placeholder ── */}
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
              Add a video URL to this lesson to enable playback
            </p>
          </div>
        </div>
      )}

      {/* ── Centre flash ── */}
      <div className={`vp-flash ${!playing ? "vp-flash--show" : ""}`}>
        <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
      </div>

      {/* ── Controls overlay ── */}
      <div className="vp-controls" onClick={(e) => e.stopPropagation()}>
        {/* Seekbar */}
        <div className="vp-seekbar" onClick={seek}>
          <div className="vp-seek-track">
            <div className="vp-seek-buf" style={{ width: `${bufPct}%` }} />
            <div className="vp-seek-fill" style={{ width: `${prog}%` }}>
              <div className="vp-seek-dot" />
            </div>
          </div>
        </div>

        {/* Bottom row */}
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
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Parse courseId — works for every id (1–15 and beyond)
  const numId = parseInt(courseId, 10);
  const info = COURSES_INFO[numId] || {
    title: `Course ${numId}`,
    instructor: "Instructor",
    rating: 4.5,
    students: 0,
    category: "Course",
  };

  const [sections, setSections] = useState(() =>
    buildSections(numId, info.title),
  );
  const [activeLesson, setActiveLesson] = useState(
    () => buildSections(numId, info.title)[0].lessons[0],
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // KEY FIX: re-init everything when courseId changes in the URL
  useEffect(() => {
    const nId = parseInt(courseId, 10);
    const nInfo = COURSES_INFO[nId] || {
      title: `Course ${nId}`,
      instructor: "Instructor",
      rating: 4.5,
      students: 0,
    };
    const secs = buildSections(nId, nInfo.title);
    setSections(secs);
    setActiveLesson(secs[0].lessons[0]);
    setActiveTab("overview");
  }, [courseId]);

  const allLessons = flatLessons(sections);
  const done = countDone(sections);
  const total = allLessons.length;
  const pct = Math.round((done / total) * 100);
  const curIdx = allLessons.findIndex((l) => l.id === activeLesson.id);
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

  const typeIcon = (t) =>
    t === "quiz"
      ? "bi-patch-question-fill"
      : t === "project"
        ? "bi-folder-fill"
        : "bi-play-circle-fill";

  return (
    <div className="cp-root">
      {/* ════ NAV ════ */}
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
          <span className="cp-nav-coursetitle">{info.title}</span>
        </div>

        <div className="cp-nav-r">
          <div className="cp-nav-progress">
            <div className="cp-nav-prog-track">
              <div className="cp-nav-prog-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="cp-nav-pct">{pct}% complete</span>
          </div>
          <button
            className={`cp-content-toggle ${sidebarOpen ? "active" : ""}`}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <i className="bi bi-layout-sidebar-reverse" /> Course content
          </button>
        </div>
      </header>

      {/* ════ BODY ════ */}
      <div className={`cp-body ${sidebarOpen ? "with-sidebar" : ""}`}>
        {/* ── Main column ── */}
        <div className="cp-main">
          {/* Player */}
          <div className="cp-player-box">
            <VideoPlayer
              lesson={activeLesson}
              onComplete={() => markDone(activeLesson.id)}
            />
          </div>

          {/* Lesson nav bar */}
          <div className="cp-lbar">
            <button
              className="cp-lbar-btn"
              disabled={!prevL}
              onClick={() => prevL && selectLesson(prevL)}
            >
              <i className="bi bi-chevron-left" /> Previous
            </button>

            <div className="cp-lbar-center">
              <span className="cp-lbar-name">{activeLesson.title}</span>
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
            {activeTab === "overview" && (
              <div className="cp-ov">
                <h2 className="cp-ov-h">{info.title}</h2>
                <div className="cp-ov-meta">
                  <span>
                    <i className="bi bi-person-fill" /> {info.instructor}
                  </span>
                  <span>
                    <i className="bi bi-star-fill cp-star" /> {info.rating}
                  </span>
                  <span>
                    <i className="bi bi-people-fill" />{" "}
                    {info.students.toLocaleString("en-IN")} students
                  </span>
                  <span>
                    <i className="bi bi-collection-play" /> {total} lessons
                  </span>
                  <span>
                    <i className="bi bi-tag-fill" /> {info.category}
                  </span>
                </div>
                <p className="cp-ov-desc">
                  This comprehensive course covers every essential aspect of{" "}
                  {info.title.toLowerCase()}. You'll learn through structured
                  modules, real-world examples, and hands-on exercises that
                  build your skills progressively from fundamentals to advanced
                  techniques.
                </p>
                <h3 className="cp-ov-sub">What you'll learn</h3>
                <div className="cp-learn-grid">
                  {[
                    "Core concepts and fundamentals",
                    "Hands-on practical exercises",
                    "Real-world case studies",
                    "Industry best practices",
                    "Advanced techniques & tools",
                    "Career-ready applied skills",
                  ].map((item) => (
                    <div key={item} className="cp-learn-item">
                      <i className="bi bi-check2-circle" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="cp-notes">
                <p className="cp-notes-label">
                  Notes for: <em>{activeLesson.title}</em>
                </p>
                <textarea
                  className="cp-notes-ta"
                  placeholder="Write your notes here..."
                />
                <button className="cp-notes-save">
                  <i className="bi bi-save" /> Save Notes
                </button>
              </div>
            )}

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

            {activeTab === "reviews" && (
              <div className="cp-reviews">
                {[
                  {
                    n: "Priya S.",
                    s: 5,
                    t: "Excellent course! Very well structured with great practical examples.",
                  },
                  {
                    n: "Arjun M.",
                    s: 4,
                    t: "Really enjoyed the case studies — they made complex topics easy.",
                  },
                  {
                    n: "Neha R.",
                    s: 5,
                    t: "Best course on this topic. The instructor explains everything clearly.",
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
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className="cp-sidebar">
            <div className="cp-sb-head">
              <h3 className="cp-sb-h">Course Content</h3>
              <p className="cp-sb-sub">
                {done}/{total} lessons completed
              </p>
              <div className="cp-sb-prog-track">
                <div className="cp-sb-prog-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="cp-sb-list">
              {sections.map((sec) => (
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
                            activeLesson.id === lesson.id
                              ? "cp-lesson--active"
                              : "",
                            lesson.completed ? "cp-lesson--done" : "",
                            lesson.type !== "video" ? "cp-lesson--nolink" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => selectLesson(lesson)}
                        >
                          <span className="cp-lesson-ic">
                            {lesson.completed ? (
                              <i className="bi bi-check-circle-fill cp-ic-done" />
                            ) : (
                              <i
                                className={`bi ${typeIcon(lesson.type)} cp-ic-type`}
                              />
                            )}
                          </span>
                          <span className="cp-lesson-info">
                            <span className="cp-lesson-title">
                              {lesson.title}
                            </span>
                            <span className="cp-lesson-meta">
                              {lesson.type !== "video" && (
                                <span
                                  className={`cp-badge cp-badge--${lesson.type}`}
                                >
                                  {lesson.type}
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
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
