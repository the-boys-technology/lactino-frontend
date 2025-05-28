import { type ColumnDef } from '@tanstack/react-table';
import { RowData } from './ROW_DATA';

export const COLUNAS: ColumnDef<RowData, any>[] = [
  {
    header: 'Data de Obtenção',
    accessorKey: 'data_de_obtencao',
    cell: info => new Date(info.getValue()).toLocaleString('pt-BR'),
  },
  {
    header: 'Data de Validade',
    accessorKey: 'data_de_validade',
    cell: info => new Date(info.getValue()).toLocaleDateString('pt-BR'),
  },
  { header: 'Nome',         accessorKey: 'nome' },
  { header: 'Origem',       accessorKey: 'origem' },
  { header: 'Fornecedor',   accessorKey: 'fornecedor' },
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
