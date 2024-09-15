import React from "react";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.png";

const CandidateCards = ({ approve }) => {
  return (
    <div className="job-cards">
      <img id="logo" src={logopic} alt="Logo" />
      <p>About:</p>
      <p>Location:</p>
      <Link to="/company-readmore" className="read-more">Read More....</Link>
      <button className="approve-btn" onClick={approve}>
        Approve
      </button>
    </div>
  );
};

export default CandidateCards;
