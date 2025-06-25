import React from 'react'
import '../css/estoque-form.css'

type FiltrosCRM = {
  codigo: string
  nome: string
  email: string
  localizacao: string
}

interface CRMFormProps {
  filtros: FiltrosCRM
  onFiltrosChange: (filtrosAtualizados: FiltrosCRM) => void
}

export default function CRMForm({ filtros, onFiltrosChange }: CRMFormProps) {
  return (
    <form className="estoque-form">
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Código: 
          <input 
            type="text" 
            className="estoque-form__input" 
            value={filtros.codigo}
            onChange={(e) => onFiltrosChange({ ...filtros, codigo: e.target.value })}
          />
        </label>
        <label className="estoque-form__label">
          Nome:
          <input 
            type="text" 
            className="estoque-form__input--large" 
            value={filtros.nome}
            onChange={(e) => onFiltrosChange({ ...filtros, nome: e.target.value })}
          />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Email: 
          <input 
            type="text" 
            className="estoque-form__input" 
            value={filtros.email}
            onChange={(e) => onFiltrosChange({ ...filtros, email: e.target.value })}
          />
        </label>
        <label className="estoque-form__label">
          Localização: 
          <input 
            type="text" 
            className="estoque-form__input" 
            value={filtros.localizacao}
            onChange={(e) => onFiltrosChange({ ...filtros, localizacao: e.target.value })}
          />
        </label>
      </div>
    </form>
  )
}
