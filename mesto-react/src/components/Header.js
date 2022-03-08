import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место"></img>
    </header>
  );
}

export default Header;