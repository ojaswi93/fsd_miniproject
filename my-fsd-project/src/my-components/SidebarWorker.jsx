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
          <Link to="/worker-home">Home</Link>
        </li>
        <li>
          <Link to="/worker-profile">Profile</Link>
        </li>
        <li>
          <Link to="/worker-appliaction">Appliaction</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
