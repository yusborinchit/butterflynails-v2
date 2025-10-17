"use client";

import dayjs from "dayjs";
import Calendar from "react-calendar";
import { type bookings, type bookingTimes } from "~/server/db/schema";

interface Props {
  bookings: Pick<typeof bookings.$inferSelect, "date" | "timeId">[];
  bookingTimes: (typeof bookingTimes.$inferSelect)[];
  onChangeDate: (e: Date) => void;
}

export default function BookingCalendar({
  bookings,
  bookingTimes,
  onChangeDate,
}: Readonly<Props>) {
  const todayDate = dayjs().toDate();

  console.log(bookingTimes);

  return (
    <Calendar
      locale="es"
      tileDisabled={(args) => {
        const date = dayjs(args.date);
        const isSunday = date.day() === 0;
        return isSunday;
      }}
      tileClassName={(args) => {
        const date = dayjs(args.date);
        const dateString = date.format("YYYY-MM-DD");

        const isSunday = date.day() === 0;
        if (isSunday) return "red-tiles";

        const dayBookings = bookings.filter((b) => b.date === dateString);
        const bookedTimeIds = dayBookings.map((b) => b.timeId);

        const availableTimes = bookingTimes.filter(
          (time) => !bookedTimeIds.includes(time.id),
        );

        const isDayFull = availableTimes.length === 0;

        return isDayFull ? "red-tiles" : "";
      }}
      defaultValue={todayDate}
      onChange={(e) => onChangeDate(e as Date)}
      minDate={todayDate}
      minDetail="month"
      maxDetail="month"
    />
  );
}
