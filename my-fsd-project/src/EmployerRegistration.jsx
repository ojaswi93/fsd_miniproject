import React, { useState } from "react";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    console.log("Form Data Submitted: ", formData);
    setErrorMessage("");
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
              <input
                type="text"
                id="location"
                className="login-input"
                placeholder="Location"
                value={formData.location}
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
                className="login-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
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
