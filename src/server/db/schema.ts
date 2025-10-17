import {
  boolean,
  date,
  integer,
  pgTableCreator,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `bn-v2_${name}`);

export const bookingTimes = createTable("booking_time", {
  id: serial("id").primaryKey(),
  time: varchar("time", { length: 5 }).notNull().unique(),
  enabled: boolean("is_enabled").default(true),
});

export const services = createTable("service", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  price: integer("price").notNull(),
});

export const bookings = createTable("booking", {
  id: serial("id").primaryKey(),
  serviceId: serial("service_id").references(() => services.id, {
    onDelete: "cascade",
  }),
  timeId: serial("booking_time_id").references(() => bookingTimes.id, {
    onDelete: "cascade",
  }),
  date: date("date").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  ci: varchar("ci", { length: 8 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 9 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  enabled: boolean("is_enabled").default(true),
});
