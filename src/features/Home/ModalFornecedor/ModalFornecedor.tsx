import { useState } from "react";
import Botao from "../../../components/Botao";
import { criarFornecedor } from "../../../services/fornecedores";
import { Campo } from "../../../components/Campo";
import { Fornecedor } from "../../../types/fornecedor";
import { toast } from "react-toastify";  // Importe o toast
import "../ModalFornecedor/ModalFornecedor.css";

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
      toast.error("O nome do fornecedor é obrigatório."); 
      return;
    }

    try {
      await criarFornecedor({ nome, email, localizacao });
      toast.success("Fornecedor cadastrado com sucesso!"); 
      const novoFornecedor: Fornecedor = {
        id: Date.now(),
        nome,
        email: "",
        localizacao: "",
      };
      onSave(novoFornecedor);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor", error);
      toast.error("Erro ao cadastrar fornecedor. Tente novamente.");
    }
  };

  return (
    <div className="modal-fornecedor" onClick={onClose}>
      <div
        className="modal-fornecedor__container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-fornecedor__titulo">Cadastrar Fornecedor</h2>

        <div className="modal-fornecedor__form">
          <Campo
            label="Nome do Fornecedor"
            placeHolder="Insira o nome do fornecedor"
            type="text"
            styleInput={{ width: "15rem" }}
            value={nome}
            inputFunction={(e) => setNome(e.target.value)}
          />
          <Campo
            label="E-mail"
            placeHolder="Insira o email do fornecedor"
            type="text"
            styleInput={{ width: "15rem" }}
            value={email}
            inputFunction={(e) => setEmail(e.target.value)}
          />
          <Campo
            label="Localização"
            placeHolder="Insira o endereço do fornecedor"
            type="text"
            styleInput={{ width: "15rem" }}
            value={localizacao}
            inputFunction={(e) => setLocalizacao(e.target.value)}
          />
        </div>

        {mensagem && <p className="modal-fornecedor__mensagem">{mensagem}</p>}

        <div className="modal-fornecedor__botoes">
          <Botao
            tipo="secondary"
            label="Cancelar"
            onClick={onClose}
            htmlType={"submit"}
          />
          <Botao
            tipo="primary"
            label="Salvar"
            onClick={handleSubmit}
            htmlType={"button"}
          />
        </div>
      </div>
    </div>
  );
}