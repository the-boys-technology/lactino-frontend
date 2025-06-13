import { Link } from "react-router-dom";
import "../css/navbar.css";
import SinoNotificacoes from "./SinoNotificacoes";
import { useNotificacoes } from "../context/NotificacoesContext";
import MockNotificacoes from "./MockNotificacoes";

function Navbar(): React.ReactElement {
    const { notificacoes } = useNotificacoes();

    return (
        <nav className="navbar">
            <ul className="navbar__lista">
                <li>
                    <SinoNotificacoes notificacoes={notificacoes} />
                    <MockNotificacoes />
                </li>
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