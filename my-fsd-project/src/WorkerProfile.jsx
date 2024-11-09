import React, { useState, useEffect } from "react";
import axios from "axios";
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
    profilePhoto: "",
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(cameraIcon); 
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:3001/getUserDetails/${username}`
        );
        if (response.data) {
          setFormData({
            firstName: response.data.name || "",
            lastName: response.data.lastname || "",
            username: response.data.username || "",
            email: response.data.email || "",
            location: response.data.location || "",
            gender: response.data.gender || "",
            age: response.data.age || "",
            aadhar: response.data.aadhar || "",
            about: response.data.about || "",
            profilePhoto: response.data.profilePhoto || "",
          });

          setProfilePhotoUrl(
            response.data.profilePhoto
              ? `http://localhost:3001${response.data.profilePhoto}`
              : cameraIcon
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      const photoUrl = URL.createObjectURL(file);
      setProfilePhotoUrl(photoUrl); 
      setFormData((prevData) => ({ ...prevData, profilePhoto: photoUrl }));
    }
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
    if (profilePhotoFile) {
      formDataObj.append("profilePhoto", profilePhotoFile);
    }

    try {
      const username = localStorage.getItem("username");
      const response = await axios.put(
        `http://localhost:3001/updateUser/${username}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        console.log("User profile updated successfully");
        alert("Profile updated successfully");
      } else {
        console.error("Failed to update user profile");
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("An error occurred");
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate Age (should be between 18 and 100)
    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      errors.age = "Age should be between 18 and 100.";
      isValid = false;
    }

    // Validate Aadhar (should be exactly 12 digits)
    const aadharPattern = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/;
    if (formData.aadhar && !aadharPattern.test(formData.aadhar)) {
      errors.aadhar = "Aadhar number must be a 12-digit number.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div id="main-content">
        <h1>Edit your profile</h1>

        <div className="container">
          <label htmlFor="upload-photo">Upload your photo</label>
          <div className="profile-photo">
            <img
              src={profilePhotoUrl} 
              alt="Profile Photo"
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
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
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
                  required
                  disabled
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
                  onChange={handleInputChange}
                >
                  <option value="">Select Location</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
                {validationErrors.age && (
                  <p className="error-message">{validationErrors.age}</p>
                )}
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
                {validationErrors.aadhar && (
                  <p className="error-message">{validationErrors.aadhar}</p>
                )}
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
