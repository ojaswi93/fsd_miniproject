import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // State for sidebar collapse
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle logout function
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("username");

    // Redirect to the login page
    navigate("/Login");
  };

  return (
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
          <button className="logout" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
