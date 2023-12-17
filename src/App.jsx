import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import LoginStudent from "./pages/LoginStudent/LoginStudent";
import SignupMentee from "./pages/Mentee/Signup";
import SignupMentor from "./pages/Mentor/Signup";
import FindPassword from "./pages/FindPassword/FindPassword";
import Home from "./pages/Home/Home";
import "./App.css";
import HomeMentor from "./pages/Mentor/Home";
import Setting from "./pages/Mentor/Setting";
import ProfileMentor from "./pages/Mentor/Profile";
import ConsultMentor from "./pages/Mentor/consult/Consult";
import HomeMentee from "./pages/Mentee/Home";
import MenteeMentor from "./pages/Mentee/Mentor";
import Community from "./pages/Community/Community";
import CommunityWrite from "./pages/Community/CommunityWrite";
import Category from "./pages/Community/Category";
import CategoryPost from "./pages/Community/CategoryPost";
import MyActivity from "./pages/Community/MyActivity";
import PostDetail from "./pages/Community/PostDetail";
import Schedule from "./pages/Schedule";
import UpcomingConsult from "./pages/Mentor/consult/UpcomingConsult";
import PreviousConsult from "./pages/Mentor/consult/PreviousConsult";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<LoginStudent />} />
          <Route path="/mentor" element={<HomeMentor />} />
          <Route path="/mentor/setting" element={<Setting />} />
          <Route path="/mentor/profile" element={<ProfileMentor />} />
          <Route path="/mentor/consult" element={<ConsultMentor />} />
          <Route
            path="/mentor/consult/upcoming"
            element={<UpcomingConsult />}
          />
          <Route
            path="/mentor/consult/previous"
            element={<PreviousConsult />}
          />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/community/category" element={<Category />} />
          <Route
            exact
            path="/community/category/:id"
            element={<CategoryPost />}
          />
          <Route exact path="/community/write" element={<CommunityWrite />} />
          <Route exact path="/community/activity" element={<MyActivity />} />
          <Route exact path="/community/post/:id" element={<PostDetail />} />
          <Route path="/loginStudent" element={<LoginStudent />} />
          <Route path="/signMentee" element={<SignupMentee />} />
          <Route path="/home" element={<SignupMentee />} />
          <Route path="/signMentor" element={<SignupMentor />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/mentee" element={<HomeMentee />} />
          <Route path="/mentee/mentor" element={<MenteeMentor />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
