import React from "react";
import { useNavigate } from "react-router-dom";
import logopic from "../assets/logo.png";

const JobCard = ({ title, location, salary, duration, apply, jobId }) => {
  console.log({ title, location, salary, duration, jobId }); // Log props to verify
  return (
    <div className="main-content">
      <div className="job-box">
        <div className="job-logo">
          <img src={logopic} alt="Logo" className="logo-img" />
        </div>
        <div className="job-details">
          <h3>Title: {title}</h3>
          <p>Location: {location}</p>
          <p>Salary: {salary}</p>
          <p>Duration: {duration}</p>
          <a href={`/readmore/${jobId}`} className="read-more">
            Read More
          </a>
        </div>
        <div className="apply-button">
          <button className="applyBtn" onClick={apply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
