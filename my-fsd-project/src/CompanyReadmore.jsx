import React, { useEffect, useState } from "react";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";
import { useParams } from "react-router-dom";

const CompanyReadmore = () => {
  const { username } = useParams();
  const [workerDetails, setWorkerDetails] = useState(null);

  const fetchWorkerDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getUserDetails/${username}`
      );
      const data = await response.json();
      setWorkerDetails(data);
    } catch (error) {
      console.error("Error fetching worker details:", error);
    }
  };

  useEffect(() => {
    fetchWorkerDetails();
  }, [username]);

  return (
    <div>
      <Header />
      <Sidebar />

      <div id="main-content">
        <h1>Worker details</h1>
        {workerDetails ? (
          <>
            <div className="profile-photo">
              <img src={cameraIcon} alt="Profile Photo" />
            </div>
            <p>Worker's Name: {workerDetails.name}</p>
            <p>Username: {workerDetails.username}</p>
            <p>Age: {workerDetails.age}</p>
            <p>Gender: {workerDetails.gender}</p>
            <p>Location: {workerDetails.location}</p>
            <p>Aadhar No: {workerDetails.aadhar}</p>
            <p>Email: {workerDetails.email}</p>
            <p>More information about worker: {workerDetails.about}</p>
          </>
        ) : (
          <p>Loading worker details...</p>
        )}
      </div>
    </div>
  );
};

export default CompanyReadmore;
