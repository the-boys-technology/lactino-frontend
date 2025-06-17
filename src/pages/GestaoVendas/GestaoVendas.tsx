import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import ModalTransacoes from "../../components/ModalTransacoes";
import RelatorioPedido from "../../components/RelatorioPedido";
import { TipoTransacao, Transacao } from "../../types/transacao";
import { Cliente } from "../../types/cliente";
import { CategoriaItem } from "../../types/item-transacao";
import { Campo } from "../../components/Campo";
import { api } from "../../services/api";
import { formatarData, formatarDinheiro } from "../../utils/formatter_utils";
import "../GestaoVendas/GestaoVendas.css";

export default function GestaoVendas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [relatorioId, setRelatorioId] = useState<string | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [filtroCliente, setFiltroCliente] = useState("");
  const [dataInicial, setDataInicial] = useState("2025-05-14");
  const [dataFinal, setDataFinal] = useState("2025-05-21");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [resultadoFiltro, setResultadoFiltro] = useState<Transacao[]>([]);
  const [filtroProduto, setFiltroProduto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaItem>();

  const buscarTransacoes = () => {
    const filtrado = transacoes.filter((t) => {
      const data = new Date(t.data);
      const dentroData = data >= new Date(dataInicial) && data <= new Date(dataFinal);
      const dentroValorMin = !valorMin || t.valorTotal >= parseFloat(valorMin);
      const dentroValorMax = !valorMax || t.valorTotal <= parseFloat(valorMax);
      const dentroValor = dentroValorMin && dentroValorMax;
      const cliente = clientes.find(c => c.id === t.clienteId);
      const clienteMatch = !filtroCliente || cliente?.nome.toLowerCase().includes(filtroCliente.toLowerCase());

      return t.tipo === "VENDA" && dentroData && dentroValor && clienteMatch;
    });

    setResultadoFiltro(filtrado);
  };

  const transacoesParaMostrar = resultadoFiltro.length ? resultadoFiltro : transacoes;

  useEffect(() => {
    async function carregarClientes() {
      try {
        const res = await api.get("/clientes");
        setClientes(res.data);
      } catch (e) {
        console.error("Erro ao buscar clientes:", e);
      }
    }

    async function carregarVendas() {
      try {
        const res = await api.get("/transacoes?tipo=VENDA");
        setTransacoes(res.data);
      } catch (e) {
        console.error("Erro ao buscar vendas:", e);
      }
    }

    carregarClientes();
    carregarVendas();
  }, []);

  return (
    <div className="vendas">
      <header className="vendas__header">
        <h1 className="vendas__header-title">Vendas</h1>
      </header>
      
      <section className="vendas_container">
        <section className="vendas__filtros">
          <div className="vendas__linha">
            <Campo
              type="text"
              label="Cliente"
              list="lista-clientes"
              value={filtroCliente}
              placeHolder="Insira o nome do cliente"
              styleInput={{ width: "15rem" }}
              inputFunction={(e) => setFiltroCliente(e.target.value)}
            />
            <datalist id="lista-clientes">
              {clientes.map((c) => (
                <option key={c.id} value={c.nome} />
              ))}
            </datalist>

            <Campo
              type="text"
              label="Produto"
              value={filtroProduto}
              placeHolder="Nome do produto"
              styleInput={{ width: "15rem" }}
              inputFunction={(e) => setFiltroProduto(e.target.value)}
            />

            <Campo
              type="select"
              label="Categoria"
              value={categoria}
              options={Object.values(CategoriaItem).map((cat) => ({
                label: cat,
                value: cat,
              }))}
              selectFunction={(e) => setCategoria(e.target.value as CategoriaItem)}
              styleInput={{ width: "10rem" }}
            />
          </div>

          <div className="vendas__linha">
            <Campo
              label="Data Inicial"
              type="date"
              value={dataInicial}
              inputFunction={(e) => setDataInicial(e.target.value)}
            />
            <Campo
              label="Data Final"
              type="date"
              value={dataFinal}
              inputFunction={(e) => setDataFinal(e.target.value)}
            />
            <Campo
              label="Valor Mínimo"
              type="text"
              value={valorMin}
              leftAdd="R$"
              styleInput={{ width: "7rem" }}
              inputFunction={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                const formatted = (Number(raw) / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                setValorMin(formatted.replace("R$", "").trim());
              }}
            />
            <Campo
              label="Valor Máximo"
              type="text"
              value={valorMax}
              leftAdd="R$"
              styleInput={{ width: "7rem" }}
              inputFunction={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                const formatted = (Number(raw) / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                setValorMax(formatted.replace("R$", "").trim());
              }}
            />
          </div>

          <div className="vendas__buscar">
            <Botao tipo="primary" label="🔍 Buscar" onClick={buscarTransacoes} htmlType="button" />
          </div>
        </section>

        <section className="vendas__tabela">
          <div className="vendas__tabela-cabecalho">
            <span>Cliente</span>
            <span>Produtos</span>
            <span>Data</span>
            <span>Valor</span>
            <span>Pagamento</span>
            <span>Ações</span>
          </div>

          {transacoesParaMostrar.map((t) => {
            const cliente = clientes.find((c) => c.id === t.clienteId);
            return (
              <div key={t.id} className="vendas__tabela-linha">
                <span>{cliente?.nome || "—"}</span>
                <span>{t.itens.length}</span>
                <span>{formatarData(t.data)}</span>
                <span>{formatarDinheiro(t.valorTotal)}</span>
                <span>{t.formaPagamento}</span>
                <button
                  className="vendas__ver-relatorio"
                  onClick={() => setRelatorioId(String(t.id))}
                >
                  🔍 Ver Relatório
                </button>
              </div>
            );
          })}
        </section>

        <footer className="vendas__footer">
          <Botao
            tipo="primary"
            label="Registrar Venda"
            onClick={() => setModalAberto(true)}
            htmlType="button"
          />
        </footer>

        {modalAberto && (
          <ModalTransacoes
            tipoTransacao={TipoTransacao.VENDA}
            clientes={clientes}
            fornecedores={[]} // Venda não usa fornecedores
            onSalvar={(nova) => {
              setTransacoes((prev) => [nova, ...prev]);
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
      </section>
    </div>
  );
}
