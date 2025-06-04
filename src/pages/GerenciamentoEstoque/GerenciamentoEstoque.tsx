import React, { useRef, useState, useEffect } from 'react'
import '../../css/gerenciamento-estoque.css'
import EstoqueForm from '../../components/EstoqueForm'
import EstoqueTable from '../../components/EstoqueTable'
import EstoqueAddForm from '../../components/EstoqueAddForm'
import EstoqueEditForm from '../../components/EstoqueEditForm'
import Botao from '../../components/Botao'
import Modal from '../../components/Modal'
import { criarInsumo } from '../../services/estoque'
import { buscarInsumos } from '../../services/estoque'
import { editarInsumo } from '../../services/estoque'
import { removerInsumo } from '../../services/estoque'

export default function EstoquePage() {
  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null)
  const [insumos, setInsumos] = useState<any[]>([])
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

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

  const [filtros, setFiltros] = useState({
    codigo: '',
    nome: '',
    fornecedor: '',
    categoria: '',
    dataValidade: ''
  })

const insumosFiltrados = insumos.filter((item) => {
  return (
    (!filtros.codigo || item.id?.toString().includes(filtros.codigo)) &&
    (!filtros.nome || item.nome?.toLowerCase().includes(filtros.nome.toLowerCase())) &&
    (!filtros.fornecedor || item.fornecedor?.toLowerCase().includes(filtros.fornecedor.toLowerCase())) &&
    (!filtros.categoria || item.categoria === filtros.categoria) &&
    (!filtros.dataValidade || item.validade?.startsWith(filtros.dataValidade))
  )
})

  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">Estoque</h2>
        <EstoqueForm filtros={filtros} onFiltrosChange={setFiltros}/>
        <EstoqueTable
          insumos={insumosFiltrados}
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
          <EstoqueAddForm 
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
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType='button'/>
            <Botao htmlType='button' label="Adicionar" tipo="primary" onClick={() => {
              formRef.current?.requestSubmit()
            }} />
          </div>
        </Modal>
      )}
      {modalAberto === 'editar' && itemSelecionado && (
      <Modal titulo="Editar item" onClose={() => setModalAberto(null)}>
        <EstoqueEditForm
          dadosIniciais={itemSelecionado}
          onSubmit={ async (dadosEditados) => {
            try {
              console.log('ID para editar:', itemSelecionado.id);
              console.log('Dados enviados:', dadosEditados);
              await editarInsumo(itemSelecionado.id, dadosEditados)
              await carregarInsumos()
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
          {modalAberto === 'remover' && itemSelecionado && (
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
                    await removerInsumo(itemSelecionado.id)
                    await carregarInsumos()
                  } catch (error) {
                    console.error('Erro ao remover insumo:', error)
                  }
                  setModalAberto(null)
                  setItemSelecionado(null)
                }}
              />
            </div>
          </Modal>
        )}


    </div>
  )
}