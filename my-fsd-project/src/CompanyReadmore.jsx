import React, { useState } from "react";
import logo from "./assets/logo.png";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./Header";
import { Link } from "react-router-dom";

const CompanyReadmore = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div>
      <Header></Header>
      <aside id="sidebar" className={isSidebarCollapsed ? "collapsed" : ""}>
        <button id="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button>
        <ul>
          <li>
            <Link to="/company-home">Home</Link>
          </li>
          <li>
            <Link to="/company-profile">Profile</Link>
          </li>
          <li>
            <Link to="/company-post">Post</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </aside>

      <div id="main-content">
        <h1>Worker details</h1>
        <div className="profile-photo">
          <img src={cameraIcon} alt="Profile Photo" />
        </div>
        <p>Worker's Name:</p>
        <p>Username:</p>
        <p>Age:</p>
        <p>Gender:</p>
        <p>Location:</p>
        <p>Aadhar No:</p>
        <p>Email:</p>
        <p>More information about worker:</p>
      </div>
    </div>
  );
};

export default CompanyReadmore;
