"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { signInFormSchema } from "~/lib/zod-schemas";
import { signInAction } from "~/server/actions";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { formState } = form;

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { success } = await signInAction(values);

    if (!success)
      return alert("Ocurrió un error al iniciar sesión, intenta nuevamente.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-primary-500">#</span> Usuario
              </FormLabel>
              <FormControl>
                <Input placeholder="Hola te amo fideos..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-primary-500">#</span> Contraseña
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mika furra..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="mt-8 text-base"
        >
          {formState.isSubmitting && (
            <Loader2 className="size-5 animate-spin" />
          )}
          {formState.isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </Button>
      </form>
    </Form>
  );
}
