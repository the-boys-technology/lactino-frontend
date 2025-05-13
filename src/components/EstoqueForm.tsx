import React from 'react'
import '../css/estoque-form.css'

export default function EstoqueForm() {
  return (
    <form className="estoque-form">
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Código: 
          <input type="text" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Descrição: 
          <input type="text" className="estoque-form__input--large" />
        </label>
        <label className="estoque-form__label">
          Fornecedor: 
          <input type="text" className="estoque-form__input" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Setor: 
          <select className="estoque-form__input">
            <option value="">Selecione</option>
            <option value="1">Refrigeração</option>
            <option value="2">Armazenamento</option>
          </select>
        </label>
        <label className="estoque-form__label">
          Data Validade: 
          <input type="date" className="estoque-form__input" />
        </label>
      </div>
    </form>
  )
}
