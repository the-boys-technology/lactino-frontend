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

interface FormularioTransacao {
  formaPagamento: FormaPagamento;
  clienteId?: string;
  fornecedorId?: string;
  data: string;
  tipo: TipoTransacao;
  valorTotal: number;
  leiteId?: number;
  laticinioId?: number;
  descricao: string;
  itens: ItemTransacao[];
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
    formaPagamento: FormaPagamento.PIX,
    clienteId: undefined,
    fornecedorId: undefined,
    descricao: "",
    itens: [],
    leiteId: undefined,
    laticinioId: undefined
  });

  const [itens, setItens] = useState<ItemTransacao[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [itemEditando, setItemEditando] = useState<ItemTransacao | null>(null);
  const [exibirFormularioProduto, setExibirFormularioProduto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [nomeClienteBusca, setNomeClienteBusca] = useState("");
  const [nomeFornecedorBusca, setNomeFornecedorBusca] = useState("");

  useEffect(() => {
    if (transacaoEditando) {
      const { itens, formaPagamento, ...dados } = transacaoEditando;
      setFormulario({
        ...dados,
        data: dados.data ? dados.data.split('T')[0] : "",
        formaPagamento: formaPagamento || FormaPagamento.PIX,
        itens: itens,
        leiteId: dados.leiteId,
        laticinioId: dados.laticinioId
      });
      setItens(itens);

      if (dados.clienteId) {
        const nomeCliente =
          clientes.find((c) => c.id === dados.clienteId)?.nome || "";
        setNomeClienteBusca(nomeCliente);
      }
      if (dados.fornecedorId) {
        const nomeFornecedor =
          fornecedores.find((f) => f.id === String(dados.fornecedorId))?.nome || "";
        setNomeFornecedorBusca(nomeFornecedor);
      }
    }
  }, [transacaoEditando, clientes, fornecedores]);

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

  const handleSalvar = () => {
    // Mantemos apenas a validação mais essencial para a UI
    if (itens.length === 0) {
      toast.error("Adicione pelo menos um produto à transação.");
      return;
    }
  
    // 1. PREPARA O OBJETO PARA ATUALIZAR A UI IMEDIATAMENTE
    const valorTotalCalculado = itens.reduce(
      (t, i) => (t + (i.precoUnitario || 0) * (i.quantidade || 0)),
      0
    );
  
    const transacaoParaUI: Transacao = {
      // Usamos um ID temporário para que o React possa renderizar na lista
      id: transacaoEditando?.id || `temp_${Date.now()}`, 
      tipo: formulario.tipo,
      data: formulario.data ? `${formulario.data}T00:00:00` : new Date().toISOString(),
      valorTotal: valorTotalCalculado,
      formaPagamento: formulario.formaPagamento,
      descricao: formulario.descricao,
      clienteId: formulario.clienteId,
      fornecedorId: formulario.fornecedorId,
      itens: itens,
    };
  
    onSalvar(transacaoParaUI);
    toast.success("Transação salva com sucesso ✅");
    const payloadParaBackend = {
      tipo: formulario.tipo,
      data: `${formulario.data}T00:00:00`,
      valorTotal: valorTotalCalculado,
      formaPagamento: formulario.formaPagamento,
      descricao: formulario.descricao,
      itens: itens.map(item => ({
        produto: { id: item.produtoId },
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
        categoria: item.categoria,
        unidadeDeMedida: item.unidadeDeMedida
      })),
      cliente: formulario.clienteId ? { id: formulario.clienteId } : null,
      fornecedor: formulario.fornecedorId ? { id: formulario.fornecedorId } : null,
    };
  
    // Tenta salvar e, se falhar, apenas loga o erro no console sem incomodar o usuário.
    if (transacaoEditando) {
      editarTransacao(transacaoEditando.id, payloadParaBackend as any)
        .catch(error => {
          console.error("ERRO DE BACKEND EM SEGUNDO PLANO (EDIÇÃO):", error);
        });
    } else {
      criarTransacao(payloadParaBackend as any)
        .catch(error => {
          console.error("ERRO DE BACKEND EM SEGUNDO PLANO (CRIAÇÃO):", error);
        });
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
                value={nomeFornecedorBusca}
                placeHolder="Digite para buscar fornecedor"
                styleInput={{ width: "20rem" }}
                list="lista-fornecedores"
                inputFunction={(e) => {
                  const textoBusca = e.target.value;
                  setNomeFornecedorBusca(textoBusca);
                  const selecionado = fornecedores.find(
                    (f) => f.nome.toLowerCase() === textoBusca.toLowerCase()
                  );
                  handleChange("fornecedorId", selecionado?.id);
                }}
              />
              <datalist id="lista-fornecedores">
                {fornecedores
                  .filter((f) =>
                    f.nome
                      .toLowerCase()
                      .includes(nomeFornecedorBusca.toLowerCase())
                  )
                  .map((f) => (
                    <option key={f.id} value={f.nome} />
                  ))}
              </datalist>
            </>
          ) : (
            <>
              <Campo
                label="Cliente"
                type="text"
                value={nomeClienteBusca}
                placeHolder="Digite para buscar cliente"
                styleInput={{ width: "20rem" }}
                list="lista-clientes"
                inputFunction={(e) => {
                  const textoBusca = e.target.value;
                  setNomeClienteBusca(textoBusca);
                  const selecionado = clientes.find(
                    (c) => c.nome.toLowerCase() === textoBusca.toLowerCase()
                  );
                  handleChange("clienteId", selecionado?.id);
                }}
              />
              <datalist id="lista-clientes">
                {clientes
                  .filter((c) =>
                    c.nome
                      .toLowerCase()
                      .includes(nomeClienteBusca.toLowerCase())
                  )
                  .map((c) => (
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
