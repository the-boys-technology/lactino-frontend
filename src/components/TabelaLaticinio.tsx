import { useEffect, useState, useMemo, useRef } from "react";
import { DataTable } from "./Tabela";
import { COLUNAS_LATICINIO } from "../data/COLUNAS";
import { type RowDataLaticinio } from "../data/ROW_DATA";   
import { useNavigate } from "react-router-dom";
import { buscarLaticinios, editarLaticinio, registrarLaticinio, removerLaticinio, buscarLeiteId } from "../services/gestao_leite_laticinio";
import "../css/historico_tabela.css";
import retornarIcon from '../assets/retornar.png';
import Botao from "./Botao";
import Modal from "./Modal";
import LaticinioAddForm from "./LaticinioAddForm";
import LaticinioEditForm from "./LaticinioEditForm";


export default function TabelaLaticinio() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<RowDataLaticinio[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null);
  const formRef = useRef<HTMLFormElement>(null)


  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  function handleStatusFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStatusFilter(prev => toggle(prev, e.target.value));
  }

  function handleReturn() {
    navigate('/selecionar-produto');
  }

  const filteredRows = useMemo(() => {
  return rows.filter((row) => {
    const searchMatch =
      search.trim() === '' ||
      Object.values(row).some((value) =>
        String(value || '').toLowerCase().includes(search.toLowerCase())
      );

    const statusMatch =
      statusFilter.length === 0 ||
      statusFilter.map((v) => v.toLowerCase()).includes(row.status?.toLowerCase());

    return searchMatch && statusMatch;
  });
}, [rows, search, statusFilter]);


  async function carregarPagina(pagina: number) {
    try {
      const res = await buscarLaticinios(pagina, pageSize);
      const laticinios = res.data.content;

      const laticiniosComLeite = await Promise.all(
        laticinios.map(async (item: RowDataLaticinio) => {
          try {
            const resLeite = await buscarLeiteId(item.leiteUtilizadoId);
            console.log(resLeite);
            return {
              ...item,
              leite: {
                nome: resLeite.data.nome,
                origem: resLeite.data.origem,
              },
            };
          } catch (e) {
            console.warn(`Erro ao buscar leite ${item.leiteUtilizadoId}`, e);
            return item;
          }
        })
      );

      setRows(laticiniosComLeite);
      setTotalPages(res.data.totalPages);
      setPage(pagina);
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    carregarPagina(page);
  }, [page]);

  return (
    <section className="historico-container">
      <section className="historico-container__header">
        <h2 className="historico-container__title">Histórico</h2>
        <section>
          <button className='historico-container__botao-retornar' onClick={handleReturn}>
            <img
              className='historico-container__img-retornar'
              src={retornarIcon}
              alt='retornar'
            />
          </button>
          <p>Retornar</p>
        </section>
      </section>

      <section className="historico-container__body">
        <div className='historico-container__input-container'>
          <label htmlFor="pesquisar" className='historico-container__input-label'>
            Pesquisar:
          </label>
          <input
            id="pesquisar"
            type="text"
            className='historico-container__input-buscar'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <section className='historico-container__filter-group'>
          <h3 className='historico-container__input-label'>Status:</h3>
          <label>
            <input
              type="checkbox"
              value="Disponivel"
              checked={statusFilter.includes('Disponivel')}
              onChange={handleStatusFilterChange}
            /> Disponível
          </label>
          <label>
            <input
              type="checkbox"
              value="Vencido"
              checked={statusFilter.includes('Vencido')}
              onChange={handleStatusFilterChange}
            /> Vencido
          </label>
          <label>
            <input
              type="checkbox"
              value="Vendido"
              checked={statusFilter.includes('Vendido')}
              onChange={handleStatusFilterChange}
            /> Vendido
          </label>
          <label>
            <input
              type="checkbox"
              value="Descartado"
              checked={statusFilter.includes('Descartado')}
              onChange={handleStatusFilterChange}
            /> Descartado
          </label>
        </section>

        <div className="historico-container__tabela-wrapper">
          <DataTable<RowDataLaticinio>
            data={filteredRows}
            columns={COLUNAS_LATICINIO}
            onRowClick={(row) => setItemSelecionado(row)}
            selectedItem={itemSelecionado}
          />
        </div>

        <div className="paginacao">
        <button
          disabled={page === 0}
          onClick={() => carregarPagina(page - 1)}
        >
          Anterior
        </button>
        <span>Página {page + 1} de {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => carregarPagina(page + 1)}
        >
          Próxima
        </button>
      </div>
      </section>

      <section className="historico-container__footer">
        <div className="historico-container__footer--botoes-criacao">
          <Botao 
          className="btn btn-add" 
          onClick={() => setModalAberto('adicionar')} 
          htmlType="button" 
          label="Adicionar" 
          tipo="primary">
          </Botao>

          {/*<button className="btn btn-add" onClick={handleAddItem}>Adicionar item</button>*/}
          <Botao 
          className="btn btn-edit" 
          onClick={() => {
            if (!itemSelecionado) return alert("Selecione um item para editar!")
            setModalAberto('editar')
          }}
          htmlType="button" 
          label="Editar" 
          tipo="secondary">
          </Botao>
          {/*<button className="btn btn-edit">Editar item</button>*/}
          {/*<button className="btn btn-delete">Remover item</button>*/}
        </div>
        <Botao 
        className="btn btn-delete" 
        onClick={() => {
          if (!itemSelecionado) return alert("Selecione um item para remover!")
          setModalAberto('remover')
        }} 
        htmlType="button" 
        label="Remover" 
        tipo="danger">
        </Botao>
      </section>
      {modalAberto === 'adicionar' && (
        <Modal titulo="Adicionar item" onClose={() => setModalAberto(null)}>
          <LaticinioAddForm 
            onSubmit={async (dados) => {
              try {
                await registrarLaticinio(dados)
                await carregarPagina(page)
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
        <LaticinioEditForm
          dadosIniciais={itemSelecionado}
          onSubmit={ async (dadosEditados) => {
            try {
              console.log('ID para editar:', itemSelecionado.id);
              console.log('Dados enviados:', dadosEditados);
              await editarLaticinio(itemSelecionado.id, dadosEditados)
              await carregarPagina(page)
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
                    await removerLaticinio(itemSelecionado.id)
                    await carregarPagina(page)
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
    </section>
  );
}


