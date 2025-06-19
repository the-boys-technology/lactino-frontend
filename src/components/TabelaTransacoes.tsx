import "../css/tabela-trasacoes.css"
import { Cliente } from "../types/cliente";
import { Fornecedor } from "../types/fornecedor";
import { Transacao } from "../types/transacao";
import { formatarData, formatarDinheiro } from "../utils/formatter_utils";

interface TabelaTransacoesProps {
  transacoes: Transacao[];
  clientes?: Cliente[];
  fornecedores?: Fornecedor[];
  onVerRelatorio: (transacao: Transacao) => void;
  tipoTransacao: "VENDA" | "COMPRA";
}

export default function TabelaTransacoes({
  transacoes,
  clientes = [],
  fornecedores = [],
  onVerRelatorio,
  tipoTransacao
}: TabelaTransacoesProps) {
  const getPessoaNome = (t: Transacao) => {
    if (tipoTransacao === "VENDA") {
      return clientes.find(c => c.id === t.clienteId)?.nome || "—";
    } else {
      return fornecedores.find(f => f.id === t.fornecedorId)?.nome || "—";
    }
  };

  return (
    <section className="tabela-transacoes" aria-label={`Tabela de ${tipoTransacao.toLowerCase()}s`}>
      <div className="tabela-transacoes__cabecalho">
        <span>{tipoTransacao === "VENDA" ? "Cliente" : "Fornecedor"}</span>
        <span>Produtos</span>
        <span>Data</span>
        <span>Total</span>
        <span>Pagamento</span>
        <span>Ações</span>
      </div>

      {transacoes.map((t) => (
        <div key={t.id} className="tabela-transacoes__linha">
          <span>{getPessoaNome(t)}</span>
          <span>{t.itens.length}</span>
          <span>{formatarData(t.data)}</span>
          <span>{formatarDinheiro(t.valorTotal)}</span>
          <span>{t.formaPagamento}</span>
          <button
            className="tabela-transacoes__ver-relatorio"
            onClick={() => onVerRelatorio(t)}
            aria-label={`Ver relatório da ${tipoTransacao.toLowerCase()} de ${getPessoaNome(t)}`}
          >
            📝Ver Relatório
          </button>
        </div>
      ))}
    </section>
  );
}
