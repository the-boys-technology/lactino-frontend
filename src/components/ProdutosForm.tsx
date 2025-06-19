import { useState, useEffect } from "react";
import "../css/produtos-form.css";
import { ItemTransacao, CategoriaItem } from "../types/item-transacao";
import { Campo } from "./Campo";
import Botao from "./Botao";

interface ProdutosFormProps {
  onSalvar: (item: ItemTransacao) => void;
  onCancelar: () => void;
  itemEdicao?: ItemTransacao | null;
}

export default function ProdutosForm({
  onSalvar,
  onCancelar,
  itemEdicao,
}: ProdutosFormProps) {
  const [produto, setProduto] = useState<Partial<ItemTransacao>>({
    produtoId: undefined,
    categoria: undefined,
    quantidade: undefined,
    precoUnitario: undefined,
  });

  useEffect(() => {
    if (itemEdicao) {
      setProduto(itemEdicao);
    } else {
      setProduto({
        produtoId: undefined,
        categoria: undefined,
        quantidade: undefined,
        precoUnitario: undefined,
      });
    }
  }, [itemEdicao]);

  const handleSalvar = () => {
    if (
      produto.produtoId != null &&
      produto.categoria &&
      produto.quantidade != null &&
      produto.precoUnitario != null
    ) {
      onSalvar({
        id: itemEdicao?.id ?? Date.now(),
        transacaoId: 0,
        produtoId: produto.produtoId,
        categoria: produto.categoria,
        quantidade: produto.quantidade,
        precoUnitario: produto.precoUnitario,
      });
    }
  };

  return (
    <div className="formulario-produto">
      <h3 className="formulario-produto__titulo">
        {itemEdicao ? "Editar Produto" : "Adicionar Produto"}
      </h3>

      <div className="formulario-produto__campos">
        <Campo
          label="Categoria"
          type="select"
          options={Object.values(CategoriaItem).map((cat) => ({
            label: cat,
            value: cat,
          }))}
          value={produto.categoria || ""}
          selectFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              categoria: e.target.value as CategoriaItem,
            }))
          }
        />

        <Campo
          label="Produto ID"
          type="number"
          value={produto.produtoId || ""}
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              produtoId: parseInt(e.target.value),
            }))
          }
        />

        <Campo
          label="Quantidade"
          type="number"
          value={produto.quantidade || ""}
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              quantidade: parseFloat(e.target.value),
            }))
          }
        />

        <Campo
          label="Preço Unitário"
          type="number"
          value={produto.precoUnitario || ""}
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              precoUnitario: parseFloat(e.target.value),
            }))
          }
        />
      </div>

      <div className="formulario-produto__botoes">
        <Botao
          label="Cancelar"
          tipo="secondary"
          htmlType="button"
          onClick={onCancelar}
        />
        <Botao
          label={itemEdicao ? "Confirmar Edição" : "Confirmar Produto"}
          tipo={itemEdicao ? "success" : "primary"}
          htmlType="button"
          onClick={handleSalvar}
        />
      </div>
    </div>
  );
}
