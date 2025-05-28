import { useEffect, useState } from "react";
import Campo from "../../components/Campo";
import Botao from "../../components/Botao";
import ModalCompra from "../../features/GestaoCompras/ModalCompras/ModalCompras";
import ModalRelatorio from "../../features/GestaoCompras/ModalRelatorio/ModalRelatorio";
import ModalFornecedor from "../../features/GestaoCompras/ModalFornecedor/ModalFornecedor";
import { Transacao, Fornecedor, FormaPagamento } from "../../types/transacao";
import "../GestaoCompras/GestaoCompras.css";
import { api } from "../../services/api";

export default function GestaoCompras() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalFornecedor, setModalFornecedor] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState<Transacao | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])

  const [filtroFornecedor, setFiltroFornecedor] = useState("");
  const [dataInicial, setDataInicial] = useState("2025-05-14");
  const [dataFinal, setDataFinal] = useState("2025-05-21");
  const [filtroValor, setFiltroValor] = useState("");

  const [resultadoFiltro, setResultadoFiltro] = useState<Transacao[]>([]);

  const handleNovaTransacao = (nova: Transacao) => {
    setTransacoes((prev) => [nova, ...prev]); // ordenação automática
  };

  const buscarTransacoes = () => {
    const filtrado = transacoes.filter((t) => {
      const data = new Date(t.data);
      const dentroData = data >= new Date(dataInicial) && data <= new Date(dataFinal);
      const dentroValor = !filtroValor || t.valorTotal <= parseFloat(filtroValor);
      const fornecedor = fornecedores;
      /*const fornecedorMatch =
        !filtroFornecedor || fornecedor?.nome.toLowerCase().includes(filtroFornecedor.toLowerCase());*/

      return dentroData && dentroValor /*&& fornecedorMatch*/;
    });

    setResultadoFiltro(filtrado);
  };

  const transacoesParaMostrar = resultadoFiltro.length ? resultadoFiltro : transacoes;

  useEffect(() => {
    async function carregarFornecedores() {
      try {
        const res = await api.get("/fornecedores");
        setFornecedores(res.data); // assumindo que retorna um array
      } catch (e) {
        console.error("Erro ao buscar fornecedores", e);
      }
    }

    carregarFornecedores();
  }, []);

  return (
    <div className="compras">
      <header className="compras__header">
        <h1 className="compras__header-title">Compras</h1>
      </header>

      <section className="compras__filtros">
        <div className="compras__linha">
          <Campo
            type="text"
            name="fornecedor"
            placeholder="Fornecedor"
            list="lista-fornecedores"
            value={filtroFornecedor}
            onChange={(e) => setFiltroFornecedor(e.target.value)}
          />
          <datalist id="lista-fornecedores">
            {fornecedores.map((f) => (
              <option key={f.id} value={f.nome} />
            ))}
          </datalist>
          {!fornecedores.some(f => f.nome === filtroFornecedor) && filtroFornecedor && (
            <span className="campo-aviso">
              Fornecedor não cadastrado. Cadastre primeiro.
            </span>
          )}
        </div>

        <div className="compras__linha">
          <Campo
            type="date"
            placeholder="Data Inicial"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
          <Campo
            type="date"
            placeholder="Data Final"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
          <Campo
            type="number"
            placeholder="Valor Máximo"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
          />
        </div>

        <div className="compras__buscar">
          <Botao tipo="primary" label="🔍 Buscar" onClick={buscarTransacoes} htmlType="button"/>
        </div>
      </section>

      <section className="compras__tabela">
        <div className="compras__tabela-cabecalho">
          <span>Fornecedor</span>
          <span>Itens</span>
          <span>Data</span>
          <span>Valor</span>
          <span>Forma</span>
          <span>Ações</span>
        </div>

        {transacoesParaMostrar.map((item, index) => {
          const fornecedor = fornecedores.find(f => f.id === item.fornecedorId);
          return (
            <div key={index} className="compras__tabela-linha">
              <span>{fornecedor?.nome || "—"}</span>
              <span>{item.itens.length}</span>
              <span>{new Date(item.data).toLocaleDateString()}</span>
              <span>R$ {item.valorTotal.toFixed(2)}</span>
              <span>{item.formaPagamento}</span>
              <button
                className="compras__ver-relatorio"
                onClick={() => setModalRelatorio(item)}
              >
                🔍 Ver Relatório
              </button>
            </div>
          );
        })}
      </section>

      <footer className="compras__footer">
        <Botao
          htmlType="button"
          tipo="primary"
          label="Cadastrar Fornecedor"
          onClick={() => setModalFornecedor(true)
          }
        />
        <Botao
          htmlType="button"
          tipo="primary"
          label="Registrar Compra"
          onClick={() => setModalAberto(true)}
        />
      </footer>

      {modalAberto && (
        <ModalCompra
          onClose={() => setModalAberto(false)}
          onSave={handleNovaTransacao}
        />
      )}

      {modalFornecedor && (
        <ModalFornecedor
          onClose={() => setModalFornecedor(false)}
          onSave={(novo: Fornecedor) => {
            // futura integração com API
          }}
        />
      )}

      {modalRelatorio && (
        <ModalRelatorio
          transacao={modalRelatorio}
          onClose={() => setModalRelatorio(null)}
          onEdit={(editada) => {
            setTransacoes((prev) =>
              prev.map((t) => (t.id === editada.id ? editada : t))
            );
            setModalRelatorio(null);
          }}
          onDelete={(id) => {
            setTransacoes((prev) => prev.filter((t) => t.id !== id));
            setModalRelatorio(null);
          }}
        />
      )}
    </div>
  );
}
