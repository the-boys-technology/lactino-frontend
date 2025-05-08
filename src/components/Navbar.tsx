import "../css/navbar.css"

function Navbar(): React.ReactElement {
    return (
    <nav className="navbar">
        <ul className="navbar__lista">
            <li className="navbar__lista__item"><a href="/selecionar-produto">Gerenciamento do Produto</a></li>
            <li className="navbar__lista__item"><a href="#">Estoque</a></li>
            <li className="navbar__lista__item"><a href="#">Compra</a></li>
            <li className="navbar__lista__item"><a href="#">Venda</a></li>
        </ul>
    </nav>
    )
}

export default Navbar;