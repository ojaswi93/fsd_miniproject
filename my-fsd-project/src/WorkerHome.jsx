import React from "react";
import Header from "./my-components/Header.jsx";
import Sidebar from "./my-components/SidebarWorker.jsx";
import FiltersWorker from "./my-components/FiltersWorker.jsx";
import JobCard from "./my-components/JobCard.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils.js";
import { ToastContainer } from "react-toastify";

const WorkerHome = () => {
  const navigate = useNavigate();
  const apply = (e) => {
    const button = e.target;
    button.innerHTML = "Applied!";
    button.disabled = true;
    button.style.cursor = "default";
    button.style.backgroundColor = "#d5bdaf";
  };
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    setTimeout(() => {
      navigate("/Login");
    }, 1000);
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <main id="main-content">
        <h1>Welcome {loggedInUser}!</h1>
        <FiltersWorker />
        <JobCard apply={apply} />
        <button onClick={handleLogout}>Logout</button>
      </main>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default WorkerHome;
