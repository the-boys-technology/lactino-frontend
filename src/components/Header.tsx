// Header.tsx
import { Link } from "react-router-dom";
import "../css/header.css";
import Navbar from "./Navbar";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps): React.ReactElement {
  return (
    <header className="header"> 
      <section className="header__principal">
        <a 
          className="header__menu" 
          onClick={onMenuClick} 
          aria-label="Abrir menu"
          style={{ cursor: 'pointer' }}
        >
          <section className="header__menu--linha"></section>
          <section className="header__menu--linha"></section>
          <section className="header__menu--linha"></section>
        </a>
        <h1 className="header__nome-empresa">
          <Link to="/">LACTINO</Link>
        </h1>
      </section>
      <Navbar />
    </header>
  );
}

export default Header;
