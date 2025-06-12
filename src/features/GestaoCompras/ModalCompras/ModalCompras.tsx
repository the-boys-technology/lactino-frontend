import React, { useState } from "react";
import Botao from "../../../components/Botao";
import "../ModalCompras/ModalCompras.css";
import { 
  FormaPagamento, 
  Transacao, 
  TipoTransacao, 
  CategoriaItem, 
  ItemTransacao 
} from "../../../types/transacao";
import { Campo } from "../../../components/Campo";

interface Props {
  onClose: () => void;
  onSave: (data: Transacao) => void;
  transacaoParaEditar?: Transacao;
}

export default function ModalCompra({ onClose, onSave }: Props) {
  const [produtoId, setProdutoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [precoUnitario, setPrecoUnitario] = useState<number>(0);
  const [categoria, setCategoria] = useState<CategoriaItem>(CategoriaItem.INSUMO);

  const [form, setForm] = useState<Omit<Transacao, "id" | "valorTotal" | "itens" | "tipo">>({
    data: new Date().toISOString(),
    descricao: "",
    formaPagamento: FormaPagamento.DINHEIRO,
    fornecedorId: undefined,
    clienteId: undefined,
    leiteId: undefined,
    laticinioId: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "fornecedorId" ? Number(value) : value
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
      produtoNome: `Produto #${produtoId}`,
      unidadeMedida: undefined,
      validade: undefined
    };

    const novaTransacao: Transacao = {
      ...form,
      id: Date.now(),
      tipo: TipoTransacao.COMPRA,
      valorTotal: quantidade * precoUnitario,
      itens: [item]
    };

    onSave(novaTransacao);
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__titulo">Registrar Compra</h2>

        <div className="modal__form">
          <div className="modal__coluna">
            {/*<Campo
              name="produtoNome"
              placeholder="Nome do Produto"
              type="text"
              onChange={(e) => setProdutoNome(e.target.value)}
            />*/}
            <Campo 
              label="data" 
              placeHolder="Data da Compra" 
              type="date" 
              value={form.data.split("T")[0]} 
              inputFunction={handleChange} />
            <Campo 
              label="descricao" 
              placeHolder="Descrição" 
              type="text" 
              textAreaFuction={handleChange} 
              />
            <section className="campo-container">
              <h4 className="campo-container__nome">Forma de Pagamento:</h4>
              <select
                name="formaPagamento"
                className="campo-container__select"
                onChange={handleChange}
                value={form.formaPagamento}
              >
                {Object.values(FormaPagamento).map((forma) => (
                  <option key={forma} value={forma}>{forma}</option>
                ))}
              </select>
            </section>
          </div>

          <div className="modal__coluna">
            <Campo 
              label="quantidade" 
              placeHolder="Quantidade" 
              type="number" 
              value={quantidade} 
              inputFunction={handleChange} 
              />
            
            <Campo
              label="precoUnitario" 
              placeHolder="Preço Unitário" 
              type="number" 
              value={precoUnitario} 
              inputFunction={(e) => setPrecoUnitario(Number(e.target.value))} />
            
            <section className="campo-container">
              <h4 className="campo-container__nome">Categoria:</h4>
              <select
                name="categoria"
                className="campo-container__select"
                onChange={(e) => setCategoria(e.target.value as CategoriaItem)}
                value={categoria}
              >
                {Object.values(CategoriaItem).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </section>
          </div>
        </div>

        <div className="modal__botoes">
          <Botao tipo="secondary" label="Cancelar" onClick={onClose} htmlType={"button"} />
          <Botao tipo="primary" label="Salvar" onClick={handleSubmit} htmlType={"submit"} />
        </div>
      </div>
    </div>
  );
}
