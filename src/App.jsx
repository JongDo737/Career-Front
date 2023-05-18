import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import LoginStudent from "./pages/LoginStudent/LoginStudent";
import SignupMentee from "./pages/Signup/SignupMentee";
import SignupMentor from "./pages/Signup/SignupMentor";
import FindPassword from "./pages/FindPassword/FindPassword";
import Tutor from "./pages/Tutor/Tutor";
import "./App.css";
import HomeMentor from "./pages/Home/HomeMentor";

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<Tutor />} />
          <Route path="/mentor" element={<HomeMentor />} />
          <Route path="/loginStudent" element={<LoginStudent />} />
          <Route path="/signMentee" element={<SignupMentee />} />
          <Route path="/home" element={<SignupMentee />} />
          <Route path="/signMentor" element={<SignupMentor />} />
          <Route path="/findPassword" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
