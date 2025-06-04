import React, { useRef, useEffect } from 'react'
import '../css/estoque-form.css'

interface CRMAddFormProps {
  onSubmit?: (data: any) => void
  formRef?: React.MutableRefObject<HTMLFormElement | null>
}

export default function CRMAddForm({ onSubmit, formRef }: CRMAddFormProps) {
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
          email: formData.get('email') as string,
          localizacao: formData.get('localizacao') as string,
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
          Email:
          <input type="text" name="email" className="estoque-form__input" required />
        </label>
        <label className="estoque-form__label">
          Localização:
          <input type="text" name="localizacao" className="estoque-form__input" required />
        </label>
      </div>
    </form>
  )
}