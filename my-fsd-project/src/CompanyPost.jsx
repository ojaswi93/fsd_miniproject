import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";

const CompanyPost = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    duration: "",
    salary: "",
    description: "",
  });

  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          setError("Username not found in local storage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3001/getCompanyDetails/${username}`
        );

        if (response.data) {
          setCompanyId(response.data._id || "");
        } else {
          setError("Company details not found.");
        }
      } catch (error) {
        console.error("Error fetching company ID:", error);
        setError("Error fetching company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyId();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyId) {
      alert("Company ID is not available.");
      return;
    }

    const username = localStorage.getItem("username"); 
    if (!username) {
      alert("Username is not available in local storage.");
      return; 
    }

    try {
      const jobData = { ...formData, companyId, username };
      const response = await axios.post(
        "http://localhost:3001/postjob",
        jobData
      );

      if (response.status === 201) {
        console.log("Job posted successfully");
        alert("Job posted successfully");
        setFormData({
          jobTitle: "",
          location: "",
          duration: "",
          salary: "",
          description: "",
        });
      } else {
        console.error("Failed to post job");
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job. Please check the console for details.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />

      <div id="main-content">
        <h1>Job Post</h1>
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
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required 
                >
                  <option value="" disabled>
                    Select location
                  </option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required 
                >
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option value="2-3 days">2-3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2-3 weeks">2-3 weeks</option>
                  <option value="1 month">1 month</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="salary">
                  Salary (in Rs. for the complete task)
                </label>
                <input
                  type="number" 
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter the total salary for the job"
                  required 
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
                  required 
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
