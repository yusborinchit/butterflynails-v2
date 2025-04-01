"use client";

import dayjs from "dayjs";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { MONTHS } from "~/lib/utils";
import { type services } from "~/server/db/schema";

interface Props {
  yearlyBookingsCount: {
    month: string;
    serviceId: number;
    count: number;
  }[];
  services: (typeof services.$inferSelect)[];
}

export default function YearlyBookingsChart({
  yearlyBookingsCount,
  services,
}: Readonly<Props>) {
  const { data } = useMemo(() => {
    const data = MONTHS.map((month) => {
      return {
        month,
        ...Object.fromEntries(services.map(({ name }) => [name, 0])),
      };
    }) as ({ month: string } & Record<string, number>)[];

    yearlyBookingsCount.forEach(({ month: date, serviceId, count }) => {
      const month = MONTHS[dayjs(date).month()];
      const service = services.find((s) => s.id === serviceId);
      data.find((d) => d.month === month)![service!.name] = count;
    });

    return { data };
  }, [yearlyBookingsCount, services]);

  const chartConfig = Object.fromEntries(
    services.map((service, idx) => [
      service.name,
      {
        label: service.name,
        color: `var(--chart-${idx + 1})`,
      },
    ]),
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[250px] min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {services.map((service, idx) => (
          <Bar
            key={service.name}
            dataKey={service.name}
            fill={`var(--chart-${idx + 1})`}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
