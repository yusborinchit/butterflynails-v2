import dayjs from "dayjs";
import { asc, eq, gte, sql } from "drizzle-orm";
import { db } from ".";
import { bookings, bookingTimes, services } from "./schema";

export const QUERIES = {
  getServices: async () => {
    return db.select().from(services).orderBy(services.id);
  },
  getBookingTimes: async () => {
    return db
      .select()
      .from(bookingTimes)
      .where(eq(bookingTimes.enabled, true))
      .orderBy(bookingTimes.time);
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
  getYearlyBookingsCount: async (
    year: string,
  ): Promise<{ month: string; serviceId: number; count: number }[]> => {
    return db.execute(
      sql`
        WITH months AS (
          SELECT generate_series(
              '${sql.raw(year)}-01-01'::date, 
              '${sql.raw(year)}-12-01'::date, 
              '1 month'::interval
          ) AS month
        )
        SELECT 
            TO_CHAR(m.month, 'YYYY-MM-DD') AS month,
            s.id AS "serviceId",
            COALESCE(COUNT(b.id), 0)::int AS count
        FROM months m
        CROSS JOIN "bn-v2_service" s
        LEFT JOIN "bn-v2_booking" b 
            ON DATE_TRUNC('month', b.date) = m.month 
            AND b.service_id = s.id
            AND b.is_enabled = true
        GROUP BY m.month, s.id
        ORDER BY m.month, count DESC;
      `,
    );
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
      .update(bookingTimes)
      .set({ enabled: false })
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
