import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarCompany.jsx";
import Filters from "./my-components/FiltersCompany.jsx";
import CandidateCards from "./my-components/CandidateCards.jsx";

const CompanyHome = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const approve = (e) => {
    const button = e.target;
    button.innerHTML = "Approved!";
    button.disabled = true;
    button.style.cursor = "default";
    button.style.backgroundColor = "#d5bdaf";
  };

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:3001/getCandidates");
      const data = await response.json();
      setCandidates(data);
      setFilteredCandidates(data); // Initialize filtered candidates
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleFilterChange = (area, genders) => {
    let filtered = candidates;

    if (area) {
      filtered = filtered.filter((candidate) => candidate.location === area);
    }

    if (genders.length > 0) {
      filtered = filtered.filter((candidate) =>
        genders.includes(candidate.gender)
      );
    }

    setFilteredCandidates(filtered);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main-content">
        <h1>Welcome!</h1>
        <Filters onFilterChange={handleFilterChange} />
        <div className="job-cards-container">
          {filteredCandidates.map((candidate) => (
            <CandidateCards
              key={candidate.username}
              approve={approve}
              candidate={candidate}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
