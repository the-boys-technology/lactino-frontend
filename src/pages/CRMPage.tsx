import React, { useRef, useState, useEffect } from 'react'
import '../css/gerenciamento-estoque.css'
import Botao from '../components/Botao'
import Modal from '../components/Modal'
import CRMForm from '../components/CRMForm'
import CRMTable from '../components/CRMTable'
import CRMAddForm from '../components/CRMAddForm'

export default function CRMPage() {
  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null)
  const [clientes, setClientes] = useState<any[]>([])
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  /*
  async function carregarInsumos() {
    try {
      const res = await buscarInsumos()
      setInsumos(res.data.content)
    } catch (error) {
      console.error('Erro ao carregar insumos:', error)
    }
  }

  useEffect(() => {
    carregarInsumos()
  }, [])
  */

  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">CRM</h2>
        <CRMForm />
        <CRMTable
          clientes={clientes}
          itemSelecionado={itemSelecionado}
          onSelecionar={setItemSelecionado}
        />
        <div className="estoque__buttons">
            <div className="estoque__buttons-group">
                <Botao label="Adicionar" tipo="primary" onClick={() => setModalAberto('adicionar')} htmlType='button'/>
                <Botao 
                  htmlType='button'
                  label="Editar" 
                  tipo="secondary" 
                  onClick={() => {
                    if (!itemSelecionado) return alert("Selecione um item para editar!")
                    setModalAberto('editar')
                  }}/>
            </div>

            <div className="estoque__buttons-group">
                <Botao 
                htmlType='button'
                label="Remover" 
                tipo="danger" 
                onClick={() => {
                  if (!itemSelecionado) return alert("Selecione um item para remover!")
                  setModalAberto('remover')
                }}/>
            </div>
        </div>
      </div>

      {modalAberto === 'adicionar' && (
        <Modal titulo="Adicionar item" onClose={() => setModalAberto(null)}>
          <CRMAddForm 
            /*
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
            */
           onSubmit={async (dados) => {setModalAberto(null)}}
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType='button'/>
            <Botao htmlType='button' label="Adicionar" tipo="primary" onClick={() => {
              formRef.current?.requestSubmit()
            }} />
          </div>
        </Modal>
      )}
      {modalAberto === 'editar' && itemSelecionado && (
      <Modal titulo="Editar item" onClose={() => setModalAberto(null)}>
        <CRMAddForm 
            /*
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
            */
           onSubmit={async (dados) => {setModalAberto(null)}}
        />
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <Botao label="Cancelar" tipo="secondary" onClick={() => {setModalAberto(null); setItemSelecionado(null)}} htmlType='button'/>
          <Botao label="Salvar" tipo="primary" onClick={() => {
            formRef.current?.requestSubmit()
          }} htmlType='submit'/>
        </div>
      </Modal>
    )}
          {modalAberto === 'remover' && itemSelecionado && (
          <Modal titulo="Confirmar remoção" onClose={() => setModalAberto(null)}>
            <p>Tem certeza que deseja remover este item?</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType='button'/>
              <Botao
                htmlType='button'
                label="Remover"
                tipo="danger"
                onClick={async () => {setModalAberto(null)}}
              />
            </div>
          </Modal>
        )}


    </div>
  )
}