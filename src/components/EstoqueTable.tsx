import React, { useEffect, useState } from 'react'
import '../css/estoque-table.css'
import { buscarInsumos } from '../services/estoque'

export default function EstoqueTable() {
  const [insumos, setInsumos] = useState<any[]>([])

  useEffect(() => {
    const carregarInsumos = async () => {
      try {
        const resposta = await buscarInsumos()
        console.log(`RES: ${resposta}`)
        setInsumos(resposta.data.content)
      } catch (erro) {
        console.error('Erro ao carregar insumos:', erro)
      }
    }

    carregarInsumos()
  }, [])

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
          {insumos.length > 0 ? (
            insumos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.categoria}</td>
                <td>{item.unidadeMedida}</td>
                <td>{item.quantidadeTotal}</td>
                <td>{item.quantidadeMinima}</td>
                <td>{item.preco}</td>
                <td>{item.fornecedor}</td>
                <td>{item.validade ? new Date(item.validade).toLocaleDateString() : ''}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center' }}>Nenhum item cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
