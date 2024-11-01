import React, { useEffect, useState } from "react";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";
import axios from "axios";
import { useParams } from "react-router-dom";

const CompanyReadmore = () => {
  const { username } = useParams(); // Get the username from the URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  // Fetch employee details
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getUserDetails/${username}`
      );
      setEmployee(response.data);
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
          <img src={cameraIcon} alt="Profile Photo" />
        </div>
        {error && <p className="error-message">{error}</p>}
        {employee ? (
          <>
            <p><b>Worker's Name:</b> {employee.name}</p>
            <p><b>Username:</b> {employee.username}</p>
            <p><b>Age:</b> {employee.age}</p>
            <p><b>Gender:</b> {employee.gender}</p>
            <p><b>Location:</b> {employee.location}</p>
            <p><b>Aadhar No:</b> {employee.aadhar}</p>
            <p><b>Email:</b> {employee.email}</p>
            <p><b>More information about worker:</b> {employee.about}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CompanyReadmore;
