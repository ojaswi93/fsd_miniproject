import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Header from "./Header.jsx";
import HomePage from "./HomePage.jsx";
import EmployerRegistration from "./EmployerRegistration.jsx";
import EmployeeRegistration from "./EmployeeRegistration.jsx";
import Login from "./Login.jsx";
import CompanyHome from "./CompanyHome.jsx";
import CompanyProfile from "./CompanyProfile.jsx";
import CompanyPost from "./CompanyPost.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Employer-Registration"
          element={<EmployerRegistration />}
        />
        <Route
          path="/Employee-Registration"
          element={<EmployeeRegistration />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/company-home" element={<CompanyHome />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/company-post" element={<CompanyPost />} />
      </Routes>
    </Router>
  );
}

export default App;
