import React, { useState } from 'react';
import logopic from "../assets/logo.png";
import axios from 'axios';

const JobCard = ({ title, location, salary, duration, jobId, status }) => {
    const [applying, setApplying] = useState(false); // State to manage applying status
    const [applied, setApplied] = useState(status === "applied"); // Check if already applied

    const handleApply = async () => {
      if (applied) return; // Prevent multiple applications
  
      setApplying(true); // Set applying state
      try {
          const response = await axios.post(`http://localhost:3001/applyForJob`, { jobId, username: localStorage.getItem("username") });
          if (response.data && response.data.application) {
              setApplied(true); // Update applied state
              alert(response.data.message); // Show success message
          } else {
              alert("Application failed. Please try again.");
          }
      } catch (error) {
          console.error("Error applying for the job:", error);
          alert("An error occurred while applying. Please try again.");
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
                </div>
                <div className="apply-button">
                    <button 
                        className="applyBtn" 
                        onClick={handleApply} 
                        disabled={applied || applying || status === "pending" || status === "approved"} // Disable if already applied or applying
                        style={{cursor: status === "pending" || status === "approved" ? "not-allowed" : "pointer"}}
                    >
                        {applying ? "Applying..." : (status == "pending" ? "Pending" : (status == "approved" ? "Approved" : "Apply"))}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
