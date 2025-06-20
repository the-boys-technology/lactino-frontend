import React from "react";
import "../css/produtos-table.css";
import { ItemTransacao } from "../types/item-transacao";

interface ProdutosTableProps {
  produtos: ItemTransacao[];
  onEditar: (item: ItemTransacao) => void;
  onRemover: (id: number) => void;
  valorTotal: number;
}

export default function ProdutosTable({
  produtos,
  onEditar,
  onRemover,
  valorTotal,
}: ProdutosTableProps) {
  return (
    <div className="tabela-produtos">
      <table className="tabela-produtos__tabela">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>ID Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan={6} className="tabela-produtos__vazio" style={{textAlign: "center"}}>
                Nenhum produto adicionado.
              </td>
            </tr>
          ) : (
            produtos.map((item) => (
              <tr key={item.id}>
                <td>{item.categoria}</td>
                <td>{item.produtoId}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.precoUnitario.toFixed(2)}</td>
                <td>R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</td>
                <td className="tabela-produtos__botoes">
                  <button
                    className="tabela-produtos__editar"
                    onClick={() => onEditar(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="tabela-produtos__remover"
                    onClick={() => onRemover(item.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
        <tr className="tabela-produtos__total-row">
          <td colSpan={6}>
            Valor Total: R$ {valorTotal.toFixed(2)}
          </td>
        </tr>
      </tfoot>
      </table>
    </div>
  );
}
