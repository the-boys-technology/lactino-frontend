import React, { useEffect, useState } from 'react'
import '../css/estoque-table.css'
import { buscarInsumos } from '../services/estoque'
import { formatarData } from '../utils/formatter_utils'

interface EstoqueTableProps {
  insumos: any[]
  itemSelecionado?: any
  onSelecionar?: (insumo: any) => void
}

export default function EstoqueTable({ insumos, itemSelecionado, onSelecionar }: EstoqueTableProps) {
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
          {insumos.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center' }}>Nenhum item cadastrado</td>
            </tr>
          ) : (
            insumos.map((insumo) => (
              <tr
                key={insumo.id}
                onClick={() => onSelecionar?.(insumo)}
                className={itemSelecionado?.id === insumo.id ? 'linha-selecionada' : ''}
                style={{ cursor: 'pointer' }}
              >
                <td>{insumo.id}</td>
                <td>{insumo.nome}</td>
                <td>{insumo.categoria}</td>
                <td>{insumo.unidadeMedida}</td>
                <td>{insumo.quantidadeTotal}</td>
                <td>{insumo.quantidadeMinima}</td>
                <td>{insumo.preco}</td>
                <td>{insumo.fornecedor}</td>
                <td>{formatarData(insumo.validade)}</td>
                <td>{insumo.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}