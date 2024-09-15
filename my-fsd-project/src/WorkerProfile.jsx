import React, { useState } from "react";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarWorker";
import cameraIcon from "./assets/cameraicon.png";

const WorkerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    location: "",
    gender: "",
    age: "",
    aadhar: "",
    about: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
  };

  return (
    <div>
      <Header></Header>
      <Sidebar></Sidebar>

      <div id="main-content">
        <h1>Edit your profile</h1>

        <div className="container">
          <label htmlFor="upload-photo">Upload your photo</label>
          <div className="profile-photo">
            <img src={cameraIcon} alt="Profile Photo" />
            <input type="file" id="upload-photo" accept="image/*" />
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email ID</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="aadhar">Aadhar Number</label>
                <input
                  type="text"
                  id="aadhar"
                  placeholder="Aadhar Number"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  placeholder="Enter some information about yourself"
                  value={formData.about}
                  onChange={handleInputChange}
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

export default WorkerProfile;
