import React from "react";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.png";

const CandidateCards = ({ approve, reject, application, disabled }) => {
  const isDisabled = ["approved", "rejected"].includes(application.status);

  return (
    <div className="job-cards">
      <img src={logopic} alt="Logo" />
      <p>Name: {application.username}</p>
      <p>Job Title: {application.jobId.jobTitle}</p>
      {/* Pass the username as a parameter */}
      <Link
        to={`/company-readmore/${application.username}`}
        className="read-more"
      >
        Read More....
      </Link>
      <button
        className={`approve-btn ${disabled || isDisabled ? "disabled" : ""}`}
        onClick={approve}
        disabled={disabled || isDisabled}
      >
        Approve
      </button>
      <button
        className={`approve-btn ${disabled || isDisabled ? "disabled" : ""}`}
        onClick={reject}
        disabled={disabled || isDisabled}
      >
        Reject
      </button>
    </div>
  );
};

export default CandidateCards;
