import React, { useMemo } from "react";
import { useTable } from "react-table";


export default function ReactTable({ tableData, tableColumns }) {
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);
  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="flex justify-center w-full my-16">
      <table
        {...getTableProps()}
        class="table-auto w-3/5 text-center whitespace-no-wrap border-separate border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl border border-gray-300"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  
                  return (
                    <td {...cell.getCellProps()} class="px-4 py-3 border border-gray-300">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
