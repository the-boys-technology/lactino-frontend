
import React, { useState } from "react";
import Botao from "../../../components/Botao";
import ModalCompra from "../ModalCompras/ModalCompras";
import { Transacao } from "../../../types/transacao";
import "./ModalRelatorio.css";
import NotFound from "../../../pages/NotFound/NotFound";

interface Props {
  transacao: Transacao;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: (atualizada: Transacao) => void;
}

export default function ModalRelatorio({
  transacao,
  onClose,
  onDelete,
  onEdit,
}: Props) {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [confirmarSalvar, setConfirmarSalvar] = useState<Transacao | null>(null);
  const [sucessoEdicao, setSucessoEdicao] = useState(false);

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="modal-relatorio" onClick={onClose}>
      <div className="modal-relatorio__container" id="relatorio-pdf" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-relatorio__titulo">Relatório de Compra</h2>
        <div className="modal-relatorio__acoes-topo">
          <span className="relatorio__acao" onClick={() => setConfirmarExclusao(true)}>🗑️ Excluir</span>
          <span className="relatorio__acao" onClick={() => setModoEdicao(true)}>✏️ Editar</span>
        </div>

        <div className="modal-relatorio__texto">
          <p><strong>Fornecedor:</strong> N/A</p>
          <p><strong>Forma de Pagamento:</strong> {transacao.formaPagamento}</p>
          <p><strong>Data:</strong> {new Date(transacao.data).toLocaleDateString()}</p>
          <p><strong>Descrição:</strong> {transacao.descricao}</p>
          {transacao.itens.map((item, index) => (
            <div key={index} className="relatorio__item">
              <p><strong>Produto:</strong> Produto sem nome</p>
              <p><strong>Categoria:</strong> {item.categoria}</p>
              <p><strong>Quantidade:</strong> {item.quantidade}</p>
              <p><strong>Preço Unitário:</strong> R$ {item.precoUnitario.toFixed(2)}</p>
              <p><strong>Total:</strong> R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</p>
            </div>
          ))}
          <p className="relatorio__total">
            <strong>Valor Total da Compra:</strong> R$ {transacao.valorTotal.toFixed(2)}
          </p>
        </div>

        <div className="modal-relatorio__botoes">
          <Botao label="Cancelar" tipo="secondary" onClick={onClose} htmlType={"button"} />
          <Botao label="Exportar PDF" tipo="primary" onClick={NotFound} htmlType={"button"} />
          <Botao label="Imprimir" tipo="primary" onClick={imprimir} htmlType={"button"} />
        </div>
      </div>

      {modoEdicao && (
        <ModalCompra
          transacaoParaEditar={transacao}
          onClose={() => setModoEdicao(false)}
          onSave={(nova) => {
            setConfirmarSalvar(nova);
            setModoEdicao(false);
          }}
        />
      )}

      {confirmarSalvar && (
        <div className="modal-confirmacao">
          <div className="modal-confirmacao__container">
            <h3>Confirmar edição</h3>
            <p>Deseja salvar as alterações feitas nesta compra?</p>
            <div className="modal-confirmacao__botoes">
              <Botao label="Cancelar" tipo="secondary" onClick={() => setConfirmarSalvar(null)} htmlType={"button"} />
              <Botao label="Salvar" tipo="primary" onClick={() => {
                onEdit(confirmarSalvar);
                setConfirmarSalvar(null);
                setSucessoEdicao(true);
              } } htmlType={"button"} />
            </div>
          </div>
        </div>
      )}

      {sucessoEdicao && (
        <div className="modal-confirmacao">
          <div className="modal-confirmacao__container">
            <h3>Edição Concluída</h3>
            <p>A compra foi atualizada com sucesso!</p>
            <div className="modal-confirmacao__botoes">
              <Botao label="Fechar" tipo="primary" onClick={() => setSucessoEdicao(false)} htmlType={"button"} />
            </div>
          </div>
        </div>
      )}

      {confirmarExclusao && (
        <div className="modal-confirmacao">
          <div className="modal-confirmacao__container">
            <h3>Confirmar exclusão</h3>
            <p>Tem certeza que deseja excluir esta transação?</p>
            <div className="modal-confirmacao__botoes">
              <Botao label="Cancelar" tipo="secondary" onClick={() => setConfirmarExclusao(false)} htmlType={"button"} />
              <Botao label="Remover" tipo="danger" onClick={() => onDelete(transacao.id)} htmlType={"button"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
