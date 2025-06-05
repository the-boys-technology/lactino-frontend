import React, { useState } from "react";
import Botao from "../../../components/Botao";
import { Cliente } from "../../../types/transacao";
import { criarCliente } from "../../../services/clientes"; // service separado
import "./ModalCliente.css";
import { Campo } from "../../../components/Campo";

interface Props {
  onClose: () => void;
  onSave?: (cliente: Cliente) => void;
}

export default function ModalCliente({ onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<Cliente, "id">>({
    nome: "",
    email: "",
    localizacao: ""
  });
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.nome.trim()) return;
    try {
      const res = await criarCliente(form);
      setSucesso(true);
      onSave?.(res.data);
    } catch (e) {
      console.error("Erro ao salvar cliente:", e);
    }
  };

  if (sucesso) {
    return (
      <div className="modal-cliente">
        <div className="modal-cliente__container">
          <h2 className="modal-cliente__titulo">Cliente Cadastrado!</h2>
          <Botao tipo="primary" label="Fechar" onClick={onClose} htmlType={"button"} />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-cliente" onClick={onClose}>
      <div
        className="modal-cliente__container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-cliente__titulo">Cadastrar Cliente</h2>
        <div className="modal-cliente__form">
          <Campo 
            label="Nome do Cliente" 
            placeHolder="Insira o nome do cliente" 
            type="text" 
            value={form.nome} 
            inputFunction={handleChange} 
            />
          <Campo 
            label="Email (Opcional)" 
            placeHolder="Insira o email do cliente" 
            type="text" 
            value={form.email} 
            inputFunction={handleChange} 
            />
          <Campo 
            label="Localizaçõo (Opcional)" 
            placeHolder="Insiro o endereço do cliente" 
            type="text" 
            value={form.localizacao} 
            inputFunction={handleChange} 
            />
        </div>
        <div className="modal-cliente__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} htmlType={"button"} />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} htmlType={"submit"} />
        </div>
      </div>
    </div>
  );
}
