import React, { useState } from "react";
import Campo from "../../../components/Campo";
import Botao from "../../../components/Botao";
import "../ModalCompras/ModalCompras.css";

interface Props {
  onClose: () => void;
  onSave: (fornecedor: string) => void;
}

export default function ModalFornecedor({ onClose, onSave }: Props) {
  const [nome, setNome] = useState("");

  const handleSubmit = () => {
    if (nome.trim()) {
      onSave(nome);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__titulo">Cadastrar Fornecedor</h2>
        <div className="modal__form">
          <Campo
            name="nomeFornecedor"
            placeholder="Nome do Fornecedor"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="modal__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
