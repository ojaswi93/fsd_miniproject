import React from "react";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.png";

const CandidateCards = ({ approve, reject, application, disabled }) => {
  const isDisabled = ["approved", "rejected"].includes(application.status);
  const isApproved = application.status === "approved";
  const isRejected = application.status === "rejected";

  return (
    <div className="job-cards">
      <img
        src={
          application.workerProfilePhoto
            ? `http://localhost:3001${application.workerProfilePhoto}`
            : logopic
        }
        alt="Profile"
        className="logo-img"
      />
      <p>Name: {application.username}</p>
      <p>Job Title: {application.jobId.jobTitle}</p>
      <Link
        to={`/company-readmore/${application.username}/${application.jobId}`}
        className="read-more"
      >
        Read More....
      </Link>
      <button
        className={`approve-btn ${disabled || isDisabled ? "disabled" : ""}`}
        onClick={approve}
        disabled={disabled || isDisabled}
      >
        {isApproved ? "Approved" : "Approve"}
      </button>
      <button
        className={`approve-btn ${disabled || isDisabled ? "disabled" : ""}`}
        onClick={reject}
        disabled={disabled || isDisabled}
      >
        {isRejected ? "Rejected" : "Reject"}
      </button>
    </div>
  );
};

export default CandidateCards;
