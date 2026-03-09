// import React, { useState } from "react";
// import SideNav from "../sidenav/SideNav";
// import MainSection from "../mainsection/MainSection";
// import { Route, Routes } from "react-router-dom";

// function UserDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/*"
//           element={
//             <div className="main">
//               <div
//                 className={`sidebar-overlay ${sidebarOpen ? "sidebar-overlay--visible" : ""}`}
//                 onClick={() => setSidebarOpen(false)}
//               />

//               <div className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
//                 <SideNav onClose={() => setSidebarOpen(false)} />
//               </div>

//               <div className="main-section">
//                 <MainSection
//                   adminDashOpen={() => setAdminDashOpen((prev) => !prev)}
//                   sidebarOpen={sidebarOpen}
//                   onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
//                 />
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default UserDashboard;

import React, { useState } from "react";
import SideNav from "../sidenav/SideNav";
import MainSection from "../mainsection/MainSection";
import "./UserDashboard.css"

function UserDashboard({ onEnterAdmin }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main">
      <div
        className={`sidebar-overlay ${
          sidebarOpen ? "sidebar-overlay--visible" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <SideNav onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="main-section">
        <MainSection
          sidebarOpen={sidebarOpen}
          onEnterAdmin={onEnterAdmin}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default UserDashboard;