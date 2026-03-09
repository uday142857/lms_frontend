// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { coursesData } from "../ourcourses/OurCourses";
// import "./CreateCourses.css";

// function CreateCourses() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [teacher, setTeacher] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [published, setPublished] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const validate = () => {
//     const e = {};
//     if (!title.trim()) e.title = "Course title is required.";
//     if (!teacher.trim()) e.teacher = "Teacher name is required.";
//     if (!price.trim()) e.price = "Price is required.";
//     else if (isNaN(Number(price)) || Number(price) < 0)
//       e.price = "Enter a valid price.";
//     return e;
//   };

//   const handleSubmit = () => {
//     const e = validate();
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }

//     const newCourse = {
//       id: Date.now(),
//       title: title.trim(),
//       teacher: teacher.trim(),
//       price: Number(price),
//       description: description.trim(),
//       published,
//     };

//     coursesData.push(newCourse);
//     setSuccess(true);

//     setTimeout(() => {
//       navigate("/admin-dashboard/my-courses");
//     }, 1200);
//   };
//   In CreateCourses.jsx — change handleSubmit

//   const handleCancel = () => navigate("/admin-dashboard/my-courses");

//   const field = (key) => ({
//     onChange: (e) => {
//       if (errors[key])
//         setErrors((prev) => {
//           const n = { ...prev };
//           delete n[key];
//           return n;
//         });
//     },
//   });

//   return (
//     <div className="cc-wrapper">
//       <div className="cc-card">

//         <div className="cc-card-header">
//           <h1 className="cc-title">Name your Course</h1>
//           <p className="cc-subtitle">
//             What would you like to name your course? Don't worry, you can change
//             this later.
//           </p>
//         </div>

//         {success && (
//           <div className="cc-success">
//             <i className="bi bi-check-circle-fill" />
//             Course created! Redirecting to My Courses…
//           </div>
//         )}

//         <div className="cc-form">

//           <div className="cc-field">
//             <label className="cc-label">Course Title</label>
//             <input
//               className={`cc-input ${errors.title ? "cc-input--error" : ""}`}
//               type="text"
//               placeholder="e.g. 'Advanced Web Development'"
//               value={title}
//               onChange={(e) => {
//                 setTitle(e.target.value);
//                 field("title").onChange(e);
//               }}
//             />
//             {errors.title ? (
//               <span className="cc-error">{errors.title}</span>
//             ) : (
//               <span className="cc-hint">
//                 What will you teach in this course?
//               </span>
//             )}
//           </div>

//           <div className="cc-field">
//             <label className="cc-label">Teacher's Name</label>
//             <input
//               className={`cc-input ${errors.teacher ? "cc-input--error" : ""}`}
//               type="text"
//               placeholder="e.g. 'John Smith'"
//               value={teacher}
//               onChange={(e) => {
//                 setTeacher(e.target.value);
//                 field("teacher").onChange(e);
//               }}
//             />
//             {errors.teacher ? (
//               <span className="cc-error">{errors.teacher}</span>
//             ) : (
//               <span className="cc-hint">What is your name?</span>
//             )}
//           </div>

//           <div className="cc-field">
//             <label className="cc-label">Price (₹)</label>
//             <div className="cc-input-prefix-wrap">
//               <span className="cc-input-prefix">₹</span>
//               <input
//                 className={`cc-input cc-input--prefixed ${errors.price ? "cc-input--error" : ""}`}
//                 type="number"
//                 min="0"
//                 placeholder="e.g. 1999"
//                 value={price}
//                 onChange={(e) => {
//                   setPrice(e.target.value);
//                   field("price").onChange(e);
//                 }}
//               />
//             </div>
//             {errors.price ? (
//               <span className="cc-error">{errors.price}</span>
//             ) : (
//               <span className="cc-hint">Set 0 for a free course.</span>
//             )}
//           </div>

//           {/* Description */}
//           <div className="cc-field">
//             <label className="cc-label">
//               Description <span className="cc-optional">(optional)</span>
//             </label>
//             <textarea
//               className="cc-textarea"
//               rows={4}
//               placeholder="Brief description of what students will learn…"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="cc-field cc-field--row">
//             <div>
//               <p className="cc-label" style={{ margin: 0 }}>
//                 Publish immediately
//               </p>
//               <p className="cc-hint" style={{ margin: 0 }}>
//                 Course will be visible to students right away.
//               </p>
//             </div>
//             <button
//               className={`cc-toggle ${published ? "cc-toggle--on" : ""}`}
//               onClick={() => setPublished((p) => !p)}
//               type="button"
//               aria-label="Toggle publish"
//             >
//               <span className="cc-toggle-knob" />
//             </button>
//           </div>
//         </div>

//         <div className="cc-actions">
//           <button className="cc-cancel-btn" onClick={handleCancel}>
//             Cancel
//           </button>
//           <button
//             className="cc-submit-btn"
//             onClick={handleSubmit}
//             disabled={success}
//           >
//             <i className="bi bi-plus-lg" />
//             Create Course
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateCourses;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coursesData } from "../ourcourses/OurCourses";
import "./CreateCourses.css";

function CreateCourses() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [errors, setErrors] = useState({});

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Course title is required.";
    if (!teacher.trim()) e.teacher = "Teacher name is required.";
    return e;
  };

  // ── Submit: create course and go to editor ─────────────────────────────────
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    // generate unique ID for URL  (same pattern as lms.horizontrax.com/teacher/courses/:id)
    const id = crypto.randomUUID();

    const newCourse = {
      id,
      title: title.trim(),
      teacher: teacher.trim(),
      price: 0,
      description: "",
      published: false,
      image: null,
      category: "",
      chapters: [],
    };

    // push into the shared array so OurCourses and CourseEditor can see it
    coursesData.push(newCourse);

    // navigate to the editor page with the unique ID in the URL
    navigate(`/admin-dashboard/courses/${id}`);
  };

  const handleCancel = () => navigate("/admin-dashboard/my-courses");

  // clear error on change
  const clearError = (key) =>
    setErrors((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });

  return (
    <div className="cc-wrapper">
      <div className="cc-card">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="cc-card-header">
          <h1 className="cc-title">Name your Course</h1>
          <p className="cc-subtitle">
            What would you like to name your course? Don't worry, you can change
            this later.
          </p>
        </div>

        {/* ── Form ────────────────────────────────────────────────────────── */}
        <div className="cc-form">
          {/* Course Title */}
          <div className="cc-field">
            <label className="cc-label">Course Title</label>
            <input
              className={`cc-input ${errors.title ? "cc-input--error" : ""}`}
              type="text"
              placeholder="e.g. 'Advanced Web Development'"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearError("title");
              }}
            />
            {errors.title ? (
              <span className="cc-error">{errors.title}</span>
            ) : (
              <span className="cc-hint">
                What will you teach in this course?
              </span>
            )}
          </div>

          {/* Teacher Name */}
          <div className="cc-field">
            <label className="cc-label">Teacher's Name</label>
            <input
              className={`cc-input ${errors.teacher ? "cc-input--error" : ""}`}
              type="text"
              placeholder="e.g. 'John Smith'"
              value={teacher}
              onChange={(e) => {
                setTeacher(e.target.value);
                clearError("teacher");
              }}
            />
            {errors.teacher ? (
              <span className="cc-error">{errors.teacher}</span>
            ) : (
              <span className="cc-hint">What is your name?</span>
            )}
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="cc-actions">
          <button className="cc-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="cc-submit-btn" onClick={handleSubmit}>
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCourses;