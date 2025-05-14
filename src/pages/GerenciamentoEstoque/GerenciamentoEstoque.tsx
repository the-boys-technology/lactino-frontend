import React, { useState } from 'react'
import '../../css/gerenciamento-estoque.css'
import EstoqueForm from '../../components/EstoqueForm'
import EstoqueTable from '../../components/EstoqueTable'
import Botao from '../../components/Botao'
import Modal from '../../components/Modal'

export default function EstoquePage() {
  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null)

  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">Estoque</h2>
        <EstoqueForm />
        <EstoqueTable />
        <div className="estoque__buttons">
            <div className="estoque__buttons-group">
                <Botao label="Adicionar" tipo="primary" onClick={() => setModalAberto('adicionar')}/>
                <Botao label="Editar" tipo="secondary" onClick={() => setModalAberto('editar')}/>
            </div>

            <div className="estoque__buttons-group">
                <Botao label="Remover" tipo="danger" onClick={() => setModalAberto('remover')}/>
            </div>
        </div>
      </div>

      {modalAberto === 'adicionar' && (
        <Modal titulo="Adicionar item" onClose={() => setModalAberto(null)}>
          <EstoqueForm />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} />
            <Botao label="Adicionar" tipo="primary" onClick={() => {
              setModalAberto(null)
            }} />
          </div>
        </Modal>
      )}
      {modalAberto === 'editar' && (
        <Modal titulo="Editar item" onClose={() => setModalAberto(null)}>
          <EstoqueForm />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} />
            <Botao label="Salvar" tipo="primary" onClick={() => {
              setModalAberto(null)
            }} />
          </div>
        </Modal>
      )}
      {modalAberto === 'remover' && (
        <Modal titulo="Confirmar remoção" onClose={() => setModalAberto(null)}>
          <p>Tem certeza que deseja remover este item?</p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} />
            <Botao label="Remover" tipo="danger" onClick={() => {
              setModalAberto(null)
            }} />
          </div>
        </Modal>
      )}

    </div>
  )
}
