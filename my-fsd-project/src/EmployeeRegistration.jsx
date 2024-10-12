import React, { useState } from "react";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "./utils";
import { handleSuccess } from "./utils";

const EmployeeRegistration = () => {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", signupInfo);
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      console.log(result);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(nessage);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
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
                name="name"
                className="login-input"
                placeholder="Enter your name"
                value={signupInfo.name}
                onChange={handleChange}
                //required
              />
            </div>
            <div className="input-box">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="example@gmail.com"
                value={signupInfo.email}
                onChange={handleChange}
                //required
              />
            </div>
            <div className="input-box">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="login-input"
                  placeholder="Password"
                  value={signupInfo.password}
                  onChange={handleChange}
                  //required
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
          <ToastContainer></ToastContainer>
        </div>

        <div className="login-right"></div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
