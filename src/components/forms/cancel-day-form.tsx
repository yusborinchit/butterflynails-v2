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
import { cancelDayFormSchema } from "~/lib/zod-schemas";
import { cancelDayAction } from "~/server/actions";
import { type bookingTimes, type bookings } from "~/server/db/schema";
import BookingCalendar from "../calendars/booking-calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  bookings: (typeof bookings.$inferSelect)[];
  bookingTimes: (typeof bookingTimes.$inferSelect)[];
}

export default function CancelDayForm({
  bookings,
  bookingTimes,
}: Readonly<Props>) {
  const form = useForm<z.infer<typeof cancelDayFormSchema>>({
    resolver: zodResolver(cancelDayFormSchema),
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      timeId: undefined,
    },
  });
  const { setValue, formState, watch } = form;

  const selectedDate = watch("date");
  const availableBookingTimes = useMemo(() => {
    const bookedTimeIds = bookings
      .filter(({ date }) => date === selectedDate)
      .map(({ timeId }) => timeId);

    const availableTimes = bookingTimes.filter(
      ({ id }) => !bookedTimeIds.includes(id),
    );

    return availableTimes.length === bookingTimes.length
      ? [...availableTimes, { id: "-1", time: "Todos los Turnos" }]
      : availableTimes;
  }, [selectedDate, bookingTimes, bookings]);

  const isDateAvailable = availableBookingTimes.length > 0;

  async function onSubmit(values: z.infer<typeof cancelDayFormSchema>) {
    const { success } = await cancelDayAction(values);

    if (!success) return alert("Error");
    alert("Success");

    setValue("timeId", "");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 lg:grid-cols-2"
      >
        <div>
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
            name="timeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-primary-500">#</span> Turno
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={isDateAvailable ? field.value : "0"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
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
                      <SelectItem value="0">No Disponible</SelectItem>
                    )}
                  </SelectContent>
                </Select>
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
              ? "Reservando..."
              : isDateAvailable
                ? `Reservar`
                : "No Disponible"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
