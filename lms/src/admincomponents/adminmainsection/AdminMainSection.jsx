import React from 'react'
import { Route,Routes } from 'react-router-dom'
import "./AdminMainSection.css"
import CreateCourses from "../../adminpages/createcourse/CreateCourses"
import OurCourses from '../../adminpages/ourcourses/OurCourses'
import AdminHeader from '../../adminpages/adminheader/AdminHeader'
import Analytics from '../../adminpages/analytics/Analytics'
import CourseEditor from '../../adminpages/courseeditor/CourseEditor'

function AdminMainSection({ sidebarOpen, onToggleSidebar, onEnterAdmin }) {
  return (
    <div>
      <AdminHeader
        sidebarOpen={sidebarOpen}
        onEnterAdmin={onEnterAdmin}
        onToggleSidebar={onToggleSidebar}
      />
      <Routes>
        <Route path="create-course" element={<CreateCourses />} />
        <Route path="my-courses" element={<OurCourses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="courses/:courseId" element={<CourseEditor/>} />
      </Routes>
    </div>
  );
}

export default AdminMainSection