import React from 'react'
import '../css/estoque-table.css'

export default function EstoqueTable() {
  return (
    <div className="estoque-table">
      <table className="estoque-table__table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Fornecedor</th>
            <th>Setor</th>
            <th>Validade</th>
          </tr>
        </thead>
        <tbody>
          {/* MAPEAMENTO DE DADOS DINAMICOS AQUI */}
          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>Nenhum item cadastrado</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
