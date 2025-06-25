import React, { useEffect, useState } from 'react'
import '../css/estoque-table.css'

interface CRMTableProps {
  clientes: any[]
  itemSelecionado?: any
  onSelecionar?: (insumo: any) => void
}

export default function CRMTable({ clientes, itemSelecionado, onSelecionar }: CRMTableProps) {
  return (
    <div className="estoque-table">
      <table className="estoque-table__table">
        <thead>
          <tr>
            <th>Código</th>
            <th className="estoque-table__table__th--large">Nome</th>
            <th>Email</th>
            <th>Localização</th>
            <th className="estoque-table__table__th--large">Transações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>Nenhum item cadastrado</td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr
                key={cliente.id}
                onClick={() => onSelecionar?.(cliente)}
                className={itemSelecionado?.id === cliente.id ? 'linha-selecionada' : ''}
                style={{ cursor: 'pointer' }}
              >
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.localizacao}</td>
                <td>
                  {cliente.transacoes.slice(0, 3).map((t: any, index: number) => (
                    <div key={index}>
                      {t.tipo} - R$ {t.valorTotal.toFixed(2)}
                    </div>
                  ))}
                  {cliente.transacoes.length > 3 && <div>...</div>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}