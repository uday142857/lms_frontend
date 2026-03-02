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
      <div className="stat-cards-row">
        <div className="stat-card card-slate">
          <div className="stat-card-top">
            <div className="stat-icon">
              <i className="bi bi-people-fill"></i>
            </div>
            <span className="stat-number">1200</span>
          </div>
          <div className="stat-card-bottom">
            <h4>Total Users</h4>
            <p>800 Active &middot; 400 InActive</p>
          </div>
        </div>

        <div className="stat-card card-orange">
          <div className="stat-card-top">
            <div className="stat-icon">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <span className="stat-number">800</span>
          </div>
          <div className="stat-card-bottom">
            <h4>Total Courses</h4>
            <p>400 Assigned &middot; 400 UnAssigned</p>
          </div>
        </div>

        <div className="stat-card card-teal">
          <div className="stat-card-top">
            <div className="stat-icon">
              <i className="bi bi-grid-fill"></i>
            </div>
            <span className="stat-number">5</span>
          </div>
          <div className="stat-card-bottom">
            <h4>Total Categories</h4>
            <p>3 Active &middot; 2 InActive</p>
          </div>
        </div>

        <div className="stat-card card-green">
          <div className="stat-card-top">
            <div className="stat-icon">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <span className="stat-number">7</span>
          </div>
          <div className="stat-card-bottom">
            <h4>Day Streak</h4>
            <p>Keep it up! Great start</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MidSection;
