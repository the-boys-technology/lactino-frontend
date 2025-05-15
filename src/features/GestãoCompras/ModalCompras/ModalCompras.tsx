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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        name === "quantidade" || name === "valorUnitario"
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
            <Campo
              name="fornecedor"
              placeholder="Fornecedor"
              type="text"
              onChange={handleChange}
              value={form.fornecedor}
            />

            <section className="campo-container">
              <h4 className="campo-container__nome">Tipo de Insumo:</h4>
              <select
                name="tipoInsumo"
                className="campo-container__input"
                onChange={handleChange}
                value={form.tipoInsumo}
              >
                {Object.values(TipoInsumo).map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </section>

            <Campo
              name="produto"
              placeholder="Produto"
              type="text"
              onChange={handleChange}
              value={form.produto}
            />

            <Campo
              name="dataCompra"
              placeholder="Data da Compra"
              type="date"
              onChange={handleChange}
              value={form.dataCompra.toISOString().split("T")[0]}
            />

            <section className="campo-container">
              <h4 className="campo-container__nome">Forma de Pagamento:</h4>
              <select
                name="formaPagamento"
                className="campo-container__input"
                onChange={handleChange}
                value={form.formaPagamento}
              >
                {Object.values(FormaPagamento).map((forma) => (
                  <option key={forma} value={forma}>{forma}</option>
                ))}
              </select>
            </section>
          </div>

          <div className="modal__coluna">
            <Campo
              name="quantidade"
              placeholder="Quantidade"
              type="number"
              onChange={handleChange}
              value={form.quantidade}
            />

            <Campo
              name="valorUnitario"
              placeholder="Valor Unitário"
              type="number"
              onChange={handleChange}
              value={form.valorUnitario}
            />

            <Campo
              name="validadeProduto"
              placeholder="Validade do Produto"
              type="date"
              onChange={handleChange}
              value={form.validadeProduto.toISOString().split("T")[0]}
            />

            <section className="campo-container">
              <h4 className="campo-container__nome">Observação:</h4>
              <textarea
                name="observacao"
                className="campo-container__input"
                rows={3}
                value={form.observacao}
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
