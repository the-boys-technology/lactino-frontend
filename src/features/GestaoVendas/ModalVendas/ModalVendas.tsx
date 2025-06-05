import React, { useState } from "react";
import Botao from "../../../components/Botao";
import "../ModalVendas/ModalVendas.css";
import {
  FormaPagamento,
  TipoTransacao,
  Transacao,
  CategoriaItem,
  ItemTransacao,
} from "../../../types/transacao";
import { Campo } from "../../../components/Campo";

interface Props {
  onClose: () => void;
  onSave: (data: Transacao) => void;
  transacaoParaEditar?: Transacao;
}

export default function ModalVendas({ onClose, onSave, transacaoParaEditar }: Props) {
  const [form, setForm] = useState<Omit<Transacao, "id" | "valorTotal" | "itens" | "tipo">>(
    transacaoParaEditar || {
      data: new Date().toISOString(),
      descricao: "",
      formaPagamento: FormaPagamento.DINHEIRO,
      clienteId: undefined,
      fornecedorId: undefined,
      leiteId: undefined,
      laticinioId: undefined,
    }
  );

  const [produtos, setProdutos] = useState<ItemTransacao[]>([]);
  const [formProdutoVisivel, setFormProdutoVisivel] = useState(false);
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  const [produto, setProduto] = useState<ItemTransacao>({
    id: 0,
    transacaoId: 0,
    produtoId: 0,
    quantidade: 1,
    precoUnitario: 0,
    categoria: CategoriaItem.LATICINIO,
    validade: "",
    produtoNome: "",
    unidadeMedida: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "clienteId" ? Number(value) : value,
    }));
  };

  const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: name === "produtoId" || name === "quantidade" || name === "precoUnitario" ? Number(value) : value,
    }));
  };

  const handleConfirmarProduto = () => {
    if (!produto.produtoNome || produto.quantidade <= 0 || produto.precoUnitario <= 0) return;

    if (editandoIndex !== null) {
      const novos = [...produtos];
      novos[editandoIndex] = { ...produto, id: Date.now() };
      setProdutos(novos);
      setEditandoIndex(null);
    } else {
      setProdutos([...produtos, { ...produto, id: Date.now() }]);
    }

    setProduto({
      id: 0,
      transacaoId: 0,
      produtoId: 0,
      quantidade: 1,
      precoUnitario: 0,
      categoria: CategoriaItem.LATICINIO,
      validade: "",
      produtoNome: "",
      unidadeMedida: "",
    });

    setFormProdutoVisivel(false);
  };

  const handleEditarProduto = (index: number) => {
    setProduto(produtos[index]);
    setFormProdutoVisivel(true);
    setEditandoIndex(index);
  };

  const handleRemoverProduto = (index: number) => {
    const novos = produtos.filter((_, i) => i !== index);
    setProdutos(novos);
  };

  const handleSubmit = () => {
    const valorTotal = produtos.reduce((soma, p) => soma + p.quantidade * p.precoUnitario, 0);

    const novaTransacao: Transacao = {
      ...form,
      id: Date.now(),
      tipo: TipoTransacao.VENDA,
      valorTotal,
      itens: produtos,
    };

    onSave(novaTransacao);
    onClose();
  };

  return (
    <div className="modal-vendas" onClick={onClose}>
      <div className="modal-vendas__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-vendas__titulo">Registrar Venda</h2>

        {/* Dados Gerais */}
        <div className="modal-vendas__form">
          <Campo label="Data da Venda" type="date" value={form.data.split("T")[0]} name="data" inputFunction={handleFormChange} />
          <Campo label="Cliente" type="text" name="clienteId" value={form.clienteId?.toString() || ""} inputFunction={handleFormChange} />
          <Campo label="Descrição" type="text" name="descricao" value={form.descricao} inputFunction={handleFormChange} />
          <Campo label="Forma de Pagamento" type="select" name="formaPagamento" value={form.formaPagamento} 
            options={[
                { value: "PIX", label: "Pix" },
                { value: "CARTAO", label: "Cartão" },
                { value: "DINHEIRO", label: "Dinheio" },
                { value: "BOLETO", label: "Boleto" },
              ]}  
            inputFunction={handleFormChange} 
            />
        </div>

        {/* Botão para mostrar o formulário de produto */}
        {!formProdutoVisivel && (
          <div className="modal-vendas__adicionar-produto">
            <Botao tipo="success" label="+ Adicionar Produto" onClick={() => setFormProdutoVisivel(true)} htmlType="button" />
          </div>
        )}

        {/* Formulário de Produto */}
        {formProdutoVisivel && (
          <div className="modal-vendas__produto-form">
            <Campo label="Nome do Produto" type="text" name="produtoNome" value={produto.produtoNome} inputFunction={handleProdutoChange} />
            <Campo label="Categoria" type="select" name="categoria" value={produto.categoria} 
              options={[
                  { value: "LEITE", label: "Leite" },
                  { value: "LATICINIO", label: "Laticínio" },
                  { value: "INSUMO", label: "Insumo" },
                ]} 
              inputFunction={handleProdutoChange} 
              />
            <Campo label="Quantidade" type="number" name="quantidade" value={produto.quantidade.toString()} inputFunction={handleProdutoChange} />
            <Campo label="Unidade de Medida" type="text" name="unidadeMedida" value={produto.unidadeMedida} inputFunction={handleProdutoChange} />
            <Campo label="Validade" type="date" name="validade" value={produto.validade} inputFunction={handleProdutoChange} />
            <Campo label="Preço Unitário" type="number" name="precoUnitario" value={produto.precoUnitario.toString()} inputFunction={handleProdutoChange} />
            <Botao tipo="primary" label={editandoIndex !== null ? "Salvar Alterações" : "Confirmar Produto"} onClick={handleConfirmarProduto} htmlType="button" />
          </div>
        )}

        {/* Tabela de Produtos */}
        <div className="modal-vendas__tabela-produtos">
          <h3>Lista de Produtos</h3>
          {produtos.length === 0 && <p>Nenhum produto adicionado ainda.</p>}
          {produtos.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Produto</th>
                  <th>Quantid.</th>
                  <th>Validade</th>
                  <th>Valor Unit.</th>
                  <th>Subtotal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p, index) => (
                  <tr key={p.id}>
                    <td>{p.categoria}</td>
                    <td>{p.produtoNome}</td>
                    <td>{p.quantidade} {p.unidadeMedida}</td>
                    <td>{p.validade}</td>
                    <td>R$ {p.precoUnitario.toFixed(2)}</td>
                    <td>R$ {(p.quantidade * p.precoUnitario).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleEditarProduto(index)}>✏️</button>
                      <button onClick={() => handleRemoverProduto(index)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Botões finais */}
        <div className="modal-vendas__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} htmlType="button" />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} htmlType="submit" />
        </div>
      </div>
    </div>
  );
}
