import React, { useState } from "react";
import "./MockTestPage.css";


const mockTests = [
  {
    id: 1,
    icon: "bi bi-code-slash",
    title: "C++ OOPS Professional",
    desc: "Core OOPs, Pointers, and Memory Management.",
  },
  {
    id: 2,
    icon: "bi bi-cup-hot",
    title: "Java OOPS Professional",
    desc: "JVM, Collections, and Multi-threading basics.",
  },
  {
    id: 3,
    icon: "bi bi-calculator",
    title: "Quantitative Aptitude",
    desc: "Logical reasoning and numerical ability.",
  },
];



function MockTestPage() {
  const [started, setStarted] = useState(null);

  const handleStart = (id) => {
    setStarted(id);
    // Replace setTimeout with your router navigation: navigate('/test/1')
    setTimeout(() => setStarted(null  ), 1500);
  };
  const handleExploreClick = () => {
    window.scrollBy({
      top: 300,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="mock-container">
        <div className="mock-name-box">
          <div>
            {" "}
            <h2>Master your</h2>
            <h1 className="gradient-text">Technical Interviews.</h1>
            <p className="para">
              Industry-grade mock tests designed to help you clear MNC
              interviews with confidence. C++ OOPS Professional Core OOPs,
              Pointers, and Memory Management. Start Mock Test →
            </p>
          </div>

          <div className="stats-row">
            <div>
              <h3>10K+</h3>
              <p>Students Practicing</p>
            </div>
            <div>
              <h3>500+</h3>
              <p>Mock Questions</p>
            </div>
            <div>
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
        <div className="mock-img">
          <img src="src\assets\HT_mt3.png" alt="" />
        </div>
      </div>
      <div className="explore-wrapper">
        <button className="explore-btn" onClick={handleExploreClick}>
          Explore Tests
          <span className="arrow-icon">↓</span>
        </button>
      </div>

      <div className="tests">
        {mockTests.map((test, index) => (
          <div className="mock-box" key={test.id}>
            <div className="mock-icon">
              <i className={test.icon}></i>
            </div>

            <div className="mock-title">
              <h1>{test.title}</h1>
              <p>{test.desc}</p>
            </div>

            <div className="strat-test">
              <button
                className={started === test.id ? "loading" : ""}
                onClick={() => handleStart(test.id)}
                disabled={started === test.id}
              >
                {started === test.id ? (
                  <>
                    <i className="bi bi-arrow-repeat spin"></i> Starting...
                  </>
                ) : (
                  <>
                    Start Test <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MockTestPage;
