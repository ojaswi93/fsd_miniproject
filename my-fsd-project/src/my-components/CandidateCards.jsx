import React from "react";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.png";

const CandidateCards = ({ approve, application }) => {
  return (
    <div className="job-cards">
      <img src={logopic} alt="Logo" />
      <p>Name: {application.username}</p>{" "}
      {/* Display the candidate's username */}
      <p>Job Title: {application.jobId.jobTitle}</p>{" "}
      {/* Display the job title */}
      <Link to="/company-readmore" className="read-more">
        Read More....
      </Link>
      <button className="approve-btn" onClick={approve}>
        Approve
      </button>
    </div>
  );
};

export default CandidateCards;
