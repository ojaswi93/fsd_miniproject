import React, { useState } from 'react';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleCompanyRegistration = () => {
      navigate("/Employer-Registration"); 
    };

    const handleWorkerRegistration = () => {
        navigate("/Employee-Registration");  
    };
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({...formData, [id]: type === 'checkbox' ? checked : value});
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Form Submitted: ', formData);
    };

    return (
        <div className="container2">
            <div className="login-box">
                <div className="login-left">
                    <h2 className="login-title">Login</h2>
                    <p className="login-text">Please login to continue to your account.</p>
                    <form onSubmit={handleSubmit}>
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
                        <div className="checkbox-container">
                            <input  type="checkbox"
                                    id="rememberMe"
                                    className="login-checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                            />
                            <label htmlFor="rememberMe" className="input-label remember-me">Remember me</label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                        <p className="create-account">
                            Need an account?<br />
                            <button className="create-account-link" onClick={handleCompanyRegistration}>Create an Employer account</button><br />
                            <button className="create-account-link" onClick={handleWorkerRegistration}>Create an Employee account</button>
                        </p>
                    </form>
                </div>
                <div className="login-right"></div>
            </div>
        </div>
    );
};

export default Login;