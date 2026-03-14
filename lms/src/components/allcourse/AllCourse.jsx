import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { coursesData, getGradient, getInitials } from "../../data/Lmsdata";
import "./AllCourse.css";

function AllCourse() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filtered = coursesData.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.teacher.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  });

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleEnroll = (courseId) => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <div className="all-courses">
      {/* ── Hero / title section ── */}
      <div className="course-top">
        <h1 className="overlay-text">Learn Something New!</h1>
        <p className="sub-para">
          Empower your future with cutting-edge courses in AI, technology, and
          professional skills — designed to keep you ahead in a fast-moving
          world.
        </p>

        <div className="c-stats-row">
          <div>
            <h3>
              {coursesData
                .reduce((sum, c) => sum + c.students, 0)
                .toLocaleString()}
              +
            </h3>
            <p>Students</p>
          </div>
          <div>
            <h3>{coursesData.length}+</h3>
            <p>Courses</p>
          </div>
          <div>
            <h3>{[...new Set(coursesData.map((c) => c.teacher))].length}+</h3>
            <p>Expert Mentors</p>
          </div>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="course-search-wrap">
        <div className="course-search-box">
          <i className="bi bi-search course-search-icon" />
          <input
            ref={inputRef}
            className="course-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, topics, instructors…"
            autoComplete="off"
          />
          {query && (
            <button
              className="course-search-clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <i className="bi bi-x" />
            </button>
          )}
        </div>

        {query.trim() && (
          <div className="course-search-result-badge">
            <i className="bi bi-funnel-fill" />
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
            &ldquo;{query.trim()}&rdquo;
          </div>
        )}
      </div>

      {/* ── Course grid ── */}
      <div className="course-video-container">
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <div
              className="c-v-card"
              key={course.id}
              onClick={() => handleEnroll(course.id)}
            >
              {/* Thumbnail */}
              <div className="c-v-thumb">
                {course.thumb ? (
                  <img src={course.thumb} alt={course.title} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: getGradient(course.category),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#fff",
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {getInitials(course.title)}
                  </div>
                )}

                {/* Play overlay on hover */}
                <div className="c-v-play-overlay">
                  <div className="c-v-play-btn">
                    <i className="bi bi-play-fill" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="c-v-desc">
                <span className="c-v-category">{course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.teacher}</p>
                {course.rating > 0 && (
                  <div className="c-v-rating">
                    <i className="bi bi-star-fill" />
                    <span>{course.rating}</span>
                    <span className="c-v-students">
                      ({course.students.toLocaleString("en-IN")} students)
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="c-footer">
                <p>
                  {course.price > 0 ? (
                    `₹${course.price.toLocaleString("en-IN")}`
                  ) : (
                    <span className="c-free-label">Free</span>
                  )}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnroll(course.id);
                  }}
                >
                  Enroll <i className="bi bi-arrow-right" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="course-empty-state">
            <div className="ces-icon">
              <i className="bi bi-search" />
            </div>
            <h3>No courses found</h3>
            <p>No results for &ldquo;{query}&rdquo; — try different keywords</p>
            <button className="ces-reset" onClick={handleClear}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllCourse;
