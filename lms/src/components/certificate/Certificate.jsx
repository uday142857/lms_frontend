import React from "react";
import "./Certificate.css";

const certificates = []; // empty — populate with cert objects when available

function Certificate() {
  return (
    <div className="certificate-page">
      {/* Hero Banner */}
      <div className="cert-hero">
        <span className="cert-hero-icon">🏅</span>
        <h1>Certificates</h1>
        <p>
          View and download your earned certificates. Showcase your achievements
          and skills with official recognition of your learning journey.
        </p>
        <div className="cert-hero-actions">
          <button className="btn-download-all">
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
            Download certificates
          </button>
          <button className="btn-share-all">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            Share achievements
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="cert-main">
        {/* Section Header */}
        <div className="cert-section-header">
          <div className="cert-section-title">
            <h2>Your Certificates</h2>
            <p>All your earned certificates in one place</p>
          </div>
          <div className="cert-pro-badge">
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M9 12l-4 9 7-3 7 3-4-9" />
            </svg>
            Professional Recognition
          </div>
        </div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <div className="cert-empty">
            <div className="cert-empty-icon">
              <svg
                width="44"
                height="44"
                fill="none"
                stroke="#2d6a4f"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3>No Certificates Found</h3>
            <p>
              Complete courses to earn official certificates and showcase your
              skills.
            </p>
            <button className="btn-explore">Explore Courses</button>
          </div>
        )}

        {/* Certificate Cards */}
        {certificates.length > 0 && (
          <div className="cert-grid">
            {certificates.map((cert) => (
              <div className="cert-card" key={cert.id}>
                <div className="cert-card-top">
                  <div className="cert-card-badge">{cert.badge || "🏆"}</div>
                  <div className="cert-card-info">
                    <h3>{cert.title}</h3>
                    <span>Issued {cert.issueDate}</span>
                  </div>
                </div>
                <div className="cert-card-body">
                  <div className="cert-card-meta">
                    <div className="cert-meta-item">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Instructor: {cert.instructor}
                    </div>
                    <div className="cert-meta-item">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      Duration: {cert.duration}
                    </div>
                  </div>
                  <div className="cert-card-actions">
                    <button className="btn-card-download">Download</button>
                    <button className="btn-card-share">Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Certificate;
