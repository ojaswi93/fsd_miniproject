import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logopic from "./assets/logo.png";
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
        const jobResponse = await axios.get(
          `http://localhost:3001/getJobDetails/${jobId}`
        );
        setJobDetails(jobResponse.data);

        // Log the jobResponse to check the data received
        console.log("Job Response:", jobResponse.data);

        // Correctly extract companyId
        const companyId = jobResponse.data.companyId._id || jobResponse.data.companyId;

        // Log the companyId to ensure it is correct
        console.log("Company ID:", companyId);

        const companyResponse = await axios.get(
          `http://localhost:3001/getCompanyDet/${companyId}`
        );
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
          <img src={companyDetails.profilePhoto ? `http://localhost:3001${companyDetails.profilePhoto}` : logopic} alt="Profile Photo" />
        </div>
        <h2>Employer Details</h2>
        <p><b>Employer Name:</b> {companyDetails.companyName}</p>
        {companyDetails.websiteLink && <p><b>Employer Website Link:</b> <a href={companyDetails.websiteLink} target="_blank">{companyDetails.websiteLink}</a></p>}
        <p><b>Username:</b> {companyDetails.username}</p>
        <p><b>Email ID:</b> {companyDetails.email}</p>
        <p><b>Location:</b> {companyDetails.location}</p>
        {companyDetails.gstNumber && <p><b>Company's GST Number:</b> {companyDetails.gstNumber}</p>}
        {companyDetails.about && <p><b>More Information About Company:</b> {companyDetails.about}</p>}
        <hr />
        <h2>Job Details</h2>
        <p><b>Job Title:</b> {jobDetails.jobTitle}</p>
        <p><b>Area of Work:</b> {jobDetails.location}</p>
        <p><b>Duration:</b> {jobDetails.duration}</p>
        <p><b>Salary:</b> {jobDetails.salary}</p>
        <p><b>Job Description:</b> {jobDetails.description}</p>
      </main>
    </div>
  );
};

export default WorkerReadmore;
