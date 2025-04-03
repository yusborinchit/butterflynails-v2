import { servicesImages } from "~/assets/services";
import { type services } from "~/server/db/schema";
import ServiceCard from "../cards/service-card";
import MainContainer from "../containers/main-container";
import Paragraph from "../typography/paragraph";
import SectionTitle from "../typography/section-title";

interface Props {
  services: (typeof services.$inferSelect)[];
}

export default function ServicesSection({ services }: Readonly<Props>) {
  return (
    <section id="servicios" className="mt-36 flex flex-col items-center gap-6">
      <MainContainer className="flex flex-col items-center gap-6">
        <SectionTitle className="text-center">
          <span className="text-primary-500">-</span>{" "}
          <span>Nuestros Servicios</span>{" "}
          <span className="text-primary-500">-</span>
        </SectionTitle>
        <Paragraph className="max-w-[500px] text-center">
          Ofrecemos una amplia gama de tratamientos de uñas diseñados para
          satisfacer todas tus necesidades.
        </Paragraph>
      </MainContainer>
      <div className="grid w-full gap-5 px-5 md:grid-cols-2 xl:-mt-6 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
            src={servicesImages[service.id - 1]!}
          />
        ))}
      </div>
    </section>
  );
}
