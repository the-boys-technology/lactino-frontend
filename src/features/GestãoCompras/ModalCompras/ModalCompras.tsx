import React, { useState } from "react";
import "../ModalCompras/ModalCompras.css";

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function ModalCompra({ onClose, onSave }: Props) {
  const [form, setForm] = useState({
    fornecedor: "",
    tipoInsumo: "",
    produto: "",
    dataCompra: "",
    formaPagamento: "",
    quantidade: "",
    valorUnitario: "",
    valorTotal: "",
    validadeProduto: "",
    observacao: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="modal">
      <h2 className="modal__titulo">Registrar Compras</h2>

      <div className="modal__form">
        <div className="modal__coluna">
          <label>Fornecedor:</label>
          <input name="fornecedor" value={form.fornecedor} onChange={handleChange} />

          <label>Tipo de Insumo:</label>
          <input name="tipoInsumo" value={form.tipoInsumo} onChange={handleChange} />

          <label>Produto:</label>
          <input name="produto" value={form.produto} onChange={handleChange} />

          <label>Data da Compra:</label>
          <input name="dataCompra" value={form.dataCompra} onChange={handleChange} />

          <label>Forma de Pagamento:</label>
          <input name="formaPagamento" value={form.formaPagamento} onChange={handleChange} />
        </div>

        <div className="modal__coluna">
          <label>Quantidade:</label>
          <input name="quantidade" value={form.quantidade} onChange={handleChange} />

          <label>Valor Unitário:</label>
          <input name="valorUnitario" value={form.valorUnitario} onChange={handleChange} />

          <label>Valor Total:</label>
          <input name="valorTotal" value={form.valorTotal} onChange={handleChange} />

          <label>Validade do Produto:</label>
          <input name="validadeProduto" value={form.validadeProduto} onChange={handleChange} />

          <label>Observação:</label>
          <textarea name="observacao" value={form.observacao} onChange={handleChange} />
        </div>
      </div>

      <div className="modal__botoes">
        <button className="modal__botao cancelar" onClick={onClose}>Cancelar</button>
        <button className="modal__botao salvar" onClick={handleSubmit}>Salvar</button>
      </div>
    </div>
  );
}
