import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import RelatorioVendas from "../../features/GestaoVendas/RelatorioVendas/RelatorioVendas";
import { CategoriaItem, Cliente, Transacao } from "../../types/transacao";
import "../GestaoVendas/GestaoVendas.css";
import { api } from "../../services/api";
import { Campo } from "../../components/Campo";
import { formatarData, formatarDinheiro } from "../../utils/formatter_utils";
import ModalVendas from "../../features/GestaoVendas/ModalVendas/ModalVendas";


export default function GestaoVendas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState<Transacao | null>(null);
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

    const produtoMatch = !filtroProduto || t.itens.some(item =>
      (item.produtoNome || "").toLowerCase().includes(filtroProduto.toLowerCase())
    );

    return t.tipo === "VENDA" && dentroData && dentroValor && clienteMatch && produtoMatch;
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
              placeHolder="Insira o nome do cliente"
              list="lista-clientes"
              value={filtroCliente}
              styleInput={{width: "15rem"}}
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
          
            <Campo
              type="text"
              label="Produto"
              placeHolder="Insira o nome do produto"
              value={filtroProduto}
              styleInput={{width: "15rem"}}
              inputFunction={(e) => setFiltroProduto(e.target.value)}
            />

            <Campo
              type="select"
              label="Categoria"
              value={categoria}
              selectFunction={(e) => setCategoria(e.target.value as CategoriaItem)}
              options={Object.values(CategoriaItem).map((cat) => ({
                label: cat,
                value: cat
              }))}
              styleInput={{ width: "10rem" }}
            />

          </div>

          <div className="vendas__linha">
            
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
              label="Valor Mínimo"
              type="text"
              placeHolder="R$ 0,00"
              value={valorMin}
              inputFunction={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                const formatted = (Number(raw) / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                setValorMin(formatted.replace("R$", "").trim());
              }}
              styleInput={{ width: "7rem" }}
              leftAdd="R$"
            />

            <Campo
              label="Valor Máximo"
              type="text"
              placeHolder="R$ 0,00"
              value={valorMax}
              inputFunction={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                const formatted = (Number(raw) / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                setValorMax(formatted.replace("R$", "").trim());
              }}
              styleInput={{ width: "7rem" }}
              leftAdd="R$"
            />

          </div>

        <div className="vendas__buscar">
          <Botao tipo="primary" label="🔍 Buscar" onClick={buscarTransacoes} htmlType="button"/>
        </div>
        </section>

        <section className="vendas__tabela">
          <div className="vendas__tabela-cabecalho">
            <span>Cliente</span>
            <span>Produtos</span>
            <span>Data da compra</span>
            <span>Preço Total</span>
            <span>Pagamento</span>
            <span>Ações</span>
          </div>

          {transacoesParaMostrar.map((item) => {
            const cliente = clientes.find(c => c.id === item.clienteId);
            return (
              <div key={item.id} className="vendas__tabela-linha">
                <span>{cliente?.nome || "—"}</span>
                <span>{item.itens.length}</span>
                <span>{formatarData(item.data)}</span>
                <span>{formatarDinheiro(item.valorTotal)}</span>
                <span>{item.formaPagamento}</span>
                <button className="vendas__ver-relatorio" onClick={() => setModalRelatorio(item)}>
                  🔍 Ver Relatório
                </button>
              </div>
            );
          })}
        </section>

        <footer className="vendas__footer">
          <Botao tipo="primary" label="Registrar Venda" onClick={() => setModalAberto(true)} htmlType="button"/>
        </footer>

        {modalAberto && (
          <ModalVendas
            onClose={() => setModalAberto(false)}
            onSave={handleNovaTransacao}
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
      </section>
      
    </div>
  );
}
