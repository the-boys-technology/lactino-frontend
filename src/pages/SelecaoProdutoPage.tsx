import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "../components/Select";
import Botao from "../components/Botao";
import "../css/selecao_produto.css";

const produtos = [
    { label: 'Leite', value: 'leite' },
    { label: 'Laticínio', value: 'laticinio' },
];

function SelecaoProdutoPage(): React.ReactElement {
    const [produtoSelecionado, setProdutoSelecionado] = useState<string>('');
    const navigate = useNavigate();

    const handleIrClick = () => {
        if (produtoSelecionado) {
            navigate(`/gerenciar-${produtoSelecionado}`);
        }
    };

    return (
        <main className="paginaSelecao">
            <section className="paginaSelecao__container">
                <h2 className="paginaSelecao__titulo">Selecione o produto</h2>
                <section className="paginaSelecao__select">
                    <Select
                        nome="Produto:"
                        options={produtos}
                        value={produtoSelecionado}
                        onChange={setProdutoSelecionado}
                    />
                </section>
                <section className="paginaSelecao__botoes">
                    <Botao label="Retornar" tipo="secondary" onClick={() => navigate('/')} />
                    <Botao label="Ir" tipo="primary" onClick={handleIrClick} />
                </section>
            </section>
        </main>
    );
}

export default SelecaoProdutoPage;
