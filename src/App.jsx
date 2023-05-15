import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import LoginStudent from "./pages/LoginStudent/LoginStudent";
import SignupStudent from "./pages/SignupStudent/SignupStudent";
import SignupTutor from "./pages/SignupTutor/SignupTutor";
import FindPassword from "./pages/FindPassword/FindPassword";
import Tutor from "./pages/Tutor/Tutor";
import "./App.css";

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<Tutor />} />
          <Route path="/loginStudent" element={<LoginStudent />} />
          <Route path="/signStudent" element={<SignupStudent />} />
          <Route path="/home" element={<SignupStudent />} />
          <Route path="/signTutor" element={<SignupTutor />} />
          <Route path="/findPassword" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
