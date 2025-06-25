import React, { useRef, useState, useEffect } from 'react'
import '../css/gerenciamento-estoque.css'
import Botao from '../components/Botao'
import Modal from '../components/Modal'
import CRMForm from '../components/CRMForm'
import CRMTable from '../components/CRMTable'
import CRMAddForm from '../components/CRMAddForm'
import { buscarClientes } from '../services/clientes'
import { criarCliente } from '../services/clientes'
import { editarCliente } from '../services/clientes'
import { removerCliente } from '../services/clientes'

export default function CRMPage() {
  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null)
  const [clientes, setClientes] = useState<any[]>([])
  const [clienteSelecionado, setItemSelecionado] = useState<any | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  
  async function carregarClientes() {
    try {
      const res = await buscarClientes()
      setClientes(res)
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    }
  }

  useEffect(() => {
    carregarClientes()
  }, [])
  
  const [filtros, setFiltros] = useState({
    codigo: '',
    nome: '',
    email: '',
    localizacao: ''
  })

    const clientesFiltrados = clientes.filter((cliente) => {
    return (
      (!filtros.codigo || cliente.id?.toString().includes(filtros.codigo)) &&
      (!filtros.nome || cliente.nome?.toLowerCase().includes(filtros.nome.toLowerCase())) &&
      (!filtros.email || cliente.email?.toLowerCase().includes(filtros.email)) &&
      (!filtros.localizacao || cliente.localizacao?.toLowerCase().includes(filtros.localizacao.toLowerCase()))
    )
  })

  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">CRM</h2>
        <CRMForm filtros={filtros} onFiltrosChange={setFiltros} />
        <div className="estoque__tabela-wrapper">
          <CRMTable
            clientes={clientesFiltrados}
            itemSelecionado={clienteSelecionado}
            onSelecionar={setItemSelecionado}
          />
        </div>
        <div className="estoque__buttons">
            <div className="estoque__buttons-group">
                <Botao 
                  htmlType='button'
                  label="Adicionar" 
                  tipo="primary" 
                  onClick={() => setModalAberto('adicionar')}/>
                <Botao 
                  htmlType='button'
                  label="Editar" 
                  tipo="secondary" 
                  onClick={() => {
                    if (!clienteSelecionado) return alert("Selecione um cliente para editar!")
                    setModalAberto('editar')
                  }}/>
            </div>
            {/*
            <div className="estoque__buttons-group">
                <Botao 
                htmlType='button'
                label="Remover" 
                tipo="danger" 
                onClick={() => {
                  if (!clienteSelecionado) return alert("Selecione um cliente para remover!")
                  setModalAberto('remover')
                }}/>
            </div>
            */}
        </div>
      </div>

      {modalAberto === 'adicionar' && (
        <Modal titulo="Adicionar cliente" onClose={() => setModalAberto(null)}>
          <CRMAddForm 
            onSubmit={async (dados) => {
              try {
                await criarCliente(dados)
                await carregarClientes()
              } catch (error) {
                console.log(`ERRO: ${error}`)
              }
              setModalAberto(null) 
            }}
            formRef={formRef}
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType='button'/>
            <Botao htmlType='button' label="Adicionar" tipo="primary" onClick={() => {
              formRef.current?.requestSubmit()
            }} />
          </div>
        </Modal>
      )}
      {modalAberto === 'editar' && clienteSelecionado && (
      <Modal titulo="Editar cliente" onClose={() => setModalAberto(null)}>
        <CRMAddForm 
            dadosIniciais = {clienteSelecionado}
            onSubmit={async (dados) => {
                try {
                  await editarCliente(clienteSelecionado.id, dados)
                  await carregarClientes()
                } catch (error) {
                  console.log(`ERRO: ${error}`)
                }
                  setModalAberto(null) 
                  setItemSelecionado(null)
            }}
            formRef={formRef}
        />
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <Botao label="Cancelar" tipo="secondary" onClick={() => {setModalAberto(null); setItemSelecionado(null)}} htmlType='button'/>
          <Botao label="Salvar" tipo="primary" onClick={() => {
            formRef.current?.requestSubmit()
          }} htmlType='submit'/>
        </div>
      </Modal>
    )}
    {/*
          {modalAberto === 'remover' && clienteSelecionado && (
          <Modal titulo="Confirmar remoção" onClose={() => setModalAberto(null)}>
            <p>Tem certeza que deseja remover este item?</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType='button'/>
              <Botao
                htmlType='button'
                label="Remover"
                tipo="danger"
                onClick={async () => {
                  try {
                    await removerCliente(clienteSelecionado.id)
                    await carregarClientes()
                  } catch (error) {
                    console.error('Erro ao remover cliente:', error)
                  }
                  setModalAberto(null)
                  setItemSelecionado(null)
                }}
              />
            </div>
          </Modal>
        )}
      */}
    </div>
  )
}