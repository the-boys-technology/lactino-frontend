import React, { useEffect, useState } from "react";
import "../css/modal-transacoes.css";
import { TipoTransacao, FormaPagamento, Transacao } from "../types/transacao";
import { ItemTransacao } from "../types/item-transacao";
import { Cliente } from "../types/cliente";
import { Fornecedor } from "../types/fornecedor";
import { Campo } from "./Campo";
import Botao from "./Botao";
import ProdutosTable from "./ProdutosTable";
import ProdutosForm from "./ProdutosForm";
import {
  criarTransacao,
  editarTransacao,
  removerTransacao,
} from "../services/transacoes";
import { toast } from "react-toastify";

interface ModalTransacoesProps {
  tipoTransacao: TipoTransacao;
  clientes: Cliente[];
  fornecedores: Fornecedor[];
  onSalvar: (novaTransacao: Transacao) => void;
  onCancelar: () => void;
  transacaoEditando?: Transacao | null;
}

type FormularioTransacao = Omit<
  Transacao,
  "id" | "itens" | "formaPagamento"
> & {
  formaPagamento: string;
  clienteId?: number;
  fornecedorId?: number;
};

export default function ModalTransacoes({
  tipoTransacao,
  clientes,
  fornecedores,
  onSalvar,
  onCancelar,
  transacaoEditando,
}: ModalTransacoesProps) {
  const [formulario, setFormulario] = useState<FormularioTransacao>({
    tipo: tipoTransacao,
    data: "",
    valorTotal: 0,
    formaPagamento: "",
    clienteId: undefined,
    fornecedorId: undefined,
    leiteId: undefined,
    laticinioId: undefined,
    descricao: "",
  });

  const [itens, setItens] = useState<ItemTransacao[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [itemEditando, setItemEditando] = useState<ItemTransacao | null>(null);
  const [exibirFormularioProduto, setExibirFormularioProduto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [clienteNomeTemp, setClienteNomeTemp] = useState("");

  useEffect(() => {
    if (transacaoEditando) {
      const { itens, formaPagamento, ...dados } = transacaoEditando;
      setFormulario({
        ...dados,
        formaPagamento: formaPagamento || "",
      });
      setItens(itens);
    }
  }, [transacaoEditando]);

  const handleChange = (campo: string, valor: any) => {
    setFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const adicionarOuAtualizarItem = (novoItem: ItemTransacao) => {
    if (modoEdicao && itemEditando) {
      const atualizados = itens.map((item) =>
        item.id === itemEditando.id ? { ...novoItem, id: item.id } : item
      );
      setItens(atualizados);
    } else {
      setItens([...itens, { ...novoItem, id: Date.now() }]);
    }
    setModoEdicao(false);
    setItemEditando(null);
    setExibirFormularioProduto(false);
  };

  const editarItem = (item: ItemTransacao) => {
    setItemEditando(item);
    setModoEdicao(true);
    setExibirFormularioProduto(true);
  };

  const removerItem = (id: number) => {
    setItens(itens.filter((i) => i.id !== id));
  };

  const handleSalvar = async () => {
    if (!formulario.formaPagamento) {
      toast.error("Selecione uma forma de pagamento.");
      return;
    }

    setSalvando(true);

    const valorTotalCalculado = itens.reduce(
      (t, i) => t + i.precoUnitario * i.quantidade,
      0
    );

    const novaTransacao: Transacao = {
      ...formulario,
      id: transacaoEditando?.id || "",
      itens,
      valorTotal: valorTotalCalculado,
      formaPagamento: formulario.formaPagamento as FormaPagamento,
    };

    try {
      if (transacaoEditando) {
        await editarTransacao(transacaoEditando.id, novaTransacao);
      } else {
        await criarTransacao(novaTransacao);
      }

      toast.success("Transação salva com sucesso ✅");
      onSalvar(novaTransacao);
    } catch (e) {
      console.error("Erro ao salvar:", e);
      toast.error("Erro ao salvar transação. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async () => {
    if (transacaoEditando) {
      const confirmar = confirm(
        "Tem certeza que deseja excluir esta transação?"
      );
      if (confirmar) {
        await removerTransacao((transacaoEditando.id));
        onCancelar();
      }
    }
  };

  const valorTotalCalculado = itens.reduce(
    (t, i) => t + i.precoUnitario * i.quantidade,
    0
  );

  return (
    <div className="modal-transacoes">
      <div className="modal-transacoes-container">
        <h2>
          {transacaoEditando
            ? "Editar Transação"
            : tipoTransacao === "COMPRA"
            ? "Registrar Compra"
            : "Registrar Venda"}
        </h2>

        <div className="modal-transacoes__linha">
          {tipoTransacao === "COMPRA" ? (
            <>
              <Campo
                label="Fornecedor"
                type="text"
                value={
                  fornecedores.find((f) => f.id === formulario.fornecedorId)
                    ?.nome || ""
                }
                placeHolder="Digite para buscar fornecedor"
                styleInput={{ width: "20rem" }}
                list="lista-fornecedores"
                inputFunction={(e) => {
                  const selecionado = fornecedores.find(
                    (f) => f.nome === e.target.value
                  );
                  handleChange("fornecedorId", selecionado?.id || undefined);
                }}
              />
              <datalist id="lista-fornecedores">
                {fornecedores.map((f) => (
                  <option key={f.id} value={f.nome} />
                ))}
              </datalist>
            </>
          ) : (
            <>
              <Campo
                label="Cliente"
                type="text"
                value={clienteNomeTemp}
                placeHolder="Digite para buscar cliente"
                styleInput={{ width: "20rem" }}
                list="lista-clientes"
                inputFunction={(e) => {
                  const nome = e.target.value;
                  setClienteNomeTemp(nome);
                  const selecionado = clientes.find((c) => c.nome === nome);
                  handleChange("clienteId", selecionado?.id || undefined);
                }}
              />
              <datalist id="lista-clientes">
                {clientes.map((c) => (
                  <option key={c.id} value={c.nome} />
                ))}
              </datalist>
            </>
          )}

          <Campo
            label="Forma de Pagamento"
            type="select"
            options={[
              { label: "Pix", value: "PIX" },
              { label: "Cartão", value: "CARTAO" },
              { label: "Dinheiro", value: "DINHEIRO" },
              { label: "Boleto", value: "BOLETO" },
            ]}
            value={formulario.formaPagamento}
            selectFunction={(e) =>
              handleChange("formaPagamento", e.target.value)
            }
          />
        </div>

        <div className="modal-transacoes__linha">
          <Campo
            label="Data da venda"
            placeHolder="Insira a data da venda"
            type="date"
            value={formulario.data}
            inputFunction={(e) => handleChange("data", e.target.value)}
          />
          <Campo
            label="Descrição (Opcional)"
            placeHolder="Descreva sua venda ou alguma observação"
            type="textarea"
            value={formulario.descricao}
            textAreaFunction={(e) => handleChange("descricao", e.target.value)}
          />
        </div>

        <div className="modal-transacoes__produtos">
          <div className="modal-transacoes__cabecalho-produtos">
            <h3>Lista de Produtos</h3>
            <Botao
              label="+ Adicionar Produto"
              tipo="success"
              htmlType="button"
              onClick={() => {
                setExibirFormularioProduto(true);
                setModoEdicao(false);
                setItemEditando(null);
              }}
            />
          </div>

          {exibirFormularioProduto && (
            <ProdutosForm
              onSalvar={adicionarOuAtualizarItem}
              onCancelar={() => {
                setModoEdicao(false);
                setItemEditando(null);
                setExibirFormularioProduto(false);
              }}
              itemEdicao={itemEditando}
            />
          )}

          <ProdutosTable
            produtos={itens}
            onEditar={editarItem}
            onRemover={removerItem}
            valorTotal={valorTotalCalculado}
          />
        </div>

        <div className="modal-transacoes__rodape">
          <div className="modal-transacoes__botoes">
            <Botao
              label="Cancelar"
              tipo="secondary"
              htmlType="button"
              onClick={onCancelar}
            />
            {transacaoEditando && (
              <Botao
                label="🗑 Excluir"
                tipo="danger"
                htmlType="button"
                onClick={handleExcluir}
              />
            )}
            <Botao
              label={salvando ? "Salvando..." : "Salvar Venda"}
              tipo="primary"
              htmlType="button"
              onClick={handleSalvar}
              disabled={salvando}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
