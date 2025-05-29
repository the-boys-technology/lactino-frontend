import React, { useRef, useEffect } from 'react'
import '../css/estoque-form.css'

interface EstoqueEditFormProps {
  onSubmit?: (data: any) => void
  formRef?: React.MutableRefObject<HTMLFormElement | null>
  dadosIniciais?: any
}

export default function EstoqueEditFormProps({ onSubmit, formRef, dadosIniciais }: EstoqueEditFormProps) {
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
          quantidadeMinima: parseFloat(formData.get('quantidadeMinima') as string),
          validade: formData.get('validade') as string,
          status: formData.get('status') as string
        }
        if (onSubmit) onSubmit(dados)
      }}
    >
  
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Quantidade mínima:
          <input type="number" name="quantidadeMinima" defaultValue={dadosIniciais?.quantidadeMinima} className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Data Validade:
          <input type="date" name="validade" defaultValue={dadosIniciais?.validade} className="estoque-form__input" />
        </label>
        <label className="estoque-form__label">
          Status:
          <select className="estoque-form__input" name="status" defaultValue={dadosIniciais?.status} required>
            <option value="">Selecione</option>
            <option value="ATIVO">Ativo</option>
            <option value="VENCIDO">Vencido</option>
            <option value="ESGOTADO">Esgotado</option>
          </select>
        </label>
      </div>
    </form>
  )
}