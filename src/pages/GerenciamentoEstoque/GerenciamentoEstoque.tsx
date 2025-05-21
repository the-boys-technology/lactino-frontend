import React, { useRef, useState, useEffect } from 'react'
import '../../css/gerenciamento-estoque.css'
import EstoqueForm from '../../components/EstoqueForm'
import EstoqueTable from '../../components/EstoqueTable'
import EstoqueItemForm from '../../components/EstoqueItemForm'
import Botao from '../../components/Botao'
import Modal from '../../components/Modal'
import { criarInsumo } from '../../services/estoque'
import { buscarInsumos } from '../../services/estoque'

export default function EstoquePage() {
  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null)
  const [insumos, setInsumos] = useState<any[]>([])
  const formRef = useRef<HTMLFormElement>(null)

  async function carregarInsumos() {
    try {
      const res = await buscarInsumos()
      setInsumos(res.data.content) // assume que sua API retorna dados assim
    } catch (error) {
      console.error('Erro ao carregar insumos:', error)
    }
  }

  useEffect(() => {
    carregarInsumos()
  }, [])

  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">Estoque</h2>
        <EstoqueForm />
        <EstoqueTable insumos={insumos} />
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
          <EstoqueItemForm 
            onSubmit={async (dados) => {
              try {
                await criarInsumo(dados)
                await carregarInsumos()
              } catch (error) {
                console.log(`ERRO: ${error}`)
              }
              setModalAberto(null) 
            }}
            formRef={formRef}
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} />
            <Botao label="Adicionar" tipo="primary" onClick={() => {
              formRef.current?.requestSubmit()
            }} />
          </div>
        </Modal>
      )}
      {modalAberto === 'editar' && (
        <Modal titulo="Editar item" onClose={() => setModalAberto(null)}>
          <EstoqueItemForm />
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