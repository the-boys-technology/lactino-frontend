import React from 'react'
import '../css/gerenciamento-estoque.css'
import EstoqueForm from '../components/EstoqueForm'
import EstoqueTable from '../components/EstoqueTable'
import Botao from '../components/Botao'

export default function InventoryPage() {
  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">Estoque</h2>
        <EstoqueForm />
        <EstoqueTable />
        <div className="estoque__buttons">
            <div className="estoque__buttons-group">
                <Botao label="Adicionar" tipo="primary" />
                <Botao label="Editar" tipo="secondary" />
            </div>

            <div className="estoque__buttons-group">
                <Botao label="Remover" tipo="danger" />
            </div>
        </div>
      </div>
    </div>
  )
}
