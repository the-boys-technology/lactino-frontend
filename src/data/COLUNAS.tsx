import { type ColumnDef } from '@tanstack/react-table';
import { RowDataLeite, RowDataLaticinio } from './ROW_DATA';

function formatarDataDDMMAAAA(dataISO: string): string {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  if (!ano || !mes || !dia) return dataISO;
  return `${dia}/${mes}/${ano}`;
}


export const COLUNAS_LEITE: ColumnDef<RowDataLeite, any>[] = [
  {
    header: 'Data de Obtenção',
    accessorKey: 'dataObtencao',
    cell: info => formatarDataDDMMAAAA(info.getValue()),
  },
  {
    header: 'Data de Validade',
    accessorKey: 'dataValidade',
    cell: info => formatarDataDDMMAAAA(info.getValue()),
  },
  { header: 'Nome',         accessorKey: 'nome' },
  { header: 'Origem',       accessorKey: 'origem' },
  { header: 'Fornecedor',   accessorKey: 'fornecedorId' },
  { header: 'Turno',        accessorKey: 'turno' },
  { header: 'Finalidade',   accessorKey: 'finalidade' },
  { header: 'Descrição',    accessorKey: 'descricao' },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => (
      <span
        className={`historico-container__tabela__status--${String(
          info.getValue(),
        )
          .toLowerCase()
          .replace(/\s+/g, '-')}`}
      >
        {info.getValue()}
      </span>
    ),
  },
];


export const COLUNAS_LATICINIO: ColumnDef<RowDataLaticinio, any>[] = [
  {
    header: 'Data de Produção',
    accessorKey: 'dataProducao',
    cell: info => formatarDataDDMMAAAA(info.getValue()),
  },
  {
    header: 'Data de Validade',
    accessorKey: 'dataValidade',
    cell: info => formatarDataDDMMAAAA(info.getValue()),
  },
  { header: 'Tipo',             accessorKey: 'tipoProduto' },
  { header: 'Quantidade',       accessorKey: 'quantidadeProduzida' },
  { header: 'Matéria-prima',    accessorKey: 'leiteUtilizadoId' },
  { header: 'Descrição',        accessorKey: 'descricao' },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => (
      <span
        className={`historico-container__tabela__status--${String(
          info.getValue(),
        )
          .toLowerCase()
          .replace(/\s+/g, '-')}`}
      >
        {info.getValue()}
      </span>
    ),
  },
];
