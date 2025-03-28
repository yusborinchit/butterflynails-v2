"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { createBookingTimeFormSchema } from "~/lib/zod-schemas";
import { createBookingTimeAction } from "~/server/actions";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export default function CreateBookingTimeForm() {
  const form = useForm<z.infer<typeof createBookingTimeFormSchema>>({
    resolver: zodResolver(createBookingTimeFormSchema),
    defaultValues: {
      time: "",
    },
  });
  const { formState } = form;

  async function onSubmit(values: z.infer<typeof createBookingTimeFormSchema>) {
    const { success } = await createBookingTimeAction(values);

    if (!success)
      return alert("Ocurrió un error al crear el turno, intenta nuevamente.");
    alert("Turno creado con éxito");

    form.reset();
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
                <span className="text-primary-500">#</span> Turno Nuevo
              </FormLabel>
              <FormControl>
                <Input aria-label="Hora" placeholder="20:00..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-auto flex">
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            size="icon"
            className="h-[46px] w-[46px] bg-transparent text-base text-neutral-950 hover:bg-neutral-100"
          >
            {formState.isSubmitting ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Upload aria-label="Crear turno" className="size-5" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
