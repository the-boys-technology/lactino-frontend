import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type TableOptions,
} from '@tanstack/react-table';
import '../css/tabela.css';

export interface DataTableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  /** Optional: allow passing any other table options (sorting, pagination, etc) */
  tableOptions?: Partial<TableOptions<TData>>;
}

export function DataTable<TData extends object>({
  data,
  columns,
  tableOptions = {},
}: DataTableProps<TData>) {
  // build the table instance
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
            <tr key={row.id}>
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
