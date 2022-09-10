import logo from "../images/logo.svg";

function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} className="logo" alt="logo da Around The U.S." />
      </header>
    </>
  );
}

export default Header;
