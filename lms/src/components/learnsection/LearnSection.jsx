import React from "react";
import { useNavigate } from "react-router-dom";


import "./LearnSection.css";

function LearnSection() {
  const navigate = useNavigate();
  return (
    <div className="learn-main">
      <div className="mid2-main">
        <div className="popular-videos">
          <div className="pop-head">
            <h3>Most Popular Courses</h3>
            <span
              onClick={() => navigate("/popular-videos")}
              style={{ cursor: "pointer" }}
            >
              View
            </span>
          </div>
          <div className="video-container">
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20260109133438044849/Full-Stack-Development.png"
                    alt="MERN"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Software Development</p>
                  <h3>MERN Full Stack Development</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>20</h4>
                </div>
              </div>
            </div>
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://www.moweb.com/blog/wp-content/uploads/2024/09/A-Comprehensive-Guide-For-Flutter-vs-React-Native.png"
                    alt="React Native / Flutter"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Software Development</p>
                  <h3>Mobile App Development with React Native / Flutter</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>17</h4>
                </div>
              </div>
            </div>
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://i.pinimg.com/736x/8d/ce/be/8dcebedf391f14ac629a9c51d944e990.jpg"
                    alt="Python Programming"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Software Development</p>
                  <h3>Python Programming for Beginners</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>17</h4>
                </div>
              </div>
            </div>
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://static.vecteezy.com/system/resources/thumbnails/038/258/133/small_2x/machine-learning-ai-artificial-intelligence-deep-learning-data-mining-big-data-algorithm-neural-network-concept-on-virtual-screen-wireframe-hand-touching-digital-interface-illustration-vector.jpg"
                    alt="Machine Learning by DeepLearning.A"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Machine Learning (ML)</p>
                  <h3>Machine Learning by DeepLearning.AI</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>15</h4>
                </div>
              </div>
            </div>
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2lkbeJ4e19BnEyN2zVAklk-t8FZOEXXvfg&s"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Machine Learning (ML)</p>
                  <h3>AWS Machine Learning Nanodegree</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>13</h4>
                </div>
              </div>
            </div>
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://storage.googleapis.com/garranto-academy-sgwd/course-img/sg/promt-engineering-ai.jpeg"
                    alt="AI"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Artificial Intelligence</p>
                  <h3>Generative AI &amp; Prompt Engineering</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>10</h4>
                </div>
              </div>
            </div>
            <div className="video-box">
              <div className="video-image-box">
                <div className="video-image">
                  <img
                    className="pop-thumb-img"
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artificial-intelligence-ai-thumbnail-youtub-design-template-eb5c61bbccfcd1df53ab8533054f6ddb_screen.jpg?ts=1686266063"
                    alt="Intro AI"
                  />
                </div>
              </div>
              <div className="video-description">
                <div>
                  <p>Artificial Intelligence</p>
                  <h3>Introduction to Artificial Intelligence (AI)</h3>
                </div>
                <div className="users-quantity">
                  <span>Users</span>
                  <h4>3</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="learnbadge-container">
        <div className="learning-time">
          <div className="card-header">
            <h3>Learning Hours</h3>
            <span className="link">More</span>
          </div>
          <div className="learn-time">
            <div className="time-icon">
              <i className="bi bi-clock"></i>
            </div>
            <p>Start your learning journey today!</p>
          </div>
        </div>
        <div className="badges">
          <div className="user-badge">
            <h3 className="name">Badges</h3>
            <p>You have earned a new badge</p>
            <div className="badge-icon">
              <div className="icon-img"></div>
              <div>
                <h4>The Fledgling</h4>
                <p>Awarded On: Dec 28, 2021</p>
              </div>
            </div>
            <h4>Your next Badge</h4>
          </div>
          <div className="all-badges">
            <div className="next-badges">
              <div className="badgs-type"></div>
              <div className="badgs-type"></div>
              <div className="badgs-type"></div>
              <div className="badgs-type"></div>
            </div>
            <span className="link">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnSection;