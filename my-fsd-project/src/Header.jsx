import React, {useState} from "react";
import logopic from "./assets/logo.png";

function Header() {
  const [sideCollapse, setSideCollapse] = useState(true);

  const toggleSidebar = () => {
    setSideCollapse(!sideCollapse)
  };

  return (
    <>
      <div id="header">
        <img id="logo" src={logopic} alt="Logo" />
        <div id="header-container">
          <p id="header-text1">Worksapp</p>
          <p id="header-text2">Where work finds you</p>
        </div>
      </div>
      <div id="sidebar" className={sideCollapse ? "collapsed" : ""}>
        <button id="menu-btn" onClick={toggleSidebar}>&#9776;</button>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Application</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
