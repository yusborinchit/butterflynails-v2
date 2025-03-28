import { type bookingTimes, type services } from "~/server/db/schema";
import { QUERIES } from "~/server/db/sql";
import MainContainer from "../containers/main-container";
import BookingForm from "../forms/booking-form";
import Paragraph from "../typography/paragraph";
import SectionTitle from "../typography/section-title";

interface Props {
  services: (typeof services.$inferSelect)[];
  bookingTimes: (typeof bookingTimes.$inferSelect)[];
}

export default async function BookingSection({
  services,
  bookingTimes,
}: Readonly<Props>) {
  const currentBookings = await QUERIES.getCurrentBookings();

  return (
    <MainContainer
      id="agenda"
      as="section"
      className="mt-40 flex flex-col gap-6"
    >
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col gap-6">
          <SectionTitle className="text-center md:text-start">
            Agenda Online
          </SectionTitle>
          <Paragraph className="max-w-[500px] text-center md:text-start">
            ¡Reserva tu cita conmigo! Selecciona el servicio que desees y elige
            la fecha y hora que más te convenga.
          </Paragraph>
        </div>
        <a
          href="#faq"
          className="decoration-primary-500 max-w-[400px] text-center text-lg font-bold underline decoration-2 underline-offset-2"
        >
          ¿Todavía tienes dudas? Haz click aquí para ver las preguntas
          frecuentes.
        </a>
      </div>
      <BookingForm
        bookings={currentBookings.map((b) => ({
          date: b.booking.date,
          timeId: b.booking_time.id,
        }))}
        services={services}
        bookingTimes={bookingTimes}
      />
    </MainContainer>
  );
}
