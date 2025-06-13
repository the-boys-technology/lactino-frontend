import React, { useRef, useState, useEffect } from 'react';
import '../../css/gerenciamento-estoque.css';
import EstoqueForm from '../../components/EstoqueForm';
import EstoqueTable from '../../components/EstoqueTable';
import EstoqueAddForm from '../../components/EstoqueAddForm';
import EstoqueEditForm from '../../components/EstoqueEditForm';
import Botao from '../../components/Botao';
import Modal from '../../components/Modal';
import { criarInsumo, buscarInsumos, editarInsumo, removerInsumo } from '../../services/estoque';
import { useNotificacoes } from '../../context/NotificacoesContext';
import { v4 as uuidv4 } from 'uuid'; // para gerar IDs fictícios das notificações mockadas

export default function EstoquePage() {
  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null);
  const [insumos, setInsumos] = useState<any[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { setNotificacoes } = useNotificacoes();

  async function carregarInsumos() {
    try {
      const res = await buscarInsumos();
      const lista = res.data.content;
      setInsumos(lista);

      // Gerar notificações a partir dos insumos prestes a vencer
      const hoje = new Date();
      const notificacoesGeradas = lista
        .filter((item: any) => item.validade)
        .map((item: any) => {
          const validade = new Date(item.validade);
          const diffTime = validade.getTime() - hoje.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return {
            diasParaVencer: diffDays,
            id: item.id,
            nome: item.nome,
            validade: item.validade,
          };
        })
        .filter((n: { diasParaVencer: number; }) => n.diasParaVencer >= 0 && n.diasParaVencer <= 2)
        .map((n: { diasParaVencer: number; nome: any; validade: any; id: any; }) => ({
          id: uuidv4(), // id fictício para a notificação (frontend)
          titulo:
            n.diasParaVencer === 0
              ? 'INSUMO VENCE HOJE!'
              : n.diasParaVencer === 1
              ? 'Insumo vence em 1 dia'
              : 'Insumo vence em 2 dias',
          mensagem: `${n.nome} com validade em ${n.validade}`,
          tipo: 'INSUMO',
          referencia_id: n.id,
          referencia_tipo: 'INSUMO',
          usuario_id: 1, // mock (será vindo do backend futuramente)
          data_criacao: new Date().toISOString(),
          lida: false,
        }));

      setNotificacoes(notificacoesGeradas);
    } catch (error) {
      console.error('Erro ao carregar insumos:', error);
    }
  }

  useEffect(() => {
    carregarInsumos();
  }, []);

  const [filtros, setFiltros] = useState({
    codigo: '',
    nome: '',
    fornecedor: '',
    categoria: '',
    dataValidade: ''
  });

  const insumosFiltrados = insumos.filter((item) => {
    return (
      (!filtros.codigo || item.id?.toString().includes(filtros.codigo)) &&
      (!filtros.nome || item.nome?.toLowerCase().includes(filtros.nome.toLowerCase())) &&
      (!filtros.fornecedor || item.fornecedor?.toLowerCase().includes(filtros.fornecedor.toLowerCase())) &&
      (!filtros.categoria || item.categoria === filtros.categoria) &&
      (!filtros.dataValidade || item.validade?.startsWith(filtros.dataValidade))
    );
  });

  return (
    <div className="estoque">
      <div className="estoque__card">
        <h2 className="estoque__title">Estoque</h2>
        <EstoqueForm filtros={filtros} onFiltrosChange={setFiltros} />
        <div className="estoque__tabela-wrapper">
          <EstoqueTable
            insumos={insumosFiltrados}
            itemSelecionado={itemSelecionado}
            onSelecionar={setItemSelecionado}
          />
        </div>
        <div className="estoque__buttons">
          <div className="estoque__buttons-group">
            <Botao label="Adicionar" tipo="primary" onClick={() => setModalAberto('adicionar')} htmlType="button" />
            <Botao
              htmlType="button"
              label="Editar"
              tipo="secondary"
              onClick={() => {
                if (!itemSelecionado) return alert('Selecione um item para editar!');
                setModalAberto('editar');
              }}
            />
          </div>

          <div className="estoque__buttons-group">
            <Botao
              htmlType="button"
              label="Remover"
              tipo="danger"
              onClick={() => {
                if (!itemSelecionado) return alert('Selecione um item para remover!');
                setModalAberto('remover');
              }}
            />
          </div>
        </div>
      </div>

      {/* Modais */}
      {modalAberto === 'adicionar' && (
        <Modal titulo="Adicionar item" onClose={() => setModalAberto(null)}>
          <EstoqueAddForm
            onSubmit={async (dados) => {
              try {
                await criarInsumo(dados);
                await carregarInsumos();
              } catch (error) {
                console.log(`ERRO: ${error}`);
              }
              setModalAberto(null);
            }}
            formRef={formRef}
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType="button" />
            <Botao htmlType="button" label="Adicionar" tipo="primary" onClick={() => formRef.current?.requestSubmit()} />
          </div>
        </Modal>
      )}

      {modalAberto === 'editar' && itemSelecionado && (
        <Modal titulo="Editar item" onClose={() => setModalAberto(null)}>
          <EstoqueEditForm
            dadosIniciais={itemSelecionado}
            onSubmit={async (dadosEditados) => {
              try {
                await editarInsumo(itemSelecionado.id, dadosEditados);
                await carregarInsumos();
              } catch (error) {
                console.log(`ERRO: ${error}`);
              }
              setModalAberto(null);
              setItemSelecionado(null);
            }}
            formRef={formRef}
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => { setModalAberto(null); setItemSelecionado(null); }} htmlType="button" />
            <Botao label="Salvar" tipo="primary" onClick={() => formRef.current?.requestSubmit()} htmlType="submit" />
          </div>
        </Modal>
      )}

      {modalAberto === 'remover' && itemSelecionado && (
        <Modal titulo="Confirmar remoção" onClose={() => setModalAberto(null)}>
          <p>Tem certeza que deseja remover este item?</p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Botao label="Cancelar" tipo="secondary" onClick={() => setModalAberto(null)} htmlType="button" />
            <Botao
              htmlType="button"
              label="Remover"
              tipo="danger"
              onClick={async () => {
                try {
                  await removerInsumo(itemSelecionado.id);
                  await carregarInsumos();
                } catch (error) {
                  console.error('Erro ao remover insumo:', error);
                }
                setModalAberto(null);
                setItemSelecionado(null);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}