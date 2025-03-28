import dayjs from "dayjs";
import MainContainer from "~/components/containers/main-container";
import CancelDayForm from "~/components/forms/cancel-day-form";
import { columns } from "~/components/tables/booking-columns";
import BookingTable from "~/components/tables/booking-table";
import Paragraph from "~/components/typography/paragraph";
import { getCachedBookingTimes } from "~/lib/cache";
import { QUERIES } from "~/server/db/sql";

export default async function AdminPage() {
  const [bookings, bookingTimes] = await Promise.all([
    QUERIES.getCurrentBookings(),
    getCachedBookingTimes(),
  ]);

  const date = dayjs().format("YYYY-MM-DD");

  const todayBookings = bookings.filter(({ booking: b }) => b.date === date);
  const nextBookings = bookings.filter(({ booking: b }) => b.date !== date);

  return (
    <MainContainer
      as="main"
      className="flex max-w-[1024px] flex-col gap-16 py-4"
    >
      <section className="flex flex-col gap-16">
        <article className="flex flex-col gap-4">
          <BookingTable
            title="Turnos del día:"
            columns={columns}
            data={todayBookings}
            dataFiltered={todayBookings.filter((b) => b.booking.enabled!)}
            hasPagination={false}
          />
        </article>
        <article className="flex flex-col gap-4">
          <BookingTable
            title="Turnos próximos:"
            columns={columns}
            data={nextBookings}
            dataFiltered={nextBookings.filter((b) => b.booking.enabled!)}
          />
        </article>
      </section>
      <section className="mb-16 flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tighter">Reservar Días:</h2>
        <Paragraph className="">
          Aca podes <strong>cancelar/reservar</strong> días enteros o turnos
          individuales. Los días con algún turno <strong>ya agendado</strong> no
          se pueden <strong>cancelar/reservar</strong> pero el resto de turnos
          disponibles si.
        </Paragraph>
        <CancelDayForm
          bookings={bookings.map((b) => b.booking)}
          bookingTimes={bookingTimes}
        />
      </section>
    </MainContainer>
  );
}
