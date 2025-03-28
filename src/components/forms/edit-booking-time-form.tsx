"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Trash } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { editBookingTimeFormSchema } from "~/lib/zod-schemas";
import {
  deleteBookingTimeAction,
  editBookingTimeAction,
} from "~/server/actions";
import { type bookingTimes } from "~/server/db/schema";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  bookingTime: typeof bookingTimes.$inferSelect;
  nth: number;
}

export default function EditBookingTimeForm({
  bookingTime,
  nth,
}: Readonly<Props>) {
  const form = useForm<z.infer<typeof editBookingTimeFormSchema>>({
    resolver: zodResolver(editBookingTimeFormSchema),
    defaultValues: {
      id: bookingTime.id,
      time: bookingTime.time,
    },
  });
  const { formState } = form;

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof editBookingTimeFormSchema>) {
    const { success } = await editBookingTimeAction(values);

    if (!success)
      return alert("Ocurrió un error al editar el turno, intenta nuevamente.");
    alert("Turno actualizado con éxito");
  }

  function onDelete() {
    startTransition(async () => {
      const { success } = await deleteBookingTimeAction(bookingTime.id);

      if (!success)
        return alert(
          "Ocurrió un error al borrar el turno, intenta nuevamente.",
        );

      alert("Turno eliminado con éxito");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                <span className="text-primary-500">#</span> Turno {nth}
              </FormLabel>
              <FormControl>
                <Input aria-label="Hora" placeholder="09:00..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-auto flex">
          <Button
            type="submit"
            disabled={formState.isSubmitting || isPending}
            size="icon"
            className="h-[46px] w-[46px] bg-transparent text-base text-neutral-950 hover:bg-neutral-100"
          >
            {formState.isSubmitting || isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Save aria-label="Guardar cambios" className="size-5" />
            )}
          </Button>
          <Button
            disabled={formState.isSubmitting || isPending}
            onClick={onDelete}
            size="icon"
            className="h-[46px] w-[46px] bg-transparent text-base text-red-700 hover:bg-red-50"
          >
            {formState.isSubmitting || isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Trash aria-label="Borrar" className="size-5" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
