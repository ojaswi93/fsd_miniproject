import React, { useState } from "react";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarWorker.jsx";

const WorkerReadmore = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <main id="main-content">
        <h1>Company and Job Details</h1>
        <div className="profile-photo">
          <img src={cameraIcon} alt="Profile Photo" />
        </div>
        <p>Company Name:</p>
        <p>Company's Website Link:</p>
        <p>Username:</p>
        <p>Email ID:</p>
        <p>Location:</p>
        <p>Company's GST Number:</p>
        <p>More Information About Company:</p>
        <hr />
        <p>Job Title:</p>
        <p>Area of Work:</p>
        <p>Duration:</p>
        <p>Salary:</p>
        <p>Job Description:</p>
      </main>
    </div>
  );
};

export default WorkerReadmore;