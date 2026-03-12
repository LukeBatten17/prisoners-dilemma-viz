import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Ranking } from "../gameSettings/types";

const columnHelper = createColumnHelper<Ranking>();

const columns = [
  columnHelper.accessor("rank", {
    header: "Rank",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("strategyName", {
    header: "Strategy Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalMatches", {
    header: "Total Matches",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalPoints", {
    header: "Total Points",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("avgPointsPerMatch", {
    header: "Avg Points/Match",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("wins", {
    header: "Wins",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("losses", {
    header: "Losses",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("draws", {
    header: "Draws",
    cell: (info) => info.getValue() || 0,
  }),
  columnHelper.accessor("successRate", {
    header: "Success Rate",
    cell: (info) => `${(info.getValue() * 100).toFixed(2)}%`,
  }),
];

type RankingsTableProps = {
  data: Ranking[];
};

const RankingsTable: React.FC<RankingsTableProps> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full text-sm text-left rtl:text-right text-body bg-background text-text">
      <thead className="uppercase text-text">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="px-6 py-3  border-1 border-text text-center"
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="odd:bg-background even:bg-secondary/5" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                className="px-6 py-4 border-b-1 border-text/20 text-center"
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingsTable;
