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
          turno: formData.get('turno') as string,
          origem: formData.get('origem') as string,
          finalidade: formData.get('finalidade') as string,
          dataObtencao: formData.get('dataObtencao') as string,
          dataValidade: formData.get('dataValidade') as string,
          status: formData.get('status') as string,
          fornecedor: formData.get('fornecedor') as string,
          descricao: formData.get('descricao') as string,
        }
        if (onSubmit) onSubmit(dados)
      }}
    >
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Turno:
          <select name="turno" className="estoque-form__input" defaultValue={dadosIniciais?.turno}>
            <option value="">Selecione</option>
            <option value="MATUTINO">Matutino</option>
            <option value="VESPERTINO">Vespertino</option>
            <option value="NOTURNO">Noturno</option>
          </select>
        </label>

        <label className="estoque-form__label">
          Origem:
          <input
            type="text"
            name="origem"
            className="estoque-form__input"
            placeholder="Origem"
            defaultValue={dadosIniciais?.origem}
          />
        </label>

        <label className="estoque-form__label">
          Finalidade:
          <input
            type="text"
            name="finalidade"
            className="estoque-form__input"
            placeholder="Finalidade"
            defaultValue={dadosIniciais?.finalidade}
          />
        </label>
      </div>

      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Data de Obtenção:
          <input
            type="date"
            name="dataObtencao"
            className="estoque-form__input"
            placeholder="Data de obtenção"
            defaultValue={dadosIniciais?.dataObtencao}
          />
        </label>

        <label className="estoque-form__label">
          Data de Validade:
          <input
            type="date"
            name="dataValidade"
            className="estoque-form__input"
            placeholder="Data de Validade"
            defaultValue={dadosIniciais?.dataValidade}
          />
        </label>

        <label className="estoque-form__label">
          Status:
          <select name="status" className="estoque-form__input" defaultValue={dadosIniciais?.status}>
            <option value="">Selecione</option>
            <option value="DISPONIVEL">Disponível</option>
            <option value="UTILIZADO">Utilizado</option>
            <option value="VENCIDO">Vencido</option>
            <option value="DESCARTADO">Descartado</option>
          </select>
        </label>
      </div>

      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Nome:
          <input
            type="text"
            name="nome"
            className="estoque-form__input"
            placeholder="Nome"
          />
        </label>
        <label className="estoque-form__label">
          Fornecedor:
          <input
            type="text"
            name="fornecedorId"
            className="estoque-form__input"
            placeholder="Fornecedor"
          />
        </label>
      </div>

      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Descrição:
          <textarea 
            name="descricao"
            className="estoque-form__input--large"
            placeholder="Descrição"
            defaultValue={dadosIniciais?.descricao}>
          </textarea>
        </label>
      </div>
    </form>
  )
}