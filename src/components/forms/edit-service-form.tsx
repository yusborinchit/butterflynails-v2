"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { editServiceFormSchema } from "~/lib/zod-schemas";
import { editServiceAction } from "~/server/actions";
import { type services } from "~/server/db/schema";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  service: typeof services.$inferSelect;
}

export default function EditServiceForm({ service }: Readonly<Props>) {
  const form = useForm<z.infer<typeof editServiceFormSchema>>({
    resolver: zodResolver(editServiceFormSchema),
    defaultValues: {
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
    },
  });
  const { setValue, formState } = form;

  async function onSubmit(values: z.infer<typeof editServiceFormSchema>) {
    const { success } = await editServiceAction(values);

    if (!success)
      return alert(
        "Ocurrió un error al editar el servicio, intenta nuevamente.",
      );
    alert("Servicio actualizado con éxito");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-primary-500">#</span> Nombre
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre del Servicio..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-primary-500">#</span> Precio
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="800..."
                  {...field}
                  onChange={(e) =>
                    setValue(
                      "price",
                      isNaN(+e.target.value) ? 0 : +e.target.value,
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-primary-500">#</span> Descripción
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción del Servicio..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="mt-12 text-base"
        >
          {formState.isSubmitting && (
            <Loader2 className="size-5 animate-spin" />
          )}
          {formState.isSubmitting ? "Guardando Cambios..." : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
}
