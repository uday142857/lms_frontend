// import React from "react";
// import "./AllCourse.css";

// const coursesData = [
//   {
//     id: 1,
//     title: "Responsible AI Practices",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3999,
//     chapters: 8,
//     image: "https://picsum.photos/400/250?random=1",
//   },
//   {
//     id: 2,
//     title: "Ethics in Artificial Intelligence",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3999,
//     chapters: 9,
//     image: "https://picsum.photos/400/250?random=2",
//   },
//   {
//     id: 3,
//     title: "Foundations of Computer Vision",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3999,
//     chapters: 6,
//     image: "https://picsum.photos/400/250?random=3",
//   },
//   {
//     id: 4,
//     title: "Machine Learning Essentials",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3499,
//     chapters: 10,
//     image: "https://picsum.photos/400/250?random=4",
//   },
//   {
//     id: 5,
//     title: "Deep Learning with Python",
//     instructor: "Horizon Open Wave 1.0",
//     price: 4499,
//     chapters: 12,
//     image: "https://picsum.photos/400/250?random=5",
//   },
//   {
//     id: 6,
//     title: "Data Science for Beginners",
//     instructor: "Horizon Open Wave 1.0",
//     price: 2999,
//     chapters: 7,
//     image: "https://picsum.photos/400/250?random=6",
//   },
//   {
//     id: 7,
//     title: "Natural Language Processing",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3999,
//     chapters: 11,
//     image: "https://picsum.photos/400/250?random=7",
//   },
//   {
//     id: 8,
//     title: "AI for Robotics",
//     instructor: "Horizon Open Wave 1.0",
//     price: 4999,
//     chapters: 14,
//     image: "https://picsum.photos/400/250?random=8",
//   },
//   {
//     id: 9,
//     title: "Frontend Development Mastery",
//     instructor: "Horizon Open Wave 1.0",
//     price: 2599,
//     chapters: 13,
//     image: "https://picsum.photos/400/250?random=9",
//   },
//   {
//     id: 10,
//     title: "Backend API Development",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3199,
//     chapters: 10,
//     image: "https://picsum.photos/400/250?random=10",
//   },
//   {
//     id: 11,
//     title: "Full Stack Web Development",
//     instructor: "Horizon Open Wave 1.0",
//     price: 5999,
//     chapters: 18,
//     image: "https://picsum.photos/400/250?random=11",
//   },
//   {
//     id: 12,
//     title: "Cloud Computing Fundamentals",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3799,
//     chapters: 9,
//     image: "https://picsum.photos/400/250?random=12",
//   },
//   {
//     id: 13,
//     title: "Cyber Security Essentials",
//     instructor: "Horizon Open Wave 1.0",
//     price: 4299,
//     chapters: 10,
//     image: "https://picsum.photos/400/250?random=13",
//   },
//   {
//     id: 14,
//     title: "DevOps for Developers",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3899,
//     chapters: 8,
//     image: "https://picsum.photos/400/250?random=14",
//   },
//   {
//     id: 15,
//     title: "UI/UX Design Principles",
//     instructor: "Horizon Open Wave 1.0",
//     price: 2999,
//     chapters: 6,
//     image: "https://picsum.photos/400/250?random=15",
//   },
//   {
//     id: 16,
//     title: "Blockchain Basics",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3499,
//     chapters: 7,
//     image: "https://picsum.photos/400/250?random=16",
//   },
//   {
//     id: 17,
//     title: "Advanced React Patterns",
//     instructor: "Horizon Open Wave 1.0",
//     price: 4599,
//     chapters: 12,
//     image: "https://picsum.photos/400/250?random=17",
//   },
//   {
//     id: 18,
//     title: "Node.js Masterclass",
//     instructor: "Horizon Open Wave 1.0",
//     price: 3799,
//     chapters: 11,
//     image: "https://picsum.photos/400/250?random=18",
//   },
//   {
//     id: 19,
//     title: "Database Design & SQL",
//     instructor: "Horizon Open Wave 1.0",
//     price: 2899,
//     chapters: 9,
//     image: "https://picsum.photos/400/250?random=19",
//   },
//   {
//     id: 20,
//     title: "AI Interview Preparation",
//     instructor: "Horizon Open Wave 1.0",
//     price: 4999,
//     chapters: 15,
//     image: "https://picsum.photos/400/250?random=20",
//   },
// ];

// function AllCourse() {
//   return (
//     <div className="all-courses">
//       <div className="course-top">
//         <h1 className="overlay-text">
//           Learn Something New !
//         </h1>
//         <p className="sub-para">
//           Empower your future with cutting-edge courses in AI, technology, and
//           professional skills — designed to keep you ahead in a fast-moving
//           world.
//         </p>

//         <div className="c-stats-row">
//           <div>
//             <h3>10,000+</h3>
//             <p>Students</p>
//           </div>
//           <div>
//             <h3>150+</h3>
//             <p>Courses</p>
//           </div>
//           <div>
//             <h3>25+</h3>
//             <p>Expert Mentors</p>
//           </div>
//         </div>
//       </div>

//       <div className="course-video-container">
//         {coursesData.map((course) => (
//           <div className="c-v-card" key={course.id}>
//             <div className="c-v-thumb">
//               <img src={course.image} alt={course.title} />
//             </div>
//             <div className="c-v-desc">
//               <h3>{course.title}</h3>
//               <p>{course.instructor}</p>
//             </div>
//             <div className="c-footer">
//               <p>₹{course.price}</p>
//               <button>
//                 Enroll <i className="bi bi-arrow-right"></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AllCourse;


import React, { useState, useRef } from "react";
import "./AllCourse.css";

const coursesData = [
  {
    id: 1,
    title: "Responsible AI Practices",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 8,
    image: "https://picsum.photos/400/250?random=1",
  },
  {
    id: 2,
    title: "Ethics in Artificial Intelligence",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 9,
    image: "https://picsum.photos/400/250?random=2",
  },
  {
    id: 3,
    title: "Foundations of Computer Vision",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 6,
    image: "https://picsum.photos/400/250?random=3",
  },
  {
    id: 4,
    title: "Machine Learning Essentials",
    instructor: "Horizon Open Wave 1.0",
    price: 3499,
    chapters: 10,
    image: "https://picsum.photos/400/250?random=4",
  },
  {
    id: 5,
    title: "Deep Learning with Python",
    instructor: "Horizon Open Wave 1.0",
    price: 4499,
    chapters: 12,
    image: "https://picsum.photos/400/250?random=5",
  },
  {
    id: 6,
    title: "Data Science for Beginners",
    instructor: "Horizon Open Wave 1.0",
    price: 2999,
    chapters: 7,
    image: "https://picsum.photos/400/250?random=6",
  },
  {
    id: 7,
    title: "Natural Language Processing",
    instructor: "Horizon Open Wave 1.0",
    price: 3999,
    chapters: 11,
    image: "https://picsum.photos/400/250?random=7",
  },
  {
    id: 8,
    title: "AI for Robotics",
    instructor: "Horizon Open Wave 1.0",
    price: 4999,
    chapters: 14,
    image: "https://picsum.photos/400/250?random=8",
  },
  {
    id: 9,
    title: "Frontend Development Mastery",
    instructor: "Horizon Open Wave 1.0",
    price: 2599,
    chapters: 13,
    image: "https://picsum.photos/400/250?random=9",
  },
  {
    id: 10,
    title: "Backend API Development",
    instructor: "Horizon Open Wave 1.0",
    price: 3199,
    chapters: 10,
    image: "https://picsum.photos/400/250?random=10",
  },
  {
    id: 11,
    title: "Full Stack Web Development",
    instructor: "Horizon Open Wave 1.0",
    price: 5999,
    chapters: 18,
    image: "https://picsum.photos/400/250?random=11",
  },
  {
    id: 12,
    title: "Cloud Computing Fundamentals",
    instructor: "Horizon Open Wave 1.0",
    price: 3799,
    chapters: 9,
    image: "https://picsum.photos/400/250?random=12",
  },
  {
    id: 13,
    title: "Cyber Security Essentials",
    instructor: "Horizon Open Wave 1.0",
    price: 4299,
    chapters: 10,
    image: "https://picsum.photos/400/250?random=13",
  },
  {
    id: 14,
    title: "DevOps for Developers",
    instructor: "Horizon Open Wave 1.0",
    price: 3899,
    chapters: 8,
    image: "https://picsum.photos/400/250?random=14",
  },
  {
    id: 15,
    title: "UI/UX Design Principles",
    instructor: "Horizon Open Wave 1.0",
    price: 2999,
    chapters: 6,
    image: "https://picsum.photos/400/250?random=15",
  },
  {
    id: 16,
    title: "Blockchain Basics",
    instructor: "Horizon Open Wave 1.0",
    price: 3499,
    chapters: 7,
    image: "https://picsum.photos/400/250?random=16",
  },
  {
    id: 17,
    title: "Advanced React Patterns",
    instructor: "Horizon Open Wave 1.0",
    price: 4599,
    chapters: 12,
    image: "https://picsum.photos/400/250?random=17",
  },
  {
    id: 18,
    title: "Node.js Masterclass",
    instructor: "Horizon Open Wave 1.0",
    price: 3799,
    chapters: 11,
    image: "https://picsum.photos/400/250?random=18",
  },
  {
    id: 19,
    title: "Database Design & SQL",
    instructor: "Horizon Open Wave 1.0",
    price: 2899,
    chapters: 9,
    image: "https://picsum.photos/400/250?random=19",
  },
  {
    id: 20,
    title: "AI Interview Preparation",
    instructor: "Horizon Open Wave 1.0",
    price: 4999,
    chapters: 15,
    image: "https://picsum.photos/400/250?random=20",
  },
];

function AllCourse() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Live filter — matches title or instructor (case-insensitive)
  const filtered = coursesData.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
    );
  });

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="all-courses">
      {/* ── Hero / title section with integrated search ── */}
      <div className="course-top">
        <h1 className="overlay-text">Learn Something New!</h1>
        <p className="sub-para">
          Empower your future with cutting-edge courses in AI, technology, and
          professional skills — designed to keep you ahead in a fast-moving
          world.
        </p>

        <div className="c-stats-row">
          <div>
            <h3>10,000+</h3>
            <p>Students</p>
          </div>
          <div>
            <h3>150+</h3>
            <p>Courses</p>
          </div>
          <div>
            <h3>25+</h3>
            <p>Expert Mentors</p>
          </div>
        </div>
      </div>

      {/* Search bar — lives here, not in the header */}
      <div className="course-search-wrap">
        <div className="course-search-box">
          <i className="bi bi-search course-search-icon" />
          <input
            ref={inputRef}
            className="course-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, topics, instructors…"
            autoComplete="off"
          />
          {query && (
            <button
              className="course-search-clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <i className="bi bi-x" />
            </button>
          )}
        </div>

        {/* Live result count badge */}
        {query.trim() && (
          <div className="course-search-result-badge">
            <i className="bi bi-funnel-fill" />
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
            &ldquo;{query.trim()}&rdquo;
          </div>
        )}
      </div>

      {/* ── Course grid ── */}
      <div className="course-video-container">
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <div className="c-v-card" key={course.id}>
              <div className="c-v-thumb">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="c-v-desc">
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
              </div>
              <div className="c-footer">
                <p>₹{course.price}</p>
                <button>
                  Enroll <i className="bi bi-arrow-right" />
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty state when no results */
          <div className="course-empty-state">
            <div className="ces-icon">
              <i className="bi bi-search" />
            </div>
            <h3>No courses found</h3>
            <p>No results for &ldquo;{query}&rdquo; — try different keywords</p>
            <button className="ces-reset" onClick={handleClear}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllCourse;
