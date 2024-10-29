import React from "react";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.png";

const CandidateCards = ({ approve, candidate }) => {
  return (
    <div className="job-cards">
      <img src={logopic} alt="Logo" />
      <p>Name: {candidate.name}</p>
      <p>Location: {candidate.location}</p>
      <Link
        to={`/company-readmore/${candidate.username}`}
        className="read-more"
      >
        Read More....
      </Link>
      <button className="approve-btn" onClick={approve}>
        Approve
      </button>
    </div>
  );
};

export default CandidateCards;
