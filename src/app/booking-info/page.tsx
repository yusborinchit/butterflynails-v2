import dayjs from "dayjs";
import { Info, Instagram, Landmark, MapPinHouse } from "lucide-react";
import Image from "next/image";
import MainContainer from "~/components/containers/main-container";
import Paragraph from "~/components/typography/paragraph";
import { getCachedBookingTimes, getCachedServices } from "~/lib/cache";

interface Props {
  searchParams: Promise<{
    date: string;
    timeId: string;
    serviceId: string;
  }>;
}

export default async function BookingInfoPage({
  searchParams,
}: Readonly<Props>) {
  const { date, timeId, serviceId } = await searchParams;

  const [services, bookingTimes] = await Promise.all([
    getCachedServices(),
    getCachedBookingTimes(),
  ]);

  if (!services || !bookingTimes) return <div>Ocurrió un error</div>;

  const time = bookingTimes.find((t) => t.id === +timeId);
  const service = services.find((s) => s.id === +serviceId);

  if (!service || !time) return <div>Ocurrió un error</div>;

  return (
    <MainContainer
      as="main"
      className="grid min-h-screen place-items-center p-8"
    >
      <section className="grid max-w-[800px] gap-4 md:grid-cols-2">
        <div className="w-full">
          <h2 className="text-4xl leading-[1] font-bold tracking-tighter">
            {service.name}
          </h2>
          <p className="mt-1 text-neutral-500">
            {dayjs(date).format("DD/MM/YYYY")} a las {time.time}
          </p>
          <div className="mt-6 flex items-center gap-1.5 rounded-md border border-red-700/20 bg-red-700/20 p-4 text-red-900">
            <Info className="size-6 shrink-0" />
            <p className="">Hay 20 minutos de tolerancia de espera.</p>
          </div>
          <Paragraph className="mt-6 text-base">
            Contactate conmigo y mándame el <strong>diseño por MD</strong> para
            acordar el
            <strong> precio final</strong>.
          </Paragraph>
          <a href="" className="mt-6 flex items-center gap-1.5">
            <Instagram className="size-6" strokeWidth={2.5} />
            <span className="font-semibold tracking-tight">
              @butterfly_nailx
            </span>
          </a>
          <p className="mt-3 flex items-center gap-1.5">
            <MapPinHouse className="size-6" strokeWidth={2.5} />
            <span className="font-semibold tracking-tight">
              Consultar por MD
            </span>
          </p>
          <Paragraph className="mt-6 text-base">
            Se <strong>debe realizar una seña del 50%</strong> para confirmar la
            reserva. El pago se puede realizar en <strong>efectivo</strong> o{" "}
            <strong>transferencia bancaria</strong>.
          </Paragraph>
          <h3 className="mt-6 flex items-center gap-1.5">
            <Landmark className="size-6" strokeWidth={2.5} />
            <span className="font-semibold tracking-tight">
              Datos Bancarios:
            </span>
          </h3>
          <ul className="mt-3 flex flex-col text-neutral-500">
            <li className="ml-4 list-disc">Banco Itaú</li>
            <li className="ml-4 list-disc">Caja de ahorro n° 9863016</li>
            <li className="ml-4 list-disc">Moneda: UYU</li>
          </ul>
        </div>
        <picture className="row-start-1 h-[250px] w-full md:row-start-auto md:h-full">
          <picture className="row-start-1 h-full w-full md:row-start-auto">
            <source srcSet="fideos.webp" media="(min-width: 768px)" />
            <Image
              src="fideos-admin.webp"
              height={400}
              width={550}
              alt="El gato de mika, Fideos."
              className="h-full w-full rounded-md object-cover object-top"
            />
          </picture>
        </picture>
      </section>
    </MainContainer>
  );
}
