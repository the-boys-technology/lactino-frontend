import React from 'react'
import '../css/estoque-form.css'

export default function EstoqueItemForm() {
  return (
    <form className="estoque-form">
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Nome: 
          <input type="text" className="estoque-form__input--large" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Categoria: 
          <select className="estoque-form__input">
            <option value="">Selecione</option>
            <option value="1">Ração</option>
            <option value="2">Remédio</option>
            <option value="3">Outros</option>
          </select>
        </label>
        <label className="estoque-form__label">
          Unidade de medida: 
          <input type="text" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Quantidade: 
          <input type="number" className="estoque-form__input" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Quantidade mínima: 
          <input type="number" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Preço: 
          <input type="text" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Fornecedor: 
          <input type="text" className="estoque-form__input" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Data Validade: 
          <input type="date" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Status: 
          <select className="estoque-form__input">
            <option value="">Selecione</option>
            <option value="1">Ativo</option>
            <option value="2">Vencido</option>
            <option value="3">Esgotado</option>          
          </select>
        </label>
      </div>
    </form>
  )
}
