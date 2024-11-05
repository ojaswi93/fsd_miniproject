import React, { useState, useEffect } from "react";
import axios from "axios";
import cameraIcon from "./assets/cameraicon.png";
import Header from "./my-components/Header";
import Sidebar from "./my-components/SidebarCompany";

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    websiteLink: "",
    username: "",
    email: "",
    location: "",
    gstNumber: "",
    about: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(cameraIcon);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:3001/getCompanyDetails/${username}`
        );
        if (response.data) {
          setFormData({
            companyName: response.data.companyName || "",
            websiteLink: response.data.websiteLink || "",
            username: response.data.username || "",
            email: response.data.email || "",
            location: response.data.location || "",
            gstNumber: response.data.gstNumber || "",
            about: response.data.about || "",
          });
          setProfilePhotoUrl(
            response.data.profilePhoto
              ? `http://localhost:3001${response.data.profilePhoto}`
              : cameraIcon
          );
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const photoUrl = URL.createObjectURL(file);
      setProfilePhotoUrl(photoUrl);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate Website Link (URL pattern)
    const websitePattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;
    if (formData.websiteLink && !websitePattern.test(formData.websiteLink)) {
      errors.websiteLink = "Please enter a valid website URL.";
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate GST Number (assuming Indian GST format)
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    if (formData.gstNumber && !gstPattern.test(formData.gstNumber)) {
      errors.gstNumber = "Please enter a valid GST number.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataObj.append(key, formData[key])
    );
    if (profilePhoto) {
      formDataObj.append("profilePhoto", profilePhoto);
    }

    try {
      const username = localStorage.getItem("username");
      const response = await axios.put(
        `http://localhost:3001/updateCompany/${username}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        console.log("Company profile updated successfully");
        alert("Profile Updated Successfully");
      } else {
        console.error("Failed to update company profile");
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
      alert("An error occurred");
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div id="main-content">
        <h1>Edit Company's Profile</h1>
        <div className="container">
          <label htmlFor="upload-photo">Upload your photo</label>
          <div className="profile-photo">
            <img
              src={profilePhotoUrl}
              alt="Profile"
              style={{ width: "100px", height: "100px" }}
            />
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="websiteLink">Company Website Link</label>
                <input
                  type="text"
                  id="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  placeholder="Enter company's website link"
                />
                {validationErrors.websiteLink && (
                  <p className="error-message">{validationErrors.websiteLink}</p>
                )}
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
                  disabled
                  required
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
                  required
                />
                {validationErrors.email && (
                  <p className="error-message">{validationErrors.email}</p>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gstNumber">GST Number</label>
                <input
                  type="text"
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="Enter the company's GST number"
                />
                {validationErrors.gstNumber && (
                  <p className="error-message">{validationErrors.gstNumber}</p>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Enter some information about the company"
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
