import React from 'react'
import '../css/estoque-form.css'

export default function CRMForm() {
  return (
    <form className="estoque-form">
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Código: 
          <input type="text" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Nome:
          <input type="text" className="estoque-form__input--large" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Email: 
          <input type="text" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Localização: 
          <input type="text" className="estoque-form__input" />
        </label>
      </div>
    </form>
  )
}
