import React from "react";
import { useNavigate } from "react-router-dom";
import { coursesData, getGradient, getInitials } from "../../data/Lmsdata";
import "./LearnSection.css";

// Top 7 published courses sorted by students descending
const popularCourses = [...coursesData]
  .filter((c) => c.published)
  .sort((a, b) => b.students - a.students)
  .slice(0, 7);

function LearnSection() {
  const navigate = useNavigate();
  const watch = (id) => navigate(`/learn/${id}`);

  return (
    <div className="learn-main">
      <div className="mid2-main">
        <div className="popular-videos">
          <div className="pop-head">
            <h3>Most Popular Courses</h3>
            <span
              onClick={() => navigate("/popular-videos")}
              style={{ cursor: "pointer" }}
            >
              View
            </span>
          </div>

          <div className="video-container">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="video-box"
                style={{ cursor: "pointer" }}
                onClick={() => watch(course.id)}
              >
                <div className="video-image-box">
                  <div className="video-image">
                    {course.thumb ? (
                      <img
                        className="pop-thumb-img"
                        src={course.thumb}
                        alt={course.title}
                      />
                    ) : (
                      <div
                        className="pop-thumb-img"
                        style={{
                          background: getGradient(course.category),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "26px",
                          fontWeight: "700",
                          color: "#fff",
                          fontFamily: "Syne, sans-serif",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {getInitials(course.title)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="video-description">
                  <div>
                    <p>{course.category}</p>
                    <h3>{course.title}</h3>
                  </div>
                  <div className="users-quantity">
                    <span>Users</span>
                    <h4>{course.students.toLocaleString()}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="learnbadge-container">
        <div className="learning-time">
          <div className="card-header">
            <h3>Learning Hours</h3>
            <span className="link">More</span>
          </div>
          <div className="learn-time">
            <div className="time-icon">
              <i className="bi bi-clock"></i>
            </div>
            <p>Start your learning journey today!</p>
          </div>
        </div>
        <div className="badges">
          <div className="user-badge">
            <h3 className="name">Badges</h3>
            <p>You have earned a new badge</p>
            <div className="badge-icon">
              <div className="icon-img"></div>
              <div>
                <h4>The Fledgling</h4>
                <p>Awarded On: Dec 28, 2021</p>
              </div>
            </div>
            <h4>Your next Badge</h4>
          </div>
          <div className="all-badges">
            <div className="next-badges">
              <div className="badgs-type"></div>
              <div className="badgs-type"></div>
              <div className="badgs-type"></div>
              <div className="badgs-type"></div>
            </div>
            <span className="link">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnSection;
