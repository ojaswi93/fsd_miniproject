import React, { useState } from "react";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setValidationErrors({ ...validationErrors, [id]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRedirection = () => {
    console.log("Navigating to login page");
    navigate("/Login");
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate Password using regex
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!formData.password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (!passwordPattern.test(formData.password)) {
      errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
      isValid = false;
    }

    // Validate Confirm Password
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    // Validate the form before submitting
    if (!validateForm()) {
      return; 
    }

    const { confirm_password, ...dataToSubmit } = formData; 

    axios
      .post("http://localhost:3001/registerworker", dataToSubmit) 
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
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="login-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
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
              {validationErrors.email && (
                <p className="error-message">{validationErrors.email}</p>
              )}
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
                {validationErrors.password && (
                  <p className="error-message">{validationErrors.password}</p>
                )}
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
                {validationErrors.confirm_password && (
                  <p className="error-message">{validationErrors.confirm_password}</p>
                )}
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

export default EmployeeRegistration;
