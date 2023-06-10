import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import LoginStudent from "./pages/LoginStudent/LoginStudent";
import SignupMentee from "./pages/Signup/SignupMentee";
import SignupMentor from "./pages/Mentor/SignupMentor";
import FindPassword from "./pages/FindPassword/FindPassword";
import Home from "./pages/Home/Home";
import "./App.css";
import HomeMentor from "./pages/Mentor/HomeMentor";
import Setting from "./pages/Setting/Setting";
import ConsultMentor from "./pages/Mentor/ConsultMentor";
function App(props) {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentor/*" element={<HomeMentor />}>
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route path="/mentor/consult" element={<ConsultMentor />} />
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
