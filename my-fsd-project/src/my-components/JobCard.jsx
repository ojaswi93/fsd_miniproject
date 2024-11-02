import React, { useState } from "react";
import logopic from "../assets/logo.png";

const JobCard = ({
  title,
  location,
  salary,
  duration,
  jobId,
  profilePhoto,
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

  const getButtonStyle = () => {
    if (status === "pending") {
      return {
        backgroundColor: "#d5bdaf", // Orange for pending
        cursor: "not-allowed",
      };
    } else if (status === "approved") {
      return {
        backgroundColor: "#d5bdaf", // Green for approved
        cursor: "not-allowed",
      };
    } else {
      return {
        backgroundColor: "#f5ebe0", // Default color for apply
        cursor: applying ? "not-allowed" : "pointer",
      };
    }
  };

  return (
    <div className="main-content">
      <div className="job-box">
        <div className="job-logo">
          <img
            src={profilePhoto ? `http://localhost:3001${profilePhoto}` : logopic}
            alt="Company Logo"
            className="logo-img"
          />
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
            style={getButtonStyle()}
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
