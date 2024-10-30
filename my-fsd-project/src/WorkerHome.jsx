import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx";
import axios from "axios";

const WorkerHome = () => {
  const [jobs, setJobs] = useState([]);
  const [jobStatus, setJobStatus] = useState({}); // Store status for each job
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getAllJobs");
        setJobs(response.data);

        // Fetch status for each job
        response.data.forEach(async (job) => {
          const statusResponse = await axios.get(
            `http://localhost:3001/getApplicationStatus/${job._id}/${username}`
          );
          setJobStatus((prevStatus) => ({
            ...prevStatus,
            [job._id]: statusResponse.data.status,
          }));
        });
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [username]);

  const apply = async (jobId) => {
    try {
      const response = await axios.post("http://localhost:3001/applyForJob", {
        jobId,
        username,
      });
      setJobStatus((prevStatus) => ({
        ...prevStatus,
        [jobId]: response.data.status,
      }));
      alert(response.data.message);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response.data.message);
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
              title={job.title}
              location={job.location}
              salary={job.salary}
              duration={job.duration}
              jobId={job._id}
              apply={() => apply(job._id)}
              status={jobStatus[job._id]} // Pass the status to JobCard
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WorkerHome;
