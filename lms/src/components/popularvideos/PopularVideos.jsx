import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopularVideos.css";

const popularVideos = [
  {
    id: 1,
    title: "MERN Full Stack Development",
    category: "Software Development",
    users: 20,
    duration: "14h",
    lessons: 9,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20260109133438044849/Full-Stack-Development.png",
  },
  {
    id: 2,
    title: "Mobile App Development with React Native / Flutter",
    category: "Software Development",
    users: 17,
    duration: "11h",
    lessons: 8,
    image:
      "https://www.moweb.com/blog/wp-content/uploads/2024/09/A-Comprehensive-Guide-For-Flutter-vs-React-Native.png",
  },
  {
    id: 3,
    title: "Python Programming for Beginners",
    category: "Software Development",
    users: 17,
    duration: "8h",
    lessons: 10,
    image:
      "https://i.pinimg.com/736x/8d/ce/be/8dcebedf391f14ac629a9c51d944e990.jpg",
  },
  {
    id: 4,
    title: "Machine Learning by DeepLearning.AI",
    category: "Machine Learning",
    users: 15,
    duration: "12h",
    lessons: 11,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/038/258/133/small_2x/machine-learning-ai-artificial-intelligence-deep-learning-data-mining-big-data-algorithm-neural-network-concept-on-virtual-screen-wireframe-hand-touching-digital-interface-illustration-vector.jpg",
  },
  {
    id: 5,
    title: "AWS Machine Learning Nanodegree",
    category: "Machine Learning",
    users: 13,
    duration: "10h",
    lessons: 9,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2lkbeJ4e19BnEyN2zVAklk-t8FZOEXXvfg&s",
  },
  {
    id: 6,
    title: "Generative AI & Prompt Engineering",
    category: "Artificial Intelligence",
    users: 10,
    duration: "6h",
    lessons: 7,
    image:
      "https://storage.googleapis.com/garranto-academy-sgwd/course-img/sg/promt-engineering-ai.jpeg",
  },
  {
    id: 7,
    title: "Introduction to Artificial Intelligence (AI)",
    category: "Artificial Intelligence",
    users: 3,
    duration: "5h",
    lessons: 6,
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artificial-intelligence-ai-thumbnail-youtub-design-template-eb5c61bbccfcd1df53ab8533054f6ddb_screen.jpg?ts=1686266063",
  },
  {
    id: 8,
    title: "Deep Learning with TensorFlow",
    category: "Machine Learning",
    users: 18,
    duration: "13h",
    lessons: 12,
    image: "https://picsum.photos/400/250?random=101",
  },
  {
    id: 9,
    title: "Data Structures & Algorithms in Python",
    category: "Software Development",
    users: 22,
    duration: "9h",
    lessons: 10,
    image: "https://picsum.photos/400/250?random=102",
  },
  {
    id: 10,
    title: "Computer Vision with OpenCV",
    category: "Artificial Intelligence",
    users: 11,
    duration: "7h",
    lessons: 8,
    image: "https://picsum.photos/400/250?random=103",
  },
  {
    id: 11,
    title: "Natural Language Processing with Python",
    category: "Machine Learning",
    users: 14,
    duration: "10h",
    lessons: 9,
    image: "https://picsum.photos/400/250?random=104",
  },
  {
    id: 12,
    title: "Full Stack with Django & React",
    category: "Software Development",
    users: 16,
    duration: "15h",
    lessons: 13,
    image: "https://picsum.photos/400/250?random=105",
  },
  {
    id: 13,
    title: "Kubernetes & Docker Masterclass",
    category: "DevOps",
    users: 9,
    duration: "8h",
    lessons: 7,
    image: "https://picsum.photos/400/250?random=106",
  },
  {
    id: 14,
    title: "System Design for Senior Engineers",
    category: "Software Development",
    users: 19,
    duration: "11h",
    lessons: 10,
    image: "https://picsum.photos/400/250?random=107",
  },
  {
    id: 15,
    title: "AI Ethics & Responsible Technology",
    category: "Artificial Intelligence",
    users: 8,
    duration: "4h",
    lessons: 5,
    image: "https://picsum.photos/400/250?random=108",
  },
  {
    id: 16,
    title: "Cloud Architecture on AWS",
    category: "Cloud",
    users: 12,
    duration: "9h",
    lessons: 8,
    image: "https://picsum.photos/400/250?random=109",
  },
];

const categoryColors = {
  "Software Development": "#10b981",
  "Machine Learning": "#6366f1",
  "Artificial Intelligence": "#f59e0b",
  DevOps: "#ef4444",
  Cloud: "#3b82f6",
};

function PopularVideos() {
  const navigate = useNavigate();

  return (
    <div className="pv-page">
      {/* ── HERO ── */}
      <div className="pv-hero">
        <button className="pv-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <p className="pv-label">Trending Now</p>
        <h1 className="pv-title">
          Most Popular <span>Courses</span>
        </h1>
        <p className="pv-subtitle">
          Handpicked by learners worldwide — dive into the courses everyone's
          talking about right now.
        </p>
        <div className="pv-stats">
          <div>
            <h3>{popularVideos.length}+</h3>
            <p>Top Courses</p>
          </div>
          <div>
            <h3>{popularVideos.reduce((a, c) => a + c.users, 0)}+</h3>
            <p>Active Learners</p>
          </div>
          <div>
            <h3>5</h3>
            <p>Categories</p>
          </div>
        </div>
      </div>

      <div className="pv-grid">
        {popularVideos.map((video) => (
          <div className="pv-card" key={video.id}>
            <div className="pv-thumb">
              <img src={video.image} alt={video.title} />
              <span
                className="pv-badge"
                style={{
                  background: categoryColors[video.category] || "#10b981",
                }}
              >
                {video.category}
              </span>
            </div>
            <div className="pv-info">
              <h3>{video.title}</h3>
              <div className="pv-meta">
                <span>
                  <i className="bi bi-play-circle"></i> {video.lessons} lessons
                </span>
                <span>
                  <i className="bi bi-clock"></i> {video.duration}
                </span>
              </div>
              <div className="pv-footer">
                <div className="pv-users">
                  <div className="pv-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p>{video.users} learners</p>
                </div>
                <button className="pv-btn">
                  Watch <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularVideos;
