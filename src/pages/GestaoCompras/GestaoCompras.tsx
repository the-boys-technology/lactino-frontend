import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import ModalTransacoes from "../../components/ModalTransacoes";
import RelatorioPedido from "../../components/RelatorioPedido";
import TabelaTransacoes from "../../components/TabelaTransacoes";
import { TipoTransacao, Transacao } from "../../types/transacao";
import { Campo } from "../../components/Campo";
import { api } from "../../services/api";
import "./GestaoCompras.css";
import { CategoriaItem } from "../../types/item-transacao";
import { Fornecedor } from "../../types/fornecedor";

export default function GestaoCompras() {
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [relatorioParaExibir, setRelatorioParaExibir] = useState<Transacao | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null);

  const [filtroFornecedor, setFiltroFornecedor] = useState("");
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
        const [resFor, resCom] = await Promise.all([
          api.get<Fornecedor[]>("/fornecedores"),
          api.get<Transacao[]>("/transacoes?tipo=COMPRA"),
        ]);
        setFornecedores(resFor.data);
        setTransacoes(resCom.data);
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
        (!valorMin || !isNaN(parseFloat(valorMin)) && t.valorTotal >= parseFloat(valorMin)) &&
        (!valorMax || !isNaN(parseFloat(valorMax)) && t.valorTotal <= parseFloat(valorMax));
      const fornecedor = fornecedores.find((f) => String(f.id) === String(t.fornecedorId));
      const matchFornecedor =
        !filtroFornecedor ||
        fornecedor?.nome.toLowerCase().includes(filtroFornecedor.toLowerCase());

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
        matchFornecedor &&
        matchProduto &&
        matchCategoria
      );
    });

    setResultadoFiltro(filtrado);
  };

  const exibicao = resultadoFiltro.length ? resultadoFiltro : transacoes;

  const editarItem = (transacao: Transacao) => {
    console.log("Abrindo modal para editar a transação:", transacao);
    setTransacaoEditando(transacao); 
    setModalAberto(true);
  };

  const removerItem = (id: string) => {
    setTransacoes(transacoes.filter((transacao) => transacao.id !== id));
    api.delete(`/transacoes/${id}`);
  };

  return (
    <div className="compras">
      <header className="compras__header">
        <h1 className="compras__title">Gestão de Compras</h1>
      </header>

      <section className="compras__container">
        {loading ? (
          <p className="compras__loading">Carregando dados...</p>
        ) : (
          <>
            <div className="compras__filtros">
              <div className="compras__filtros__linha">
                <Campo
                  type="text"
                  label="Fornecedor"
                  list="fornecedores-lista"
                  styleInput={{ flex: 1, minWidth: "18rem" }}
                  value={filtroFornecedor}
                  placeHolder="Digite o nome do fornecedor"
                  inputFunction={(e) => setFiltroFornecedor(e.target.value)}
                />
                <datalist id="fornecedores-lista">
                  {fornecedores.map((f) => (
                    <option key={f.id} value={f.nome} />
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

              <div className="compras__filtros__linha">
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

              <div className="compras__filtros__botao">
                <Botao
                  tipo="primary"
                  label="🔍Buscar Compra"
                  onClick={aplicarFiltros}
                  htmlType="button"
                />
              </div>
            </div>

            <TabelaTransacoes
              transacoes={exibicao}
              fornecedores={fornecedores}
              tipoTransacao="COMPRA"
              onVerRelatorio={(t) => setRelatorioParaExibir(t)}
              editarItem={editarItem}
              removerItem={removerItem}
            />
          </>
        )}

        <footer className="compras__footer">
        <Botao
          tipo="success"
          label="+ Nova Compra"
          htmlType="button"
          onClick={() => {
            setTransacaoEditando(null);
            setModalAberto(true);
          }}
        />
        </footer>
      </section>

      {modalAberto && (
        <ModalTransacoes
          tipoTransacao={TipoTransacao.COMPRA}
          clientes={[]}
          fornecedores={fornecedores}
          transacaoEditando={transacaoEditando}
          // --- MUDANÇA 3: Lógica robusta para salvar/atualizar ---
          onSalvar={(transacaoAtualizada) => {
            setTransacoes(prevTransacoes => {
              const transacaoExiste = prevTransacoes.some(t => t.id === transacaoAtualizada.id);
              if (transacaoExiste) {
                return prevTransacoes.map(t => t.id === transacaoAtualizada.id ? transacaoAtualizada : t);
              } else {
                return [transacaoAtualizada, ...prevTransacoes];
              }
            });
            setModalAberto(false);
            setTransacaoEditando(null);
          }}
          onCancelar={() => {
            setModalAberto(false);
            setTransacaoEditando(null);
          }}
        />
      )}
        {relatorioParaExibir && (
        <RelatorioPedido
          transacao={relatorioParaExibir}
          fornecedores={fornecedores} // Passa a lista de fornecedores
          onClose={() => setRelatorioParaExibir(null)}
        />
      )}
    </div>
  );
}
