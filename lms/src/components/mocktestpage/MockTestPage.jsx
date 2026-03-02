// import React, { useState } from "react";
// import "./MockTestPage.css";

// const mockTests = [
//   {
//     id: 1,
//     icon: "bi bi-code-slash",
//     title: "C++ OOPS Professional",
//     desc: "Core OOPs, Pointers, and Memory Management.",
//   },
//   {
//     id: 2,
//     icon: "bi bi-cup-hot",
//     title: "Java OOPS Professional",
//     desc: "JVM, Collections, and Multi-threading basics.",
//   },
//   {
//     id: 3,
//     icon: "bi bi-calculator",
//     title: "Quantitative Aptitude",
//     desc: "Logical reasoning and numerical ability.",
//   },
// ];

// function MockTestPage() {
//   const [started, setStarted] = useState(null);

//   const handleStart = (id) => {
//     setStarted(id);
//     // Replace setTimeout with your router navigation: navigate('/test/1')
//     setTimeout(() => setStarted(null  ), 1500);
//   };
//   const handleExploreClick = () => {
//     window.scrollBy({
//       top: 300,
//       behavior: "smooth",
//     });
//   };
//   return (
//     <div>
//       <div className="mock-container">
//         <div className="mock-name-box">
//           <div>
//             {" "}
//             <h2>Master your</h2>
//             <h1 className="gradient-text">Technical Interviews.</h1>
//             <p className="para">
//               Industry-grade mock tests designed to help you clear MNC
//               interviews with confidence. C++ OOPS Professional Core OOPs,
//               Pointers, and Memory Management. Start Mock Test →
//             </p>
//           </div>

//           <div className="stats-row">
//             <div>
//               <h3>10K+</h3>
//               <p>Students Practicing</p>
//             </div>
//             <div>
//               <h3>500+</h3>
//               <p>Mock Questions</p>
//             </div>
//             <div>
//               <h3>95%</h3>
//               <p>Success Rate</p>
//             </div>
//           </div>
//         </div>
//         <div className="mock-img">
//           <img src="src\assets\HT_mt3.png" alt="" />
//         </div>
//       </div>
//       <div className="explore-wrapper">
//         <button className="explore-btn" onClick={handleExploreClick}>
//           Explore Tests
//           <span className="arrow-icon">↓</span>
//         </button>
//       </div>

//       <div className="tests">
//         {mockTests.map((test, index) => (
//           <div className="mock-box" key={test.id}>
//             <div className="mock-icon">
//               <i className={test.icon}></i>
//             </div>

//             <div className="mock-title">
//               <h1>{test.title}</h1>
//               <p>{test.desc}</p>
//             </div>

//             <div className="strat-test">
//               <button
//                 className={started === test.id ? "loading" : ""}
//                 onClick={() => handleStart(test.id)}
//                 disabled={started === test.id}
//               >
//                 {started === test.id ? (
//                   <>
//                     <i className="bi bi-arrow-repeat spin"></i> Starting...
//                   </>
//                 ) : (
//                   <>
//                     Start Test <i className="bi bi-arrow-right"></i>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MockTestPage;

import React, { useState } from "react";
import "./MockTestPage.css";

const mockTests = [
  {
    id: 1,
    icon: "bi bi-code-slash",
    title: "C++ OOPS Professional",
    desc: "Core OOPs, Pointers, and Memory Management.",
    questions: 40,
    duration: "1h 30m",
    startDate: "Mar 1st, 2026",
    endDate: "Mar 30th, 2026",
    status: "active",
  },
  {
    id: 2,
    icon: "bi bi-cup-hot",
    title: "Java OOPS Professional",
    desc: "JVM, Collections, and Multi-threading basics.",
    questions: 35,
    duration: "1h 15m",
    startDate: "Mar 5th, 2026",
    endDate: "Mar 30th, 2026",
    status: "active",
  },
  {
    id: 3,
    icon: "bi bi-calculator",
    title: "Quantitative Aptitude",
    desc: "Logical reasoning and numerical ability.",
    questions: 50,
    duration: "2h 0m",
    startDate: "Feb 1st, 2026",
    endDate: "Feb 28th, 2026",
    status: "expired",
  },
  {
    id: 4,
    icon: "bi bi-braces",
    title: "Data Structures & Algorithms",
    desc: "Arrays, Trees, Graphs and Dynamic Programming.",
    questions: 60,
    duration: "2h 30m",
    startDate: "Feb 10th, 2026",
    endDate: "Feb 28th, 2026",
    status: "completed",
  },
  {
    id: 5,
    icon: "bi bi-diagram-3",
    title: "System Design Fundamentals",
    desc: "Scalability, load balancing and distributed systems.",
    questions: 30,
    duration: "1h 0m",
    startDate: "Mar 10th, 2026",
    endDate: "Mar 31st, 2026",
    status: "upcoming",
  },
  {
    id: 6,
    icon: "bi bi-database",
    title: "SQL & Database Design",
    desc: "Joins, indexing, normalization and query optimization.",
    questions: 45,
    duration: "1h 45m",
    startDate: "Feb 15th, 2026",
    endDate: "Feb 28th, 2026",
    status: "completed",
  },
];

const TABS = ["All assessments", "Upcoming", "Completed", "Expired"];

function MockTestPage() {
  const [started, setStarted] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All assessments");
  const [sortBy, setSortBy] = useState("date");

  const handleStart = (id) => {
    setStarted(id);
    setTimeout(() => setStarted(null), 1500);
  };

  const handleExploreClick = () => {
    document
      .getElementById("my-tests-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = mockTests.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "All assessments" ||
      (activeTab === "Upcoming" && t.status === "upcoming") ||
      (activeTab === "Completed" && t.status === "completed") ||
      (activeTab === "Expired" && t.status === "expired") ||
      (activeTab === "Active" && t.status === "active");
    return matchSearch && matchTab;
  });

  const statusLabel = {
    active: { text: "Active", cls: "badge-active" },
    completed: { text: "Completed", cls: "badge-completed" },
    expired: { text: "Expired", cls: "badge-expired" },
    upcoming: { text: "Upcoming", cls: "badge-upcoming" },
  };

  return (
    <div className="mock-page">
      {/* ── HERO ── */}
      <div className="mock-hero">
        <div className="mock-hero-left">
          <div className="mock-hero-icon">
            <i className="bi bi-journal-check"></i>
          </div>
          <h1>Mock Tests</h1>
          <p className="mock-hero-desc">
            Industry-grade mock tests designed to help you clear MNC interviews
            with confidence. Track your progress, identify strengths, and
            improve on weaknesses with personalized feedback.
          </p>
          <div className="mock-hero-tags">
            <span>
              <i className="bi bi-check2-circle"></i> Personalized Learning
            </span>
            <span>
              <i className="bi bi-patch-check"></i> Skill Verification
            </span>
          </div>
        </div>
        <div className="mock-img">
          <img src="src/assets/HT_mt3.png" alt="Mock Test" />
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="mock-stats-section">
        <div className="mock-stat-card mock-stat-purple">
          <div className="msc-top">
            <p className="msc-label">Tests Assigned</p>
            <div className="msc-icon msc-icon-purple">
              <i className="bi bi-clipboard-check"></i>
            </div>
          </div>
          <span className="msc-value">49</span>
        </div>
        <div className="mock-stat-card mock-stat-green">
          <div className="msc-top">
            <p className="msc-label">Tests Completed</p>
            <div className="msc-icon msc-icon-green">
              <i className="bi bi-patch-check"></i>
            </div>
          </div>
          <span className="msc-value">24</span>
        </div>
        <div className="mock-stat-card mock-stat-blue">
          <div className="msc-top">
            <p className="msc-label">Questions Attempted</p>
            <div className="msc-icon msc-icon-blue">
              <i className="bi bi-question-circle"></i>
            </div>
          </div>
          <span className="msc-value">634</span>
        </div>
        <div className="mock-stat-card mock-stat-orange">
          <div className="msc-top">
            <p className="msc-label">Total Time Spent</p>
            <div className="msc-icon msc-icon-orange">
              <i className="bi bi-clock-history"></i>
            </div>
          </div>
          <span className="msc-value">518 mins</span>
        </div>
      </div>

      {/* ── EXPLORE BTN ── */}
      <div className="explore-wrapper">
        <button className="explore-btn" onClick={handleExploreClick}>
          Explore Tests <span className="arrow-icon">↓</span>
        </button>
      </div>

      {/* ── MY TESTS ── */}
      <div className="tests" id="my-tests-section">
        <div className="tests-header">
          <h3 className="tests-heading">My Tests</h3>

          {/* Search + Sort row */}
          <div className="tests-controls">
            <div className="search-wrap">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Search tests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="sort-wrap">
              <i className="bi bi-sort-down"></i>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="questions">Sort by Questions</option>
              </select>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${activeTab === tab ? "filter-tab-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "All assessments" && <i className="bi bi-funnel"></i>}
                {tab === "Upcoming" && <i className="bi bi-calendar-event"></i>}
                {tab === "Completed" && <i className="bi bi-check-circle"></i>}
                {tab === "Expired" && <i className="bi bi-clock-history"></i>}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="test-cards-grid">
          {filtered.length === 0 ? (
            <div className="no-tests">
              <i className="bi bi-search"></i>
              <p>No tests found for "{search}"</p>
            </div>
          ) : (
            filtered.map((test) => (
              <div className="test-card" key={test.id}>
                {/* Status banner */}
                <div
                  className={`test-card-banner ${statusLabel[test.status].cls}`}
                >
                  {statusLabel[test.status].text}
                </div>

                {/* Card body */}
                <div className="test-card-body">
                  <div className="test-card-title-row">
                    <h3>{test.title}</h3>
                    <i
                      className={`bi ${test.status === "completed" || test.status === "expired" ? "bi-check-circle-fill tc-done" : "bi-play-circle-fill tc-active"}`}
                    ></i>
                  </div>

                  <div className="test-card-meta">
                    <span>
                      <i className="bi bi-calendar3"></i> Start:{" "}
                      {test.startDate}
                    </span>
                    <span>
                      <i className="bi bi-clock"></i> End: {test.endDate}
                    </span>
                    <span>
                      <i className="bi bi-book"></i> {test.questions} questions
                      &bull; {test.duration}
                    </span>
                  </div>

                  {test.status === "expired" && (
                    <p className="test-expired-label">Expired</p>
                  )}

                  <button
                    className={`test-card-btn ${started === test.id ? "loading" : ""}`}
                    onClick={() => handleStart(test.id)}
                    disabled={started === test.id}
                  >
                    {started === test.id ? (
                      <>
                        <i className="bi bi-arrow-repeat spin"></i> Starting...
                      </>
                    ) : test.status === "completed" ||
                      test.status === "expired" ? (
                      <>
                        View Results <i className="bi bi-arrow-right"></i>
                      </>
                    ) : (
                      <>
                        Start Test <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MockTestPage;