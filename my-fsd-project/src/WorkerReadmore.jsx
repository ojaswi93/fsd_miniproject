// WorkerReadmore.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarWorker.jsx";
import axios from "axios";

const WorkerReadmore = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get(`http://localhost:3001/getJobDetails/${jobId}`);
        setJobDetails(jobResponse.data);
        
        const companyResponse = await axios.get(`http://localhost:3001/getCompanyDetails/${jobResponse.data.companyId}`);
        setCompanyDetails(companyResponse.data);
      } catch (error) {
        console.error("Error fetching job or company details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails || !companyDetails) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Sidebar />

      <main id="main-content">
        <h1>Company and Job Details</h1>
        <div className="profile-photo">
          <img src={cameraIcon} alt="Profile Photo" />
        </div>
        <p>Company Name: {companyDetails.companyName}</p>
        <p>Company's Website Link: {companyDetails.websiteLink}</p>
        <p>Username: {companyDetails.username}</p>
        <p>Email ID: {companyDetails.email}</p>
        <p>Location: {companyDetails.location}</p>
        <p>Company's GST Number: {companyDetails.gstNumber}</p>
        <p>More Information About Company: {companyDetails.about}</p>
        <hr />
        <p>Job Title: {jobDetails.jobTitle}</p>
        <p>Area of Work: {jobDetails.location}</p>
        <p>Duration: {jobDetails.duration}</p>
        <p>Salary: {jobDetails.salary}</p>
        <p>Job Description: {jobDetails.description}</p>
      </main>
    </div>
  );
};

export default WorkerReadmore;
