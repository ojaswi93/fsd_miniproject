import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // State for sidebar collapse

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
