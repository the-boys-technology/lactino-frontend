import React, { useRef, useEffect, useState } from 'react'
import ModalFornecedor from '../features/Home/ModalFornecedor/ModalFornecedor';
import { Fornecedor } from '../types/fornecedor';
import '../css/estoque-form.css'



interface EstoqueAddFormProps {
  onSubmit?: (data: any) => void
  formRef?: React.MutableRefObject<HTMLFormElement | null>
}

export default function LeiteAddForm({ onSubmit, formRef }: EstoqueAddFormProps) {
  const localRef = useRef<HTMLFormElement>(null)
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (formRef && localRef.current) {
      formRef.current = localRef.current
    }
  }, [formRef])

  return (
    <>
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
          fornecedorId: fornecedor?.id,
          descricao: formData.get('descricao') as string,
        }
        if (onSubmit) onSubmit(dados)
        console.log("Dados enviados para criação do leite:", {
          fornecedorId: fornecedor?.id,
        });
      }}
    >
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Turno:
          <select name="turno" className="estoque-form__input">
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
          />
        </label>

        <label className="estoque-form__label">
          Finalidade:
          <input
            type="text"
            name="finalidade"
            className="estoque-form__input"
            placeholder="Finalidade"
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
          />
        </label>

        <label className="estoque-form__label">
          Data de Validade:
          <input
            type="date"
            name="dataValidade"
            className="estoque-form__input"
            placeholder="Data de Validade"
          />
        </label>

        <label className="estoque-form__label">
          Status:
          <select name="status" className="estoque-form__input">
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={fornecedor ? `${fornecedor.nome} (${fornecedor.email})` : ''}
                placeholder="Cadastre um fornecedor"
                className="estoque-form__input fornecedor"
              />
              <button
                type="button"
                className="estoque-form__botao-modal"
                onClick={() => setMostrarModal(true)}
              >
                +
              </button>
            </div>
          </label>
      </div>

      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Descrição:
          <textarea 
            name="descricao"
            className="estoque-form__input--large"
            placeholder="Descrição">
          </textarea>
        </label>
      </div>
    </form>
    {mostrarModal && (
        <ModalFornecedor
          onClose={() => setMostrarModal(false)}
          onSave={(novoFornecedor) => {
            setFornecedor(novoFornecedor);
            setMostrarModal(false);
          }}
        />
      )}
    </>
  );
}