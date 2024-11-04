import React, { useEffect, useState } from "react";
import logopic from "./assets/logo.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";
import axios from "axios";
import { useParams } from "react-router-dom";

const CompanyReadmore = () => {
  const { username } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getUserDetails/${username}`
      );
      setEmployee(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching employee details:", err);
      setError("Failed to fetch employee details.");
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [username]);

  return (
    <div>
      <Header />
      <Sidebar />
      <div id="main-content">
        <h1>Worker Details</h1>
        <div className="profile-photo">
          <img src={employee?.profilePhoto ? `http://localhost:3001${employee.profilePhoto}` : logopic} alt="Profile Photo" />
        </div>
        {error && <p className="error-message">{error}</p>}
        {employee ? (
          <>
            <p><b>Worker's First Name:</b> {employee.name}</p>
            {employee.lastname && <p><b>Worker's Last Name:</b> {employee.lastname}</p>}
            <p><b>Username:</b> {employee.username}</p>
            {employee.age && <p><b>Age:</b> {employee.age}</p>}
            {employee.gender && <p><b>Gender:</b> {employee.gender}</p>}
            {employee.location && <p><b>Location:</b> {employee.location}</p>}
            {employee.aadhar && <p><b>Aadhar No:</b> {employee.aadhar}</p>}
            <p><b>Email:</b> {employee.email}</p>
            {employee.about && <p><b>More information about worker:</b> {employee.about}</p>}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CompanyReadmore;
