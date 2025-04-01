import dayjs from "dayjs";
import YearlyBookingsChart from "~/components/charts/yearly-bookings-chart";
import MainContainer from "~/components/containers/main-container";
import CancelDayForm from "~/components/forms/cancel-day-form";
import { columns } from "~/components/tables/booking-columns";
import BookingTable from "~/components/tables/booking-table";
import Paragraph from "~/components/typography/paragraph";
import {
  getCachedBookingTimes,
  getCachedServices,
  getCachedYearlyBookingsCount,
} from "~/lib/cache";
import { QUERIES } from "~/server/db/sql";

export default async function AdminPage() {
  const year = `${dayjs().get("year")}`;

  const [bookings, bookingTimes, services, yearlyBookingsCount] =
    await Promise.all([
      QUERIES.getCurrentBookings(),
      getCachedBookingTimes(),
      getCachedServices(),
      getCachedYearlyBookingsCount(year),
    ]);

  const date = dayjs().format("YYYY-MM-DD");

  const todayBookings = bookings.filter(({ booking: b }) => b.date === date);
  const nextBookings = bookings.filter(({ booking: b }) => b.date !== date);

  const totalBookings = yearlyBookingsCount.reduce(
    (acc, { count }) => acc + count,
    0,
  );

  return (
    <MainContainer
      as="main"
      className="flex max-w-[1024px] flex-col gap-16 py-4"
    >
      <section className="flex flex-col gap-16">
        <article className="flex flex-col gap-4">
          <BookingTable
            title="Turnos del Día:"
            columns={columns}
            data={todayBookings}
            dataFiltered={todayBookings.filter((b) => b.booking.enabled!)}
            hasPagination={false}
          />
        </article>
        <article className="flex flex-col gap-4">
          <BookingTable
            title="Turnos Próximos:"
            columns={columns}
            data={nextBookings}
            dataFiltered={nextBookings.filter((b) => b.booking.enabled!)}
          />
        </article>
        <article className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tighter">
              Turnos del Año:
            </h2>
            <p className="text-sm text-neutral-500">{totalBookings} turnos</p>
          </div>
          <Paragraph className="">
            Esta información solo se actualiza <strong>una vez al dia</strong>,
            asi que puede mostrar <strong>menos cantidad de turnos</strong> de
            los que debería. Te amo fideos.
          </Paragraph>
          <YearlyBookingsChart
            yearlyBookingsCount={yearlyBookingsCount}
            services={services}
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
