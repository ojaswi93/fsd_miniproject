import React from "react";
import logopic from "../assets/logo.png";
import { Link } from "react-router-dom";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/Sidebar.jsx";
import Filters from "./my-components/Filters.jsx";
import Jobcards from "./my-components/Jobcards.jsx";

const CompanyHome = () => {
  const approve = (e) => {
    const button = e.target;
    button.innerHTML = "Approved!";
    button.disabled = true;
    button.style.cursor = "default";
    button.style.backgroundColor = "#d5bdaf";
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main-content">
        <h1>Welcome!</h1>
        <Filters />
        <div className="job-cards-container">
          <Jobcards approve={approve} />
          <Jobcards approve={approve} />
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
