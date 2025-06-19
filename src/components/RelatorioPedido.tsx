import { useEffect, useState } from "react";
import {
  buscarRelatorioPedido,
  baixarRelatorioPDF
} from "../services/relatorios";
import "../css/relatorio-pedido.css";
import Botao from "./Botao";
import { RelatorioPedidoTipo } from "../types/relatorios";

interface Props {
  transacaoId: string;
  onClose: () => void;
}

export default function RelatorioPedido({ transacaoId, onClose }: Props) {
  const [relatorio, setRelatorio] = useState<RelatorioPedidoTipo | null>(null);
  const [carregandoPDF, setCarregandoPDF] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    buscarRelatorioPedido(transacaoId)
      .then(r => setRelatorio(r))
      .finally(() => setSpinner(false));
  }, [transacaoId]);

  const imprimir = () => window.print();

  const exportarPDF = async () => {
    setCarregandoPDF(true);
    try {
      await baixarRelatorioPDF(transacaoId);
      setToast("✅ PDF exportado com sucesso!");
    } catch {
      setToast("❌ Falha ao exportar PDF.");
    } finally {
      setCarregandoPDF(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  if (spinner) {
    return (
      <div className="relatorio-pedido__fundo" onClick={onClose}>
        <div className="relatorio-pedido__container">
          <p>Carregando relatório…</p>
        </div>
      </div>
    );
  }

  if (!relatorio) {
    return (
      <div className="relatorio-pedido__fundo" onClick={onClose}>
        <div className="relatorio-pedido__container">
          <p>Relatório indisponível.</p>
          <Botao tipo="primary" label="Fechar" htmlType="button" onClick={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div className="relatorio-pedido__fundo" onClick={onClose}>
      <div
        className="relatorio-pedido__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="relatorio-title"
        onClick={e => e.stopPropagation()}
      >
        <h2 id="relatorio-title">Relatório de Pedido</h2>

        <section className="relatorio-pedido__dados">
          <p><strong>Data:</strong> {new Date(relatorio.data).toLocaleDateString()}</p>
          {relatorio.clienteNome && <p><strong>Cliente:</strong> {relatorio.clienteNome}</p>}
          {relatorio.fornecedorNome && <p><strong>Fornecedor:</strong> {relatorio.fornecedorNome}</p>}
          <p><strong>Pagamento:</strong> {relatorio.formaPagamento}</p>
          <p><strong>Descrição:</strong> {relatorio.descricao}</p>
        </section>

        <table className="relatorio-pedido__tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {relatorio.itens.map((item, i) => (
              <tr key={i}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.precoUnitario.toFixed(2)}</td>
                <td>R$ {item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="relatorio-pedido__total">
          <strong>Total do Pedido:</strong> R$ {relatorio.valorTotal.toFixed(2)}
        </p>

        <div className="relatorio-pedido__botoes">
          <Botao
            tipo="secondary"
            label="Cancelar"
            htmlType="button"
            onClick={onClose}
          />
          <Botao
            tipo="primary"
            label={carregandoPDF ? "Exportando…" : "📄 Exportar PDF"}
            htmlType="button"
            onClick={exportarPDF}
          />
          <Botao
            tipo="primary"
            label="🖨️ Imprimir"
            htmlType="button"
            onClick={imprimir}
          />
        </div>

        {toast && <div className="relatorio-pedido__toast">{toast}</div>}
      </div>
    </div>
  );
}
