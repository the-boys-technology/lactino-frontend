import React, { useState } from "react";
import Campo from "../../../components/Campo";
import Botao from "../../../components/Botao";
import { criarFornecedor } from "../../../services/fornecedores";
import "../../../features/GestaoCompras/ModalFornecedor/ModalFornecedor.css";
import { Fornecedor } from "../../../types/transacao";

interface Props {
  onClose: () => void;
  onSave: (fornecedor: Fornecedor) => void;
}

export default function ModalFornecedor({ onClose, onSave }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async () => {
    if (!nome.trim()) {
      setMensagem("O nome do fornecedor é obrigatório.");
      return;
    }

    try {
      await criarFornecedor({ nome, email, localizacao });
      setMensagem("Fornecedor cadastrado com sucesso!");
      const novoFornecedor: Fornecedor = {
        id: Date.now(),
        nome,
        email: "",
        localizacao: ""
      };
      onSave(novoFornecedor);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor", error);
      setMensagem("Erro ao cadastrar fornecedor. Tente novamente.");
    }
  };

  return (
    <div className="modal-fornecedor" onClick={onClose}>
      <div className="modal-fornecedor__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-fornecedor__titulo">Cadastrar Fornecedor</h2>

        <div className="modal-fornecedor__form">
          <Campo
            name="nome"
            placeholder="Nome do Fornecedor"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Campo
            name="email"
            placeholder="E-mail (opcional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Campo
            name="localizacao"
            placeholder="Localização (opcional)"
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </div>

        {mensagem && <p className="modal-fornecedor__mensagem">{mensagem}</p>}

        <div className="modal-fornecedor__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
