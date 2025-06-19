import React, { useEffect, useState } from "react";
import "../css/modal-transacoes.css";
import { TipoTransacao, FormaPagamento, Transacao } from "../types/transacao";
import { CategoriaItem, ItemTransacao } from "../types/item-transacao";
import { Cliente } from "../types/cliente";
import { Fornecedor } from "../types/fornecedor";
import { Campo } from "./Campo";
import Botao from "./Botao";
import ProdutosTable from "./ProdutosTable";
import ProdutosForm from "./ProdutosForm";
import { criarTransacao, editarTransacao, removerTransacao } from "../services/transacoes";
import { toast } from "react-toastify";

interface ModalTransacoesProps {
  tipoTransacao: TipoTransacao;
  clientes: Cliente[];
  fornecedores: Fornecedor[];
  onSalvar: (novaTransacao: Transacao) => void;
  onCancelar: () => void;
  transacaoEditando?: Transacao | null;
}

export default function ModalTransacoes({
  tipoTransacao,
  clientes,
  fornecedores,
  onSalvar,
  onCancelar,
  transacaoEditando,
}: ModalTransacoesProps) {
  const [formulario, setFormulario] = useState<Omit<Transacao, "id" | "itens">>({
    tipo: tipoTransacao,
    data: "",
    valorTotal: 0,
    formaPagamento: FormaPagamento.PIX,
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

  useEffect(() => {
    if (transacaoEditando) {
      const { itens, ...dados } = transacaoEditando;
      setFormulario(dados);
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
  const total = itens.reduce((soma, item) => soma + item.precoUnitario * item.quantidade, 0);
  const novaTransacao: Transacao = {
    ...formulario,
    itens,
    valorTotal: total,
    id: transacaoEditando?.id || Date.now().toString(),
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
  }
};



  const handleExcluir = async () => {
    if (transacaoEditando) {
      const confirmar = confirm("Tem certeza que deseja excluir esta transação?");
      if (confirmar) {
        await removerTransacao(transacaoEditando.id);
        onCancelar();
      }
    }
  };

  return (
    <div className="modal-transacoes">
      <h2>{transacaoEditando ? "Editar Transação" : tipoTransacao === "COMPRA" ? "Registrar Compra" : "Registrar Venda"}</h2>

      <div className="modal-transacoes__grupo-campos">
        {tipoTransacao === "COMPRA" ? (
          <>
            <Campo
              label="Fornecedor"
              type="text"
              value={fornecedores.find(f => f.id === formulario.fornecedorId)?.nome || ""}
              placeHolder="Digite para buscar fornecedor"
              list="lista-fornecedores"
              inputFunction={(e) => {
                const selecionado = fornecedores.find(f => f.nome === e.target.value);
                handleChange("fornecedorId", selecionado?.id || undefined);
              }}
            />
            <datalist id="lista-fornecedores">
              {fornecedores.map(f => (
                <option key={f.id} value={f.nome} />
              ))}
            </datalist>
          </>
        ) : (
          <>
            <Campo
              label="Cliente"
              type="text"
              value={clientes.find(c => c.id === formulario.clienteId)?.nome || ""}
              placeHolder="Digite para buscar cliente"
              list="lista-clientes"
              inputFunction={(e) => {
                const selecionado = clientes.find(c => c.nome === e.target.value);
                handleChange("clienteId", selecionado?.id || undefined);
              }}
            />
            <datalist id="lista-clientes">
              {clientes.map(c => (
                <option key={c.id} value={c.nome} />
              ))}
            </datalist>
          </>
        )}

        <Campo
          label="Data"
          type="date"
          value={formulario.data}
          inputFunction={(e) => handleChange("data", e.target.value)}
        />

        <Campo
          label="Forma de Pagamento"
          type="select"
          options={Object.values(FormaPagamento).map((f) => ({ label: f, value: f }))}
          value={formulario.formaPagamento}
          selectFunction={(e) => handleChange("formaPagamento", e.target.value)}
        />

        <Campo
          label="Descrição"
          type="text"
          value={formulario.descricao}
          inputFunction={(e) => handleChange("descricao", e.target.value)}
        />
      </div>

      <div className="modal-transacoes__produtos">
        <div className="modal-transacoes__cabecalho-produtos">
          <h3>Lista de Produtos</h3>
          <Botao
            label={modoEdicao ? "Editar Produto" : "+ Adicionar Produto"}
            tipo="success"
            htmlType="button"
            onClick={() => {
              setExibirFormularioProduto(true);
              if (!modoEdicao) setItemEditando(null);
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

        <ProdutosTable produtos={itens} onEditar={editarItem} onRemover={removerItem} />
      </div>

      <div className="modal-transacoes__rodape">
        <span className="modal-transacoes__total">
          Total: R$ {itens.reduce((t, i) => t + i.precoUnitario * i.quantidade, 0).toFixed(2)}
        </span>

        <div className="modal-transacoes__botoes">
          <Botao label="Cancelar" tipo="secondary" htmlType="button" onClick={onCancelar} />
          {transacaoEditando && (
            <Botao label="🗑 Excluir" tipo="danger" htmlType="button" onClick={handleExcluir} />
          )}
          <Botao label="Salvar" tipo="primary" htmlType="button" onClick={handleSalvar} />
        </div>
      </div>
    </div>
  );
}