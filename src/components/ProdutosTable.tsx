import React from "react";
import "../css/produtos-table.css";
import { ItemTransacao } from "../types/item-transacao";

interface ProdutosTableProps {
  produtos: ItemTransacao[];
  onEditar: (item: ItemTransacao) => void;
  onRemover: (id: number) => void;
}

export default function ProdutosTable({
  produtos,
  onEditar,
  onRemover,
}: ProdutosTableProps) {
  return (
    <div className="tabela-produtos">
      <h3 className="tabela-produtos__titulo">Produtos Adicionados</h3>

      <table className="tabela-produtos__tabela">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>ID Produto</th>
            <th>Qtd</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan={6} className="tabela-produtos__vazio">
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
                <td>
                  <button
                    className="tabela-produtos__botao editar"
                    onClick={() => onEditar(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="tabela-produtos__botao remover"
                    onClick={() => onRemover(item.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
