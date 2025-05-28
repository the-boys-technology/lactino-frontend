import "../css/gestao_produto.css";
import Campo   from "./Campo";
import Select  from "./Select";
import { useState } from "react";
import { CampoConfig } from "../types/campos";
import Botao from "./Botao";
import { useNavigate } from "react-router-dom";

interface GestaoFormProps {
  title:      string;
  fields:     CampoConfig[];
  onSubmit:   (data: Record<string, any>) => Promise<void>;   
  submitText?: string;                                       
}

export default function GestaoForm({
  title,
  fields,
  onSubmit,
}: GestaoFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    await onSubmit(formData);          
  };

  return (
    <section className="paginaGestao__forms">
      <h2 className="paginaGestao__titulo">{title}</h2>

      <form onSubmit={handleSubmit} className="paginaGestao__campos">
        {fields.map((field, idx) =>
          field.type === "select" ? (
            <Select
              key={idx}
              nome={field.label}
              value={formData[field.name] || ""}
              options={field.options}
              onChange={(v) => handleChange(field.name, v)}
            />
          ) : (
            <Campo
              key={idx}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )
        )}

        <section className="paginaGestao__botoes">
          <Botao
            label="Retornar"
            tipo="secondary"
            onClick={() => navigate("/selecionar-produto")}
            htmlType="button"
          />

          <Botao
            label="Salvar"
            tipo="primary"
            htmlType="submit"
          />
        </section>
      </form>
    </section>
  );
}
