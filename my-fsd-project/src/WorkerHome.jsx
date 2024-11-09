import React, { useEffect, useState } from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx";
import axios from "axios";

const WorkerHome = () => {
  const [jobs, setJobs] = useState([]);
  const [jobStatus, setJobStatus] = useState({});
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getAllJobs");
        setJobs(response.data);

        response.data.forEach(async (job) => {
          try {
            const statusResponse = await axios.get(
              `http://localhost:3001/getApplicationStatus/${job._id}/${username}`
            );
            setJobStatus((prevStatus) => ({
              ...prevStatus,
              [job._id]: statusResponse.data.status,
            }));
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setJobStatus((prevStatus) => ({
                ...prevStatus,
                [job._id]: "not_applied",
              }));
            } else {
              console.error("Error fetching application status:", error);
            }
          }
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
        [jobId]: response.data.application.status,
      }));
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
        <div>
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              location={job.location}
              salary={job.salary}
              duration={job.duration}
              jobId={job._id}
              profilePhoto={job.profilePhoto}
              apply={() => apply(job._id)}
              status={jobStatus[job._id]}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WorkerHome;
