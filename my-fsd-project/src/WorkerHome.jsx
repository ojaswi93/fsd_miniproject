import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx";
import axios from "axios";

const WorkerHome = () => {
  const [jobs, setJobs] = useState([]);
  const username = localStorage.getItem("username"); // Get username from local storage

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getAllJobs");
        console.log("Fetched jobs data:", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const apply = async (jobId) => {
    try {
      const response = await axios.post("http://localhost:3001/applyForJob", {
        jobId,
        username, // Send username along with jobId
      });
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response.data.message); // Display error message
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main-content">
        <h1>Welcome!</h1>
        <FiltersWorker />
        <div>
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.jobTitle}
              location={job.location}
              salary={job.salary}
              duration={job.duration}
              jobId={job._id}
              apply={() => apply(job._id)} // Pass jobId to apply function
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WorkerHome;
