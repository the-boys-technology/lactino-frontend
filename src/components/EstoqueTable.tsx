import React from 'react'
import '../css/estoque-table.css'

export default function EstoqueTable() {
  return (
    <div className="estoque-table">
      <table className="estoque-table__table">
        <thead>
          <tr>
            <th>Código</th>
            <th className="estoque-table__table__th--large">Nome</th>
            <th>Categoria</th>
            <th>Unidade de medida</th>
            <th>Quantidade</th>
            <th>Quantidade mínima</th>
            <th>Preço</th>
            <th>Fornecedor</th>
            <th>Validade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* MAPEAMENTO DE DADOS DINAMICOS AQUI */}
          <tr>
            <td colSpan={10} style={{ textAlign: 'center' }}>Nenhum item cadastrado</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
