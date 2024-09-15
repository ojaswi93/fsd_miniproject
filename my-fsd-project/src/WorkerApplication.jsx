import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported from react-router-dom
import Header from "./my-components/Header.jsx";
import SidebarWorker from "./my-components/SidebarWorker.jsx";
import logopic from "./assets/logo.png"; // Ensure you import the logo image

const WorkerApplication = () => {
  // Define the apply function if it's required
  const apply = () => {
    console.log("Button clicked!");
  };

  return (
    <>
      <Header />
      <SidebarWorker />
      <main id="main-content">
        <h1>Your Application Status</h1>
        <div className="job-box">
          <div className="job-logo">
            <img src={logopic} alt="Logo" className="logo-img" />
          </div>
          <div className="job-details">
            <h3>Job Title:</h3>
            <p>Location:</p>
            <p>Salary:</p>
            <p>Duration:</p>
            <Link to="/worker-readmore" className="read-more">
              Read More....
            </Link>
          </div>
          <div className="apply-button">
            <button className="applyBtn" onClick={apply} disabled>
              Approved!
            </button>
          </div>
        </div>
        <div className="job-box">
          <div className="job-logo">
            <img src={logopic} alt="Logo" className="logo-img" />
          </div>
          <div className="job-details">
            <h3>Job Title:</h3>
            <p>Location:</p>
            <p>Salary:</p>
            <p>Duration:</p>
            <Link to="/worker-readmore" className="read-more">
              Read More....
            </Link>
          </div>
          <div className="apply-button">
            <button className="applyBtn" onClick={apply} disabled>
              Pending
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkerApplication;
