import React, { useState } from "react";
import "../css/modal-transacoes.css";
import { TipoTransacao, FormaPagamento, Transacao } from "../types/transacao";
import { CategoriaItem, ItemTransacao } from "../types/item-transacao";
import { Cliente } from "../types/cliente";
import { Fornecedor } from "../types/fornecedor";
import { Campo } from "./Campo";
import Botao from "./Botao";
import ProdutosTable from "./ProdutosTable";
import ProdutosForm from "./ProdutosForm";

interface ModalTransacoesProps {
  tipoTransacao: TipoTransacao;
  clientes: Cliente[];
  fornecedores: Fornecedor[];
  onSalvar: (transacao: Transacao) => void;
  onCancelar: () => void;
}

export default function ModalTransacoes({
  tipoTransacao,
  clientes,
  fornecedores,
  onSalvar,
  onCancelar,
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

  const handleChange = (campo: string, valor: any) => {
    setFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleSalvar = () => {
    const total = itens.reduce((soma, item) => soma + item.precoUnitario * item.quantidade, 0);
    onSalvar({
        ...formulario,
        valorTotal: total,
        itens,
        id: 0
    });
  };

  return (
    <div className="modal-transacoes">
      <h2>{tipoTransacao === "COMPRA" ? "Registrar Compra" : "Registrar Venda"}</h2>

      <div className="modal-transacoes__grupo-campos">
        {tipoTransacao === "COMPRA" ? (
          <Campo
            label="Fornecedor"
            type="select"
            options={fornecedores.map((f) => ({ label: f.nome, value: String(f.id) }))}
            value={formulario.fornecedorId || ""}
            selectFunction={(e) => handleChange("fornecedorId", Number(e.target.value))}
          />
        ) : (
          <Campo
            label="Cliente"
            type="select"
            options={clientes.map((c) => ({ label: c.nome, value: String(c.id) }))}
            value={formulario.clienteId || ""}
            selectFunction={(e) => handleChange("clienteId", Number(e.target.value))}
          />
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

        {/* Campos desabilitados aguardando backend */}
        <Campo label="ID do Leite" type="number" value={formulario.leiteId || ""} disabled />
        <Campo label="ID do Laticínio" type="number" value={formulario.laticinioId || ""} disabled />
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
          <Botao label="Salvar" tipo="primary" htmlType="button" onClick={handleSalvar} />
        </div>
      </div>
    </div>
  );
}
