import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="lp">
      {/* <div className="lp-bg">
        <div className="lp-orb lp-orb--1" />
        <div className="lp-orb lp-orb--2" />
        <div className="lp-orb lp-orb--3" />
        <div className="lp-grid" />
        <div className="lp-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="lp-dot" style={{ "--i": i }} />
          ))}
        </div>
      </div> */}

      <header className="lp-header">
        <div className="lp-logo">
          <span className="lp-logo-box">HT</span>
          <span className="lp-logo-name">
            HorizonTrax <em className="lp-logo-tag">LMS</em>
          </span>
        </div>
        <div className="lp-header-btns">
          <button
            className="lp-btn-ghost"
            onClick={() => navigate("/dashboard")}
          >
            Login
          </button>
          <button
            className="lp-btn-solid"
            onClick={() => navigate("/dashboard")}
          >
            Unlock Horizon
          </button>
        </div>
      </header>

      <main className="lp-hero">
        <div className="lp-eyebrow">
          <span className="lp-dot-live" />
          Open Wave 1.0 — Now Live
        </div>

        <h1 className="lp-title">
          The Future of Learning
          <br />
          <span className="lp-title-grad">Starts Here.</span>
        </h1>

        <p className="lp-sub">
          AI-integrated curriculum. Industry-recognized certification.
          <br />
          Built for the next generation of engineers.
        </p>

        <button className="lp-btn-cta" onClick={() => navigate("/dashboard")}>
          Get Started
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="lp-hint">No credit card required · Free to start</p>
      </main>
    </div>
  );
}

export default LandingPage;
