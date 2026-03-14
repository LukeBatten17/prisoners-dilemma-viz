import React from "react";
import Tooltip from "./Tooltip";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Ranking } from "../gameSettings/types";

const columnHelper = createColumnHelper<Ranking>();

function ratioToColor(ratio: number): string {
  if (ratio >= 0.66) return "hsl(120, 80%, 38%)";
  if (ratio >= 0.33) return "hsl(45, 90%, 42%)";
  return "hsl(0, 80%, 45%)";
}

function avgPointsColor(avg: number): string {
  if (avg >= 3.0) return "hsl(120, 80%, 38%)"; // green  — above mutual cooperation
  if (avg >= 2.0) return "hsl(52, 100%, 45%)"; // yellow — at mutual cooperation baseline
  if (avg >= 1.0) return "hsl(25, 90%, 60%)"; // orange — below baseline
  return "hsl(0, 80%, 60%)"; // red    — getting exploited
}

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
    header: () => (
      <span className="inline-flex items-center gap-1">
        Total Matches
        <Tooltip
          text="Completed matches only — reached the max number of rounds"
          position="bottom"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3.5 opacity-50"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalPoints", {
    header: "Total Points",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("avgPointsPerRound", {
    header: "Avg Points/Round",
    cell: (info) => {
      const val = info.getValue();
      return (
        <span style={{ color: avgPointsColor(val) }} className="font-semibold">
          {val.toFixed(2)}
        </span>
      );
    },
  }),
  columnHelper.accessor("wins", {
    header: "Wins",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("draws", {
    header: "Draws",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("losses", {
    header: "Losses",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("successRate", {
    header: () => (
      <span className="inline-flex items-center gap-1">
        Success Rate
        <Tooltip
          text="(Wins + Draws) / Total Matches"
          position="left"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3.5 opacity-50"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      </span>
    ),
    cell: (info) => {
      const val = info.getValue();
      return (
        <span style={{ color: ratioToColor(val) }} className="font-semibold">
          {(val * 100).toFixed(2)}%
        </span>
      );
    },
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
      <h3 className="text-lg font-bold text-text">Rankings</h3>
      <div className="overflow-x-auto w-full border-1 border-text ">
        <table className="w-full text-sm text-left rtl:text-right text-body bg-background  ">
          <thead className="uppercase text-text ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="px-4 py-2 border-b-1 border-text text-center tracking-wider whitespace-nowrap hover:text-primary transition-colors"
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
                className="text-text odd:bg-background even:bg-secondary/5"
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
