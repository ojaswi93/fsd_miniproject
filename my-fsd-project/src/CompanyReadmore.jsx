import React, { useState } from "react";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";

const CompanyReadmore = () => {
  return (
    <div>
      <Header />
      <Sidebar />

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