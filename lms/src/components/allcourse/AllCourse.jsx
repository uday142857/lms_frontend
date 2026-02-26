import React from "react";
import "./AllCourse.css";

const coursesData = [
  {
    id: 1,
    title: "Responsible AI Practices",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 8,
    image: "https://picsum.photos/400/250?random=1",
    rating: 4.5,
    duration: "6h 30m",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Ethics in Artificial Intelligence",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 9,
    image: "https://picsum.photos/400/250?random=2",
    rating: 4.7,
    duration: "7h 15m",
    level: "Advanced",
  },
  {
    id: 3,
    title: "Foundations of Computer Vision",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 6,
    image: "https://picsum.photos/400/250?random=3",
    rating: 4.6,
    duration: "5h 45m",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Machine Learning Essentials",
    instructor: "Horizon Open Wave 1.0",
    price: 3499,
    chapters: 10,
    image: "https://picsum.photos/400/250?random=4",
    rating: 4.8,
    duration: "8h 20m",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Deep Learning with Python",
    instructor: "Horizon Open Wave 1.0",
    price: 4499,
    chapters: 12,
    image: "https://picsum.photos/400/250?random=5",
    rating: 4.9,
    duration: "10h 10m",
    level: "Advanced",
  },
  {
    id: 6,
    title: "Data Science for Beginners",
    instructor: "Horizon Open Wave 1.0",
    price: 2999,
    chapters: 7,
    image: "https://picsum.photos/400/250?random=6",
    rating: 4.4,
    duration: "5h 10m",
    level: "Beginner",
  },
  {
    id: 7,
    title: "Natural Language Processing",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 11,
    image: "https://picsum.photos/400/250?random=7",
    rating: 4.6,
    duration: "9h 00m",
    level: "Intermediate",
  },
  {
    id: 8,
    title: "AI for Robotics",
    instructor: "Horizon Open Wave 1.0",
    price: 4999,
    chapters: 14,
    image: "https://picsum.photos/400/250?random=8",
    rating: 4.8,
    duration: "11h 25m",
    level: "Advanced",
  },
  {
    id: 9,
    title: "Frontend Development Mastery",
    instructor: "Horizon Open Wave 1.0",
    price: 2599,
    chapters: 13,
    image: "https://picsum.photos/400/250?random=9",
    rating: 4.3,
    duration: "9h 50m",
    level: "Beginner",
  },
  {
    id: 10,
    title: "Backend API Development",
    instructor: "Horizon Open Wave 1.0",
    price: 3199,
    chapters: 10,
    image: "https://picsum.photos/400/250?random=10",
    rating: 4.5,
    duration: "7h 40m",
    level: "Intermediate",
  },
  {
    id: 11,
    title: "Full Stack Web Development",
    instructor: "Horizon Open Wave 1.0",
    price: 5999,
    chapters: 18,
    image: "https://picsum.photos/400/250?random=11",
    rating: 4.9,
    duration: "15h 00m",
    level: "Advanced",
  },
  {
    id: 12,
    title: "Cloud Computing Fundamentals",
    instructor: "Horizon Open Wave 1.0",
    price: 3799,
    chapters: 9,
    image: "https://picsum.photos/400/250?random=12",
    rating: 4.6,
    duration: "6h 55m",
    level: "Intermediate",
  },
  {
    id: 13,
    title: "Cyber Security Essentials",
    instructor: "Horizon Open Wave 1.0",
    price: 4299,
    chapters: 10,
    image: "https://picsum.photos/400/250?random=13",
    rating: 4.7,
    duration: "8h 10m",
    level: "Advanced",
  },
  {
    id: 14,
    title: "DevOps for Developers",
    instructor: "Horizon Open Wave 1.0",
    price: 3899,
    chapters: 8,
    image: "https://picsum.photos/400/250?random=14",
    rating: 4.5,
    duration: "6h 30m",
    level: "Intermediate",
  },
  {
    id: 15,
    title: "UI/UX Design Principles",
    instructor: "Horizon Open Wave 1.0",
    price: 2999,
    chapters: 6,
    image: "https://picsum.photos/400/250?random=15",
    rating: 4.4,
    duration: "5h 00m",
    level: "Beginner",
  },
  {
    id: 16,
    title: "Blockchain Basics",
    instructor: "Horizon Open Wave 1.0",
    price: 3499,
    chapters: 7,
    image: "https://picsum.photos/400/250?random=16",
    rating: 4.3,
    duration: "5h 45m",
    level: "Beginner",
  },
  {
    id: 17,
    title: "Advanced React Patterns",
    instructor: "Horizon Open Wave 1.0",
    price: 4599,
    chapters: 12,
    image: "https://picsum.photos/400/250?random=17",
    rating: 4.8,
    duration: "9h 30m",
    level: "Advanced",
  },
  {
    id: 18,
    title: "Node.js Masterclass",
    instructor: "Horizon Open Wave 1.0",
    price: 3799,
    chapters: 11,
    image: "https://picsum.photos/400/250?random=18",
    rating: 4.6,
    duration: "8h 00m",
    level: "Intermediate",
  },
  {
    id: 19,
    title: "Database Design & SQL",
    instructor: "Horizon Open Wave 1.0",
    price: 2899,
    chapters: 9,
    image: "https://picsum.photos/400/250?random=19",
    rating: 4.4,
    duration: "6h 20m",
    level: "Beginner",
  },
  {
    id: 20,
    title: "AI Interview Preparation",
    instructor: "Horizon Open Wave 1.0",
    price: 4999,
    chapters: 15,
    image: "https://picsum.photos/400/250?random=20",
    rating: 4.9,
    duration: "12h 10m",
    level: "Advanced",
  },
];

function AllCourse() {
  return (
    <div className="all-courses">
      <div className="course-top">
        <h1 className="main-text">LEARN SOMETHING NEW WITH</h1>
        <p className="overlay-text">HorizonTrax</p>
        <p className="sub-para">
          ''' Empower your future with cutting-edge courses in AI, technology,
          and professional skills designed to help you stay ahead in a
          competitive world'''.
        </p>

        <div className="c-stats-row">
          <div>
            <h3>10,000+</h3>
            <p>Students</p>
          </div>
          <div>
            <h3>150+ </h3>
            <p> Courses</p>
          </div>
          <div>
            <h3>25+</h3>
            <p>Expert Mentors</p>
          </div>
        </div>
      </div>
      <div className="course-video-container">
        {coursesData.map((course, index) => (
          <div className="c-v-card">
            <div className="c-v-thumb">
              <img src="" alt="image"/>
            </div>
            <div className="c-v-desc">
              <h3>{course.title}</h3>
              <p>{course.instructor}</p>
              <div className="c-footer">
                <p>₹{course.price}</p>
                <button>
                  Enroll <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCourse;
