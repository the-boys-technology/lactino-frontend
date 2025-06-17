import { useState } from "react";
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
  const [produto, setProduto] = useState<Partial<ItemTransacao>>(
    itemEdicao ?? {
      produtoId: 0,
      categoria: CategoriaItem.LEITE,
      quantidade: 0,
      precoUnitario: 0,
    }
  );

  const handleSalvar = () => {
    if (
      produto.produtoId &&
      produto.categoria &&
      produto.quantidade &&
      produto.precoUnitario
    ) {
      onSalvar({
        id: itemEdicao?.id ?? Date.now(), // usa o ID existente ou cria um novo
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
      <h3 className="formulario-produto__titulo">Adicionar Produto</h3>

      <div className="formulario-produto__campos">
        <Campo
          label="Categoria"
          type="select"
          options={Object.values(CategoriaItem).map((cat) => ({
            label: cat,
            value: cat,
          }))}
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
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              precoUnitario: parseFloat(e.target.value),
            }))
          }
        />

        <Campo
          label="Validade"
          type="date"
          disabled
          placeHolder="(Campo não implementado)"
        />

        <Campo
          label="Unidade de Medida"
          type="text"
          disabled
          placeHolder="(Campo não implementado)"
        />
      </div>

      <div className="formulario-produto__botoes">
        <Botao label="Cancelar" tipo="secondary" htmlType="button" onClick={onCancelar} />
        <Botao label="Confirmar Produto" tipo="primary" htmlType="button" onClick={handleSalvar} />
      </div>
    </div>
  );
}
