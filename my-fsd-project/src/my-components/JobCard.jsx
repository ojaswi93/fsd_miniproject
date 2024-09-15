import React from "react";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.png";

const JobCard = ({ apply }) => {
  return (
    <div className="job-box">
      <div className="job-logo">
        <img src={logopic} alt="Logo" className="logo-img" />
      </div>
      <div className="job-details">
        <h3>Job Title:</h3>
        <p>Location:</p>
        <p>Salary:</p>
        <p>Duration:</p>
        <a href="./worker-readmore.html" className="read-more">
          Read More....
        </a>
      </div>
      <div className="apply-button">
        <button className="applyBtn" onClick={apply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
