import React, { useState } from "react";
import Campo from "../../../components/Campo";
import Botao from "../../../components/Botao";
import "../ModalCompras/ModalCompras.css";
import { Compra, FormaPagamento, TipoInsumo } from "../../../types/compras";

interface Props {
  onClose: () => void;
  onSave: (data: Compra) => void;
}

export default function ModalCompra({ onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<Compra, "valorTotal">>({
  fornecedor: "",
  tipoInsumo: TipoInsumo.Medicamento,
  produto: "",
  dataCompra: new Date(),
  formaPagamento: FormaPagamento.Dinheiro,
  quantidade: 0,
  valorUnitario: 0,
  validadeProduto: new Date(),
  observacao: ""
});

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: name === "quantidade" || name === "valorUnitario"
      ? Number(value)
      : name === "dataCompra" || name === "validadeProduto"
      ? new Date(value)
      : value
  }));
};

  const handleSubmit = () => {
  const compraCompleta: Compra = {
    ...form,
    valorTotal: form.quantidade * form.valorUnitario
  };

  onSave(compraCompleta);
  onClose();
};


  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__titulo">Registrar Compras</h2>

        <div className="modal__form">
          <div className="modal__coluna">
            <Campo name="fornecedor" placeholder="Fornecedor" type="text" onChange={handleChange} />
            <Campo name="tipoInsumo" placeholder="Tipo de Insumo" type="text" onChange={handleChange} />
            <Campo name="produto" placeholder="Produto" type="text" onChange={handleChange} />
            <Campo name="dataCompra" placeholder="Data da Compra" type="date" onChange={handleChange} />
            <Campo name="formaPagamento" placeholder="Forma de Pagamento" type="text" onChange={handleChange} />
          </div>
          <div className="modal__coluna">
            <Campo name="quantidade" placeholder="Quantidade" type="text" onChange={handleChange} />
            <Campo name="valorUnitario" placeholder="Valor Unitário" type="text" onChange={handleChange} />
            <Campo name="valorTotal" placeholder="Valor Total" type="text" onChange={handleChange} />
            <Campo name="validadeProduto" placeholder="Validade do Produto" type="date" onChange={handleChange} />
            <section className="campo-container">
              <h4 className="campo-container__nome">Observação:</h4>
              <textarea
                name="observacao"
                className="campo-container__input"
                rows={3}
                onChange={handleChange}
              />
            </section>
          </div>
        </div>

        <div className="modal__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
