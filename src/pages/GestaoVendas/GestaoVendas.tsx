import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import ModalTransacoes from "../../components/ModalTransacoes";
import RelatorioPedido from "../../components/RelatorioPedido";
import TabelaTransacoes from "../../components/TabelaTransacoes";
import { TipoTransacao, Transacao } from "../../types/transacao";
import { Cliente } from "../../types/cliente";
import { Campo } from "../../components/Campo";
import { api } from "../../services/api";
import "./GestaoVendas.css";
import { CategoriaItem } from "../../types/item-transacao";

export default function GestaoVendas() {
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [relatorioId, setRelatorioId] = useState<string | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [filtroCliente, setFiltroCliente] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [resultadoFiltro, setResultadoFiltro] = useState<Transacao[]>([]);

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      try {
        const [resCli, resVen] = await Promise.all([
          api.get<Cliente[]>("/clientes"),
          api.get<Transacao[]>("/transacoes?tipo=VENDA"),
        ]);
        setClientes(resCli.data);
        setTransacoes(resVen.data);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  const aplicarFiltros = () => {
    const filtrado = transacoes.filter((t) => {
      const data = new Date(t.data);
      const matchData =
        (!dataInicial || data >= new Date(dataInicial)) &&
        (!dataFinal || data <= new Date(dataFinal));
      const matchValor =
        (!valorMin || t.valorTotal >= parseFloat(valorMin)) &&
        (!valorMax || t.valorTotal <= parseFloat(valorMax));
      const cliente = clientes.find((c) => c.id === t.clienteId);
      const matchCliente =
        !filtroCliente ||
        cliente?.nome.toLowerCase().includes(filtroCliente.toLowerCase());

      const matchProduto =
        !filtroProduto ||
        t.itens.some((item) =>
          item.nome.toLowerCase().includes(filtroProduto.toLowerCase())
        );

      const matchCategoria =
        !filtroCategoria ||
        t.itens.some((item) => item.categoria === filtroCategoria);

      return (
        matchData &&
        matchValor &&
        matchCliente &&
        matchProduto &&
        matchCategoria
      );
    });

    setResultadoFiltro(filtrado);
  };

  const exibicao = resultadoFiltro.length ? resultadoFiltro : transacoes;

  return (
    <div className="vendas">
      <header className="vendas__header">
        <h1 className="vendas__title">Gestão de Vendas</h1>
      </header>

      <section className="vendas__container">
        {loading ? (
          <p className="vendas__loading">Carregando dados...</p>
        ) : (
          <>
            <div className="vendas__filtros">
              <div className="vendas__filtros__linha">
                <Campo
                  type="text"
                  label="Cliente"
                  list="clientes-lista"
                  styleInput={{ flex: 1, minWidth: "18rem" }}
                  value={filtroCliente}
                  placeHolder="Digite o nome do cliente"
                  inputFunction={(e) => setFiltroCliente(e.target.value)}
                />
                <datalist id="clientes-lista">
                  {clientes.map((c) => (
                    <option key={c.id} value={c.nome} />
                  ))}
                </datalist>

                <Campo
                  label="Produto"
                  placeHolder="Insira o nome do produto"
                  type="text"
                  styleInput={{ flex: 1, minWidth: "18rem" }}
                  value={filtroProduto}
                  inputFunction={(e) => setFiltroProduto(e.target.value)}
                />

                <Campo
                  label="Categoria"
                  type="select"
                  options={[
                    { label: "Pix", value: "PIX" },
                    { label: "Cartão", value: "CARTAO" },
                    { label: "Dinheiro", value: "DINHEIRO" },
                    { label: "Boleto", value: "BOLETO" },
                  ]}
                  value={filtroCategoria}
                  selectFunction={(e) => setFiltroCategoria(e.target.value)}
                />
              </div>

              <div className="vendas__filtros__linha">
                <Campo
                  type="date"
                  label="Data Início"
                  value={dataInicial}
                  inputFunction={(e) => setDataInicial(e.target.value)}
                />

                <Campo
                  type="date"
                  label="Data Fim"
                  value={dataFinal}
                  inputFunction={(e) => setDataFinal(e.target.value)}
                />

                <Campo
                  type="text"
                  label="Valor Mínimo"
                  leftAdd="R$"
                  value={valorMin}
                  styleInput={{ width: "8rem" }}
                  inputFunction={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const formatado = (Number(raw) / 100)
                      .toFixed(2)
                      .replace(".", ",");
                    setValorMin(formatado);
                  }}
                />

                <Campo
                  type="text"
                  label="Valor Máximo"
                  leftAdd="R$"
                  value={valorMax}
                  styleInput={{ width: "8rem" }}
                  inputFunction={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const formatado = (Number(raw) / 100)
                      .toFixed(2)
                      .replace(".", ",");
                    setValorMax(formatado);
                  }}
                />
              </div>

              <div className="vendas__filtros__botao">
                <Botao
                  tipo="primary"
                  label="🔍Buscar Venda"
                  onClick={aplicarFiltros}
                  htmlType="button"
                />
              </div>
            </div>

            <TabelaTransacoes
              transacoes={exibicao}
              clientes={clientes}
              tipoTransacao="VENDA"
              onVerRelatorio={(t) => setRelatorioId(String(t.id))}
            />
          </>
        )}

        <footer className="vendas__footer">
          <Botao
            tipo="success"
            label="+ Nova Venda"
            htmlType="button"
            onClick={() => setModalAberto(true)}
          />
        </footer>
      </section>

      {modalAberto && (
        <ModalTransacoes
          tipoTransacao={TipoTransacao.VENDA}
          clientes={clientes}
          fornecedores={[]}
          onSalvar={(novaTransacao) => {
            setTransacoes((prev) => [novaTransacao, ...prev]);
            setModalAberto(false);
          }}
          onCancelar={() => setModalAberto(false)}
        />
      )}

      {relatorioId && (
        <RelatorioPedido
          transacaoId={relatorioId}
          onClose={() => setRelatorioId(null)}
        />
      )}
    </div>
  );
}
