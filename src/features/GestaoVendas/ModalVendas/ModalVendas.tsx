import React, { useState } from "react";
import Campo from "../../../components/Campo";
import Botao from "../../../components/Botao";
import "../ModalVendas/ModalVendas.css";
import {
  FormaPagamento,
  TipoTransacao,
  Transacao,
  CategoriaItem,
  ItemTransacao,
} from "../../../types/transacao";

interface Props {
  onClose: () => void;
  onSave: (data: Transacao) => void;
  transacaoParaEditar?: Transacao;
}

export default function ModalVendas({ onClose, onSave, transacaoParaEditar }: Props) {
  const [produtoId, setProdutoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [precoUnitario, setPrecoUnitario] = useState<number>(0);
  const [categoria, setCategoria] = useState<CategoriaItem>(CategoriaItem.LATICINIO);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "clienteId" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    const item: ItemTransacao = {
      id: Date.now(),
      transacaoId: 0,
      produtoId,
      quantidade,
      precoUnitario,
      categoria,
      produtoNome: "Produto Exemplo", // Pode ser adaptado para buscar nome real
    };

    const novaTransacao: Transacao = {
      ...form,
      id: Date.now(),
      tipo: TipoTransacao.VENDA,
      valorTotal: quantidade * precoUnitario,
      itens: [item],
    };

    onSave(novaTransacao);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__titulo">Registrar Venda</h2>
        <div className="modal__form">
          <div className="modal__coluna">
            <Campo name="data" placeholder="Data da Venda" type="date" value={form.data.split("T")[0]} onChange={handleChange} />
            <Campo name="descricao" placeholder="Descrição" type="text" onChange={handleChange} />
            <section className="campo-container">
              <h4 className="campo-container__nome">Forma de Pagamento:</h4>
              <select name="formaPagamento" className="campo-container__input" onChange={handleChange} value={form.formaPagamento}>
                {Object.values(FormaPagamento).map((forma) => (
                  <option key={forma} value={forma}>{forma}</option>
                ))}
              </select>
            </section>
          </div>

          <div className="modal__coluna">
            <Campo name="quantidade" placeholder="Quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} />
            <Campo name="precoUnitario" placeholder="Preço Unitário" type="number" value={precoUnitario} onChange={(e) => setPrecoUnitario(Number(e.target.value))} />
            <section className="campo-container">
              <h4 className="campo-container__nome">Categoria:</h4>
              <select name="categoria" className="campo-container__input" onChange={(e) => setCategoria(e.target.value as CategoriaItem)} value={categoria}>
                {Object.values(CategoriaItem).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </section>
          </div>
        </div>

        <div className="modal__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}