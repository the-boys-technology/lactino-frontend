import React, { useRef, useEffect } from 'react';
import '../css/laticinio_form.css';

interface LaticinioAddFormProps {
  onSubmit?: (data: any) => void;
  formRef?: React.MutableRefObject<HTMLFormElement | null>;
}

export default function LaticinioAddForm({ onSubmit, formRef }: LaticinioAddFormProps) {
  const localRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef && localRef.current) {
      formRef.current = localRef.current;
    }
  }, [formRef]);

  return (
    <form
      ref={localRef}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const dados = {
          tipoProduto: formData.get('tipoProduto') as string,
          quantidadeProduzida: parseFloat(formData.get('quantidadeProduzida') as string),
          dataProducao: formData.get('dataProducao') as string,
          dataValidade: formData.get('dataValidade') as string,
          status: formData.get('status') as string,
          leiteUtilizadoId: formData.get('leiteUtilizadoId') as string,
          descricao: formData.get('descricao') as string,
        };
        if (onSubmit) onSubmit(dados);
      }}
    >
      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Tipo:
          <select name="tipoProduto" className="estoque-form__input" >
            <option value="">Selecione</option>
            <option value="queijo">Queijo</option>
            <option value="iogurte">Iogurte</option>
            <option value="manteiga">Manteiga</option>
          </select>
        </label>
        <label className="estoque-form__label">
          Quantidade Produzida:
          <input
            type="number"
            name="quantidadeProduzida"
            className="estoque-form__input"
            placeholder="Quantidade"
          />
        </label>

        <label className="estoque-form__label">
          Leite de Origem:
          <input
            type="text"
            name="leiteUtilizadoId"
            className="estoque-form__input"
            placeholder="Leite de origem"
          />
        </label>
      </div>

      <div className="estoque-form__row">
        <label className="estoque-form__label">
          Data de Produção:
          <input
            type="date"
            name="dataProducao"
            className="estoque-form__input"
            placeholder="Data de produção"
          />
        </label>

        <label className="estoque-form__label">
          Data de Validade:
          <input
            type="date"
            name="dataValidade"
            className="estoque-form__input"
            placeholder="Data de validade"
          />
        </label>

        <label className="estoque-form__label">
          Status:
          <select name="status" className="estoque-form__input" >
            <option value="">Selecione</option>
            <option value="DISPONIVEL">Disponivel</option>
            <option value="VENDIDO">Vendido</option>
            <option value="VENCIDO">Vencido</option>
            <option value="DESCARTADO">Descartado</option>
          </select>
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
  );
}
