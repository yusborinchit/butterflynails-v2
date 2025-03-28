import Image from "next/image";
import MainContainer from "../containers/main-container";
import Paragraph from "../typography/paragraph";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-t from-white via-white/90 via-70% sm:via-40% lg:via-20% xl:via-transparent">
      <MainContainer className="grid min-h-[calc(100vh-72px)] place-items-center">
        <div className="z-20 flex flex-col items-center gap-6">
          <h1 className="flex flex-col text-center text-7xl leading-[0.85] font-bold tracking-tighter sm:text-8xl md:text-9xl">
            <span>Butterfly</span>
            <span>Nails</span>
          </h1>
          <Paragraph className="max-w-[400px] text-center">
            Embellece tus uñas con estilo y sofisticación. Tu satisfacción es
            nuestra inspiración.
          </Paragraph>
          <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:gap-6">
            <a
              href="#servicios"
              className="bg-secondary-400 rounded-md px-6 py-3 text-center text-lg font-medium text-white brightness-120"
            >
              Saber Más
            </a>
            <a
              href="#agenda"
              className="bg-primary-700 rounded-md px-6 py-3 text-center text-lg font-medium text-white"
            >
              Agendar Ahora
            </a>
          </div>
        </div>
      </MainContainer>
      <div className="absolute bottom-0 left-0 -z-20 h-full w-full sm:h-auto md:left-10 md:w-auto">
        <Image
          src="/mano-final.webp"
          width={400}
          height={600}
          priority={true}
          className="max-h-[600px] w-full object-contain md:max-w-[350px] xl:max-h-[650px]"
          alt="Unas manos con las uñas pintadas y una mariposa posando en ellas."
        />
      </div>
      <div className="absolute right-10 bottom-0 -z-10 hidden md:inline">
        <Image
          src="/nail-paint-final.webp"
          width={350}
          height={600}
          priority={true}
          className="max-h-[600px] max-w-[350px] object-contain"
          alt="Una pila de bottelas de esmalte."
        />
      </div>
    </section>
  );
}
