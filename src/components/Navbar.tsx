import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import SinoNotificacoes from "./SinoNotificacoes";
import { useNotificacoes } from "../context/NotificacoesContext";

function Navbar(): React.ReactElement {
  const { notificacoes } = useNotificacoes();

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar__lista">
        <li>
          <SinoNotificacoes notificacoes={notificacoes} />
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
        <li>
          <button className="logout" onClick={handleLogout}>
            Sair &rarr;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
