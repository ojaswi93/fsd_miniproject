import React, { useState } from "react";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const EmployerRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({...formData, [id]: value});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="container2">
      <div className="login-box">
        <div className="login-left">
          <h2 className="login-title">Register Your Company</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="companyName" className="input-label">Company Name</label>
              <input  type="text" 
                      id="companyName" 
                      className="login-input" 
                      placeholder="Enter company name" 
                      value={formData.companyName} 
                      onChange={handleChange} 
                      required
              />
            </div>
            <div className="input-box">
              <label htmlFor="location" className="input-label">Location</label>
              <input  type="text"
                      id="location"
                      className="login-input"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleChange}
                      required
              />
            </div>
            <div className="input-box">
              <label htmlFor="username" className="input-label">Username</label>
              <input  type="text"
                      id="username"
                      className="login-input"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      required
              />
            </div>
            <div className="input-box">
              <label htmlFor="email" className="input-label">Email</label>
              <input  type="email"
                      id="email"
                      className="login-input"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
              />
            </div>
            <div className="input-box">
              <label htmlFor="password" className="input-label">Password</label>
              <div style={{position : 'relative'}}>
                <input  type={showPassword ? "text" : "password"}
                        id="password"
                        className="login-input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                />
                <i  className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                    onClick={togglePasswordVisibility} 
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                />
              </div>
            </div>
            <button type="submit" className="login-btn">Register</button>

            <p className="create-account">
              Already have an account?
              <a href="#" className="create-account-link">Sign in</a>
            </p>
          </form>
        </div>

        <div className="login-right"></div>
      </div>
    </div>
  );
};

export default EmployerRegistration;