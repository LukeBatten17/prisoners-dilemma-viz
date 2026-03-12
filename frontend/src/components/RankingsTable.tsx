import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Ranking } from "../gameSettings/types";

const columnHelper = createColumnHelper<Ranking>();

const columns = [
  columnHelper.accessor("rank", {
    header: "Rank",
    cell: (info) => (
      <span>
        {info.getValue() == 1
          ? "🥇"
          : info.getValue() == 2
            ? "🥈"
            : info.getValue() == 3
              ? "🥉"
              : info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("strategyName", {
    header: "Strategy Name",
    cell: (info) => (
      <span className="whitespace-nowrap">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("totalMatches", {
    header: "Total Matches",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalPoints", {
    header: "Total Points",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("avgPointsPerRound", {
    header: "Avg Points/Round",
    cell: (info) => info.getValue().toFixed(2),
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
    cell: (info) => info.getValue(),
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
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "rank",
          desc: false,
        },
      ],
    },
  });

  return (
    <div>
      <h3 className="text-lg font-bold">Rankings</h3>
      <div className="overflow-x-auto w-full border-1 border-text ">
        <table className="w-full text-sm text-left rtl:text-right text-body bg-background  ">
          <thead className="uppercase text-text ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="px-4 py-2 border-b-1 border-text text-center tracking-wider whitespace-nowrap"
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none inline-flex items-center gap-1"
                              : "inline-flex items-center gap-1"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            ),
                            desc: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                />
                              </svg>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="odd:bg-background even:bg-secondary/5 text-text"
                key={row.id}
              >
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
      </div>
    </div>
  );
};

export default RankingsTable;
