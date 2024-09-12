import React, { useState } from "react";
import logo from "./assets/logo.png";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import { Link } from "react-router-dom";
import Sidebar from "./my-components/Sidebar";

const CompanyPost = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    duration: "",
    salary: "",
    description: "",
  });
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
      <Sidebar></Sidebar>

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
