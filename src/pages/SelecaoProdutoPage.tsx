import Select from "../components/Select";
import Botao from "../components/Botao";
import "../css/selecao_produto.css";

function SelecaoProdutoPage(): React.ReactElement {
    return(
        <main className="paginaSelecao">
            <section className="paginaSelecao__container">
                <h2 className="paginaSelecao__titulo">Selecione o produto</h2>
                <Select nome="Produto:"></Select>
                <section className="paginaSelecao__botoes">
                    <Botao label="Retornar" tipo="secondary"></Botao>
                    <Botao label="Ir" tipo="primary"></Botao>
                </section>
            </section>
        </main>
    )
}

export default SelecaoProdutoPage;