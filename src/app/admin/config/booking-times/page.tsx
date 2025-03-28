import MainContainer from "~/components/containers/main-container";
import CreateBookingTimeForm from "~/components/forms/create-booking-time-form";
import EditBookingTimeForm from "~/components/forms/edit-booking-time-form";
import { getCachedBookingTimes } from "~/lib/cache";

export default async function AdminTimesConfigPage() {
  const bookingTimes = await getCachedBookingTimes();

  return (
    <MainContainer
      as="main"
      className="flex max-w-[1024px] flex-col gap-16 py-4"
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tighter">
          Editar Horarios:
        </h2>
        {bookingTimes.map((bookingTime, idx) => (
          <EditBookingTimeForm
            key={bookingTime.id}
            bookingTime={bookingTime}
            nth={idx + 1}
          />
        ))}
        <CreateBookingTimeForm />
      </section>
    </MainContainer>
  );
}
