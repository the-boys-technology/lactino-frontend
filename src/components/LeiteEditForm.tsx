import React, { useRef, useEffect } from 'react'
import '../css/estoque-form.css'

interface EstoqueEditFormProps {
  onSubmit?: (data: any) => void
  formRef?: React.MutableRefObject<HTMLFormElement | null>
  dadosIniciais?: any
}

export default function LeiteEditFormProps({ onSubmit, formRef, dadosIniciais }: EstoqueEditFormProps) {
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
          fornecedor: formData.get('fornecedor') as string,
          status: formData.get('status') as string
        }
        if (onSubmit) onSubmit(dados)
      }}
    >
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Nome:
          <input type="text" name="nome" defaultValue={dadosIniciais?.nome} className="estoque-form__input--large" required />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Categoria:
          <select className="estoque-form__input" name="categoria" defaultValue={dadosIniciais?.categoria} required>
            <option value="">Selecione</option>
            <option value="racao">Ração</option>
            <option value="remedio">Remédio</option>
            <option value="outros">Outros</option>
          </select>
        </label>
        <label className="estoque-form__label">
          Unidade de medida:
          <input type="text" name="unidadeMedida" defaultValue={dadosIniciais?.unidadeMedida} className="estoque-form__input" required />
        </label>
        <label className="estoque-form__label">
          Quantidade:
          <input type="number" name="quantidadeTotal" defaultValue={dadosIniciais?.quantidadeTotal} className="estoque-form__input" required />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Quantidade mínima:
          <input type="number" name="quantidadeMinima" defaultValue={dadosIniciais?.quantidadeMinima} className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Preço:
          <input type="number" step="0.01" name="preco" defaultValue={dadosIniciais?.preco} className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Fornecedor:
          <input type="text" name="fornecedor" defaultValue={dadosIniciais?.fornecedor} className="estoque-form__input" />
        </label>
      </div>
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Data Validade:
          <input type="date" name="validade" defaultValue={dadosIniciais?.validade} className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Status:
          <select className="estoque-form__input" name="status" defaultValue={dadosIniciais?.status} required>
            <option value="">Selecione</option>
            <option value="ativo">Ativo</option>
            <option value="vencido">Vencido</option>
            <option value="esgotado">Esgotado</option>
          </select>
        </label>
      </div>
    </form>
  )
}