import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import ModalTransacoes from "../../components/ModalTransacoes";
import RelatorioPedido from "../../components/RelatorioPedido";
import { TipoTransacao, Transacao } from "../../types/transacao";
import { Fornecedor } from "../../types/fornecedor";
import { Campo } from "../../components/Campo";
import { api } from "../../services/api";
import "../GestaoCompras/GestaoCompras.css";

export default function GestaoCompras() {
  const [modalAberto, setModalAberto] = useState<false | "compra">(false);
  const [relatorioId, setRelatorioId] = useState<string | null>(null);
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  // filtros
  const [filtroFornecedor, setFiltroFornecedor] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [resultadoFiltro, setResultadoFiltro] = useState<Transacao[]>([]);

  // Busca e filtros
  const filtrar = () => {
    const filtrado = transacoes.filter(t => {
      const data = new Date(t.data);
      const dentroData =
        (!dataInicial || data >= new Date(dataInicial)) &&
        (!dataFinal   || data <= new Date(dataFinal));
      const dentroValor =
        (!valorMin || t.valorTotal >= parseFloat(valorMin)) &&
        (!valorMax || t.valorTotal <= parseFloat(valorMax));
      const forn = fornecedores.find(f => f.id === t.fornecedorId)?.nome.toLowerCase() || "";
      const matchForn = !filtroFornecedor || forn.includes(filtroFornecedor.toLowerCase());
      return t.tipo === TipoTransacao.COMPRA && dentroData && dentroValor && matchForn;
    });
    setResultadoFiltro(filtrado);
  };

  const mostrar = resultadoFiltro.length ? resultadoFiltro : transacoes;

  // carregar dados iniciais
  useEffect(() => {
    api.get<Fornecedor[]>("/fornecedores")
      .then(r => setFornecedores(r.data))
      .catch(() => alert("Erro ao carregar fornecedores"));

    api.get<Transacao[]>("/transacoes?tipo=COMPRA")
      .then(r => setTransacoes(r.data))
      .catch(() => alert("Erro ao carregar compras"));
  }, []);

  // após criar/editar, recarrega a lista
  const recarregar = async () => {
    const r = await api.get<Transacao[]>("/transacoes?tipo=COMPRA");
    setTransacoes(r.data);
    setResultadoFiltro([]);
  };

  return (
    <div className="compras">
      <header className="compras__header">
        <h1>Gestão de Compras</h1>
      </header>

      <section className="compras__filtros">
        <div className="compras__linha">
          <Campo
            type="text"
            label="Fornecedor"
            placeHolder="Digite parte do nome"
            list="lista-forn"
            value={filtroFornecedor}
            inputFunction={e => setFiltroFornecedor(e.target.value)}
          />
          <datalist id="lista-forn">
            {fornecedores.map(f => <option key={f.id} value={f.nome} />)}
          </datalist>

          <Campo
            type="date"
            label="De"
            value={dataInicial}
            inputFunction={e => setDataInicial(e.target.value)}
          />
          <Campo
            type="date"
            label="Até"
            value={dataFinal}
            inputFunction={e => setDataFinal(e.target.value)}
          />

          <Campo
            type="text"
            label="Valor Mín."
            leftAdd="R$"
            styleInput={{ width: "7rem" }}
            value={valorMin}
            inputFunction={e => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              setValorMin((Number(raw) / 100).toFixed(2));
            }}
          />
          <Campo
            type="text"
            label="Valor Máx."
            leftAdd="R$"
            styleInput={{ width: "7rem" }}
            value={valorMax}
            inputFunction={e => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              setValorMax((Number(raw) / 100).toFixed(2));
            }}
          />
        </div>

        <div className="compras__buscar">
          <Botao tipo="primary" label="🔍 Filtrar" onClick={filtrar} htmlType="button" />
        </div>
      </section>

      <section className="compras__lista">
        {mostrar.length === 0
          ? <p className="compras__vazio">Nenhuma compra encontrada.</p>
          : mostrar.map(t => {
              const forn = fornecedores.find(f => f.id === t.fornecedorId)?.nome || "—";
              return (
                <div key={t.id} className="compras__linha-tabela">
                  <span>{forn}</span>
                  <span>{t.itens.length}</span>
                  <span>{new Date(t.data).toLocaleDateString()}</span>
                  <span>R$ {t.valorTotal.toFixed(2)}</span>
                  <span>{t.formaPagamento}</span>
                  <div className="compras__acoes">
                    <Botao
                      tipo="secondary"
                      label="✏️"
                      htmlType="button"
                      onClick={() => {
                        setTransacaoEditando(t);
                        setModalAberto("compra");
                      }}
                    />
                    <Botao
                      tipo="primary"
                      label="📄"
                      htmlType="button"
                      onClick={() => setRelatorioId(String(t.id))}
                    />
                  </div>
                </div>
              );
            })
        }
      </section>

      <footer className="compras__footer">
        <Botao
          tipo="success"
          label="+ Nova Compra"
          htmlType="button"
          onClick={() => {
            setTransacaoEditando(null);
            setModalAberto("compra");
          }}
        />
      </footer>

      {modalAberto === "compra" && (
        <ModalTransacoes
          tipoTransacao={TipoTransacao.COMPRA}
          clientes={[]}          // não usado em compra
          fornecedores={fornecedores}
          transacaoEditando={transacaoEditando}
          onSalvar={async () => {
            await recarregar();
            setModalAberto(false);
          }}
          onCancelar={() => setModalAberto(false)}
        />
      )}

      {/* Modal de relatório */}
      {relatorioId && (
        <RelatorioPedido
          transacaoId={relatorioId}
          onClose={() => setRelatorioId(null)}
        />
      )}
    </div>
);
}
