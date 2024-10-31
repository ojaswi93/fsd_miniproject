import React, { useState } from "react";
import logopic from "../assets/logo.png";
import axios from "axios";

const JobCard = ({
  title,
  location,
  salary,
  duration,
  jobId,
  status,
  apply,
}) => {
  const [applying, setApplying] = useState(false); // State to manage applying status

  const handleApply = async () => {
    if (status === "pending" || status === "approved") return; // Prevent multiple applications

    setApplying(true); // Set applying state
    try {
      await apply(jobId);
    } catch (error) {
      console.error("Error applying for the job:", error);
    } finally {
      setApplying(false); // Reset applying state
    }
  };

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
            onClick={handleApply}
            disabled={applying || status === "pending" || status === "approved"} // Disable if already applied or applying
            style={{
              cursor:
                status === "pending" || status === "approved"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {applying
              ? "Applying..."
              : status === "pending"
              ? "Pending"
              : status === "approved"
              ? "Approved"
              : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
