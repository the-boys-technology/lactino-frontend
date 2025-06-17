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

  useEffect(() => {
    buscarRelatorioPedido(transacaoId).then(setRelatorio);
  }, [transacaoId]);

  const imprimir = () => window.print();

  if (!relatorio) return <div className="relatorio-pedido__carregando">Carregando relatório...</div>;

  return (
    <div className="relatorio-pedido__fundo" onClick={onClose}>
      <div className="relatorio-pedido__container" onClick={(e) => e.stopPropagation()}>
        <h2>Relatório do Pedido</h2>

        <div className="relatorio-pedido__colunas">
          <div>
            <p><strong>Data:</strong> {new Date(relatorio.data).toLocaleDateString()}</p>
            {relatorio.clienteNome && <p><strong>Cliente:</strong> {relatorio.clienteNome}</p>}
            {relatorio.fornecedorNome && <p><strong>Fornecedor:</strong> {relatorio.fornecedorNome}</p>}
            <p><strong>Forma de Pagamento:</strong> {relatorio.formaPagamento}</p>
            <p><strong>Descrição:</strong> {relatorio.descricao}</p>
          </div>
        </div>

        <table className="relatorio-pedido__tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Valor Unitário</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {relatorio.itens.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.precoUnitario.toFixed(2)}</td>
                <td>R$ {item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="relatorio-pedido__total"><strong>Total:</strong> R$ {relatorio.valorTotal.toFixed(2)}</p>

        <div className="relatorio-pedido__botoes">
          <Botao tipo="secondary" label="Cancelar" htmlType="button" onClick={onClose} />
          <Botao tipo="primary" label="Exportar PDF" htmlType="button" onClick={() => baixarRelatorioPDF(transacaoId)} />
          <Botao tipo="primary" label="Imprimir" htmlType="button" onClick={imprimir} />
        </div>
      </div>
    </div>
  );
}
