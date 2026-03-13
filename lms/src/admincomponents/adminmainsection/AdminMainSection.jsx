import React from "react";
import { Route, Routes } from "react-router-dom";
import "./AdminMainSection.css";
import CreateCourses from "../../adminpages/createcourse/CreateCourses";
import OurCourses from "../../adminpages/ourcourses/OurCourses";
import AdminHeader from "../../adminpages/adminheader/AdminHeader";
import Analytics from "../../adminpages/analytics/Analytics";
import CourseEditor from "../../adminpages/courseeditor/CourseEditor";
import CreateMocktest from "../../adminpages/createmocktest/CreateMocktest";
import AdminInterface from "../../adminpages/admininterface/AdminInterface";
import CoursePlayer from "../../adminpages/courseplayer/CoursePlayer";

function AdminMainSection({ sidebarOpen, onToggleSidebar, onEnterAdmin }) {
  return (
    <div>
      <AdminHeader
        sidebarOpen={sidebarOpen}
        onEnterAdmin={onEnterAdmin}
        onToggleSidebar={onToggleSidebar}
      />
      <Routes>
        <Route path="admin-interface" element={<AdminInterface />} />
        <Route path="create-course" element={<CreateCourses />} />
        <Route path="my-courses" element={<OurCourses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="courses/:courseId" element={<CourseEditor />} />
        <Route path="assessment" element={<CreateMocktest />} />
        <Route path="learn/:courseId" element={<CoursePlayer />} />
      </Routes>
    </div>
  );
}

export default AdminMainSection;
