import React, { useState } from "react";
import logopic from "./assets/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";

const CompanyHome = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const approve = (e) => {
    const button = e.target;
    button.innerHTML = "Approved!";
    button.disabled = true;
    button.style.cursor = "default";
    button.style.backgroundColor = "#d5bdaf";
  };

  const apply = (e) => {
    const button = e.target;
    button.innerHTML = "Applied!";
    button.disabled = true;
    button.style.cursor = "default";
    button.style.backgroundColor = "#d5bdaf";
  };

  return (
    <div>
      <Header></Header>

      <aside id="sidebar" className={isSidebarCollapsed ? "collapsed" : ""}>
        <button id="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button>
        <ul>
          <li>
            <Link to="/company-home">Home</Link>
          </li>
          <li>
            <Link to="/company-profile">Profile</Link>
          </li>
          <li>
            <Link to="/company-post">Post</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </aside>

      <main
        id="main-content"
        style={{
          marginLeft: isSidebarCollapsed
            ? "var(--sidebar-width-collapsed)"
            : "var(--sidebar-width)",
        }}
      >
        <h1>Welcome!</h1>
        <div className="filter">
          <span>Candidates:</span>
          <span
            id="filter-toggle"
            className="filter-text"
            onClick={toggleFilter}
          >
            Filters
          </span>
        </div>

        <div
          id="filter-box"
          className={isFilterVisible ? "filter-box show" : "filter-box"}
        >
          <div className="filter-group">
            <span>Gender</span>
            <label>
              <input type="checkbox" name="gender" value="Male" /> Male
            </label>
            <label>
              <input type="checkbox" name="gender" value="Female" /> Female
            </label>
            <label>
              <input type="checkbox" name="gender" value="Other" /> Other
            </label>
          </div>
          <div className="filter-group">
            <label htmlFor="area-select">Area:</label>
            <select id="area-select" name="area">
              <option value="" disabled selected>
                Choose
              </option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Banglore">Banglore</option>
            </select>
          </div>
        </div>

        <div className="job-cards-container">
          <div className="job-cards">
            <img id="logo" src={logopic} alt="Logo" />
            <p>About:</p>
            <p>Location:</p>
            <Link to="/company-readmore" className="read-more">
              Read More....
            </Link>
            <button className="approve-btn" onClick={approve}>
              Approve
            </button>
          </div>

          <div className="job-cards">
            <img id="logo" src={logopic} alt="Logo" />
            <p>About:</p>
            <p>Location:</p>
            <Link to="/company-readmore" className="read-more">
              Read More....
            </Link>
            <button className="approve-btn" onClick={approve}>
              Approve
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
