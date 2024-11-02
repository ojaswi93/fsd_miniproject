import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx";
import axios from "axios";

const WorkerApplication = () => {
  const [jobs, setJobs] = useState([]); // Store the jobs applied by the worker
  const [jobStatuses, setJobStatuses] = useState({}); // Store each job's status
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchWorkerAppliedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getAppliedJobs/${username}`);
        const jobsData = response.data;
        setJobs(jobsData);

        // Fetch status for each job
        const statusPromises = jobsData.map(async (job) => {
          const statusResponse = await axios.get(`http://localhost:3001/getApplicationStatus/${job._id}/${username}`);
          return { jobId: job._id, status: statusResponse.data.status };
        });

        const statuses = await Promise.all(statusPromises);

        // Convert array of statuses to an object for easier access
        const statusMap = statuses.reduce((acc, { jobId, status }) => {
          acc[jobId] = status;
          return acc;
        }, {});
        setJobStatuses(statusMap);
      } catch (error) {
        console.error("Error fetching worker details or applied jobs:", error);
      }
    };

    if (username) fetchWorkerAppliedJobs(); // Only fetch if username is available
  }, [username]);

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main-content">
        <h1>Your Applications</h1>
        <FiltersWorker />
        <div>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                title={job.title}
                location={job.location}
                salary={job.salary}
                duration={job.duration}
                jobId={job._id}
                profilePhoto={job.profilePhoto}
                status={jobStatuses[job._id] || "Loading..."}
              />
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkerApplication;
