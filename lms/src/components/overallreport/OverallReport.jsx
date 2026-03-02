import React from "react";
import "./OverallReport.css";

const user = {
  name: "Uday Kumar",
  email: "uday.kumar@gmail.com",
  gender: "Male",
  initials: "UK",
  university: "Vignan University",
  academic: {
    cgpa: "N/A",
    overallPercent: "N/A",
    classXII: "N/A",
    classX: "N/A",
    noBacklogs: true,
  },
};

function OverallReport() {
  return (
    <div className="report-page">
      <h1 className="report-title">Performance Report</h1>

      <div className="report-card">
        {/* User Info */}
        <div className="report-user-info">
          <div className="report-avatar">
            <span>{user.initials}</span>
          </div>
          <div className="report-user-details">
            <h2>{user.name}</h2>
            <p className="report-email">{user.email}</p>
            <p className="report-gender">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              {user.gender}
            </p>
          </div>
        </div>

        {/* University Tag */}
        <div className="report-university-tag">{user.university}</div>

        {/* Academic Performance Box */}
        <div className="report-academic-box">
          <h3>Academic Performance – {user.university}</h3>
          <div className="report-academic-grid">
            <div className="report-academic-item">
              <span className="report-academic-label">Overall CGPA</span>
              <span className="report-academic-value">
                {user.academic.cgpa}
              </span>
            </div>
            <div className="report-academic-item">
              <span className="report-academic-label">Overall %</span>
              <span className="report-academic-value">
                {user.academic.overallPercent}
              </span>
            </div>
            <div className="report-academic-item">
              <span className="report-academic-label">Class XII %</span>
              <span className="report-academic-value">
                {user.academic.classXII}
              </span>
            </div>
            <div className="report-academic-item">
              <span className="report-academic-label">Class X %</span>
              <span className="report-academic-value">
                {user.academic.classX}
              </span>
            </div>
          </div>
          {user.academic.noBacklogs && (
            <div className="report-no-backlogs">No Backlogs</div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="report-footer">
        <button className="btn-download-pdf">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF Report
        </button>
        <button className="btn-table-view">Switch to Table View</button>
      </div>
    </div>
  );
}

export default OverallReport;
