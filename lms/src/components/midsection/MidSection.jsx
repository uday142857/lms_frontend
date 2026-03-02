import React from "react";
import "./MidSection.css";

function MidSection() {
  return (
    <section className="mid-wrapper">
      <div className="mid-top">
        <div className="mid-greet">
          <h2>Welcome back, Uday! 👋</h2>
          <p>Continue your learning journey and achieve your goals</p>
        </div>
        {/* <div className="mid-actions">
          <button className="btn-browse">Browse Courses</button>
          <button className="btn-continue">
            Continue Learning <i className="bi bi-arrow-right"></i>
          </button>
        </div> */}
      </div>

      {/* ── Assessment Activity ── */}
      <div className="activity-section">
        <h3 className="activity-title">Assessment Activity</h3>

        <div className="activity-grid">
          <div className="activity-card">
            <div className="ac-icon-wrap ac-icon-blue">
              <i className="bi bi-clipboard-check"></i>
            </div>
            <div className="ac-info">
              <p className="ac-label">Tests Assigned</p>
              <span className="ac-value ac-blue">49</span>
            </div>
          </div>

          <div className="activity-card">
            <div className="ac-icon-wrap ac-icon-green">
              <i className="bi bi-patch-check"></i>
            </div>
            <div className="ac-info">
              <p className="ac-label">Tests Completed</p>
              <span className="ac-value ac-green">24</span>
            </div>
          </div>

          <div className="activity-card">
            <div className="ac-icon-wrap ac-icon-purple">
              <i className="bi bi-question-circle"></i>
            </div>
            <div className="ac-info">
              <p className="ac-label">Questions Attempted</p>
              <span className="ac-value ac-purple">634</span>
            </div>
          </div>

          <div className="activity-card">
            <div className="ac-icon-wrap ac-icon-orange">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="ac-info">
              <p className="ac-label">Total Time Spent</p>
              <span className="ac-value ac-orange">518 mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MidSection;
