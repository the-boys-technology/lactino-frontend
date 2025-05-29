import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import ModalCompra from "../../features/GestaoVendas/ModalVendas/ModalVendas";
import ModalCliente from "../../features/GestaoVendas/ModalCliente/ModalCliente";
import RelatorioVendas from "../../features/GestaoVendas/RelatorioVendas/RelatorioVendas";
import { Cliente, Transacao } from "../../types/transacao";
import "../GestaoVendas/GestaoVendas.css";
import { api } from "../../services/api";
import { Campo } from "../../components/Campo";

export default function GestaoVendas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState<Transacao | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [filtroCliente, setFiltroCliente] = useState("");
  const [dataInicial, setDataInicial] = useState("2025-05-14");
  const [dataFinal, setDataFinal] = useState("2025-05-21");
  const [filtroValor, setFiltroValor] = useState("");
  const [resultadoFiltro, setResultadoFiltro] = useState<Transacao[]>([]);

  const buscarTransacoes = () => {
    const filtrado = transacoes.filter((t) => {
      const data = new Date(t.data);
      const dentroData = data >= new Date(dataInicial) && data <= new Date(dataFinal);
      const dentroValor = !filtroValor || t.valorTotal <= parseFloat(filtroValor);
      const cliente = clientes.find(c => c.id === t.clienteId);
      const clienteMatch = !filtroCliente || cliente?.nome.toLowerCase().includes(filtroCliente.toLowerCase());
      return t.tipo === "VENDA" && dentroData && dentroValor && clienteMatch;
    });

    setResultadoFiltro(filtrado);
  };

  const handleNovaTransacao = (nova: Transacao) => {
    setTransacoes(prev => [nova, ...prev]);
  };

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

  const transacoesParaMostrar = resultadoFiltro.length ? resultadoFiltro : transacoes;

  return (
    <div className="compras">
      <header className="compras__header">
        <h1 className="compras__header-title">Vendas</h1>
      </header>

      <section className="compras__filtros">
        <div className="compras__linha">
          <Campo
            type="text"
            label="Cliente"
            placeHolder="Insira o nome do cliente"
            list="lista-clientes"
            value={filtroCliente}
            inputFunction={(e) => setFiltroCliente(e.target.value)}
          />
          <datalist id="lista-clientes">
            {clientes.map((c) => (
              <option key={c.id} value={c.nome} />
            ))}
          </datalist>
          {!clientes.some(c => c.nome === filtroCliente) && filtroCliente && (
            <span className="campo-aviso">
              Cliente não cadastrado. Cadastre primeiro.
            </span>
          )}
        </div>

        <div className="compras__linha">
          <Campo
            label="Data Inicial"
            type="date" 
            placeHolder="Data Inicial" 
            value={dataInicial} 
            inputFunction={(e) => setDataInicial(e.target.value)} />
          <Campo
            label="Data Final"
            type="date" 
            placeHolder="Data Final" 
            value={dataFinal} 
            inputFunction={(e) => setDataFinal(e.target.value)} />
          <Campo
            type="number" 
            placeHolder="Insira o valor máximo" 
            value={filtroValor} 
            inputFunction={(e) => setFiltroValor(e.target.value)} />
        </div>

        <div className="compras__buscar">
          <Botao tipo="primary" label="🔍 Buscar" onClick={buscarTransacoes} htmlType="button"/>
        </div>
      </section>

      <section className="compras__tabela">
        <div className="compras__tabela-cabecalho">
          <span>Cliente</span>
          <span>Itens</span>
          <span>Data</span>
          <span>Valor</span>
          <span>Forma</span>
          <span>Ações</span>
        </div>

        {transacoesParaMostrar.map((item) => {
          const cliente = clientes.find(c => c.id === item.clienteId);
          return (
            <div key={item.id} className="compras__tabela-linha">
              <span>{cliente?.nome || "—"}</span>
              <span>{item.itens.length}</span>
              <span>{new Date(item.data).toLocaleDateString()}</span>
              <span>R$ {item.valorTotal.toFixed(2)}</span>
              <span>{item.formaPagamento}</span>
              <button className="compras__ver-relatorio" onClick={() => setModalRelatorio(item)}>
                🔍 Ver Relatório
              </button>
            </div>
          );
        })}
      </section>

      <footer className="compras__footer">
        <Botao tipo="primary" label="Cadastrar Cliente" onClick={() => setModalCliente(true)} htmlType="button"/>
        <Botao tipo="primary" label="Registrar Venda" onClick={() => setModalAberto(true)} htmlType="button"/>
      </footer>

      {modalAberto && (
        <ModalCompra
          onClose={() => setModalAberto(false)}
          onSave={handleNovaTransacao}
        />
      )}

      {modalCliente && (
        <ModalCliente
          onClose={() => setModalCliente(false)}
          onSave={(novoCliente) => {
            setClientes(prev => [...prev, novoCliente]);
          }}
        />
      )}

      {modalRelatorio && (
        <RelatorioVendas
          transacao={modalRelatorio}
          onClose={() => setModalRelatorio(null)}
          onEdit={(editada) => {
            setTransacoes(prev => prev.map(t => t.id === editada.id ? editada : t));
            setModalRelatorio(null);
          }}
          onDelete={(id) => {
            setTransacoes(prev => prev.filter(t => t.id !== id));
            setModalRelatorio(null);
          }}
        />
      )}
    </div>
  );
}
