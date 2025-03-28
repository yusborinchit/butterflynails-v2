"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "../ui/button";

interface Props<TData, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataFiltered: TData[];
  hasPagination?: boolean;
}

export default function BookingTable<TData, TValue>({
  title,
  columns,
  data,
  dataFiltered,
  hasPagination = true,
}: Readonly<Props<TData, TValue>>) {
  const [isAllVisible, setIsAllVisible] = useState(false);

  const table = useReactTable({
    data: isAllVisible ? data : dataFiltered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
        <div className="flex items-end gap-2">
          <p className="text-sm text-neutral-500">
            {isAllVisible ? data.length : dataFiltered.length} turnos
          </p>
          <button
            onClick={() => setIsAllVisible((prev) => !prev)}
            className="text-neutral-500 hover:cursor-pointer"
          >
            {isAllVisible ? (
              <EyeClosed className="text-neutral-500" />
            ) : (
              <Eye className="text-neutral-500" />
            )}
          </button>
        </div>
      </div>
      <div className="rounded-md border border-neutral-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-neutral-500"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {hasPagination && (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            className="w-full py-1.5 text-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full py-1.5 text-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
