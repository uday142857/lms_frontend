import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  coursesData,
  getGradient,
  getInitials,
  CATEGORY_GRADIENTS,
} from "../../data/Lmsdata";
import "./PopularVideos.css";

// Sort published courses by student count descending, take top 16
const popularVideos = [...coursesData]
  .filter((c) => c.published)
  .sort((a, b) => b.students - a.students)
  .slice(0, 16);

// Badge colour = first colour from each category gradient
const categoryColors = Object.fromEntries(
  Object.entries(CATEGORY_GRADIENTS).map(([cat, [start]]) => [cat, start]),
);

function PopularVideos() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <div className="pv-page">
      {/* ── HERO ── */}
      <div className="pv-hero">
        <button className="pv-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <p className="pv-label">Trending Now</p>
        <h1 className="pv-title">
          Most Popular <span>Courses</span>
        </h1>
        <p className="pv-subtitle">
          Handpicked by learners worldwide — dive into the courses everyone's
          talking about right now.
        </p>
        <div className="pv-stats">
          <div>
            <h3>{popularVideos.length}+</h3>
            <p>Top Courses</p>
          </div>
          <div>
            <h3>
              {popularVideos
                .reduce((a, c) => a + c.students, 0)
                .toLocaleString()}
              +
            </h3>
            <p>Active Learners</p>
          </div>
          <div>
            <h3>{[...new Set(popularVideos.map((c) => c.category))].length}</h3>
            <p>Categories</p>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="pv-grid">
        {popularVideos.map((course) => (
          <div className="pv-card" key={course.id}>
            {/* Thumbnail — clicking opens course player */}
            <div
              className="pv-thumb"
              onClick={() => handleCourseClick(course.id)}
            >
              {course.thumb ? (
                <img src={course.thumb} alt={course.title} />
              ) : (
                <div
                  className="pv-thumb-grad"
                  style={{ background: getGradient(course.category) }}
                >
                  {getInitials(course.title)}
                </div>
              )}

              {/* Play overlay */}
              <div className="pv-thumb-overlay">
                <div className="pv-play-btn">
                  <i className="bi bi-play-fill"></i>
                </div>
              </div>

              <span
                className="pv-badge"
                style={{
                  background: categoryColors[course.category] || "#10b981",
                }}
              >
                {course.category}
              </span>

              {course.duration && (
                <span className="pv-duration-chip">
                  <i className="bi bi-clock"></i> {course.duration}
                </span>
              )}
            </div>

            <div className="pv-info">
              {/* Rating */}
              {course.rating > 0 && (
                <div className="pv-rating-row">
                  <div className="pv-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i
                        key={s}
                        className={`bi ${
                          s <= Math.round(course.rating)
                            ? "bi-star-fill"
                            : "bi-star"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="pv-rating-val">{course.rating}</span>
                </div>
              )}

              <h3 onClick={() => handleCourseClick(course.id)}>
                {course.title}
              </h3>

              {course.teacher && (
                <p className="pv-teacher">
                  <i className="bi bi-person-fill"></i> {course.teacher}
                </p>
              )}

              <div className="pv-meta">
                <span>
                  <i className="bi bi-collection-play"></i>{" "}
                  {course.chapters.length} lessons
                </span>
                <span>
                  <i className="bi bi-clock"></i> {course.duration}
                </span>
              </div>

              <div className="pv-footer">
                <div className="pv-footer-left">
                  <div className="pv-users">
                    <div className="pv-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <p>{course.students.toLocaleString()} learners</p>
                  </div>
                  <span className="pv-price">
                    {course.price > 0 ? (
                      `₹${course.price.toLocaleString("en-IN")}`
                    ) : (
                      <span className="pv-free-label">Free</span>
                    )}
                  </span>
                </div>
                <button
                  className="pv-btn"
                  onClick={() => handleCourseClick(course.id)}
                >
                  Start <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularVideos;
