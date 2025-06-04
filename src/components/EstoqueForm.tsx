import React from 'react'
import '../css/estoque-form.css'

type FiltrosEstoque = {
  codigo: string
  nome: string
  fornecedor: string
  categoria: string
  dataValidade: string
}

interface EstoqueFormProps {
  filtros: FiltrosEstoque
  onFiltrosChange: (filtrosAtualizados: FiltrosEstoque) => void
}

export default function EstoqueForm({ filtros, onFiltrosChange }: EstoqueFormProps) {
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
        <label className="estoque-form__label">
          Fornecedor: 
          <input 
            type="text" 
            className="estoque-form__input" 
            value={filtros.fornecedor}
            onChange={(e) => onFiltrosChange({ ...filtros, fornecedor: e.target.value })}
          />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Categoria: 
          <select 
            className="estoque-form__input"
            value={filtros.categoria}
            onChange={(e) => onFiltrosChange({ ...filtros, categoria: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="Ração">Ração</option>
            <option value="Remédio">Remédio</option>
            <option value="Outros">Outros</option>
          </select>
        </label>
        <label className="estoque-form__label">
          Data Validade: 
          <input 
            type="date" 
            className="estoque-form__input" 
            value={filtros.dataValidade}
            onChange={(e) => onFiltrosChange({ ...filtros, dataValidade: e.target.value })}
          />
        </label>
      </div>
    </form>
  )
}
