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
    profilePhoto: "", // New field to store the image as a Base64 string
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

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
            profilePhoto: response.data.profilePhoto || "",
          });
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
      setFormData((prevData) => ({ ...prevData, profilePhoto: URL.createObjectURL(file) }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));
    if (profilePhoto) {
      formDataObj.append("profilePhoto", profilePhoto); // Add the actual file here
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
        <h1>Edit company's profile</h1>
        <div className="container">
          <label htmlFor="upload-photo">Upload your photo</label>
          <div className="profile-photo">
            <img src={formData.profilePhoto ? `http://localhost:3001${formData.profilePhoto}` : cameraIcon} alt="Profile Photo" style={{ width: "100px", height: "100px" }}/>
            <input type="file" id="upload-photo" accept="image/*" onChange={handleFileChange}/>
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
