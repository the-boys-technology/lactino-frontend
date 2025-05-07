import "../css/navbar.css"

function Navbar(): React.ReactElement {
    return (
    <nav className="navbar">
        <ul className="navbar__lista">
            <li className="navbar__lista__item">Gerenciamento do Produto</li>
            <li className="navbar__lista__item">Estoque</li>
            <li className="navbar__lista__item">Compras</li>
            <li className="navbar__lista__item">Vendas</li>
        </ul>
    </nav>
    )
}

export default Navbar;