import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarCompany.jsx";
import Filters from "./my-components/FiltersCompany.jsx";
import CandidateCards from "./my-components/CandidateCards.jsx";
import axios from "axios";

const CompanyHome = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch applications
  const fetchApplications = async () => {
    const companyUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `http://localhost:3001/getApplicationsByCompany/${companyUsername}`
      );
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to fetch applications.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
          {error && <p className="error-message">{error}</p>}
          {applications.map((application) => (
            <CandidateCards
              key={application._id}
              approve={approve}
              application={application}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
