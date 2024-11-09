import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarCompany.jsx";
import Filters from "./my-components/FiltersCompany.jsx";
import CandidateCards from "./my-components/CandidateCards.jsx";
import axios from "axios";

const CompanyHome = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState({});

  // Function to fetch applications
  const fetchApplications = async () => {
    const companyUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `http://localhost:3001/getApplicationsByCompany/${companyUsername}`
      );
      setApplications(response.data);
      console.log("Fetched Applications : ", response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to fetch applications.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:3001/updateApplicationStatus/${applicationId}`,
        { status }
      );
      fetchApplications(); // Refresh the list after updating the status
    } catch (err) {
      console.error("Error updating application status:", err);
      setError("Failed to update application status.");
    }
  };

  const handleButtonClick = (applicationId, status) => {
    updateStatus(applicationId, status);
    setDisabledButtons((prev) => ({
      ...prev,
      [applicationId]: true,
    }));
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main-content">
        <h1>Welcome!</h1>
        <div className="job-cards-container">
          {error && <p className="error-message">{error}</p>}
          {applications.map((application) => (
            <CandidateCards
              key={application._id}
              approve={() => handleButtonClick(application._id, "approved")}
              reject={() => handleButtonClick(application._id, "rejected")}
              application={application}
              disabled={disabledButtons[application._id] || false}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
