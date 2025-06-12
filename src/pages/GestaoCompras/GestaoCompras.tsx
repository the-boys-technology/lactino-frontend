import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import ModalCompra from "../../features/GestaoCompras/ModalCompras/ModalCompras";
import ModalRelatorio from "../../features/GestaoCompras/ModalRelatorio/ModalRelatorio";
import ModalFornecedor from "../../features/GestaoCompras/ModalFornecedor/ModalFornecedor";
import { Transacao, Fornecedor } from "../../types/transacao";
import "../GestaoCompras/GestaoCompras.css";
import { Campo } from "../../components/Campo";
import { api } from "../../services/api";
import TabelaTransacoes from "../../components/TabelaTransacoes";

export default function GestaoCompras() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalFornecedor, setModalFornecedor] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState<Transacao | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const [filtroFornecedor, setFiltroFornecedor] = useState("");
  const [dataInicial, setDataInicial] = useState("2025-05-14");
  const [dataFinal, setDataFinal] = useState("2025-05-21");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [resultadoFiltro, setResultadoFiltro] = useState<Transacao[]>([]);

  const handleNovaTransacao = (nova: Transacao) => {
    setTransacoes((prev) => [nova, ...prev]);
  };

  const buscarTransacoes = () => {
    const filtrado = transacoes.filter((t) => {
      const data = new Date(t.data);
      const dentroData = data >= new Date(dataInicial) && data <= new Date(dataFinal);

      const dentroValorMin = !valorMin || t.valorTotal >= parseFloat(valorMin);
      const dentroValorMax = !valorMax || t.valorTotal <= parseFloat(valorMax);
      const dentroValor = dentroValorMin && dentroValorMax;

      const fornecedor = fornecedores.find((f) => f.id === t.fornecedorId);
      const fornecedorMatch =
        !filtroFornecedor || fornecedor?.nome.toLowerCase().includes(filtroFornecedor.toLowerCase());

      return t.tipo === "COMPRA" && dentroData && dentroValor && fornecedorMatch;
    });

    setResultadoFiltro(filtrado);
  };

  const transacoesParaMostrar = resultadoFiltro.length ? resultadoFiltro : transacoes;

  useEffect(() => {
    async function carregarFornecedores() {
      try {
        const res = await api.get("/fornecedores");
        setFornecedores(res.data);
      } catch (e) {
        console.error("Erro ao buscar fornecedores", e);
      }
    }

    async function carregarCompras() {
      try {
        const res = await api.get("/transacoes?tipo=COMPRA");
        setTransacoes(res.data);
      } catch (e) {
        console.error("Erro ao buscar compras", e);
      }
    }

    carregarFornecedores();
    carregarCompras();
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
            label="Fornecedor"
            placeHolder="Fornecedor"
            list="lista-fornecedores"
            value={filtroFornecedor}
            inputFunction={(e) => setFiltroFornecedor(e.target.value)}
          />
          <datalist id="lista-fornecedores">
            {fornecedores.map((f) => (
              <option key={f.id} value={f.nome} />
            ))}
          </datalist>
          {!fornecedores.some((f) => f.nome === filtroFornecedor) && filtroFornecedor && (
            <span className="campo-aviso">Fornecedor não cadastrado. Cadastre primeiro.</span>
          )}
        </div>

        <div className="compras__linha">
          <Campo
            type="date"
            placeHolder="Data Inicial"
            value={dataInicial}
            inputFunction={(e) => setDataInicial(e.target.value)}
          />
          <Campo
            type="date"
            placeHolder="Data Final"
            value={dataFinal}
            inputFunction={(e) => setDataFinal(e.target.value)}
          />
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

        <div className="compras__buscar">
          <Botao tipo="primary" label="🔍 Buscar" onClick={buscarTransacoes} htmlType="button" />
        </div>
      </section>

      <TabelaTransacoes
        transacoes={transacoesParaMostrar}
        fornecedores={fornecedores}
        onVerRelatorio={setModalRelatorio}
        tipoTransacao="COMPRA"
      />

      <footer className="compras__footer">
        <Botao
          htmlType="button"
          tipo="primary"
          label="Cadastrar Fornecedor"
          onClick={() => setModalFornecedor(true)}
        />
        <Botao
          htmlType="button"
          tipo="primary"
          label="Registrar Compra"
          onClick={() => setModalAberto(true)}
        />
      </footer>

      {modalAberto && (
        <ModalCompra onClose={() => setModalAberto(false)} onSave={handleNovaTransacao} />
      )}

      {modalFornecedor && (
        <ModalFornecedor
          onClose={() => setModalFornecedor(false)}
          onSave={(novo: Fornecedor) => {
            setFornecedores((prev) => [...prev, novo]);
          }}
        />
      )}

      {modalRelatorio && (
        <ModalRelatorio
          transacao={modalRelatorio}
          onClose={() => setModalRelatorio(null)}
          onEdit={(editada) => {
            setTransacoes((prev) => prev.map((t) => (t.id === editada.id ? editada : t)));
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
