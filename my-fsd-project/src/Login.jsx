import React, { useState } from "react";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "./utils";
import { handleSuccess } from "./utils";

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const handleCompanyRegistration = () => {
    navigate("/Employer-Registration");
  };

  const handleWorkerRegistration = () => {
    navigate("/Employee-Registration");
  };
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", loginInfo);
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/worker-home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
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
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="example@gmail.com"
                value={loginInfo.email}
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
                  value={loginInfo.password}
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
              Login
            </button>

            <p className="create-account">
              Need an account?
              <br />
              <button
                className="create-account-link"
                onClick={handleCompanyRegistration}
              >
                Create an Employer account
              </button>
              <br />
              <button
                className="create-account-link"
                onClick={handleWorkerRegistration}
              >
                Create an Employee account
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
