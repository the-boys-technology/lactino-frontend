import React, { useRef, useEffect } from 'react'
import '../css/estoque-form.css'

interface EstoqueAddFormProps {
  onSubmit?: (data: any) => void
  formRef?: React.MutableRefObject<HTMLFormElement | null>
}

export default function LeiteAddForm({ onSubmit, formRef }: EstoqueAddFormProps) {
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
        const dados = {
          nome: formData.get('nome') as string,
          categoria: formData.get('categoria') as string,
          unidadeMedida: (formData.get('unidadeMedida') as string).toLowerCase(),
          quantidadeTotal: parseFloat(formData.get('quantidadeTotal') as string),
          quantidadeMinima: parseFloat(formData.get('quantidadeMinima') as string),
          validade: formData.get('validade') as string,
          preco: parseFloat((formData.get('preco') as string).replace(',', '.')),
          fornecedor: formData.get('fornecedor') as string
        }
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
            <option value="racao">Ração</option>
            <option value="remedio">Remédio</option>
            <option value="outros">Outros</option>
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
          <input type="number" step="0.01" name="preco" className="estoque-form__input" />
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
      </div>
    </form>
  )
}