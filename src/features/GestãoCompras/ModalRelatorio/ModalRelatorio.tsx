// src/features/GestãoCompras/ModalRelatorio/ModalRelatorio.tsx
import { Compra } from "../../../types/compras";
import Botao from "../../../components/Botao";
import "./ModalRelatorio.css";

interface Props {
  compra: Compra;
  onClose: () => void;
}

export default function ModalRelatorio({ compra, onClose }: Props) {
  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__titulo">Relatório de Compra</h2>
        <div className="modal__conteudo">
          <p><strong>ID do Pedido:</strong> #CMP-0452</p>
          <p><strong>Tipo de Insumo:</strong> {compra.tipoInsumo}</p>
          <p><strong>Produto:</strong> {compra.produto}</p>
          <p><strong>Fornecedor:</strong> {compra.fornecedor}</p>
          <p><strong>Quantidade:</strong> {compra.quantidade}</p>
          <p><strong>Valor Unitário:</strong> R$ {compra.valorUnitario.toFixed(2)}</p>
          <p><strong>Valor Total:</strong> R$ {compra.valorTotal?.toFixed(2)}</p>
          <p><strong>Data da Compra:</strong> {compra.dataCompra.toLocaleDateString()}</p>
          <p><strong>Validade do Produto:</strong> {compra.validadeProduto.toLocaleDateString()}</p>
          <p><strong>Forma de Pagamento:</strong> {compra.formaPagamento}</p>
          {compra.observacao && <p><strong>Observação:</strong> {compra.observacao}</p>}
        </div>

        <div className="modal__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} />
          <Botao tipo="primary" label="Exportar PDF" />
          <Botao tipo="primary" label="Imprimir" />
        </div>
      </div>
    </div>
  );
}
