import React, { useState } from "react";
import logo from "./assets/logo.png";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./Header";
import { Link } from "react-router-dom";

const CompanyProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    websiteLink: "",
    username: "",
    email: "",
    location: "",
    gstNumber: "",
    about: "",
  });

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
    console.log(formData);
  };

  return (
    <div>
      <Header></Header>

      <div id="sidebar" className={sidebarCollapsed ? "collapsed" : ""}>
        <button id="menu-btn" onClick={handleSidebarToggle}>
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
      </div>

      <div
        id="main-content"
        style={{
          marginLeft: sidebarCollapsed
            ? "var(--sidebar-width-collapsed)"
            : "var(--sidebar-width)",
        }}
      >
        <h1>Edit company's profile</h1>
        <div className="container">
          <label htmlFor="upload-photo">Upload your photo</label>
          <div className="profile-photo">
            <img src={cameraIcon} alt="Profile Photo" />
            <input type="file" id="upload-photo" accept="image/*" />
          </div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="website-link">Company Website Link</label>
                <input
                  type="text"
                  id="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  placeholder="Enter company's website link"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email ID</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gst-number">GST Number</label>
                <input
                  type="text"
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="Enter the company's GST number"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Enter some information about yourself"
                />
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

export default CompanyProfile;
