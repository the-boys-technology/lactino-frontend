import { Link } from "react-router-dom";
import "../css/header.css"
import Navbar from "./Navbar"

function Header(): React.ReactElement {
    return (
    <header className="header"> 
        <section className="header__principal">
            <a className="header__menu">
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
    )   
}

export default Header;