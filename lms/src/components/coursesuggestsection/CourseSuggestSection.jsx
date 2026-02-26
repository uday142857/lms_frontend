import React from "react";
import "./CourseSuggestSection.css";

function CourseSuggestSection() {
  return (
    <div className="tranding-container">
      <div className="tranding-box">
        <h3>Your courses</h3>
        <div className="course-container">
          <div className="course-card">
            <div className="course-image">
              <img
                className="thumb-img"
                src="https://media.licdn.com/dms/image/v2/D4E12AQEJZ3FTiaJI-A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1700577248422?e=1773273600&v=beta&t=r7NrYvg5qCB47j6Nv6eQQKKe4EoXgHZdW6ekZ6hyWaw"
                alt="React"
              />
            </div>
            <h3>React</h3>
            <p>Master modern, fast, component-based web UIs</p>
          </div>
          <div className="course-card">
            <div className="course-image">
              <img
                className="thumb-img"
                src="https://riseuplabs.com/wp-content/uploads/2024/11/nodejs-web-development-ultimate-guide-banner-riseuplabs.webp"
                alt="React"
              />
            </div>
            <h3>NodeJS</h3>
            <p>Server-side JavaScript runtime for applications</p>
          </div>
          <div className="course-card">
            {" "}
            <div className="course-image">
              <img
                className="thumb-img"
                src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*DAIoObWqwP2P-EMJjBEdqQ.png"
                alt="React"
              />
            </div>
            <h3>ExpressJS</h3>
            <p>Minimal Node.js framework for APIs</p>
          </div>
          <div className="course-card">
            {" "}
            <div className="course-image">
              <img
                className="thumb-img"
                src="https://velog.velcdn.com/images%2Fhjbaek91%2Fpost%2Fa0920f7e-5c0a-4fb7-9896-6082cb301907%2Fhtml-css.webp"
                alt="React"
              />
            </div>
            <h3>HTML,CSS</h3>
            <p>Structure and style modern websites</p>
          </div>
          <div className="course-card">
            {" "}
            <div className="course-image">
              <img
                className="thumb-img"
                src="https://luca-blogs.vercel.app/static/images/Blog/js-thumbnail-1.jpeg"
                alt="React"
              />
            </div>
            <h3>Java Script</h3>
            <p>Interactive web programming language</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSuggestSection;
