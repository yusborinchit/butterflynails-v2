import dayjs from "dayjs";
import { asc, eq, gte } from "drizzle-orm";
import { db } from ".";
import { bookings, bookingTimes, services } from "./schema";

export const QUERIES = {
  getServices: async () => {
    return db.select().from(services).orderBy(services.id);
  },
  getBookingTimes: async () => {
    return db.select().from(bookingTimes).orderBy(bookingTimes.time);
  },
  getCurrentBookings: async () => {
    return db
      .select()
      .from(bookings)
      .innerJoin(bookingTimes, eq(bookings.timeId, bookingTimes.id))
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .where(gte(bookings.date, dayjs().format("YYYY-MM-DD")))
      .orderBy(asc(bookings.date), asc(bookingTimes.time));
  },
};

export const MUTATIONS = {
  insertBooking: async (booking: typeof bookings.$inferInsert) => {
    return db.insert(bookings).values(booking).returning({ id: bookings.id });
  },
  insertMultipleBookings: async (
    bookingsValues: (typeof bookings.$inferInsert)[],
  ) => {
    return db
      .insert(bookings)
      .values(bookingsValues)
      .onConflictDoNothing()
      .returning({ id: bookings.id });
  },
  deleteBooking: async (bookingId: typeof bookings.$inferSelect.id) => {
    return db
      .delete(bookings)
      .where(eq(bookings.id, bookingId))
      .returning({ id: bookings.id });
  },
  updateService: async (service: typeof services.$inferSelect) => {
    return db
      .update(services)
      .set(service)
      .where(eq(services.id, service.id))
      .returning({ id: services.id });
  },
  updateBookingTime: async (bookingTime: typeof bookingTimes.$inferSelect) => {
    return db
      .update(bookingTimes)
      .set(bookingTime)
      .where(eq(bookingTimes.id, bookingTime.id))
      .returning({ id: bookingTimes.id });
  },
  deleteBookingTime: async (
    bookingTimeId: typeof bookingTimes.$inferSelect.id,
  ) => {
    return db
      .delete(bookingTimes)
      .where(eq(bookingTimes.id, bookingTimeId))
      .returning({ id: bookingTimes.id });
  },
  insertBookingTime: async (bookingTime: typeof bookingTimes.$inferInsert) => {
    return db
      .insert(bookingTimes)
      .values(bookingTime)
      .returning({ id: bookingTimes.id });
  },
};
