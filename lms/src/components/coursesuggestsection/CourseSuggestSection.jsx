import React from "react";
import { coursesData, getGradient, getInitials } from "../../data/Lmsdata";
import "./CourseSuggestSection.css";

function CourseSuggestSection() {
  return (
    <div className="tranding-container">
      <div className="tranding-box">
        <h3>Your courses</h3>
        <div className="course-container">
          {coursesData
            .filter((c) => c.published)
            .slice(0, 8)
            .map((course) => (
              <div className="course-card" key={course.id}>
                <div className="course-image">
                  {course.thumb ? (
                    <img
                      className="thumb-img"
                      src={course.thumb}
                      alt={course.title}
                    />
                  ) : (
                    <div
                      className="thumb-img"
                      style={{
                        background: getGradient(course.category),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        fontWeight: "700",
                        color: "#fff",
                        letterSpacing: "1px",
                        fontFamily: "Syne, sans-serif",
                      }}
                    >
                      {getInitials(course.title)}
                    </div>
                  )}
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseSuggestSection;
