import React from "react";
import Header from "./my-components/Header.jsx";
import SidebarWorker from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx"; // Ensure correct path and name

const WorkerHome = () => {
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
      <SidebarWorker />
      <main id="main-content">
        <h1>Welcome!</h1>
        <FiltersWorker />
        <JobCard apply={apply} />
      </main>
    </div>
  );
};

export default WorkerHome;
