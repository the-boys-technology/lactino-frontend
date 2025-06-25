import { useEffect, useState, useMemo, useRef } from "react";
import { DataTable } from "./Tabela";
import { COLUNAS } from "../data/COLUNAS";
import { type RowData } from "../data/ROW_DATA";   
import { useNavigate } from "react-router-dom";
import { buscarLaticinios, buscarLeites, editarLeite, registrarLeite, removerLeite } from "../services/gestao_leite_laticinio";
import "../css/historico_tabela.css";
import loadingGif from "../assets/carregando.gif";
import { ClipLoader } from "react-spinners";
import retornarIcon from '../assets/retornar.png';
import Botao from "./Botao";
import { MOCK_DATA } from '../data/MOCK_DATA';
import Modal from "./Modal";
import LeiteAddForm from "./LeiteAddForm";
import LeiteEditForm from "./LeiteEditForm";


export default function HistoricoTabela() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  function handleAddItem() {
    navigate('/selecionar-produto');
  }

  function handleReturn() {
    navigate('/');
  }

  const filteredData = useMemo<RowData[]>(() =>
    MOCK_DATA.filter((r) => {
      // if any product filters are active, only keep matching rows
      if (turnoFilter.length > 0 && !turnoFilter.includes(r.turno)) 
        return false;
      // if any status filters are active, only keep matching rows
      if (statusFilter.length > 0 && !statusFilter.includes(r.status)) 
        return false;
      // apply your text search
      if (search) {
        const term = search.toLowerCase();
        const hay = [
          r.id.toString(),
          r.nome,
          r.descricao,
          r.fornecedorId,
        ].map(f => f.toLowerCase());
	      if (!hay.some(f => f.includes(term))) return false;}
          return true;
    }),


  [search, turnoFilter, statusFilter]);

  /*
  useEffect(() => {
  let isMounted = true;               

  async function buscarProdutos() {
    try {
      setLoading(true);
      const [resLeite, resLaticinio] = await Promise.all([
        buscarLeites(),
        buscarLaticinios(),
      ]);
      if (isMounted) {
        setRows([...resLeite.data, ...resLaticinio.data]);
      }
    } catch (err: any) {
      if (isMounted) {
        console.log("Erro ao carregar leites e laticínios:", err)
        setError(err.message ?? "Erro ao carregar dados");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }
  buscarProdutos();      
  return () => {
    isMounted = false;   
  };
}, []);

    const filteredData = useMemo<RowData[]>(
    () =>
      rows.filter((r) => {
        if (turnoFilter.length > 0 && !turnoFilter.includes(r.turno))
          return false;
        if (statusFilter.length > 0 && !statusFilter.includes(r.status))
          return false;
        if (search) {
          const term = search.toLowerCase();
          const hay = [
            r.id.toString(),
            r.nome,
            r.descricao,
            r.fornecedorId,
          ].map((f) => f.toLowerCase());
          if (!hay.some((f) => f.includes(term))) return false;
        }
        return true;
      }),
    [rows, search, turnoFilter, statusFilter]
  );

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader size={50} color="#123abc" loading={loading} />
      </div>
    );
  }
  if (error)   return <p style={{color:"red"}}>{error}</p>;
  */

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
          <DataTable<RowData>
            data={filteredData}
            columns={COLUNAS}
          />
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


