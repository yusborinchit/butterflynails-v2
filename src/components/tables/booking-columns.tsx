"use client";

import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Loader2, Trash } from "lucide-react";
import { useTransition } from "react";
import { parsePhoneToWSP } from "~/lib/utils";
import { deleteBookingAction } from "~/server/actions";
import { type QUERIES } from "~/server/db/sql";

export const columns: ColumnDef<
  Awaited<ReturnType<typeof QUERIES.getCurrentBookings>>[0]
>[] = [
  {
    accessorKey: "booking.date",
    header: () => <div className="text-center font-bold">Día</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        {dayjs(row.original.booking.date).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "booking_time",
    header: () => <div className="text-center font-bold">Hora</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        {row.original.booking_time.time}
      </div>
    ),
  },
  {
    accessorKey: "booking.username",
    header: () => <div className="text-center font-bold">Usuario de IG</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        <a
          target="_blank"
          href={`https://www.instagram.com/${row.original.booking.username}/`}
          className="underline underline-offset-3"
        >
          @{row.original.booking.username}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "booking.name",
    header: () => <div className="text-center font-bold">Nombre</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        {row.original.booking.name}
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: () => <div className="text-center font-bold">Servicio</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        {row.original.service.name}
      </div>
    ),
  },
  {
    accessorKey: "booking.phone",
    header: () => <div className="text-center font-bold">Celular</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        <a
          target="_blank"
          href={`https://wa.me/${parsePhoneToWSP(row.original.booking.phone)}/`}
          className="underline underline-offset-3"
        >
          {row.original.booking.phone}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "booking.ci",
    header: () => <div className="text-center font-bold">Cédula</div>,
    cell: ({ row }) => (
      <div className="text-center text-neutral-500">
        {row.original.booking.ci}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isPending, startTransition] = useTransition();

      function handleDelete() {
        startTransition(async () => {
          await deleteBookingAction(row.original.booking.id);
        });
      }

      return (
        <button
          onClick={handleDelete}
          disabled={isPending}
          aria-label="Eliminar turno"
          className="grid h-full place-items-center hover:cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-red-700" />
          ) : (
            <Trash className="size-5 text-red-700" />
          )}
        </button>
      );
    },
  },
];
