import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import LoginStudent from "./pages/LoginStudent/LoginStudent";
import SignupMentee from "./pages/Signup/SignupMentee";
import SignupMentor from "./pages/Mentor/Signup";
import FindPassword from "./pages/FindPassword/FindPassword";
import Home from "./pages/Home/Home";
import "./App.css";
import HomeMentor from "./pages/Mentor/Home";
import Setting from "./pages/Mentor/Setting";
import ProfileMentor from "./pages/Mentor/Profile";
import ConsultMentor from "./pages/Mentor/Consult";
import HomeMentee from "./pages/Mentee/Home";
function App(props) {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentor" element={<HomeMentor />} />
          <Route path="/mentor/setting" element={<Setting />} />
          <Route path="/mentor/profile" element={<ProfileMentor />} />
          <Route path="/mentor/consult" element={<ConsultMentor />} />
          <Route path="/loginStudent" element={<LoginStudent />} />
          <Route path="/signMentee" element={<SignupMentee />} />
          <Route path="/home" element={<SignupMentee />} />
          <Route path="/signMentor" element={<SignupMentor />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/mentee" element={<HomeMentee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
