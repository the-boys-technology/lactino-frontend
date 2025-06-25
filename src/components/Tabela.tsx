import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type TableOptions,
} from '@tanstack/react-table';
import '../css/tabela.css';

export interface Identificavel {
  id: string | number;
}

export interface DataTableProps<TData extends Identificavel> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  tableOptions?: Partial<TableOptions<TData>>;
  onRowClick?: (row: TData) => void;
  selectedItem?: TData;
}


export function DataTable<TData extends Identificavel>({
  data,
  columns,
  tableOptions = {},
  onRowClick,
  selectedItem,
}: DataTableProps<TData>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  return (
    <section className="tabela-container">
      <table className="tabela-container__table">
        <thead className="tabela-container__table__thead">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="tabela-container__table__tbody">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              style={{ cursor: 'pointer' }}
              className={
                selectedItem && row.original.id === selectedItem.id
                  ? 'tabela-container__row tabela-container__row--selecionada'
                  : 'tabela-container__row'
              }
            >

              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
