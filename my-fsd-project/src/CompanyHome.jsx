import React from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarCompany.jsx";
import Filters from "./my-components/FiltersCompany.jsx";
import CandidateCards from "./my-components/CandidateCards.jsx";

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
          <CandidateCards approve={approve} />
          <CandidateCards approve={approve} />
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
