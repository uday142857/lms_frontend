import React from 'react'
import "./MidSection.css"

function MidSection() {
  return (
    <section className="mid-wrapper">
      <div className="greet">
        <div className="greet-text">
          <h2>Hello, Uday</h2>
          <p>Take a look at your learning progress</p>
        </div>
        <div className="cards">
          <div className="t-users blue ">
            <p>Total Users</p>
            <h3>1200</h3>
            <div className="user-active">
              <span>800 Active</span>
              <span>400 InActive</span>
            </div>
          </div>
          <div className="t-users orange">
            <p>Total Courses</p>
            <h3>800</h3>
            <div className="user-active">
              <span>400 Assigned</span>
              <span>400 UnAssigned</span>
            </div>
          </div>
          <div className="t-users purple">
            <p>Total Categories</p>
            <h3>5</h3>
            <div className="user-active">
              <span>3 Active</span>
              <span>2 InActive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MidSection



