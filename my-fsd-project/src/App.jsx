import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./HomePage";
import EmployerRegistration from "./EmployerRegistration";
import EmployeeRegistration from "./EmployeeRegistration";
import Login from "./Login";
import CompanyHome from "./CompanyHome";
import CompanyProfile from "./CompanyProfile";
import CompanyPost from "./CompanyPost";
import CompanyReadmore from "./CompanyReadmore"; // Import should be fine
import WorkerHome from "./WorkerHome";
import WorkerReadmore from "./WorkerReadmore";
import WorkerProfile from "./WorkerProfile";
import WorkerApplication from "./WorkerApplication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Employer-Registration" element={<EmployerRegistration />} />
        <Route path="/Employee-Registration" element={<EmployeeRegistration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/company-home" element={<CompanyHome />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/company-post" element={<CompanyPost />} />
        <Route path="/company-readmore/:username/:jobId" element={<CompanyReadmore />} />
        <Route path="/worker-home" element={<WorkerHome />} />
        <Route path="/readmore/:jobId" element={<WorkerReadmore />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path="/worker-application" element={<WorkerApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
