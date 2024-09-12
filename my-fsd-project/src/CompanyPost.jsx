import React, { useState } from "react";
import logo from "./assets/logo.png";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./Header";
import { Link } from "react-router-dom";

const CompanyPost = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    duration: "",
    salary: "",
    description: "",
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to handle form submission, like making a POST request
  };

  return (
    <div>
      <Header></Header>
      <aside id="sidebar" className={isSidebarCollapsed ? "collapsed" : ""}>
        <button id="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button>
        <ul>
          <li>
            <Link to="/company-home">Home</Link>
          </li>
          <li>
            <Link to="/company-profile">Profile</Link>
          </li>
          <li>
            <Link to="/company-post">Post</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </aside>

      <div id="main-content">
        <h1>Job post</h1>
        <div className="container">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter a job title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter area of work"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration of work"
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="text"
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter the total salary for the job"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">Job Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter all the details of the job, specifics"
                ></textarea>
              </div>
            </div>

            <div className="form-row">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyPost;
