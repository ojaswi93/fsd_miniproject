import React from "react";
import logopic from "../assets/logo.png";

const JobCard = ({ title, location, salary, duration, jobId, apply, status }) => {
  console.log({ title, location, salary, duration, jobId, apply, status }); // Log props to verify
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
          <button
            className="applyBtn"
            onClick={apply}
            disabled={status === "pending" || status === "approved"}
            style={{cursor: status === "pending" || status === "approved" ? "not-allowed" : "pointer"}}
          >
            {status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;