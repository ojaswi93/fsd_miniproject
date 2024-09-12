import React, { useState } from "react";

const CompanyReadmore = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div>
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
    </div>
  );
};

export default CompanyReadmore;
