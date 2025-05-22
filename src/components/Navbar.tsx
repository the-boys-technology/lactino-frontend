import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar(): React.ReactElement {
    return (
        <nav className="navbar">
            <ul className="navbar__lista">
                <li className="navbar__lista__item">
                    <Link to="/selecionar-produto">Gerenciamento do Produto</Link>
                </li>
                <li className="navbar__lista__item">
                    <Link to="/estoque">Estoque</Link>
                </li>
                <li className="navbar__lista__item">
                    <Link to="/gestao-compras">Compra</Link>
                </li>
                <li className="navbar__lista__item">
                    <Link to="/gestao-vendas">Venda</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
