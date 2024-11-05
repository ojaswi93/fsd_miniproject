import React, { useState } from "react";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRedirection = () => {
    console.log("Navigating to Login page");
    navigate("/Login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  
    // Check for matching passwords
    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setErrorMessage(""); // Clear any other error message
  
    // Prepare data for submission
    const { confirm_password, ...dataToSubmit } = formData;
  
    axios
      .post("http://localhost:3001/registercompany", dataToSubmit)
      .then((result) => {
        console.log("Registration successful:", result);
        handleRedirection();
      })
      .catch((err) => {
        console.log("Registration error:", err);
        // Check for specific error message from server response
        if (err.response && err.response.data.message) {
          setErrorMessage("Username is already taken. Please choose another.");
        } else {
          setErrorMessage("Registration failed. Please try again.");
        }
      });
  };  

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="container2">
      <div className="login-box">
        <div className="login-left">
          <h2 className="login-title">Register Yourself</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="companyName" className="input-label">
                Employer/Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="login-input"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="location" className="input-label">
                Location
              </label>
              <select
                id="location"
                name="location"
                className="login-input"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Location
                </option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="login-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errorMessage.includes("Username is already taken") && (
              <p className="error-message">{errorMessage}</p>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="login-input"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="login-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="confirm_password" className="input-label">
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  className="login-input"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
                <i
                  className={`fa ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <button type="submit" className="login-btn">
              Register
            </button>

            <p className="create-account">
              Already have an account?
              <button className="create-account-link" onClick={handleLogin}>
                Sign in
              </button>
            </p>
          </form>
        </div>

        <div className="login-right"></div>
      </div>
    </div>
  );
};

export default EmployerRegistration;
