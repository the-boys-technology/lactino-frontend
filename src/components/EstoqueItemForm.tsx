import React, { useRef, useEffect } from 'react'
import '../css/estoque-form.css'

interface EstoqueItemFormProps {
  onSubmit?: (data: any) => void
  formRef?: React.MutableRefObject<HTMLFormElement | null>
}

export default function EstoqueItemForm({ onSubmit, formRef }: EstoqueItemFormProps) {
  const localRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formRef && localRef.current) {
      formRef.current = localRef.current
    }
  }, [formRef])

  return (
    <form
      ref={localRef}
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const dados = Object.fromEntries(formData.entries())
        if (onSubmit) onSubmit(dados)
      }}
    >
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Nome:
          <input type="text" name="nome" className="estoque-form__input--large" required />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Categoria:
          <select className="estoque-form__input" name="categoria" required>
            <option value="">Selecione</option>
            <option value="1">Ração</option>
            <option value="2">Remédio</option>
            <option value="3">Outros</option>
          </select>
        </label>
        <label className="estoque-form__label">
          Unidade de medida:
          <input type="text" name="unidadeMedida" className="estoque-form__input" required />
        </label>
        <label className="estoque-form__label">
          Quantidade:
          <input type="number" name="quantidadeTotal" className="estoque-form__input" required />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Quantidade mínima:
          <input type="number" name="quantidadeMinima" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Preço:
          <input type="number" name="preco" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Fornecedor:
          <input type="text" name="fornecedor" className="estoque-form__input" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Data Validade:
          <input type="date" name="validade" className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Status:
          <select className="estoque-form__input" name="status">
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