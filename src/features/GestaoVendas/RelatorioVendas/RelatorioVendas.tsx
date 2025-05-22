import React from "react";
import { Transacao } from "../../../types/transacao";
import "./RelatorioVendas.css";

interface Props {
  transacao: Transacao;
  onClose: () => void;
  onEdit: (editada: Transacao) => void;
  onDelete: (id: number) => void;
}


export default function RelatorioVendas({ transacao, onClose }: Props) {
  return (
    <div className="relatorio-vendas">
      <div className="relatorio-vendas__container">
        <h2 className="relatorio-vendas__titulo">Relatório de Venda</h2>

        <div className="relatorio-vendas__info">
          <p><strong>Cliente:</strong> N/A</p>
          <p><strong>Data:</strong> {new Date(transacao.data).toLocaleDateString()}</p>
          <p><strong>Descrição:</strong> {transacao.descricao}</p>
          <p><strong>Forma de Pagamento:</strong> {transacao.formaPagamento}</p>
        </div>

        <div className="relatorio-vendas__itens">
          {transacao.itens.map((item, index) => (
            <div key={index} className="relatorio-vendas__item">
              <p><strong>Produto:</strong> Produto sem nome</p>
              <p><strong>Categoria:</strong> {item.categoria}</p>
              <p><strong>Quantidade:</strong> {item.quantidade}</p>
              <p><strong>Preço Unitário:</strong> R$ {item.precoUnitario.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <p className="relatorio-vendas__total">
          <strong>Total:</strong> R$ {transacao.valorTotal.toFixed(2)}
        </p>

        <div className="relatorio-vendas__botoes">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}