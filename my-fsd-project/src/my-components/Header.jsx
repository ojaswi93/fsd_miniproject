import logopic from "../assets/logo1.png";

function Header() {
  return (
    <div id="header">
      <img id="logo" src={logopic} alt="Logo" />
      <div id="header-container">
        <p id="header-text1">Worksapp</p>
        <p id="header-text2">Where work finds you</p>
      </div>
    </div>
  );
}

export default Header;