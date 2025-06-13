import { useEffect, useState, useMemo } from "react";
import { DataTable } from "./Tabela";
import { COLUNAS } from "../data/COLUNAS";
import { type RowData } from "../data/ROW_DATA";   
import { useNavigate } from "react-router-dom";
import { buscarLaticinios, buscarLeites } from "../services/gestao_leite_laticinio";
import "../css/historico_tabela.css";
import loadingGif from "../assets/carregando.gif";
import { ClipLoader } from "react-spinners";

export default function HistoricoTabela() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [turnoFilter, setTurnoFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);


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

  return (
    <section className="historico-container">
      <section className="historico-container__header">
        <h2 className="historico-container__title">Histórico</h2>
        <section>
          <button className='historico-container__botao-retornar' onClick={handleReturn}>
            <img
              className='historico-container__img-retornar'
              src='../img/arrow-left-circle.svg'
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
              value="Disponível"
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
          <button className="btn btn-add" onClick={handleAddItem}>Adicionar item</button>
          <button className="btn btn-edit">Editar item</button>
        </div>
        <button className="btn btn-delete">Remover item</button>
      </section>
    </section>
  );
}


