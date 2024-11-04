import React, { useEffect, useState } from "react";
import logopic from "./assets/logo.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";
import axios from "axios";
import { useParams } from "react-router-dom";

const CompanyReadmore = () => {
  const { username, jobId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    try {
      // Fetch employee details
      const employeeResponse = await axios.get(
        `http://localhost:3001/getUserDetails/${username}`
      );
      setEmployee(employeeResponse.data);

      // Fetch job details
      const jobResponse = await axios.get(
        `http://localhost:3001/getJobDetails/${jobId}`
      );
      setJob(jobResponse.data);

      console.log("Employee Details:", employeeResponse.data);
      console.log("Job Details:", jobResponse.data);
    } catch (err) {
      console.error("Error fetching details:", err.response || err.message);
      setError("Failed to fetch details.");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [username, jobId]);

  return (
    <div>
      <Header />
      <Sidebar />

      <main id="main-content">
        <h1>Worker and Job Details</h1>
        {error && <p className="error-message">{error}</p>}
        {employee ? (
          <>
            <div className="profile-photo">
              <img
                src={
                  employee.profilePhoto
                    ? `http://localhost:3001${employee.profilePhoto}`
                    : logopic
                }
                alt="Profile"
              />
            </div>
            <h2>Employee Details</h2>
            <p><b>Worker's First Name:</b> {employee.name}</p>
            {employee.lastname && <p><b>Worker's Last Name:</b> {employee.lastname}</p>}
            <p><b>Username:</b> {employee.username}</p>
            {employee.age && <p><b>Age:</b> {employee.age}</p>}
            {employee.gender && <p><b>Gender:</b> {employee.gender}</p>}
            {employee.location && <p><b>Location:</b> {employee.location}</p>}
            {employee.aadhar && <p><b>Aadhar No:</b> {employee.aadhar}</p>}
            <p><b>Email:</b> {employee.email}</p>
            {employee.about && <p><b>More information about worker:</b> {employee.about}</p>}
            <hr />
            {job ? (
              <>
                <h2>Job Details</h2>
                <p><b>Job Title:</b> {job.jobTitle}</p>
                <p><b>Area of Work:</b> {job.location}</p>
                <p><b>Duration:</b> {job.duration}</p>
                <p><b>Salary:</b> {job.salary}</p>
                <p><b>Job Description:</b> {job.description}</p>
              </>
            ) : (
              <p>Loading job details...</p>
            )}
          </>
        ) : (
          <p>Loading employee details...</p>
        )}
      </main>
    </div>
  );
};

export default CompanyReadmore;
