import React from "react";
import "./MainSection.css";
import { Route, Routes } from "react-router";
import Header from "../header/Header";
import RouteSection from "../routesection/RouteSection";
import AllCourse from "../allcourse/AllCourse";
import Shop from "../shop/Shop";
import Leaderboard from "../leaderboard/Leaderboard";
import MockTestPage from "../mocktestpage/MockTestPage";
import PopularVideos from "../popularvideos/PopularVideos";

function MainSection({ sidebarOpen, onToggleSidebar }) {
  return (
    <div>
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} />
      <Routes>
        <Route path="/" element={<RouteSection />} />
        <Route path="/course" element={<AllCourse />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/mocktest" element={<MockTestPage />} />
        <Route path="/popular-videos" element={<PopularVideos />} />
      </Routes>
    </div>
  );
}

export default MainSection;