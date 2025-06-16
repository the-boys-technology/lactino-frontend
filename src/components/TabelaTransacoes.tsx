import "../css/tabela-trasacoes.css";
import { Cliente } from "../types/cliente";
import { Fornecedor } from "../types/fornecedor";
import { Transacao } from "../types/transacao";
import { formatarData, formatarDinheiro } from "../utils/formatter_utils";

interface TabelaTransacoesProps {
  transacoes: Transacao[];
  clientes?: Cliente[]; // se for VENDA
  fornecedores?: Fornecedor[]; // se for COMPRA
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
  return (
    <section className="tabela-transacoes">
      <div className="tabela-transacoes__cabecalho">
        <span>{tipoTransacao === "VENDA" ? "Cliente" : "Fornecedor"}</span>
        <span>Produtos</span>
        <span>Data da compra</span>
        <span>Preço Total</span>
        <span>Pagamento</span>
        <span>Ações</span>
      </div>

      {transacoes.map((item) => {
        const nomePessoa =
          tipoTransacao === "VENDA"
            ? clientes.find((c) => c.id === item.clienteId)?.nome
            : fornecedores.find((f) => f.id === item.fornecedorId)?.nome;

        return (
          <div key={item.id} className="tabela-transacoes__linha">
            <span>{nomePessoa || "—"}</span>
            <span>{item.itens.length}</span>
            <span>{formatarData(item.data)}</span>
            <span>{formatarDinheiro(item.valorTotal)}</span>
            <span>{item.formaPagamento}</span>
            <button
              className="tabela-transacoes__ver-relatorio"
              onClick={() => onVerRelatorio(item)}
            >
              🔍 Ver Relatório
            </button>
          </div>
        );
      })}
    </section>
  );
}
