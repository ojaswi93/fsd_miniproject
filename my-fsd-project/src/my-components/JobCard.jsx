// JobCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logopic from "../assets/logo.png";

const JobCard = ({ title, location, salary, duration, apply, jobId }) => {

  return (
    <div className="main-content">
      <div className="job-box">
        <div className="job-logo">
          <img src={logopic} alt="Logo" className="logo-img" />
        </div>
        <div className="job-details">
          <h2>{title}</h2>
          <p>Location: {location}</p>
          <p>Salary: {salary}</p>
          <p>Duration: {duration}</p>
          <a href={`/readmore/${jobId}`}>Read More</a>
        </div>
        <div className="apply-button">
            <button className="applybtn" onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
