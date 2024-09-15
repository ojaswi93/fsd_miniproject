import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./my-components/Header.jsx";

function HomePage() {
  const navigate = useNavigate();

  const handleEmployerRegistration = () => {
    navigate("/Employer-Registration");
  };

  const handleEmployeeRegistration = () => {
    navigate("/Employee-Registration");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <div>
      <Header />
      <div id="main-content2">
        <div className="navbartabs">
          <button className="tablink" onClick={handleEmployerRegistration}>Employer Registration</button>
          <button className="tablink" onClick={handleEmployeeRegistration}>Employee Registration</button>
          <button className="tablink" onClick={handleLogin}>Login</button>
        </div>

        <div className="homecontent">
          <h1>About us</h1>
          <p>
            WorksApp is dedicated to empowering unskilled laborers by connecting them with short-term job opportunities that match 
            their skills and availability. Our platform bridges the gap between workers and businesses in need of temporary help, 
            making the job search process simple and accessible.
          </p>
          <p>
            Connecting Startups with Short-term Labor: The platform will act as a medium for startups to find unskilled labor for 
            short-term tasks that do not require formal education.
          </p>
          <p>
            Providing Income Opportunities for Daily Wage Workers: The website will offer a means of income for individuals who 
            depend on daily wages. By providing a platform where these workers can find and access short-term job opportunities, 
            the website will help improve their livelihood. This is particularly beneficial for those whose earnings are inconsistent 
            and rely heavily on daily job availability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
