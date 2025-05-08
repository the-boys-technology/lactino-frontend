import Select from "../components/Select";
import Botao from "../components/Botao";
import "../css/selecao_produto.css";

const produtos = [
    { label: 'Leite', value: 'leite' },
    { label: 'Laticínio', value: 'laticinio' },
];

function SelecaoProdutoPage(): React.ReactElement {
    return(
        <main className="paginaSelecao">
            <section className="paginaSelecao__container">
                <h2 className="paginaSelecao__titulo">Selecione o produto</h2>
                <section className="paginaSelecao__select">
                    <Select nome="Produto:" options={produtos}></Select>
                </section>
                <section className="paginaSelecao__botoes">
                    <Botao label="Retornar" tipo="secondary"></Botao>
                    <Botao label="Ir" tipo="primary"></Botao>
                </section>
            </section>
        </main>
    )
}

export default SelecaoProdutoPage;