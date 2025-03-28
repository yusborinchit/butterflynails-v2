import { clientsImages } from "~/assets/clients";
import ClientCard from "../cards/client-card";
import MainContainer from "../containers/main-container";
import Paragraph from "../typography/paragraph";
import SectionTitle from "../typography/section-title";

export default function ClientsSection() {
  return (
    <div className="relative mt-40 bg-[#d5c1ad]/30 py-40">
      {/* <div className="absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-white"></div> */}
      <MainContainer id="clientas" as="section" className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col gap-6">
            <SectionTitle className="text-center md:text-start">
              Algunas Clientas
            </SectionTitle>
            <Paragraph className="max-w-[500px] text-center md:text-start">
              Explora la galería y descubre clientas felices con uñas
              perfectamente diseñadas y cuidadas.
            </Paragraph>
          </div>
          <a
            href="https://www.instagram.com/butterfly_nailx/"
            target="_blank"
            className="decoration-primary-500 max-w-[400px] text-center text-lg font-bold underline decoration-2 underline-offset-2"
          >
            ¿Queres ver más? Seguinos en nuestro Instagram.
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-4 md:grid-cols-4 md:gap-x-6">
          {clientsImages.map(({ src, alt }) => (
            <ClientCard key={src.src} src={src} alt={alt} />
          ))}
        </div>
      </MainContainer>
    </div>
  );
}
