import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import LoginStudent from "./pages/LoginStudent/LoginStudent";
import SignupStudent from "./pages/SignupStudent/SignupStudent";
import FindPassword from "./pages/FindPassword/FindPassword";
import "./App.css";
function App(props) {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<LoginStudent />} />
          <Route path="/loginStudent" element={<LoginStudent />} />
          <Route path="/signStudent" element={<SignupStudent />} />
          <Route path="/home" element={<SignupStudent />} />
          <Route path="/findPassword" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
