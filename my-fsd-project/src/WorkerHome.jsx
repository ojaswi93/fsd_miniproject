// workerhome.jsx
import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx";
import axios from "axios";

const WorkerHome = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the backend
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getAllJobs");
        console.log("Fetched jobs data:", response.data); // Log fetched data
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const apply = (e) => {
    const button = e.target;
    button.innerHTML = "Applied!";
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
        <FiltersWorker />
        <div>
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title} // Ensure this matches the property name in your job objects
              location={job.location}
              salary={job.salary}
              duration={job.duration}
              jobId={job._id}
              apply={apply}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WorkerHome;
