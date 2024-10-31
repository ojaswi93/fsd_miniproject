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
            <p>Worker's Name: {employee.name}</p>
            <p>Username: {employee.username}</p>
            <p>Age: {employee.age}</p>
            <p>Gender: {employee.gender}</p>
            <p>Location: {employee.location}</p>
            <p>Aadhar No: {employee.aadhar}</p>
            <p>Email: {employee.email}</p>
            <p>More information about worker: {employee.about}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CompanyReadmore;
