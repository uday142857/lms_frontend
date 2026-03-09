import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideNav from "./components/sidenav/SideNav";
import MainSection from "./components/mainsection/MainSection";
import { Route, Routes ,Navigate} from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage";
import AdminDashBoard from "./admincomponents/admindashboard/AdminDashBoard";
import UserDashboard from "./components/userdashboard/UserDashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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