import { useState } from "react";
import Campo from "../../components/Campo";
import Botao from "../../components/Botao";
import ModalCompra from "../../features/GestãoCompras/ModalCompras/ModalCompras";
import ModalRelatorio from "../../features/GestãoCompras/ModalRelatorio/ModalRelatorio";
import ModalFornecedor from "../../features/GestãoCompras/ModalFornecedor/ModalFornecedor";
import { Transacao, Fornecedor, FormaPagamento } from "../../types/transacao";
import "../GestaoCompras/GestaoCompras.css";

// Simulação de fornecedores cadastrados
const fornecedoresMock: Fornecedor[] = [
  { id: 1, nome: "AgroVet GUS", email: "", localizacao: "" },
  { id: 2, nome: "Fazenda Bom Leite", email: "", localizacao: "" },
  { id: 3, nome: "Nutrinsumos", email: "", localizacao: "" },
  { id: 4, nome: "BioCampo", email: "", localizacao: "" },
];

export default function GestaoCompras() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalFornecedor, setModalFornecedor] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState<Transacao | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

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
      const fornecedor = fornecedoresMock.find(f => f.id === t.fornecedorId);
      const fornecedorMatch =
        !filtroFornecedor || fornecedor?.nome.toLowerCase().includes(filtroFornecedor.toLowerCase());

      return dentroData && dentroValor && fornecedorMatch;
    });

    setResultadoFiltro(filtrado);
  };

  const transacoesParaMostrar = resultadoFiltro.length ? resultadoFiltro : transacoes;

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
            {fornecedoresMock.map((f) => (
              <option key={f.id} value={f.nome} />
            ))}
          </datalist>
          {!fornecedoresMock.some(f => f.nome === filtroFornecedor) && filtroFornecedor && (
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
          <Botao tipo="primary" label="🔍 Buscar" onClick={buscarTransacoes} />
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
          const fornecedor = fornecedoresMock.find(f => f.id === item.fornecedorId);
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
          tipo="primary"
          label="Cadastrar Fornecedor"
          onClick={() => setModalFornecedor(true)}
        />
        <Botao
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
        />
      )}
    </div>
  );
}
