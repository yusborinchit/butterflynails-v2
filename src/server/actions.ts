"use server";

import dayjs from "dayjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import BookingEmail from "~/components/emails/booking-email";
import { env } from "~/env";
import { getCachedBookingTimes, getCachedServices } from "~/lib/cache";
import {
  bookingFormSchema,
  cancelDayFormSchema,
  createBookingTimeFormSchema,
  editBookingTimeFormSchema,
  editServiceFormSchema,
  signInFormSchema,
} from "~/lib/zod-schemas";
import { type bookings } from "./db/schema";
import { MUTATIONS, QUERIES } from "./db/sql";

const resend = new Resend(env.RESEND_API_KEY);

export async function createBookingAction(
  formData: z.infer<typeof bookingFormSchema>,
) {
  const { success, data } = bookingFormSchema.safeParse(formData);
  if (!success) return { success: false };

  const booking = {
    ...data,
    timeId: Number(data.timeId),
    serviceId: Number(data.serviceId),
  };

  const [result] = await MUTATIONS.insertBooking(booking);
  if (!result) return { success: false };

  revalidatePath("/");

  const [services, bookingTimes] = await Promise.all([
    getCachedServices(),
    getCachedBookingTimes(),
  ]);

  const service = services.find(({ id }) => id === booking.serviceId)!;
  const bookingTime = bookingTimes.find(({ id }) => id === booking.timeId)!;

  await resend.emails.send({
    from: "Butterfly Nails <notificaciones@butterflynails.shop>",
    to: ["butterfly.notificaciones@gmail.com", booking.email],
    subject: `Notificación de ${service.name} el día ${dayjs(booking.date).format("DD/MM/YYYY")} a las ${bookingTime.time} hs para ${booking.name}`,
    react: BookingEmail({
      name: booking.name,
      date: booking.date,
      time: bookingTime.time,
      service: service.name,
    }),
  });

  const bookingUrl = `/booking-info?date=${booking.date}&timeId=${booking.timeId}&serviceId=${booking.serviceId}`;
  redirect(bookingUrl);

  return { success: true };
}

export async function deleteBookingAction(bookingId: number) {
  const { success, data } = z.number().safeParse(bookingId);
  if (!success) return { success: false };

  const [result] = await MUTATIONS.deleteBooking(data);
  if (!result) return { success: false };

  revalidatePath("/");

  return { success: true };
}

export async function cancelDayAction(
  formData: z.infer<typeof cancelDayFormSchema>,
) {
  const { success, data } = cancelDayFormSchema.safeParse(formData);
  if (!success) return { success: false };

  const bookingTimes = await QUERIES.getBookingTimes();

  const fakeBooking = {
    timeId: undefined,
    date: data.date,
    enabled: false,
    ci: "00000000",
    email: "admin@email.com",
    name: "ADMIN ONLY",
    phone: "000000000",
    username: "ADMIN ONLY",
    serviceId: 1,
  } satisfies typeof bookings.$inferInsert;

  const bookingsToMake =
    data.timeId === "-1"
      ? bookingTimes.map(({ id }) => ({
          ...fakeBooking,
          timeId: id,
        }))
      : [
          {
            ...fakeBooking,
            timeId: +data.timeId,
          },
        ];

  const [result] = await MUTATIONS.insertMultipleBookings(bookingsToMake);
  if (!result) return { success: false };

  revalidatePath("/");

  return { success: true };
}

export async function editServiceAction(
  formData: z.infer<typeof editServiceFormSchema>,
) {
  const { success, data } = editServiceFormSchema.safeParse(formData);
  if (!success) return { success: false };

  const [result] = await MUTATIONS.updateService(data);
  if (!result) return { success: false };

  revalidatePath("/");
  revalidatePath("/booking-info");
  revalidatePath("/admin");
  revalidatePath("/admin/config/services");

  revalidateTag("services");

  return { success: true };
}

export async function editBookingTimeAction(
  formData: z.infer<typeof editBookingTimeFormSchema>,
) {
  const { success, data } = editBookingTimeFormSchema.safeParse(formData);
  if (!success) return { success: false };

  const [result] = await MUTATIONS.updateBookingTime(data);
  if (!result) return { success: false };

  revalidatePath("/");
  revalidatePath("/booking-info");
  revalidatePath("/admin");
  revalidatePath("/admin/config/booking-times");

  revalidateTag("bookingTimes");

  return { success: true };
}

export async function createBookingTimeAction(
  formData: z.infer<typeof createBookingTimeFormSchema>,
) {
  const { success, data } = createBookingTimeFormSchema.safeParse(formData);
  if (!success) return { success: false };

  const [result] = await MUTATIONS.insertBookingTime(data);
  if (!result) return { success: false };

  revalidatePath("/");
  revalidatePath("/booking-info");
  revalidatePath("/admin");
  revalidatePath("/admin/config/booking-times");

  revalidateTag("bookingTimes");

  return { success: true };
}

export async function deleteBookingTimeAction(bookingTimeId: number) {
  const { success, data } = z.number().safeParse(bookingTimeId);
  if (!success) return { success: false };

  const [result] = await MUTATIONS.deleteBookingTime(data);
  if (!result) return { success: false };

  revalidatePath("/");
  revalidatePath("/booking-info");
  revalidatePath("/admin");
  revalidatePath("/admin/config/booking-times");

  revalidateTag("bookingTimes");

  return { success: true };
}

const MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

export async function signInAction(formData: z.infer<typeof signInFormSchema>) {
  const { success, data } = signInFormSchema.safeParse(formData);
  if (!success) return { success: false };

  const cookiesStore = await cookies();

  cookiesStore.set("username", data.username, {
    maxAge: MONTH_IN_SECONDS,
  });
  cookiesStore.set("password", data.password, {
    maxAge: MONTH_IN_SECONDS,
  });

  redirect("/admin");

  return { success: true };
}
