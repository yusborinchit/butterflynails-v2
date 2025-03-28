import { unstable_cache } from "next/cache";
import { QUERIES } from "~/server/db/sql";

const DAY_IN_SECONDS = 60 * 60 * 24;

export const getCachedServices = unstable_cache(
  QUERIES.getServices,
  ["services"],
  {
    revalidate: DAY_IN_SECONDS,
  },
);

export const getCachedBookingTimes = unstable_cache(
  QUERIES.getBookingTimes,
  ["bookingTimes"],
  {
    revalidate: DAY_IN_SECONDS,
  },
);
