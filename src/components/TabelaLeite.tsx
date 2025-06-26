import { useEffect, useState, useMemo, useRef } from "react";
import { DataTable } from "./Tabela";
import { COLUNAS_LEITE } from "../data/COLUNAS";
import { type RowDataLeite } from "../data/ROW_DATA";   
import { useNavigate } from "react-router-dom";
import { buscarLeites, editarLeite, registrarLeite, removerLeite } from "../services/gestao_leite_laticinio";
import "../css/historico_tabela.css";
import retornarIcon from '../assets/retornar.png';
import Botao from "./Botao";
import Modal from "./Modal";
import LeiteAddForm from "./LeiteAddForm";
import LeiteEditForm from "./LeiteEditForm";


export default function TabelaLeite() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<RowDataLeite[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [turnoFilter, setTurnoFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [modalAberto, setModalAberto] = useState<null | 'adicionar' | 'editar' | 'remover'>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null);
  const formRef = useRef<HTMLFormElement>(null)


  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  function handleTurnoFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTurnoFilter(prev => toggle(prev, e.target.value));
  }

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

    const turnoMatch =
      turnoFilter.length === 0 ||
      turnoFilter.map((v) => v.toLowerCase()).includes(row.turno?.toLowerCase());

    const statusMatch =
      statusFilter.length === 0 ||
      statusFilter.map((v) => v.toLowerCase()).includes(row.status?.toLowerCase());

    return searchMatch && turnoMatch && statusMatch;
  });
}, [rows, search, turnoFilter, statusFilter]);


  async function carregarPagina(pagina: number) {
    try {
      console.log(`Páginas: ${pagina}`)
      const res = await buscarLeites(pagina, pageSize);
      console.log(res);
      setRows(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pagina);
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error);
    } finally {
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
          <h3 className='historico-container__input-label'>Turno:</h3>
          <label>
            <input
              type="checkbox"
              value="Matutino"
              checked={turnoFilter.includes('Matutino')}
              onChange={handleTurnoFilterChange}
            /> Matutino
          </label>
          <label>
            <input
              type="checkbox"
              value="Vespertino"
              checked={turnoFilter.includes('Vespertino')}
              onChange={handleTurnoFilterChange}
            /> Vespertino
          </label>
          <label>
            <input
              type="checkbox"
              value="Noturno"
              checked={turnoFilter.includes('Noturno')}
              onChange={handleTurnoFilterChange}
            /> Noturno
          </label>
        </section>

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
              value="Utilizado"
              checked={statusFilter.includes('Utilizado')}
              onChange={handleStatusFilterChange}
            /> Utilizado
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
          <DataTable<RowDataLeite>
            data={filteredRows}
            columns={COLUNAS_LEITE}
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
          <LeiteAddForm 
            onSubmit={async (dados) => {
              try {
                await registrarLeite(dados)
                //await carregarInsumos()
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
        <LeiteEditForm
          dadosIniciais={itemSelecionado}
          onSubmit={ async (dadosEditados) => {
            try {
              console.log('ID para editar:', itemSelecionado.id);
              console.log('Dados enviados:', dadosEditados);
              await editarLeite(itemSelecionado.id, dadosEditados)
              //await carregarInsumos()
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
                    await removerLeite(itemSelecionado.id)
                    //await carregarInsumos()
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


