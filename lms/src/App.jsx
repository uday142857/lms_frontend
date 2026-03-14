import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideNav from "./components/sidenav/SideNav";
import MainSection from "./components/mainsection/MainSection";
import { Route, Routes ,Navigate} from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage";
import AdminDashBoard from "./admincomponents/admindashboard/AdminDashBoard";
import UserDashboard from "./components/userdashboard/UserDashboard";
import CoursePlayer from "./adminpages/courseplayer/CoursePlayer";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/learn/:courseId" element={<CoursePlayer/>} />
      <Route
        path="/admin-dashboard/*"
        element={
          isAdmin ? (
            <AdminDashBoard onBack={() => setIsAdmin(false)} />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/*"
        element={<UserDashboard onEnterAdmin={() => setIsAdmin(true)} />}
      />
    </Routes>
  );
}

export default App;

// import { Route, Routes } from "react-router-dom";
// import LandingPage from "./components/landingpage/LandingPage";
// import AdminDashBoard from "./admincomponents/admindashboard/AdminDashBoard";
// import UserDashboard from "./components/userdashboard/UserDashboard";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />

//       <Route path="/dashboard/*" element={<UserDashboard />} />

//       <Route path="/admin-dashboard" element={<AdminDashBoard />} />
//     </Routes>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import "./App.css";
// import { Route, Routes, Navigate } from "react-router-dom";
// import LandingPage from "./components/landingpage/LandingPage";
// import AdminDashBoard from "./admincomponents/admindashboard/AdminDashBoard";
// import UserDashboard from "./components/userdashboard/UserDashboard";
// import CoursePlayer from "./adminpages/courseplayer/CoursePlayer";

// function App() {
 
//   const [isAdmin, setIsAdmin] = useState(
//     () => localStorage.getItem("ht_is_admin") === "true",
//   );

//   const enterAdmin = () => {
//     localStorage.setItem("ht_is_admin", "true");
//     setIsAdmin(true);
//   };

//   const exitAdmin = () => {
//     localStorage.setItem("ht_is_admin", "false");
//     setIsAdmin(false);
//   };

//   return (
//     <Routes>
     
//       <Route path="/" element={<LandingPage />} />

      
//       <Route path="/learn/:courseId" element={<CoursePlayer />} />

  
//       <Route
//         path="/admin-dashboard/*"
//         element={
//           isAdmin ? (
//             <AdminDashBoard onBack={exitAdmin} />
//           ) : (
//             <Navigate to="/dashboard" replace />
//           )
//         }
//       />

     
//       <Route path="/*" element={<UserDashboard onEnterAdmin={enterAdmin} />} />
//     </Routes>
//   );
// }

// export default App;