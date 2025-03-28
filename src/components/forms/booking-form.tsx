"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { bookingFormSchema } from "~/lib/zod-schemas";
import { createBookingAction } from "~/server/actions";
import {
  type bookings,
  type bookingTimes,
  type services,
} from "~/server/db/schema";
import BookingCalendar from "../calendars/booking-calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  bookings: Pick<typeof bookings.$inferSelect, "date" | "timeId">[];
  bookingTimes: (typeof bookingTimes.$inferSelect)[];
  services: (typeof services.$inferSelect)[];
}

export default function BookingForm({
  bookings,
  bookingTimes,
  services,
}: Readonly<Props>) {
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      serviceId: undefined,
      timeId: undefined,
      name: "",
      ci: "",
      username: "",
      phone: "",
      email: "",
    },
  });
  const { setValue, formState, watch } = form;

  const selectedDate = watch("date");
  const availableBookingTimes = useMemo(() => {
    const bookedTimeIds = bookings
      .filter(({ date }) => date === selectedDate)
      .map(({ timeId }) => timeId);
    return bookingTimes.filter(({ id }) => !bookedTimeIds.includes(id));
  }, [selectedDate, bookingTimes, bookings]);

  const isDateAvailable = availableBookingTimes.length > 0;

  const selectedService = watch("serviceId");
  const servicePrice = useMemo(() => {
    return services.find((service) => +selectedService === service.id)?.price;
  }, [selectedService, services]);

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    const { success } = await createBookingAction(values);

    if (!success)
      return alert("Ocurrió un error al crear la reserva, intenta nuevamente.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 lg:grid-cols-2"
      >
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-primary-500">#</span> Servicio
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={`${service.id}`}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-primary-500">#</span> Turno
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un turno" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isDateAvailable ? (
                        availableBookingTimes.map((time) => (
                          <SelectItem key={time.id} value={`${time.id}`}>
                            {time.time}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="-1">No Disponible</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <BookingCalendar
            bookings={bookings}
            bookingTimes={bookingTimes}
            onChangeDate={(date) => {
              setValue("date", dayjs(date).format("YYYY-MM-DD"), {
                shouldValidate: true,
              });
              setValue("timeId", "");
            }}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input
                    type="hidden"
                    readOnly
                    {...field}
                    value={watch("date")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-primary-500">#</span> Nombre
                </FormLabel>
                <FormControl>
                  <Input placeholder="Mika..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-primary-500">#</span> Usuario de
                  Instagram
                </FormLabel>
                <FormControl>
                  <Input placeholder="butterfly_nailx..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="ci"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-primary-500">#</span> Cédula
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="12345678..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-primary-500">#</span> Número de
                    Celular
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="093123123..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-primary-500">#</span> Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="fideos@gmail.com..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={formState.isSubmitting || !isDateAvailable}
            className="mt-12 text-base lg:mt-auto"
          >
            {formState.isSubmitting && (
              <Loader2 className="size-5 animate-spin" />
            )}
            {formState.isSubmitting
              ? "Agendando..."
              : isDateAvailable
                ? servicePrice
                  ? `Agendar a partir de $${servicePrice}`
                  : "Seleccione un servicio"
                : "No Disponible"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
